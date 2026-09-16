/*
 * challenges.js
 * The challenge database (section 17 of the spec) plus the rendering logic
 * for the challenge list page and the individual challenge workbench.
 *
 * Every challenge is one plain object in the CHALLENGES array below, so
 * adding a new challenge later just means adding a new object — no new
 * HTML page is required.
 */

const LEVELS = [
  { level: 1, name: "Python Basics", tagline: "print(), variables, arithmetic" },
  { level: 2, name: "Input and Selection", tagline: "input(), if / elif / else" },
  { level: 3, name: "Iteration", tagline: "for and while loops" },
  { level: 4, name: "Strings and Lists", tagline: "indexing, slicing, list methods" },
  { level: 5, name: "Functions", tagline: "def, parameters, return values" },
  { level: 6, name: "Algorithms", tagline: "search, sort, statistics" },
  { level: 7, name: "GCSE Programming Projects", tagline: "combining several concepts" },
  { level: 8, name: "Stretch Challenges", tagline: "optional, exam-board-stretching problems" }
];

const TOPICS = [
  "Variables", "Input and Output", "Arithmetic", "Selection", "Iteration",
  "Strings", "Lists", "Functions", "Validation", "Random Numbers",
  "Searching", "Sorting", "Boolean Logic", "Algorithms", "File Handling",
  "Problem Solving"
];

/* Each challenge:
 * id, title, level, topics[], description, requirements[], concepts[],
 * example { input, output } (optional), hints[], tests[] (optional),
 * solution (python source), explanation
 */
const CHALLENGES = [

/* ============================= LEVEL 1 ============================== */

{
  id: 1, title: "Hello Python", level: 1,
  topics: ["Variables", "Input and Output"],
  description: "Write a program that prints a welcome message to the screen. This is the traditional first program in any language — its only job is to prove your code runs and output appears where you expect it.",
  requirements: ["Use print() to output the text Hello, Python! exactly", "Add a second print() with a message of your own choosing"],
  concepts: ["print()", "Strings"],
  example: { input: "", output: "Hello, Python!\nI'm learning to code." },
  hints: [
    "print() takes the text you want to display inside round brackets, wrapped in quotes.",
    "Each print() statement starts on a new line of output automatically.",
    'print("Hello, Python!") is the first line you need.'
  ],
  tests: [{ input: [], expectedContains: "Hello, Python!" }],
  solution: 'print("Hello, Python!")\nprint("I\'m learning to code.")',
  explanation: "print() is a built-in function — code Python already knows — that writes text to the output console. Text wrapped in quotes is called a string."
},
{
  id: 2, title: "Personal Introduction", level: 1,
  topics: ["Variables", "Input and Output", "Strings"],
  description: "Store your name and age in variables, then print a sentence that introduces you using those variables rather than typing the words directly into print().",
  requirements: ["Create a variable called name holding a string", "Create a variable called age holding an integer", "Print a sentence combining both variables, e.g. My name is Amelia and I am 15 years old."],
  concepts: ["Variables", "Strings", "Integers", "String concatenation / f-strings"],
  example: { input: "", output: "My name is Amelia and I am 15 years old." },
  hints: [
    "A variable is created with name = value — no special keyword needed in Python.",
    "You can build the sentence with an f-string: f\"My name is {name} and I am {age} years old.\"",
    'Try: name = "Amelia"  age = 15  print(f"My name is {name} and I am {age} years old.")'
  ],
  tests: [{ input: [], expectedContains: "years old" }],
  solution: 'name = "Amelia"\nage = 15\nprint(f"My name is {name} and I am {age} years old.")',
  explanation: "f-strings (f\"...{variable}...\") let you drop variables directly inside a string without manually joining pieces with +."
},
{
  id: 3, title: "Basic Calculator", level: 1,
  topics: ["Variables", "Arithmetic", "Input and Output"],
  description: "Store two numbers in variables and print the result of adding, subtracting, multiplying and dividing them.",
  requirements: ["Store two numeric variables, num1 and num2", "Print the result of num1 + num2, num1 - num2, num1 * num2 and num1 / num2", "Label each result clearly, e.g. Sum: 15"],
  concepts: ["Variables", "Arithmetic operators", "Integers", "Floats"],
  example: { input: "", output: "Sum: 15\nDifference: 5\nProduct: 50\nQuotient: 2.0" },
  hints: [
    "Python's arithmetic operators are + - * / (division always gives a float).",
    "Store each result in its own variable first if it makes the print lines easier to read.",
    'print("Sum:", num1 + num2) is a quick way to label output.'
  ],
  tests: [{ input: [], expectedContains: "Sum:" }],
  solution: 'num1 = 10\nnum2 = 5\nprint("Sum:", num1 + num2)\nprint("Difference:", num1 - num2)\nprint("Product:", num1 * num2)\nprint("Quotient:", num1 / num2)',
  explanation: "Division with / always returns a float in Python 3, even if the numbers divide exactly — that's why 10 / 5 shows as 2.0, not 2."
},
{
  id: 4, title: "Rectangle Area", level: 1,
  topics: ["Variables", "Arithmetic", "Input and Output"],
  description: "Calculate the area and perimeter of a rectangle from a stored width and height.",
  requirements: ["Store width and height in variables", "Calculate area as width × height", "Calculate perimeter as 2 × (width + height)", "Print both results with labels"],
  concepts: ["Variables", "Arithmetic", "Order of operations"],
  example: { input: "", output: "Area: 24\nPerimeter: 20" },
  hints: [
    "Area of a rectangle is simply width multiplied by height.",
    "Perimeter is the total distance around the outside: 2 * (width + height).",
    "Remember Python respects brackets, so 2 * (width + height) is not the same as 2 * width + height without brackets — though here they happen to differ, always bracket to be safe."
  ],
  tests: [{ input: [], expectedContains: "Area:" }],
  solution: 'width = 6\nheight = 4\narea = width * height\nperimeter = 2 * (width + height)\nprint("Area:", area)\nprint("Perimeter:", perimeter)',
  explanation: "Breaking a calculation into a named variable (area, perimeter) before printing it makes code easier to read and reuse than cramming everything into the print() call."
},
{
  id: 5, title: "Temperature Converter", level: 1,
  topics: ["Variables", "Arithmetic", "Input and Output"],
  description: "Convert a temperature stored in Celsius into Fahrenheit using the standard formula.",
  requirements: ["Store a temperature in Celsius in a variable", "Convert it to Fahrenheit using F = (C × 9/5) + 32", "Print the result rounded to 1 decimal place"],
  concepts: ["Variables", "Arithmetic", "round()"],
  example: { input: "", output: "20°C is 68.0°F" },
  hints: [
    "The conversion formula is Fahrenheit = Celsius * 9/5 + 32.",
    "Python follows normal maths precedence, so * and / happen before + automatically.",
    "round(value, 1) rounds a number to 1 decimal place."
  ],
  tests: [{ input: [], expectedContains: "°F" }],
  solution: 'celsius = 20\nfahrenheit = celsius * 9/5 + 32\nprint(f"{celsius}°C is {round(fahrenheit, 1)}°F")',
  explanation: "round(number, places) is a built-in function that rounds a float to a given number of decimal places, useful whenever a calculation produces an ugly long decimal."
},

/* ============================= LEVEL 2 ============================== */

{
  id: 6, title: "Even or Odd", level: 2,
  topics: ["Input and Output", "Selection", "Arithmetic"],
  description: "Ask the user to type a whole number and tell them whether it is even or odd.",
  requirements: ["Use input() to get a number from the user", "Convert it to an integer", "Use the % (modulus) operator to test divisibility by 2", "Print whether the number is even or odd"],
  concepts: ["input()", "Type conversion", "if / else", "Modulus operator %"],
  example: { input: "7", output: "7 is odd" },
  hints: [
    "input() always returns text (a string), so wrap it in int() to use it as a number.",
    "The modulus operator % gives the remainder of a division — a number is even if number % 2 == 0.",
    "if number % 2 == 0: print number is even, else print number is odd."
  ],
  tests: [
    { input: ["7"], expectedContains: "odd" },
    { input: ["10"], expectedContains: "even" }
  ],
  solution: 'number = int(input("Enter a whole number: "))\nif number % 2 == 0:\n    print(f"{number} is even")\nelse:\n    print(f"{number} is odd")',
  explanation: "% is the modulus operator: it returns the remainder after division. Any number with a remainder of 0 when divided by 2 is even."
},
{
  id: 7, title: "Positive, Negative or Zero", level: 2,
  topics: ["Input and Output", "Selection"],
  description: "Ask the user for a number and report whether it is positive, negative, or exactly zero.",
  requirements: ["Get a number from the user", "Use if / elif / else to test the three cases", "Print a clear message for each case"],
  concepts: ["input()", "if / elif / else", "Comparison operators"],
  example: { input: "-4", output: "-4 is negative" },
  hints: [
    "Three possible outcomes usually means if / elif / else, not just if / else.",
    "Check for zero with == 0, and negative with < 0.",
    "Order matters: test == 0 or < 0 before falling through to else for positive."
  ],
  tests: [
    { input: ["-4"], expectedContains: "negative" },
    { input: ["0"], expectedContains: "zero" }
  ],
  solution: 'number = float(input("Enter a number: "))\nif number > 0:\n    print(f"{number} is positive")\nelif number < 0:\n    print(f"{number} is negative")\nelse:\n    print(f"{number} is zero")',
  explanation: "elif lets you test extra conditions after an if without writing a new nested if statement — Python checks each branch in order and stops at the first match."
},
{
  id: 8, title: "Age Checker", level: 2,
  topics: ["Input and Output", "Selection", "Validation"],
  description: "Ask the user for their age and print which category they fall into: child, teenager, or adult.",
  requirements: ["Get the user's age as an integer", "Under 13 is a child, 13–17 is a teenager, 18 and over is an adult", "Print the correct category"],
  concepts: ["input()", "if / elif / else", "Comparison operators"],
  example: { input: "15", output: "You are a teenager" },
  hints: [
    "Decide your boundaries carefully: is 13 a child or a teenager?",
    "Use elif for the middle case: elif age <= 17.",
    "Test the conditions in a sensible order, starting with the smallest ages."
  ],
  tests: [
    { input: ["15"], expectedContains: "teenager" },
    { input: ["25"], expectedContains: "adult" }
  ],
  solution: 'age = int(input("Enter your age: "))\nif age < 13:\n    print("You are a child")\nelif age <= 17:\n    print("You are a teenager")\nelse:\n    print("You are an adult")',
  explanation: "Once the first if fails, elif only needs to check the upper boundary of the next group, because anything smaller has already been ruled out by the first check."
},
{
  id: 9, title: "Grade Calculator", level: 2,
  topics: ["Input and Output", "Selection", "Validation"],
  description: "Ask for a percentage score and convert it into a GCSE-style letter grade using a set of boundaries.",
  requirements: ["Ask the user for a score from 0–100", "90+ is A*, 80–89 is A, 70–79 is B, 60–69 is C, below 60 is U", "Print the resulting grade"],
  concepts: ["input()", "if / elif / else", "Comparison operators"],
  example: { input: "82", output: "Grade: A" },
  hints: [
    "Work from the highest boundary downward so each elif only needs one comparison.",
    "if score >= 90 catches A*, elif score >= 80 catches A, and so on.",
    "Anything that reaches the final else is below all the boundaries, so it's a U."
  ],
  tests: [
    { input: ["82"], expectedContains: "A" },
    { input: ["40"], expectedContains: "U" }
  ],
  solution: 'score = int(input("Enter score (0-100): "))\nif score >= 90:\n    grade = "A*"\nelif score >= 80:\n    grade = "A"\nelif score >= 70:\n    grade = "B"\nelif score >= 60:\n    grade = "C"\nelse:\n    grade = "U"\nprint(f"Grade: {grade}")',
  explanation: "Storing the result in a grade variable before printing it keeps the branching logic separate from the output — useful once programs grow larger."
},
{
  id: 10, title: "Simple Login", level: 2,
  topics: ["Input and Output", "Selection", "Validation"],
  description: "Build a simple username and password check. Access is only granted if both match stored values.",
  requirements: ["Store a correct username and password in variables", "Ask the user to enter both", "Print Access granted only if both match exactly, otherwise print Access denied"],
  concepts: ["input()", "if / else", "Boolean logic (and)"],
  example: { input: "admin\\nletmein", output: "Access granted" },
  hints: [
    "You need both conditions to be true, so combine them with and.",
    "if entered_user == correct_user and entered_pass == correct_pass:",
    "Comparisons in Python are case-sensitive, so \"Admin\" and \"admin\" are not equal."
  ],
  tests: [
    { input: ["admin", "letmein"], expectedContains: "granted" },
    { input: ["admin", "wrong"], expectedContains: "denied" }
  ],
  solution: 'correct_user = "admin"\ncorrect_pass = "letmein"\nentered_user = input("Username: ")\nentered_pass = input("Password: ")\nif entered_user == correct_user and entered_pass == correct_pass:\n    print("Access granted")\nelse:\n    print("Access denied")',
  explanation: "and combines two Boolean conditions so the branch only runs when both sides are True — this is the same Boolean logic tested in GCSE exam papers."
},
{
  id: 11, title: "Largest of Three Numbers", level: 2,
  topics: ["Input and Output", "Selection"],
  description: "Ask the user for three numbers and work out which one is the largest without using Python's built-in max() function.",
  requirements: ["Get three numbers from the user", "Use if / elif / else logic (not max()) to find the largest", "Print the largest value"],
  concepts: ["input()", "if / elif / else", "Comparison operators"],
  example: { input: "4\\n9\\n2", output: "The largest number is 9" },
  hints: [
    "Compare the first two numbers, then compare the winner against the third.",
    "You could also write one condition per number: if a >= b and a >= c.",
    "Think carefully about what happens when two numbers are equal — your logic should still pick one sensibly."
  ],
  tests: [{ input: ["4", "9", "2"], expectedContains: "9" }],
  solution: 'a = float(input("First number: "))\nb = float(input("Second number: "))\nc = float(input("Third number: "))\nif a >= b and a >= c:\n    largest = a\nelif b >= a and b >= c:\n    largest = b\nelse:\n    largest = c\nprint(f"The largest number is {largest}")',
  explanation: "This is deliberately solved without max() so you practise writing the comparison logic yourself — the same reasoning is examined at GCSE as a 'trace the algorithm' question."
},

/* ============================= LEVEL 3 ============================== */

{
  id: 12, title: "Times Tables", level: 3,
  topics: ["Iteration", "Arithmetic"],
  description: "Ask the user for a number, then print its times table from 1 up to 12 using a loop.",
  requirements: ["Ask the user for a number", "Use a for loop to print number × 1 through number × 12", "Format each line as e.g. 7 x 3 = 21"],
  concepts: ["for loop", "range()", "Arithmetic"],
  example: { input: "7", output: "7 x 1 = 7\n7 x 2 = 14\n..." },
  hints: [
    "range(1, 13) produces the numbers 1 through 12.",
    "Inside the loop, multiply the chosen number by the current loop variable.",
    'for i in range(1, 13): print(f"{number} x {i} = {number * i}")'
  ],
  tests: [{ input: ["7"], expectedContains: "7 x 12 = 84" }],
  solution: 'number = int(input("Enter a number: "))\nfor i in range(1, 13):\n    print(f"{number} x {i} = {number * i}")',
  explanation: "range(1, 13) counts from 1 up to (but not including) 13 — remembering that range() stops one before its second argument is one of the most common early Python mistakes."
},
{
  id: 13, title: "Countdown", level: 3,
  topics: ["Iteration"],
  description: "Print a countdown from 10 down to 1, followed by the word Liftoff!.",
  requirements: ["Use a loop to print each number from 10 down to 1", "After the loop, print Liftoff!"],
  concepts: ["for loop", "range() with a negative step"],
  example: { input: "", output: "10\n9\n...\n1\nLiftoff!" },
  hints: [
    "range() can count downward if you give it a negative step: range(10, 0, -1).",
    "The loop only handles the numbers — Liftoff! is printed once, after the loop finishes.",
    "Check your indentation: the print(\"Liftoff!\") line should NOT be indented inside the loop."
  ],
  tests: [{ input: [], expectedContains: "Liftoff!" }],
  solution: 'for i in range(10, 0, -1):\n    print(i)\nprint("Liftoff!")',
  explanation: "range(start, stop, step) with a negative step counts backwards; the loop stops just before reaching stop, so range(10, 0, -1) correctly includes 1 but not 0."
},
{
  id: 14, title: "Sum of Numbers", level: 3,
  topics: ["Iteration", "Arithmetic"],
  description: "Ask the user how many numbers they want to enter, then read that many numbers and print their total.",
  requirements: ["Ask how many numbers will be entered", "Use a loop to read that many numbers and add them to a running total", "Print the final total"],
  concepts: ["for loop", "Accumulator pattern", "Type conversion"],
  example: { input: "3\\n4\\n5\\n6", output: "Total: 15" },
  hints: [
    "Start a variable called total at 0 before the loop begins.",
    "Each time round the loop, read one number and add it to total.",
    "total = total + number, or the shorthand total += number."
  ],
  tests: [{ input: ["3", "4", "5", "6"], expectedContains: "15" }],
  solution: 'count = int(input("How many numbers? "))\ntotal = 0\nfor i in range(count):\n    number = float(input("Enter a number: "))\n    total += number\nprint(f"Total: {total}")',
  explanation: "This is the accumulator pattern: a variable starts at a neutral value (0 for addition) and is updated once per loop iteration — it appears constantly in GCSE algorithm questions."
},
{
  id: 15, title: "Multiplication Table", level: 3,
  topics: ["Iteration", "Arithmetic"],
  description: "Print a full multiplication grid from 1×1 up to 5×5 using a loop inside a loop.",
  requirements: ["Use two nested for loops (rows and columns)", "Print each row's multiplication results on one line", "Grid should cover 1 to 5 in both directions"],
  concepts: ["Nested for loops", "Arithmetic"],
  example: { input: "", output: "1 2 3 4 5\n2 4 6 8 10\n..." },
  hints: [
    "You need a loop inside a loop — the outer loop picks the row, the inner loop picks the column.",
    "print(value, end=' ') keeps output on the same line instead of starting a new one each time.",
    "After the inner loop finishes, print() with no arguments moves to a new line for the next row."
  ],
  tests: [{ input: [], expectedContains: "5" }],
  solution: 'for row in range(1, 6):\n    for col in range(1, 6):\n        print(row * col, end=" ")\n    print()',
  explanation: "end=\" \" changes what print() puts after the text — normally a newline, but here a space, so numbers stay on one row until the inner loop finishes."
},
{
  id: 16, title: "Number Guessing Game", level: 3,
  topics: ["Iteration", "Selection", "Random Numbers"],
  description: "The computer picks a random number between 1 and 100. The player keeps guessing until they get it right, and the program tells them if each guess is too high or too low.",
  requirements: ["Generate a random number from 1–100", "Ask the user for a guess", "Tell the user whether the guess is too high or too low", "Repeat until the guess is correct", "Count and display the number of guesses taken"],
  concepts: ["while loop", "if statements", "Variables", "Input", "Random numbers"],
  example: { input: "50\\n75\\n63", output: "Correct! You took 3 guesses." },
  hints: [
    "Think about which type of loop will continue until the player guesses correctly.",
    "You will need a variable to store the number of guesses.",
    "A while loop with the condition guess != target is appropriate here: while guess != target: ..."
  ],
  tests: [],
  solution: 'import random\n\ntarget = random.randint(1, 100)\nguesses = 0\nguess = None\n\nwhile guess != target:\n    guess = int(input("Guess a number (1-100): "))\n    guesses += 1\n    if guess < target:\n        print("Too low")\n    elif guess > target:\n        print("Too high")\n    else:\n        print(f"Correct! You took {guesses} guesses.")',
  explanation: "Because the target number is random, this challenge cannot use an automated test with a fixed expected answer — run it manually and try several games instead."
},
{
  id: 17, title: "FizzBuzz", level: 3,
  topics: ["Iteration", "Selection"],
  description: "The classic FizzBuzz problem: print the numbers 1 to 30, but print Fizz for multiples of 3, Buzz for multiples of 5, and FizzBuzz for multiples of both.",
  requirements: ["Loop through numbers 1 to 30", "Print Fizz for multiples of 3", "Print Buzz for multiples of 5", "Print FizzBuzz for multiples of both 3 and 5", "Otherwise print the number itself"],
  concepts: ["for loop", "if / elif / else", "Modulus operator"],
  example: { input: "", output: "1\n2\nFizz\n4\nBuzz\n...\nFizzBuzz" },
  hints: [
    "Test the 'multiple of both' case first — if you check multiples of 3 first, 15 will incorrectly print Fizz.",
    "number % 3 == 0 and number % 5 == 0 must be checked before the individual cases.",
    "Structure: if both, print FizzBuzz; elif 3, print Fizz; elif 5, print Buzz; else print number."
  ],
  tests: [{ input: [], expectedContains: "FizzBuzz" }],
  solution: 'for number in range(1, 31):\n    if number % 3 == 0 and number % 5 == 0:\n        print("FizzBuzz")\n    elif number % 3 == 0:\n        print("Fizz")\n    elif number % 5 == 0:\n        print("Buzz")\n    else:\n        print(number)',
  explanation: "Order of conditions matters whenever cases can overlap — checking the most specific condition (multiple of both) before the more general ones avoids the classic FizzBuzz bug."
},

/* ============================= LEVEL 4 ============================== */

{
  id: 18, title: "Character Counter", level: 4,
  topics: ["Strings", "Iteration"],
  description: "Ask the user for a word or sentence and count how many characters it contains, including and excluding spaces.",
  requirements: ["Get a string from the user", "Print the total number of characters using len()", "Print the number of characters with spaces removed"],
  concepts: ["len()", "String methods", "String replace"],
  example: { input: "hello world", output: "Total characters: 11\nWithout spaces: 10" },
  hints: [
    "len(text) gives you the length of a string, including spaces.",
    "text.replace(\" \", \"\") returns a new string with all spaces removed.",
    "Call len() again on the result of replace() to count without spaces."
  ],
  tests: [{ input: ["hello world"], expectedContains: "Total characters: 11" }],
  solution: 'text = input("Enter some text: ")\nprint(f"Total characters: {len(text)}")\nprint(f"Without spaces: {len(text.replace(\' \', \'\'))}")',
  explanation: "replace() does not change the original string — Python strings are immutable — it returns a brand-new string, which is why the result must be stored or used directly."
},
{
  id: 19, title: "Reverse a Word", level: 4,
  topics: ["Strings"],
  description: "Ask the user for a word and print it reversed, without using any built-in reverse function.",
  requirements: ["Get a word from the user", "Reverse it using string slicing", "Print the reversed word"],
  concepts: ["String slicing", "Indexing"],
  example: { input: "python", output: "nohtyp" },
  hints: [
    "Slicing syntax is text[start:stop:step].",
    "A step of -1 walks through the string backwards.",
    "text[::-1] reverses an entire string in one expression."
  ],
  tests: [{ input: ["python"], expectedContains: "nohtyp" }],
  solution: 'word = input("Enter a word: ")\nreversed_word = word[::-1]\nprint(reversed_word)',
  explanation: "Slicing with [::-1] is a Python idiom: leaving start and stop blank means 'the whole string', and step -1 means 'walk backwards one character at a time'."
},
{
  id: 20, title: "Vowel Counter", level: 4,
  topics: ["Strings", "Iteration", "Selection"],
  description: "Ask the user for a sentence and count how many vowels (a, e, i, o, u) it contains, ignoring case.",
  requirements: ["Get a sentence from the user", "Loop through each character", "Count how many are vowels, ignoring uppercase/lowercase", "Print the total"],
  concepts: ["for loop over a string", "if statements", "String methods (lower())"],
  example: { input: "Hello World", output: "Vowels: 3" },
  hints: [
    "You can loop directly over a string's characters: for letter in text:",
    "Convert each letter to lowercase with .lower() so 'A' and 'a' are treated the same.",
    "Check membership with if letter in 'aeiou':"
  ],
  tests: [{ input: ["Hello World"], expectedContains: "Vowels: 3" }],
  solution: 'text = input("Enter a sentence: ")\ncount = 0\nfor letter in text.lower():\n    if letter in "aeiou":\n        count += 1\nprint(f"Vowels: {count}")',
  explanation: "in checks membership — letter in 'aeiou' is True only if that single character appears somewhere in the string 'aeiou', which is a compact way to test against several options at once."
},
{
  id: 21, title: "Shopping List", level: 4,
  topics: ["Lists", "Iteration", "Input and Output"],
  description: "Build a shopping list that lets the user add items one at a time until they type 'done', then prints the full list.",
  requirements: ["Start with an empty list", "Repeatedly ask for an item and add it to the list", "Stop when the user types done", "Print the final list, numbered"],
  concepts: ["Lists", "append()", "while loop", "Iteration with index"],
  example: { input: "milk\\nbread\\ndone", output: "1. milk\n2. bread" },
  hints: [
    "Create the list first with shopping_list = [].",
    "list.append(item) adds a new item onto the end of a list.",
    "enumerate(shopping_list, start=1) gives you both the position and item while looping, useful for numbering."
  ],
  tests: [{ input: ["milk", "bread", "done"], expectedContains: "milk" }],
  solution: 'shopping_list = []\nwhile True:\n    item = input("Add an item (or \'done\' to finish): ")\n    if item.lower() == "done":\n        break\n    shopping_list.append(item)\n\nfor index, item in enumerate(shopping_list, start=1):\n    print(f"{index}. {item}")',
  explanation: "break immediately exits the nearest loop — here it's the cleanest way to stop an otherwise-infinite while True: loop once the user signals they are finished."
},
{
  id: 22, title: "Find the Largest Number", level: 4,
  topics: ["Lists", "Iteration", "Algorithms"],
  description: "Given a list of numbers, find the largest one by looping through the list yourself, without using max().",
  requirements: ["Start with a predefined list of at least 6 numbers", "Loop through the list, keeping track of the largest value seen so far", "Print the largest number found"],
  concepts: ["Lists", "for loop", "Selection", "Algorithms"],
  example: { input: "", output: "Largest: 42" },
  hints: [
    "Start a variable called largest as the first item in the list, not as 0 — the list might contain only negative numbers.",
    "For each number in the list, compare it to largest and update largest if the new number is bigger.",
    "if number > largest: largest = number"
  ],
  tests: [{ input: [], expectedContains: "Largest:" }],
  solution: 'numbers = [12, 45, 3, 42, 8, 19]\nlargest = numbers[0]\nfor number in numbers:\n    if number > largest:\n        largest = number\nprint(f"Largest: {largest}")',
  explanation: "This 'keep the best seen so far' pattern is the foundation of the GCSE find-maximum algorithm, and reappears later in Level 6's algorithm challenges."
},
{
  id: 23, title: "Word Search", level: 4,
  topics: ["Lists", "Strings", "Searching"],
  description: "Given a list of words, ask the user for a word and report whether it appears in the list, and at what position if so.",
  requirements: ["Store a predefined list of words", "Ask the user to search for a word", "Report whether it was found, and its index if so", "Handle the case where the word is not found"],
  concepts: ["Lists", "in operator", "index()", "Selection"],
  example: { input: "banana", output: "Found 'banana' at position 2" },
  hints: [
    "The in operator checks if a value exists anywhere in a list: if word in word_list:",
    "list.index(value) tells you the position of the first matching item.",
    "Always check the word exists with in before calling .index(), otherwise a missing word will crash the program."
  ],
  tests: [
    { input: ["banana"], expectedContains: "position" },
    { input: ["kiwi"], expectedContains: "not" }
  ],
  solution: 'words = ["apple", "grape", "banana", "cherry", "mango"]\nsearch_word = input("Enter a word to search for: ")\n\nif search_word in words:\n    position = words.index(search_word)\n    print(f"Found \'{search_word}\' at position {position}")\nelse:\n    print(f"\'{search_word}\' was not found")',
  explanation: "Checking membership first (in) before finding a position (.index()) avoids a ValueError, since .index() raises an error if the item isn't present at all."
},

/* ============================= LEVEL 5 ============================== */

{
  id: 24, title: "Calculator Functions", level: 5,
  topics: ["Functions", "Arithmetic"],
  description: "Rebuild your Level 1 calculator, but this time as four separate functions — add, subtract, multiply and divide — each taking two parameters and returning a result.",
  requirements: ["Write four functions: add, subtract, multiply, divide, each with two parameters", "Each function should return its result rather than print it", "Call each function with two numbers and print the returned values"],
  concepts: ["def", "Parameters", "return", "Functions"],
  example: { input: "", output: "8 + 3 = 11" },
  hints: [
    "A function is defined with def name(parameters): followed by an indented block.",
    "return sends a value back to wherever the function was called — it's different from print(), which only displays output.",
    "def add(a, b):\\n    return a + b"
  ],
  tests: [{ input: [], expectedContains: "11" }],
  solution: 'def add(a, b):\n    return a + b\n\ndef subtract(a, b):\n    return a - b\n\ndef multiply(a, b):\n    return a * b\n\ndef divide(a, b):\n    return a / b\n\nprint(f"8 + 3 = {add(8, 3)}")\nprint(f"8 - 3 = {subtract(8, 3)}")\nprint(f"8 * 3 = {multiply(8, 3)}")\nprint(f"8 / 3 = {round(divide(8, 3), 2)}")',
  explanation: "Splitting logic into functions with return values (rather than printing directly) makes each piece reusable — you can now use add() anywhere in a program, not just to print once."
},
{
  id: 25, title: "Temperature Functions", level: 5,
  topics: ["Functions", "Arithmetic"],
  description: "Write two functions, celsius_to_fahrenheit and fahrenheit_to_celsius, and use them to convert a temperature both ways.",
  requirements: ["Write celsius_to_fahrenheit(c) returning the Fahrenheit value", "Write fahrenheit_to_celsius(f) returning the Celsius value", "Demonstrate both functions with at least one example each"],
  concepts: ["def", "Parameters", "return", "Arithmetic"],
  example: { input: "", output: "20°C = 68.0°F" },
  hints: [
    "Celsius to Fahrenheit: F = C * 9/5 + 32.",
    "Fahrenheit to Celsius is the reverse: C = (F - 32) * 5/9.",
    "Each function should end with a return statement, not a print statement — printing happens later, outside the function."
  ],
  tests: [{ input: [], expectedContains: "68" }],
  solution: 'def celsius_to_fahrenheit(c):\n    return c * 9/5 + 32\n\ndef fahrenheit_to_celsius(f):\n    return (f - 32) * 5/9\n\nprint(f"20°C = {celsius_to_fahrenheit(20)}°F")\nprint(f"68°F = {fahrenheit_to_celsius(68)}°C")',
  explanation: "Keeping the conversion maths inside a function separates 'how to calculate it' from 'what to do with the result', which is exactly what functions are for."
},
{
  id: 26, title: "Prime Number Checker", level: 5,
  topics: ["Functions", "Selection", "Iteration", "Algorithms"],
  description: "Write a function is_prime(n) that returns True if a number is prime, and use it to check a range of numbers.",
  requirements: ["Write a function is_prime(n) returning True or False", "A number is prime if it has exactly two factors: 1 and itself", "Use the function to print all prime numbers between 2 and 50"],
  concepts: ["def", "return", "for loop", "Boolean logic", "Algorithms"],
  example: { input: "", output: "2 3 5 7 11 13 ..." },
  hints: [
    "A number less than 2 is never prime.",
    "Loop from 2 up to n-1 and check if any of those numbers divide evenly into n — if one does, it's not prime.",
    "If no factor is found by the end of the loop, the number is prime — this is a good place to use a flag variable or a for/else loop."
  ],
  tests: [{ input: [], expectedContains: "2" }],
  solution: 'def is_prime(n):\n    if n < 2:\n        return False\n    for factor in range(2, n):\n        if n % factor == 0:\n            return False\n    return True\n\nfor number in range(2, 51):\n    if is_prime(number):\n        print(number, end=" ")\nprint()',
  explanation: "Returning False the moment a factor is found (rather than continuing the loop) is efficient — the function only needs one counter-example to prove a number isn't prime."
},
{
  id: 27, title: "Password Validator", level: 5,
  topics: ["Functions", "Strings", "Validation", "Selection"],
  description: "Write a function that checks whether a password meets a set of security rules, and reports exactly which rules failed.",
  requirements: ["Write a function is_valid_password(password) that checks: at least 8 characters, at least one digit, at least one uppercase letter", "Return True only if all rules pass", "Ask the user for a password and print whether it is valid"],
  concepts: ["def", "return", "String methods", "Boolean logic", "Validation"],
  example: { input: "Passw0rd", output: "Password is valid" },
  hints: [
    "String methods like .isdigit() and .isupper() can be checked character by character with any().",
    "any(char.isdigit() for char in password) is True if at least one character is a digit.",
    "Combine all three conditions with and so every rule must be satisfied."
  ],
  tests: [
    { input: ["Passw0rd"], expectedContains: "valid" },
    { input: ["weak"], expectedContains: "not valid" }
  ],
  solution: 'def is_valid_password(password):\n    long_enough = len(password) >= 8\n    has_digit = any(char.isdigit() for char in password)\n    has_upper = any(char.isupper() for char in password)\n    return long_enough and has_digit and has_upper\n\npassword = input("Enter a password: ")\nif is_valid_password(password):\n    print("Password is valid")\nelse:\n    print("Password is not valid")',
  explanation: "any(... for ... in ...) is a compact loop that returns True as soon as one item satisfies the condition — equivalent to a for loop with a flag, but in one line."
},
{
  id: 28, title: "Area Calculator", level: 5,
  topics: ["Functions", "Arithmetic", "Selection"],
  description: "Write separate functions to calculate the area of a rectangle, a triangle and a circle, then build a simple menu that lets the user choose which shape to calculate.",
  requirements: ["Write area_rectangle(w, h), area_triangle(b, h) and area_circle(r) functions", "Display a menu of the three shapes", "Ask the user to choose a shape and enter the required measurements", "Call the correct function and print the result"],
  concepts: ["def", "Parameters", "return", "if / elif / else", "Menus"],
  example: { input: "1\\n6\\n4", output: "Area: 24" },
  hints: [
    "Triangle area is 0.5 * base * height; circle area is pi * radius ** 2 (you can use 3.14159 or import math).",
    "Print a numbered menu, then read the user's choice with input() and compare it to \"1\", \"2\", \"3\".",
    "Each menu branch should call a different function and print its returned value."
  ],
  tests: [{ input: ["1", "6", "4"], expectedContains: "24" }],
  solution: 'def area_rectangle(w, h):\n    return w * h\n\ndef area_triangle(b, h):\n    return 0.5 * b * h\n\ndef area_circle(r):\n    return 3.14159 * r ** 2\n\nprint("1. Rectangle  2. Triangle  3. Circle")\nchoice = input("Choose a shape: ")\n\nif choice == "1":\n    w = float(input("Width: "))\n    h = float(input("Height: "))\n    print(f"Area: {area_rectangle(w, h)}")\nelif choice == "2":\n    b = float(input("Base: "))\n    h = float(input("Height: "))\n    print(f"Area: {area_triangle(b, h)}")\nelif choice == "3":\n    r = float(input("Radius: "))\n    print(f"Area: {round(area_circle(r), 2)}")',
  explanation: "This combines two ideas you already know — functions and if/elif menus — which is exactly how larger GCSE projects in Level 7 are built, one small piece at a time."
},
{
  id: 29, title: "Dice Simulator", level: 5,
  topics: ["Functions", "Random Numbers", "Iteration"],
  description: "Write a function that simulates rolling a six-sided die, then use it to simulate rolling two dice a number of times and report how often each total appears.",
  requirements: ["Write a function roll_die() returning a random number from 1–6", "Roll two dice together 100 times, adding the results", "Keep count of how many times each total (2–12) occurs", "Print a summary of the counts"],
  concepts: ["def", "return", "Random numbers", "Lists / dictionaries", "Iteration"],
  example: { input: "", output: "Total 7: 15 times" },
  hints: [
    "random.randint(1, 6) simulates a single die roll.",
    "A dictionary is a natural way to store 'total: count' pairs — start with counts = {} and use counts.get(total, 0) + 1.",
    "Loop 100 times, roll two dice with your function each time, add them, and update the count for that total."
  ],
  tests: [],
  solution: 'import random\n\ndef roll_die():\n    return random.randint(1, 6)\n\ncounts = {}\nfor i in range(100):\n    total = roll_die() + roll_die()\n    counts[total] = counts.get(total, 0) + 1\n\nfor total in sorted(counts):\n    print(f"Total {total}: {counts[total]} times")',
  explanation: "Because the dice rolls are random, results differ every run, so this challenge is checked manually — look for totals of 7 appearing most often, which matches probability theory."
},

/* ============================= LEVEL 6 ============================== */

{
  id: 30, title: "Linear Search", level: 6,
  topics: ["Algorithms", "Searching", "Lists"],
  description: "Implement the linear search algorithm from first principles: check each item in a list one at a time until the target is found or the list runs out.",
  requirements: ["Write a function linear_search(data, target) that returns the index of target, or -1 if not found", "Do not use Python's in or .index() — write the checking loop yourself", "Test it against a list of at least 8 items"],
  concepts: ["Linear search", "for loop", "return", "Algorithms"],
  example: { input: "", output: "Found at index 4" },
  hints: [
    "Loop through the list using its index: for i in range(len(data)):",
    "Compare data[i] to target inside the loop, and return i immediately on a match.",
    "If the loop finishes without returning, nothing matched — return -1 after the loop."
  ],
  tests: [{ input: [], expectedContains: "Found" }],
  solution: 'def linear_search(data, target):\n    for i in range(len(data)):\n        if data[i] == target:\n            return i\n    return -1\n\nnumbers = [4, 8, 15, 16, 23, 42, 7, 9]\nresult = linear_search(numbers, 23)\nif result != -1:\n    print(f"Found at index {result}")\nelse:\n    print("Not found")',
  explanation: "Linear search checks items in order and, on average, has to look at half the list before finding a match — this trade-off between simplicity and speed is exactly what GCSE efficiency questions test."
},
{
  id: 31, title: "Bubble Sort", level: 6,
  topics: ["Algorithms", "Sorting", "Lists"],
  description: "Implement bubble sort: repeatedly compare neighbouring items and swap them if they are in the wrong order, until the whole list is sorted.",
  requirements: ["Write a function bubble_sort(data) that sorts a list of numbers into ascending order", "Do not use Python's built-in sort() or sorted()", "Print the list before and after sorting"],
  concepts: ["Bubble sort", "Nested loops", "Swapping values", "Algorithms"],
  example: { input: "", output: "Before: [5, 2, 9, 1]\nAfter: [1, 2, 5, 9]" },
  hints: [
    "You need a loop inside a loop: the outer loop controls how many passes are made, the inner loop compares each pair.",
    "Swap two list items in Python with data[i], data[i+1] = data[i+1], data[i].",
    "A pass is needed for every item in the list except the last — n-1 passes for a list of length n is enough to guarantee it's sorted."
  ],
  tests: [{ input: [], expectedContains: "After" }],
  solution: 'def bubble_sort(data):\n    n = len(data)\n    for pass_num in range(n - 1):\n        for i in range(n - 1 - pass_num):\n            if data[i] > data[i + 1]:\n                data[i], data[i + 1] = data[i + 1], data[i]\n    return data\n\nnumbers = [5, 2, 9, 1, 7]\nprint(f"Before: {numbers}")\nbubble_sort(numbers)\nprint(f"After: {numbers}")',
  explanation: "Shrinking the inner loop range as passes progress (n - 1 - pass_num) is an optimisation: after each pass, the largest remaining unsorted value has already 'bubbled' to its correct place."
},
{
  id: 32, title: "Find the Mode", level: 6,
  topics: ["Algorithms", "Lists", "Statistics"],
  description: "Given a list of numbers, find the value that appears most often (the mode) without using any statistics library.",
  requirements: ["Store a predefined list of numbers with a repeated value", "Count how many times each value appears", "Identify and print the most frequent value"],
  concepts: ["Lists", "Dictionaries", "Iteration", "Algorithms"],
  example: { input: "", output: "Mode: 4" },
  hints: [
    "Build a dictionary of value: count pairs by looping through the list once.",
    "counts[value] = counts.get(value, 0) + 1 increases the count for a value, starting at 0 if it's new.",
    "To find the mode, loop through the dictionary and keep track of whichever key has the highest count so far."
  ],
  tests: [{ input: [], expectedContains: "Mode:" }],
  solution: 'numbers = [2, 4, 4, 6, 4, 8, 2]\ncounts = {}\nfor number in numbers:\n    counts[number] = counts.get(number, 0) + 1\n\nmode = numbers[0]\nfor value, count in counts.items():\n    if count > counts[mode]:\n        mode = value\n\nprint(f"Mode: {mode}")',
  explanation: "This reuses the 'best seen so far' pattern from Level 4, but tracking the best key in a dictionary instead of the best number in a list — the same idea applied to new data."
},
{
  id: 33, title: "Find the Median", level: 6,
  topics: ["Algorithms", "Sorting", "Lists", "Statistics"],
  description: "Given a list of numbers, find the median (middle value) by first sorting the list, then picking the middle item — or averaging the two middle items if the list has an even length.",
  requirements: ["Store a predefined list of numbers", "Sort the list", "Handle both odd-length and even-length lists correctly", "Print the median"],
  concepts: ["Sorting", "Lists", "Selection", "Algorithms"],
  example: { input: "", output: "Median: 5" },
  hints: [
    "sorted(data) returns a new sorted list without changing the original.",
    "If the list length is odd, the median is the single middle item: sorted_data[len(data) // 2].",
    "If the list length is even, average the two middle items."
  ],
  tests: [{ input: [], expectedContains: "Median:" }],
  solution: 'numbers = [7, 3, 9, 1, 5]\nsorted_numbers = sorted(numbers)\nn = len(sorted_numbers)\n\nif n % 2 == 1:\n    median = sorted_numbers[n // 2]\nelse:\n    mid1 = sorted_numbers[n // 2 - 1]\n    mid2 = sorted_numbers[n // 2]\n    median = (mid1 + mid2) / 2\n\nprint(f"Median: {median}")',
  explanation: "// is integer (floor) division — it drops any remainder, which is exactly what's needed to find the middle index of a list."
},
{
  id: 34, title: "Number Statistics", level: 6,
  topics: ["Algorithms", "Lists", "Statistics", "Functions"],
  description: "Given a list of numbers, calculate and print the minimum, maximum, total, and mean (average) without using Python's built-in min(), max() or sum() functions.",
  requirements: ["Write your own loops to find the minimum and maximum", "Write your own loop to calculate the total", "Calculate the mean as total divided by count", "Print all four statistics clearly"],
  concepts: ["for loop", "Accumulator pattern", "Selection", "Algorithms"],
  example: { input: "", output: "Min: 1  Max: 9  Total: 30  Mean: 5.0" },
  hints: [
    "You can find the minimum and maximum in the same single loop by tracking two variables at once.",
    "Start both minimum and maximum as the first item in the list, then update them as you loop.",
    "Calculate total with the accumulator pattern from Level 3, then divide by len(numbers) for the mean."
  ],
  tests: [{ input: [], expectedContains: "Mean" }],
  solution: 'numbers = [4, 9, 1, 7, 3, 6]\nminimum = numbers[0]\nmaximum = numbers[0]\ntotal = 0\n\nfor number in numbers:\n    if number < minimum:\n        minimum = number\n    if number > maximum:\n        maximum = number\n    total += number\n\nmean = total / len(numbers)\nprint(f"Min: {minimum}  Max: {maximum}  Total: {total}  Mean: {mean}")',
  explanation: "Writing min/max/sum by hand once is valuable practice — it's exactly what Python's built-in functions do internally, and GCSE papers sometimes ask you to trace this logic step by step."
},
{
  id: 35, title: "Search a Student Database", level: 6,
  topics: ["Algorithms", "Searching", "Lists", "Validation"],
  description: "Store a small database of students as a list of dictionaries, then let the user search for a student by name and display their details.",
  requirements: ["Store at least 5 students, each with a name and a score, as dictionaries in a list", "Ask the user for a name to search for", "Use a loop to search the list for a matching name", "Print the student's details if found, or a not-found message"],
  concepts: ["Lists of dictionaries", "Linear search", "Selection", "Validation"],
  example: { input: "Priya", output: "Priya scored 82" },
  hints: [
    "Each student can be a dictionary: {\"name\": \"Priya\", \"score\": 82}.",
    "Loop through the list of dictionaries and compare student[\"name\"] to the search term.",
    "Use a found flag (found = False, then set True on a match) so you know whether to print a not-found message afterwards."
  ],
  tests: [
    { input: ["Priya"], expectedContains: "82" },
    { input: ["Nobody"], expectedContains: "not" }
  ],
  solution: 'students = [\n    {"name": "Priya", "score": 82},\n    {"name": "Tom", "score": 67},\n    {"name": "Aisha", "score": 91},\n    {"name": "Ben", "score": 74},\n    {"name": "Lucas", "score": 58}\n]\n\nsearch_name = input("Search for a student: ")\nfound = False\nfor student in students:\n    if student["name"].lower() == search_name.lower():\n        print(f"{student[\'name\']} scored {student[\'score\']}")\n        found = True\n        break\n\nif not found:\n    print(f"{search_name} was not found")',
  explanation: "A list of dictionaries is Python's equivalent of a simple flat-file database — the same shape of data you'll build with real files in the Level 8 stretch challenges."
},

/* ============================= LEVEL 7 ============================== */

{
  id: 36, title: "Quiz Game", level: 7,
  topics: ["Functions", "Lists", "Iteration", "Selection", "Input and Output"],
  description: "Build a multiple-question quiz that asks the user a series of questions, checks their answers, and reports a final score out of the total.",
  requirements: ["Store at least 5 questions with their correct answers (a list of dictionaries works well)", "Loop through the questions, asking each one and checking the answer", "Keep a running score", "Print the final score and a percentage at the end"],
  concepts: ["Lists of dictionaries", "for loop", "if statements", "Accumulator pattern", "Functions"],
  example: { input: "", output: "You scored 4 / 5 (80%)" },
  hints: [
    "Store each question as {\"question\": \"...\", \"answer\": \"...\"} inside a list.",
    "Compare the user's answer to the stored answer with .lower().strip() on both sides, so small typing differences don't fail the check unfairly.",
    "score / len(questions) * 100 gives you the percentage — round it before printing."
  ],
  tests: [],
  solution: 'questions = [\n    {"question": "Capital of France?", "answer": "paris"},\n    {"question": "2 + 2 * 2 = ?", "answer": "6"},\n    {"question": "Python keyword for a loop that may not run at all?", "answer": "while"},\n    {"question": "Data type of 3.14?", "answer": "float"},\n    {"question": "Symbol for modulus?", "answer": "%"}\n]\n\nscore = 0\nfor q in questions:\n    answer = input(q["question"] + " ")\n    if answer.strip().lower() == q["answer"]:\n        print("Correct!")\n        score += 1\n    else:\n        print(f"Wrong — the answer was {q[\'answer\']}")\n\npercentage = round(score / len(questions) * 100)\nprint(f"You scored {score} / {len(questions)} ({percentage}%)")',
  explanation: "This project combines several concepts you've already practised separately — lists of dictionaries, loops, selection and accumulators — into one larger program, which is how real GCSE coursework projects are structured."
},
{
  id: 37, title: "ATM Simulator", level: 7,
  topics: ["Functions", "Selection", "Iteration", "Validation"],
  description: "Simulate a simple cash machine: the user starts with a balance and can check it, deposit money, or withdraw money through a menu, until they choose to exit.",
  requirements: ["Store a starting balance in a variable", "Show a menu: Check balance, Deposit, Withdraw, Exit", "Withdrawals must not be allowed to exceed the current balance", "Loop the menu until the user chooses to exit"],
  concepts: ["while loop", "if / elif / else", "Functions", "Validation"],
  example: { input: "1", output: "Balance: £100.00" },
  hints: [
    "Wrap the whole menu in a while True: loop, and use break when the user chooses Exit.",
    "Before subtracting a withdrawal, check if amount > balance and refuse it with a message if so.",
    "Update the balance variable after every deposit or successful withdrawal."
  ],
  tests: [],
  solution: 'balance = 100.00\n\nwhile True:\n    print("\\n1. Check balance  2. Deposit  3. Withdraw  4. Exit")\n    choice = input("Choose an option: ")\n\n    if choice == "1":\n        print(f"Balance: £{balance:.2f}")\n    elif choice == "2":\n        amount = float(input("Amount to deposit: "))\n        balance += amount\n        print(f"New balance: £{balance:.2f}")\n    elif choice == "3":\n        amount = float(input("Amount to withdraw: "))\n        if amount > balance:\n            print("Insufficient funds")\n        else:\n            balance -= amount\n            print(f"New balance: £{balance:.2f}")\n    elif choice == "4":\n        print("Goodbye")\n        break\n    else:\n        print("Invalid option")',
  explanation: "This project's structure — a menu inside a while True loop, broken out of with break — is a reusable pattern you'll see again in the Shop Till and Library Management projects."
},
{
  id: 38, title: "Cinema Booking System", level: 7,
  topics: ["Lists", "Selection", "Iteration", "Validation"],
  description: "Simulate booking seats for a small cinema screen. The user can view available seats, book a seat, and see an updated seating plan.",
  requirements: ["Represent seats as a list (e.g. 10 seats, all initially available)", "Let the user view the seating plan", "Let the user book a specific seat number, if it is free", "Prevent double-booking of an already-taken seat"],
  concepts: ["Lists", "Indexing", "Selection", "Validation", "Iteration"],
  example: { input: "1\\n2\\n3", output: "Seat 3 booked" },
  hints: [
    "A list of 10 items, all set to \"Free\", represents the seats: seats = [\"Free\"] * 10.",
    "Booking seat number n means changing seats[n - 1], since lists are indexed from 0.",
    "Before booking, check if seats[n - 1] == \"Free\" and refuse the booking otherwise."
  ],
  tests: [],
  solution: 'seats = ["Free"] * 10\n\ndef show_seats():\n    for i, status in enumerate(seats, start=1):\n        print(f"Seat {i}: {status}")\n\nwhile True:\n    print("\\n1. View seats  2. Book a seat  3. Exit")\n    choice = input("Choose an option: ")\n\n    if choice == "1":\n        show_seats()\n    elif choice == "2":\n        seat_num = int(input("Seat number to book (1-10): "))\n        if 1 <= seat_num <= 10:\n            if seats[seat_num - 1] == "Free":\n                seats[seat_num - 1] = "Booked"\n                print(f"Seat {seat_num} booked")\n            else:\n                print("That seat is already booked")\n        else:\n            print("Invalid seat number")\n    elif choice == "3":\n        break',
  explanation: "The recurring gap between a seat's 'human' number (1–10) and its list index (0–9) is a common source of off-by-one bugs — subtracting 1 when accessing the list is the fix used throughout this solution."
},
{
  id: 39, title: "Student Grade System", level: 7,
  topics: ["Lists", "Functions", "Selection", "Iteration", "Statistics"],
  description: "Store a class of students with their test scores, calculate their grades using boundaries, and produce a summary report including the class average.",
  requirements: ["Store at least 6 students with names and scores", "Write a function that converts a score into a grade", "Print every student's name, score and grade", "Print the class average score at the end"],
  concepts: ["Lists of dictionaries", "Functions", "Selection", "Iteration", "Accumulator pattern"],
  example: { input: "", output: "Class average: 71.3" },
  hints: [
    "Reuse the grade-boundary logic from the Level 2 Grade Calculator, but as a function that returns a grade instead of printing one.",
    "Loop through the list of students once to print each report line, and accumulate a running total for the average as you go.",
    "Divide the total by the number of students, and round the result for a tidy average."
  ],
  tests: [],
  solution: 'def get_grade(score):\n    if score >= 90:\n        return "A*"\n    elif score >= 80:\n        return "A"\n    elif score >= 70:\n        return "B"\n    elif score >= 60:\n        return "C"\n    else:\n        return "U"\n\nstudents = [\n    {"name": "Priya", "score": 82}, {"name": "Tom", "score": 67},\n    {"name": "Aisha", "score": 91}, {"name": "Ben", "score": 74},\n    {"name": "Lucas", "score": 58}, {"name": "Ella", "score": 55}\n]\n\ntotal = 0\nfor student in students:\n    grade = get_grade(student["score"])\n    print(f"{student[\'name\']}: {student[\'score\']} ({grade})")\n    total += student["score"]\n\naverage = round(total / len(students), 1)\nprint(f"Class average: {average}")',
  explanation: "Notice get_grade() is the same logic as an earlier challenge, just repackaged as a function — a good example of how small solved problems become reusable building blocks for bigger ones."
},
{
  id: 40, title: "Shop Till", level: 7,
  topics: ["Lists", "Functions", "Selection", "Iteration", "Arithmetic"],
  description: "Simulate a shop till: the user can add items from a small stock list to a basket, and the program calculates the total cost, including a receipt.",
  requirements: ["Store a stock list of at least 5 items with prices", "Let the user add items to a basket by name", "Handle an item name that isn't in stock", "Print an itemised receipt and a total at the end"],
  concepts: ["Dictionaries", "Lists", "Functions", "Iteration", "Validation"],
  example: { input: "bread\\ndone", output: "Total: £1.20" },
  hints: [
    "A dictionary is ideal for stock: {\"bread\": 1.20, \"milk\": 1.50, ...}.",
    "Check if item in stock before adding it to the basket, and print an error message if not.",
    "Keep the basket as a list of item names, then loop through it at the end to print the receipt and total."
  ],
  tests: [],
  solution: 'stock = {"bread": 1.20, "milk": 1.50, "eggs": 2.10, "butter": 1.80, "cheese": 3.00}\nbasket = []\n\nwhile True:\n    item = input("Add item (or \'done\' to finish): ").lower()\n    if item == "done":\n        break\n    if item in stock:\n        basket.append(item)\n        print(f"Added {item} — £{stock[item]:.2f}")\n    else:\n        print("Item not in stock")\n\ntotal = 0\nprint("\\n--- Receipt ---")\nfor item in basket:\n    print(f"{item}: £{stock[item]:.2f}")\n    total += stock[item]\nprint(f"Total: £{total:.2f}")',
  explanation: "Using a dictionary for stock means looking up a price is a single, fast operation (stock[item]) rather than searching a list — a preview of why dictionaries are often preferred over lists for lookups."
},
{
  id: 41, title: "Rock Paper Scissors", level: 7,
  topics: ["Selection", "Random Numbers", "Iteration", "Functions"],
  description: "Build a Rock, Paper, Scissors game against the computer that plays multiple rounds and keeps score until the user decides to stop.",
  requirements: ["The computer should choose randomly between rock, paper and scissors each round", "Compare the user's choice to the computer's choice and decide the winner", "Keep a running score across multiple rounds", "Let the player choose when to stop playing"],
  concepts: ["Random numbers", "Selection", "Iteration", "Functions"],
  example: { input: "rock\\nyes", output: "Computer chose paper. Computer wins!" },
  hints: [
    "random.choice([\"rock\", \"paper\", \"scissors\"]) picks one option at random.",
    "There are only a few winning combinations for the player — it can help to list them explicitly, e.g. player beats computer if (player, computer) is one of (\"rock\",\"scissors\"), (\"paper\",\"rock\"), (\"scissors\",\"paper\").",
    "Wrap the whole round in a while loop, and ask after each round whether the player wants to continue."
  ],
  tests: [],
  solution: 'import random\n\nwins = 0\nlosses = 0\noptions = ["rock", "paper", "scissors"]\nbeats = {"rock": "scissors", "paper": "rock", "scissors": "paper"}\n\nplaying = True\nwhile playing:\n    player = input("Choose rock, paper or scissors: ").lower()\n    computer = random.choice(options)\n\n    if player == computer:\n        print(f"Computer chose {computer}. It\'s a tie!")\n    elif beats[player] == computer:\n        print(f"Computer chose {computer}. You win!")\n        wins += 1\n    else:\n        print(f"Computer chose {computer}. Computer wins!")\n        losses += 1\n\n    again = input("Play again? (yes/no): ")\n    playing = again.lower() == "yes"\n\nprint(f"Final score — Wins: {wins}, Losses: {losses}")',
  explanation: "The beats dictionary encodes all three winning rules in one small lookup table, avoiding a long chain of if/elif statements for every possible combination of choices."
},
{
  id: 42, title: "Text Adventure", level: 7,
  topics: ["Selection", "Iteration", "Functions", "Problem Solving"],
  description: "Build a small branching text adventure game with at least three rooms or decision points, where the player's choices lead to different outcomes.",
  requirements: ["Present the player with a starting scenario and at least two choices", "Different choices should lead to different follow-up scenes", "Include at least one way to 'win' and one way to 'lose'", "Use functions to represent each scene, if possible"],
  concepts: ["Functions", "if / elif / else", "Input and output", "Problem solving"],
  example: { input: "left", output: "You found the treasure!" },
  hints: [
    "Consider writing one function per room or scene, where each function ends by calling the next scene's function based on the player's choice.",
    "A dictionary mapping choices to outcomes can be tidier than a long if/elif chain if there are many options.",
    "Make sure every path through the story eventually reaches a clear ending — don't leave the player stuck with no valid input."
  ],
  tests: [],
  solution: 'def cave_entrance():\n    print("You stand before a dark cave. Paths lead left and right.")\n    choice = input("Go left or right? ").lower()\n    if choice == "left":\n        treasure_room()\n    elif choice == "right":\n        monster_room()\n    else:\n        print("You hesitate too long and the torch goes out. Game over.")\n\ndef treasure_room():\n    print("You found the treasure!")\n\ndef monster_room():\n    print("A wolf blocks the path. You turn back, but it\'s too late.")\n    print("Game over.")\n\ncave_entrance()',
  explanation: "Each scene calling the next scene function directly (rather than returning to one central loop) is a simple way to represent branching stories — this project is deliberately open-ended, so your story can be longer and more elaborate than the example."
},
{
  id: 43, title: "Library Management System", level: 7,
  topics: ["Lists", "Functions", "Selection", "Iteration", "Validation"],
  description: "Build a simple library system that stores a catalogue of books, allows books to be borrowed and returned, and tracks which books are currently available.",
  requirements: ["Store a catalogue of at least 6 books as a list of dictionaries, each with a title and an 'available' status", "Let the user view the catalogue", "Let the user borrow a book, if it's available", "Let the user return a book, marking it available again"],
  concepts: ["Lists of dictionaries", "Functions", "Selection", "Iteration", "Validation"],
  example: { input: "1\\n2\\n1984", output: "You have borrowed 1984" },
  hints: [
    "Each book can be a dictionary: {\"title\": \"1984\", \"available\": True}.",
    "To borrow a book, search the catalogue for a matching title where available is True, then set it to False.",
    "Structure the program as a menu loop, similar to the ATM Simulator or Shop Till projects."
  ],
  tests: [],
  solution: 'catalogue = [\n    {"title": "1984", "available": True},\n    {"title": "Dune", "available": True},\n    {"title": "The Hobbit", "available": False},\n    {"title": "Brave New World", "available": True},\n    {"title": "Fahrenheit 451", "available": True},\n    {"title": "Animal Farm", "available": True}\n]\n\ndef show_catalogue():\n    for book in catalogue:\n        status = "Available" if book["available"] else "Borrowed"\n        print(f"{book[\'title\']} — {status}")\n\nwhile True:\n    print("\\n1. View catalogue  2. Borrow a book  3. Return a book  4. Exit")\n    choice = input("Choose an option: ")\n\n    if choice == "1":\n        show_catalogue()\n    elif choice == "2":\n        title = input("Title to borrow: ")\n        for book in catalogue:\n            if book["title"].lower() == title.lower() and book["available"]:\n                book["available"] = False\n                print(f"You have borrowed {book[\'title\']}")\n                break\n        else:\n            print("That book is not available")\n    elif choice == "3":\n        title = input("Title to return: ")\n        for book in catalogue:\n            if book["title"].lower() == title.lower():\n                book["available"] = True\n                print(f"Thank you for returning {book[\'title\']}")\n                break\n    elif choice == "4":\n        break',
  explanation: "The for...else structure here runs the else block only if the loop finished without hitting break — a lesser-known but useful way to detect 'searched everything and found nothing' without a separate found flag."
},

/* ============================= LEVEL 8 ============================== */

{
  id: 44, title: "Caesar Cipher", level: 8, stretch: true,
  topics: ["Strings", "Functions", "Algorithms", "Problem Solving"],
  description: "Implement the Caesar cipher: a classic encryption technique that shifts every letter in a message forward by a fixed number of places in the alphabet.",
  requirements: ["Write a function encrypt(text, shift) that shifts every letter forward by shift places, wrapping from z back to a", "Write a matching decrypt(text, shift) function", "Preserve spaces and punctuation unchanged", "Preserve the original letter case"],
  concepts: ["Functions", "String manipulation", "ord() / chr()", "Modulus", "Algorithms"],
  example: { input: "", output: "Encrypted: khoor  Decrypted: hello" },
  hints: [
    "ord(letter) converts a character to its numeric code; chr(number) converts it back.",
    "To wrap correctly from z to a, work relative to 'a' (or 'A'): (ord(letter) - ord('a') + shift) % 26 + ord('a').",
    "Check if a character is a letter with .isalpha() before shifting it — leave anything else (spaces, punctuation) unchanged."
  ],
  tests: [],
  solution: 'def shift_letter(letter, shift):\n    if letter.isupper():\n        base = ord("A")\n    else:\n        base = ord("a")\n    return chr((ord(letter) - base + shift) % 26 + base)\n\ndef encrypt(text, shift):\n    result = ""\n    for char in text:\n        if char.isalpha():\n            result += shift_letter(char, shift)\n        else:\n            result += char\n    return result\n\ndef decrypt(text, shift):\n    return encrypt(text, -shift)\n\nmessage = "hello"\nencrypted = encrypt(message, 3)\nprint(f"Encrypted: {encrypted}")\nprint(f"Decrypted: {decrypt(encrypted, 3)}")',
  explanation: "decrypt() reuses encrypt() with a negative shift instead of duplicating the logic — the modulus operator handles negative shifts correctly too, wrapping backward from a to z."
},
{
  id: 45, title: "Password Security Checker", level: 8, stretch: true,
  topics: ["Strings", "Functions", "Validation", "Algorithms"],
  description: "Extend the Level 5 password validator into a scoring system that rates password strength from Weak to Very Strong based on several criteria, rather than a simple pass/fail.",
  requirements: ["Check length, uppercase, lowercase, digits, and special characters, awarding one point for each rule met", "Convert the total points into a strength rating (e.g. 0-1: Weak, 2-3: Medium, 4: Strong, 5: Very Strong)", "Print the rating and which rules were missing, if any"],
  concepts: ["Functions", "String methods", "Validation", "Selection"],
  example: { input: "Str0ng!Pass", output: "Strength: Very Strong" },
  hints: [
    "A special character can be checked with any(char in \"!@#$%^&*\" for char in password).",
    "Build a small list of (rule_name, passed) pairs so you can report exactly which rules were missed.",
    "Map the total score to a rating using if/elif boundaries, similar to the grade calculator."
  ],
  tests: [],
  solution: 'def check_password(password):\n    specials = "!@#$%^&*"\n    rules = {\n        "length": len(password) >= 8,\n        "uppercase": any(c.isupper() for c in password),\n        "lowercase": any(c.islower() for c in password),\n        "digit": any(c.isdigit() for c in password),\n        "special": any(c in specials for c in password)\n    }\n    score = sum(rules.values())\n\n    if score <= 1:\n        rating = "Weak"\n    elif score <= 3:\n        rating = "Medium"\n    elif score == 4:\n        rating = "Strong"\n    else:\n        rating = "Very Strong"\n\n    missing = [name for name, passed in rules.items() if not passed]\n    return rating, missing\n\npassword = "Str0ng!Pass"\nrating, missing = check_password(password)\nprint(f"Strength: {rating}")\nif missing:\n    print("Missing:", ", ".join(missing))',
  explanation: "sum(rules.values()) works because True counts as 1 and False as 0 in Python — a neat shortcut for counting how many Boolean conditions were True, without writing a manual counter loop."
},
{
  id: 46, title: "Advanced Quiz System", level: 8, stretch: true,
  topics: ["Functions", "Lists", "Iteration", "Selection", "Random Numbers"],
  description: "Build on the Level 7 Quiz Game by adding question categories, randomised question order, and a results breakdown by category at the end.",
  requirements: ["Store questions with a category field as well as a question and answer", "Shuffle the order questions are asked in", "Track scores separately for each category", "Print an overall score and a per-category breakdown at the end"],
  concepts: ["Functions", "Lists of dictionaries", "random.shuffle", "Dictionaries", "Iteration"],
  example: { input: "", output: "Maths: 2/2   Science: 1/2" },
  hints: [
    "random.shuffle(list) reorders a list in place — shuffle a copy of your questions so the original order isn't lost.",
    "Use a dictionary keyed by category to track two numbers per category: correct answers and total asked.",
    "categories.setdefault(cat, {\"correct\": 0, \"total\": 0}) is a tidy way to create an entry only the first time a category appears."
  ],
  tests: [],
  solution: 'import random\n\nquestions = [\n    {"category": "Maths", "question": "5 * 6 = ?", "answer": "30"},\n    {"category": "Maths", "question": "10 / 2 = ?", "answer": "5"},\n    {"category": "Science", "question": "Chemical symbol for water?", "answer": "h2o"},\n    {"category": "Science", "question": "Planet closest to the sun?", "answer": "mercury"}\n]\n\nshuffled = questions[:]\nrandom.shuffle(shuffled)\n\ncategories = {}\nfor q in shuffled:\n    stats = categories.setdefault(q["category"], {"correct": 0, "total": 0})\n    stats["total"] += 1\n    answer = input(q["question"] + " ").strip().lower()\n    if answer == q["answer"]:\n        stats["correct"] += 1\n        print("Correct!")\n    else:\n        print(f"Wrong — the answer was {q[\'answer\']}")\n\nfor category, stats in categories.items():\n    print(f"{category}: {stats[\'correct\']}/{stats[\'total\']}")',
  explanation: "questions[:] makes a shallow copy of the list before shuffling, so shuffling shuffled doesn't affect the order of the original questions list if you needed it again elsewhere."
},
{
  id: 47, title: "Inventory Management System", level: 8, stretch: true,
  topics: ["Lists", "Functions", "Selection", "Iteration", "Validation"],
  description: "Build a stock management tool for a small shop: items can be added, restocked, sold, and a low-stock warning should appear automatically when quantity drops below a threshold.",
  requirements: ["Store inventory as a dictionary of item name to quantity", "Support adding a new item, restocking an existing item, and selling (reducing) stock", "Prevent selling more stock than is available", "Automatically flag any item with quantity below 5 as low stock in the report"],
  concepts: ["Dictionaries", "Functions", "Selection", "Validation", "Iteration"],
  example: { input: "", output: "LOW STOCK: pencils (3 left)" },
  hints: [
    "Use a function for each operation (add_item, restock, sell) that all modify the same inventory dictionary.",
    "Before reducing stock in sell(), check that quantity >= amount requested.",
    "Loop through the dictionary at report time and print a warning line for any item where quantity < 5."
  ],
  tests: [],
  solution: 'inventory = {"pencils": 20, "rulers": 4, "erasers": 12}\n\ndef sell(item, amount):\n    if item not in inventory:\n        print("Unknown item")\n    elif inventory[item] < amount:\n        print("Not enough stock")\n    else:\n        inventory[item] -= amount\n\ndef restock(item, amount):\n    inventory[item] = inventory.get(item, 0) + amount\n\ndef report():\n    for item, qty in inventory.items():\n        line = f"{item}: {qty}"\n        if qty < 5:\n            line += f"  — LOW STOCK: {item} ({qty} left)"\n        print(line)\n\nsell("pencils", 3)\nrestock("erasers", 5)\nreport()',
  explanation: "Keeping all mutations inside small functions (sell, restock) rather than editing inventory directly all over the program means the low-stock and not-enough-stock rules only need to be written once, in one place."
},
{
  id: 48, title: "High Score System", level: 8, stretch: true,
  topics: ["Lists", "Sorting", "Functions", "File Handling"],
  description: "Build a high score table that accepts new scores, keeps them sorted from highest to lowest, only retains the top 5, and saves them to a text file so they persist between runs.",
  requirements: ["Store scores as a list of (name, score) pairs", "After adding a new score, re-sort the list so the highest score is first", "Keep only the top 5 scores", "Save the table to a text file, and load it back in when the program starts"],
  concepts: ["Sorting with a key", "File handling", "Functions", "Lists of tuples"],
  example: { input: "", output: "1. Aisha - 950\n2. Ben - 800" },
  hints: [
    "sorted(scores, key=lambda s: s[1], reverse=True) sorts a list of pairs by the second value, highest first.",
    "Slicing scores[:5] keeps only the first five items after sorting.",
    "Use open(\"scores.txt\", \"w\") to write and open(\"scores.txt\", \"r\") to read — remember file handling in a browser sandbox writes to a virtual file that resets each run, so treat this as practice for real file I/O."
  ],
  tests: [],
  solution: 'def load_scores(filename="scores.txt"):\n    scores = []\n    try:\n        with open(filename, "r") as f:\n            for line in f:\n                name, value = line.strip().split(",")\n                scores.append((name, int(value)))\n    except FileNotFoundError:\n        pass\n    return scores\n\ndef save_scores(scores, filename="scores.txt"):\n    with open(filename, "w") as f:\n        for name, value in scores:\n            f.write(f"{name},{value}\\n")\n\ndef add_score(scores, name, value):\n    scores.append((name, value))\n    scores.sort(key=lambda s: s[1], reverse=True)\n    return scores[:5]\n\nscores = load_scores()\nscores = add_score(scores, "Aisha", 950)\nscores = add_score(scores, "Ben", 800)\nsave_scores(scores)\n\nfor i, (name, value) in enumerate(scores, start=1):\n    print(f"{i}. {name} - {value}")',
  explanation: "The with open(...) as f: syntax is a context manager — it automatically closes the file afterwards even if an error occurs partway through, which is safer than calling f.close() manually."
},
{
  id: 49, title: "Simple Text-Based Database", level: 8, stretch: true,
  topics: ["File Handling", "Lists", "Functions", "Validation"],
  description: "Build a small command-driven record system that can add, list, and delete records, saving them to a text file so the data isn't lost between runs.",
  requirements: ["Store records as comma-separated lines in a text file (e.g. name,age,email)", "Support adding a new record, listing all records, and deleting a record by name", "Read the file into memory at the start and rewrite it after any change", "Handle the case where the file doesn't exist yet on first run"],
  concepts: ["File handling", "Lists", "Functions", "Validation", "Selection"],
  example: { input: "", output: "Added: Priya,15,priya@example.com" },
  hints: [
    "Wrap file reads in a try/except FileNotFoundError block so a first run doesn't crash the program.",
    "Keep the records in a Python list while the program runs, and only touch the file when saving or loading.",
    "To delete a record, filter it out of the list with a list comprehension before rewriting the file."
  ],
  tests: [],
  solution: 'FILENAME = "records.txt"\n\ndef load_records():\n    try:\n        with open(FILENAME, "r") as f:\n            return [line.strip() for line in f if line.strip()]\n    except FileNotFoundError:\n        return []\n\ndef save_records(records):\n    with open(FILENAME, "w") as f:\n        for record in records:\n            f.write(record + "\\n")\n\ndef add_record(records, name, age, email):\n    entry = f"{name},{age},{email}"\n    records.append(entry)\n    print(f"Added: {entry}")\n    return records\n\ndef delete_record(records, name):\n    return [r for r in records if not r.startswith(name + ",")]\n\nrecords = load_records()\nrecords = add_record(records, "Priya", 15, "priya@example.com")\nsave_records(records)\n\nfor r in records:\n    print(r)',
  explanation: "A list comprehension like [r for r in records if not r.startswith(...)] builds a new filtered list in one line — it's the same 'loop and keep some items' idea as a for loop with an if and append, written more compactly."
},
{
  id: 50, title: "Mini Contact Book", level: 8, stretch: true,
  topics: ["Lists", "Functions", "Selection", "Iteration", "Validation", "Searching"],
  description: "Build a complete contact book application combining everything from earlier levels: adding contacts with validation, searching, editing, deleting, and displaying a sorted contact list through a menu system.",
  requirements: ["Store contacts as a list of dictionaries (name, phone, email)", "Validate that a phone number contains only digits before accepting it", "Support add, search by name, delete, and list all contacts sorted alphabetically", "Wrap everything in a menu loop that runs until the user exits"],
  concepts: ["Lists of dictionaries", "Functions", "Validation", "Sorting", "Searching", "Menus"],
  example: { input: "1\\nBen\\n07123456789\\nben@mail.com", output: "Contact added" },
  hints: [
    "Validate a phone number with phone.isdigit() before accepting it — reject and re-ask otherwise.",
    "sorted(contacts, key=lambda c: c[\"name\"]) sorts the list of dictionaries alphabetically by name.",
    "Reuse the linear-search pattern from Level 6 to find a contact by name for both the search and delete options."
  ],
  tests: [],
  solution: 'contacts = []\n\ndef add_contact():\n    name = input("Name: ")\n    phone = input("Phone: ")\n    while not phone.isdigit():\n        print("Phone must contain digits only")\n        phone = input("Phone: ")\n    email = input("Email: ")\n    contacts.append({"name": name, "phone": phone, "email": email})\n    print("Contact added")\n\ndef search_contact():\n    name = input("Search name: ").lower()\n    for c in contacts:\n        if c["name"].lower() == name:\n            print(f"{c[\'name\']} — {c[\'phone\']} — {c[\'email\']}")\n            return\n    print("Not found")\n\ndef delete_contact():\n    name = input("Name to delete: ").lower()\n    global contacts\n    contacts = [c for c in contacts if c["name"].lower() != name]\n    print("Deleted (if it existed)")\n\ndef list_contacts():\n    for c in sorted(contacts, key=lambda c: c["name"]):\n        print(f"{c[\'name\']} — {c[\'phone\']}")\n\nwhile True:\n    print("\\n1. Add  2. Search  3. Delete  4. List  5. Exit")\n    choice = input("Choose: ")\n    if choice == "1":\n        add_contact()\n    elif choice == "2":\n        search_contact()\n    elif choice == "3":\n        delete_contact()\n    elif choice == "4":\n        list_contacts()\n    elif choice == "5":\n        break',
  explanation: "This final challenge deliberately reuses validation (Level 5), searching (Level 6), sorting (Level 6) and menu-driven projects (Level 7) together — a fitting way to finish, since real programs are built by combining exactly these kinds of smaller, previously-solved pieces."
}

];

/* ------------------------------------------------------------------ *
 * Lookup / filter helpers
 * ------------------------------------------------------------------ */

function getChallengeById(id) {
  return CHALLENGES.find((c) => c.id === Number(id));
}

function getLevelInfo(level) {
  return LEVELS.find((l) => l.level === Number(level));
}

function filterChallenges({ search = "", level = "", topic = "", status = "" } = {}) {
  const term = search.trim().toLowerCase();
  return CHALLENGES.filter((c) => {
    if (term && !c.title.toLowerCase().includes(term)) return false;
    if (level && Number(level) !== c.level) return false;
    if (topic && !c.topics.includes(topic)) return false;
    if (status) {
      const s = ProgressStore.status(c.id);
      if (status === "completed" && s !== "complete") return false;
      if (status === "in-progress" && s !== "in-progress") return false;
      if (status === "not-started" && s !== "not-started") return false;
    }
    return true;
  });
}

/* ------------------------------------------------------------------ *
 * Challenge list page rendering
 * ------------------------------------------------------------------ */

function statusBadge(id) {
  const s = ProgressStore.status(id);
  if (s === "complete") return `<span class="badge badge-done">✓ Complete</span>`;
  if (s === "in-progress") return `<span class="badge badge-progress">In progress</span>`;
  return "";
}

function renderChallengeCard(c) {
  const level = getLevelInfo(c.level);
  const stretch = c.stretch ? `<span class="badge badge-stretch">Stretch</span>` : "";
  return `
    <a class="challenge-card" href="challenge.html?id=${c.id}">
      <div class="cc-top">
        <span class="cc-id">#${String(c.id).padStart(2, "0")}</span>
        ${statusBadge(c.id)}
      </div>
      <h3>${escapeHtml(c.title)}</h3>
      <p class="cc-desc">${escapeHtml(c.description.slice(0, 90))}${c.description.length > 90 ? "…" : ""}</p>
      <div class="cc-meta">
        <span class="badge badge-level">Level ${c.level} · ${level.name}</span>
        ${stretch}
      </div>
    </a>
  `;
}

function initChallengeListPage() {
  const grid = document.getElementById("challenge-grid");
  const searchInput = document.getElementById("search-input");
  const levelSelect = document.getElementById("level-select");
  const topicSelect = document.getElementById("topic-select");
  const statusSelect = document.getElementById("status-select");
  const countEl = document.getElementById("filter-count");
  if (!grid) return;

  // Populate level / topic selects
  LEVELS.forEach((l) => {
    const opt = document.createElement("option");
    opt.value = l.level;
    opt.textContent = `Level ${l.level} — ${l.name}`;
    levelSelect.appendChild(opt);
  });
  TOPICS.forEach((t) => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    topicSelect.appendChild(opt);
  });

  // Pre-fill from URL query params (e.g. linked from topics.html)
  const initLevel = qs("level");
  const initTopic = qs("topic");
  if (initLevel) levelSelect.value = initLevel;
  if (initTopic) topicSelect.value = initTopic;

  function render() {
    const results = filterChallenges({
      search: searchInput.value,
      level: levelSelect.value,
      topic: topicSelect.value,
      status: statusSelect.value
    });
    countEl.textContent = `${results.length} of ${CHALLENGES.length} challenges`;
    grid.innerHTML = results.length
      ? results.map(renderChallengeCard).join("")
      : `<div class="empty-state">No challenges match those filters.</div>`;
  }

  [searchInput, levelSelect, topicSelect, statusSelect].forEach((el) =>
    el.addEventListener("input", render)
  );

  render();
}

/* ------------------------------------------------------------------ *
 * Individual challenge page
 * ------------------------------------------------------------------ */

function initChallengeDetailPage() {
  const mount = document.getElementById("challenge-mount");
  if (!mount) return;

  const id = Number(qs("id"));
  const challenge = getChallengeById(id);

  if (!challenge) {
    mount.innerHTML = `<div class="empty-state">Challenge not found. <a href="challenges.html">Back to challenges</a></div>`;
    return;
  }

  document.title = `${challenge.title} — Python GCSE Challenge Lab`;
  ProgressStore.markStarted(challenge.id);

  const level = getLevelInfo(challenge.level);
  const isComplete = ProgressStore.isComplete(challenge.id);
  const savedCode = ProgressStore.loadCode(challenge.id);
  const starterCode = savedCode || `# ${challenge.title}\n# Write your solution below.\n\n`;

  mount.innerHTML = `
    <div class="challenge-header">
      <div>
        <div class="ch-meta-line">Level ${challenge.level} &middot; ${escapeHtml(level.name)}${challenge.stretch ? " &middot; Optional stretch challenge" : ""}</div>
        <h1>${escapeHtml(challenge.title)}</h1>
      </div>
      <a href="challenges.html" class="btn btn-ghost">&larr; All challenges</a>
    </div>

    <div class="workbench">
      <div class="panel brief-panel">
        <div class="brief-section">
          <h4>DESCRIPTION</h4>
          <p>${escapeHtml(challenge.description)}</p>
        </div>
        <div class="brief-section">
          <h4>REQUIREMENTS</h4>
          <ul class="req-list">
            ${challenge.requirements.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}
          </ul>
        </div>
        <div class="brief-section">
          <h4>CONCEPTS</h4>
          <div class="concept-chips">
            ${challenge.concepts.map((c) => `<span class="chip">${escapeHtml(c)}</span>`).join("")}
          </div>
        </div>
        ${
          challenge.example
            ? `<div class="brief-section">
                <h4>EXAMPLE</h4>
                <div class="example-block">${escapeHtml(challenge.example.output)}</div>
              </div>`
            : ""
        }
        <div class="brief-section">
          <h4>HINTS</h4>
          <div class="hint-list">
            ${challenge.hints
              .map(
                (h, i) => `
              <details class="hint-item">
                <summary>Hint ${i + 1}</summary>
                <div class="hint-body">${escapeHtml(h)}</div>
              </details>`
              )
              .join("")}
          </div>
        </div>
        <div class="brief-section">
          <h4>SOLUTION</h4>
          <div id="solution-gate" class="solution-gate ${challenge.solutionRevealed ? "hidden" : ""}">
            <p>Try solving the challenge yourself first. Viewing the solution will mark this challenge as "solution viewed".</p>
            <button id="show-solution-btn" class="btn">Show Solution</button>
          </div>
          <div id="solution-block" class="solution-block">
            <pre class="solution-code">${escapeHtml(challenge.solution)}</pre>
            <p class="text-dim">${escapeHtml(challenge.explanation)}</p>
          </div>
        </div>
      </div>

      <div class="editor-panel">
        <div class="editor-toolbar">
          <span class="tb-label">STUDENT CODE</span>
          <button id="run-btn" class="btn btn-primary btn-sm">▶ Run</button>
          <button id="test-btn" class="btn btn-sm">Run Tests</button>
          <button id="reset-btn" class="btn btn-ghost btn-sm">Reset</button>
          <button id="clear-btn" class="btn btn-ghost btn-sm">Clear</button>
        </div>
        <div class="code-shell">
          <div class="code-area-wrap">
            <div id="line-numbers" class="line-numbers">1</div>
            <textarea id="code-input" class="code-input" spellcheck="false">${escapeHtml(starterCode)}</textarea>
          </div>
          <div class="console-wrap">
            <div class="console-head">PROGRAM OUTPUT<span id="runner-status" style="margin-left:auto;"></span></div>
            <pre id="console-out" class="console-out">Click Run to execute your code. First run loads the Python engine and may take a few seconds.</pre>
          </div>
        </div>
        <div id="test-results" class="test-results"></div>

        <div class="completion-bar">
          <span class="status-text" id="completion-status">${isComplete ? "✓ Marked complete" : "Not yet marked complete"}</span>
          <button id="complete-btn" class="btn ${isComplete ? "" : "btn-primary"}">${isComplete ? "Unmark Complete" : "Mark as Complete"}</button>
        </div>
      </div>
    </div>
  `;

  wireEditor(challenge, starterCode);
  wireSolution(challenge);
  wireCompletion(challenge);
}

function updateLineNumbers(textarea, gutter) {
  const lines = textarea.value.split("\n").length;
  let out = "";
  for (let i = 1; i <= lines; i++) out += i + "\n";
  gutter.textContent = out;
}

function wireEditor(challenge, starterCode) {
  const textarea = document.getElementById("code-input");
  const gutter = document.getElementById("line-numbers");
  const output = document.getElementById("console-out");
  const runBtn = document.getElementById("run-btn");
  const testBtn = document.getElementById("test-btn");
  const resetBtn = document.getElementById("reset-btn");
  const clearBtn = document.getElementById("clear-btn");
  const statusEl = document.getElementById("runner-status");
  const testResultsEl = document.getElementById("test-results");

  updateLineNumbers(textarea, gutter);
  textarea.addEventListener("input", () => {
    updateLineNumbers(textarea, gutter);
    ProgressStore.saveCode(challenge.id, textarea.value);
  });
  textarea.addEventListener("scroll", () => {
    gutter.scrollTop = textarea.scrollTop;
  });
  // Tab key inserts spaces rather than moving focus, matching a code editor
  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.slice(0, start) + "    " + textarea.value.slice(end);
      textarea.selectionStart = textarea.selectionEnd = start + 4;
      updateLineNumbers(textarea, gutter);
    }
  });

  runBtn.addEventListener("click", async () => {
    output.innerHTML = "Running…";
    statusEl.textContent = "running";
    runBtn.disabled = true;
    try {
      const result = await PythonRunner.run(textarea.value);
      output.innerHTML = result.ok
        ? escapeHtml(result.output || "(no output)")
        : `<span class="err">${escapeHtml(result.output)}</span>`;
      statusEl.textContent = result.ok ? "finished" : "error";
    } catch (err) {
      output.innerHTML = `<span class="err">${escapeHtml(String(err))}</span>`;
      statusEl.textContent = "error";
    }
    runBtn.disabled = false;
  });

  testBtn.addEventListener("click", async () => {
    if (!challenge.tests || challenge.tests.length === 0) {
      testResultsEl.innerHTML = `<div class="test-row pending">No automated tests for this challenge — run your program manually and compare it to the example.</div>`;
      return;
    }
    testResultsEl.innerHTML = `<div class="test-row pending">Running tests…</div>`;
    testBtn.disabled = true;
    const rows = [];
    for (let i = 0; i < challenge.tests.length; i++) {
      const t = challenge.tests[i];
      try {
        const result = await PythonRunner.run(textarea.value, t.input || []);
        const outLower = (result.output || "").toLowerCase();
        const passed = result.ok && outLower.includes(String(t.expectedContains).toLowerCase());
        rows.push(
          `<div class="test-row ${passed ? "pass" : "fail"}">${passed ? "✓" : "✗"} Test ${i + 1}${passed ? " passed" : " failed — check your output against the hints"}</div>`
        );
      } catch (e) {
        rows.push(`<div class="test-row fail">✗ Test ${i + 1} failed to run</div>`);
      }
    }
    testResultsEl.innerHTML = rows.join("");
    testBtn.disabled = false;
  });

  resetBtn.addEventListener("click", () => {
    textarea.value = `# ${challenge.title}\n# Write your solution below.\n\n`;
    updateLineNumbers(textarea, gutter);
    ProgressStore.saveCode(challenge.id, textarea.value);
  });

  clearBtn.addEventListener("click", () => {
    output.textContent = "";
    testResultsEl.innerHTML = "";
    statusEl.textContent = "";
  });
}

function wireSolution(challenge) {
  const gate = document.getElementById("solution-gate");
  const block = document.getElementById("solution-block");
  const btn = document.getElementById("show-solution-btn");
  if (ProgressStore.hasViewedSolution(challenge.id)) {
    gate.classList.add("hidden");
    block.classList.add("visible");
  }
  btn.addEventListener("click", () => {
    ProgressStore.markSolutionViewed(challenge.id);
    gate.classList.add("hidden");
    block.classList.add("visible");
  });
}

function wireCompletion(challenge) {
  const btn = document.getElementById("complete-btn");
  const statusText = document.getElementById("completion-status");
  btn.addEventListener("click", () => {
    const nowComplete = ProgressStore.toggleComplete(challenge.id);
    statusText.textContent = nowComplete ? "✓ Marked complete" : "Not yet marked complete";
    btn.textContent = nowComplete ? "Unmark Complete" : "Mark as Complete";
    btn.classList.toggle("btn-primary", !nowComplete);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initChallengeListPage();
  initChallengeDetailPage();
});
