/*
 * python-runner.js
 * A thin wrapper around Pyodide (a full Python interpreter compiled to
 * WebAssembly) that lets the browser run student-written Python with no
 * server or backend involved.
 *
 * Responsibilities:
 *  - Lazily load Pyodide the first time code is run (it's a few MB, so we
 *    don't fetch it until it's actually needed).
 *  - Capture whatever the student's program prints to stdout.
 *  - Feed a queue of pre-written answers into input() so automated tests
 *    can simulate a user typing responses.
 *  - Report Python errors in a readable way instead of a raw traceback.
 */

const PythonRunner = (() => {
  let pyodideReady = null;
  let pyodideInstance = null;

  // Defines a single Python function, _run_student_code(code, input_queue),
  // that the JS side calls for every run. Keeping this as real Python
  // (rather than building a new string of Python every call) makes it much
  // easier to read and to trust that student input never gets mangled.
  const HARNESS_SOURCE = `
import sys, io, builtins, traceback

def _run_student_code(code, input_queue):
    captured = io.StringIO()
    old_stdout = sys.stdout
    sys.stdout = captured

    queue = list(input_queue)
    state = {"i": 0}

    def fake_input(prompt=""):
        if prompt:
            captured.write(str(prompt))
        if state["i"] < len(queue):
            value = queue[state["i"]]
            state["i"] += 1
        else:
            value = ""
        captured.write(str(value) + "\\n")
        return value

    old_input = builtins.input
    builtins.input = fake_input

    ok = True
    error_text = ""
    try:
        exec(compile(code, "student_code.py", "exec"), {"__name__": "__main__"})
    except Exception as e:
        ok = False
        error_text = "".join(traceback.format_exception_only(type(e), e)).strip()
    finally:
        sys.stdout = old_stdout
        builtins.input = old_input

    return ok, error_text, captured.getvalue()
`;

  function loadPyodideScript() {
    return new Promise((resolve, reject) => {
      if (window.loadPyodide) return resolve();
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Could not load the Python engine. Check your internet connection."));
      document.head.appendChild(script);
    });
  }

  async function getPyodide(onStatus) {
    if (pyodideInstance) return pyodideInstance;
    if (!pyodideReady) {
      pyodideReady = (async () => {
        if (onStatus) onStatus("Loading Python engine…");
        await loadPyodideScript();
        pyodideInstance = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.1/full/"
        });
        await pyodideInstance.runPythonAsync(HARNESS_SOURCE);
        return pyodideInstance;
      })();
    }
    return pyodideReady;
  }

  /**
   * Run student code.
   * @param {string} code - the Python source to run
   * @param {string[]} inputs - queued answers to feed into input(), in order
   * @param {function} onStatus - optional callback for loading status text
   * @returns {Promise<{ok: boolean, output: string}>}
   */
  async function run(code, inputs = [], onStatus) {
    let py;
    try {
      py = await getPyodide(onStatus);
    } catch (e) {
      return { ok: false, output: String(e.message || e) };
    }

    try {
      const runStudentCode = py.globals.get("_run_student_code");
      const resultProxy = runStudentCode(code, inputs);
      const [ok, errorText, resultOutput] = resultProxy.toJs
        ? resultProxy.toJs({ create_proxies: false })
        : resultProxy;
      if (resultProxy.destroy) resultProxy.destroy();
      runStudentCode.destroy();

      if (ok) {
        return { ok: true, output: resultOutput };
      }
      const combined = (resultOutput ? resultOutput + "\n" : "") + errorText;
      return { ok: false, output: combined };
    } catch (err) {
      return { ok: false, output: "Runner error: " + String(err.message || err) };
    }
  }

  return { run, getPyodide };
})();
