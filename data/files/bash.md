```markdown
# Bash Scripting Basics

Bash scripting is a powerful way to automate tasks in a Unix-like environment. Here's a rundown of the basics:

## 1. Shebang (`#!`)

* The shebang line at the beginning of a script tells the system which interpreter to use.
* For Bash, it's typically `#!/bin/bash`.

```bash
#!/bin/bash
```

## 2. Comments

* Comments start with `#`.
* Bash ignores everything after `#` on a line.

```bash
#!/bin/bash
# This is a comment.
```

## 3. Variables

* Variables store data.
* No spaces around `=`.
* To access a variable's value, use `$variable_name` or `${variable_name}`. The curly braces are useful for clarity or when concatenating variables.

```bash
#!/bin/bash

name="John Doe"
echo "Hello, $name!"

number=10
result=$((number * 2)) #arithmetic expansion
echo "Result: $result"

```

## 4. Input/Output

* `echo` prints output to the console.
* `read` reads input from the user.

```bash
#!/bin/bash

echo "Enter your name:"
read user_name
echo "Hello, $user_name!"
```

## 5. Conditional Statements (`if`, `elif`, `else`)

* `if` statements execute code based on a condition.
* `elif` (else if) provides additional conditions.
* `else` executes if no other condition is met.
* `[ ... ]` or `[[ ... ]]` are used for conditional expressions. `[[ ... ]]` is generally preferred as it is more robust.
* `then` and `fi` delimit the `if` block.
* Common operators: `-eq` (equal), `-ne` (not equal), `-gt` (greater than), `-lt` (less than), `-ge` (greater than or equal), `-le` (less than or equal), `-z` (string is empty), `-n` (string is not empty), `==` (string equal), `!=` (string not equal), `-f`(file exists), `-d`(directory exists).

```bash
#!/bin/bash

age=20

if [[ $age -ge 18 ]]; then
  echo "You are an adult."
elif [[ $age -lt 13 ]]; then
  echo "You are a child."
else
  echo "You are a teenager."
fi
```

## 6. Loops (`for`, `while`, `until`)

* `for` loops iterate over a list of items.
* `while` loops execute code while a condition is true.
* `until` loops execute code until a condition is true.

```bash
#!/bin/bash

# for loop
for i in 1 2 3 4 5; do
  echo "Number: $i"
done

# while loop
count=0
while [[ $count -lt 3 ]]; do
  echo "Count: $count"
  count=$((count + 1))
done

# until loop
counter=5
until [[ $counter -eq 0 ]]; do
  echo "Counter: $counter"
  counter=$((counter -1))
done
```

## 7. Functions

* Functions group code for reuse.

```bash
#!/bin/bash

greet() {
  echo "Hello, $1!" # $1 is the first argument passed to the function
}

greet "Alice"
greet "Bob"
```

## 8. Command Substitution

* `$(command)` or `` `command` `` executes a command and substitutes its output.
* `$(command)` is preferred over backticks.

```bash
#!/bin/bash

date_output=$(date)
echo "Current date: $date_output"

files=$(ls *.txt)
echo "Text files: $files"
```

## 9. Positional Parameters

* `$0` is the script's name.
* `$1`, `$2`, etc., are arguments passed to the script.
* `$#` is the number of arguments.
* `$@` or `$*` represents all arguments.

```bash
#!/bin/bash

echo "Script name: $0"
echo "First argument: $1"
echo "Second argument: $2"
echo "Number of arguments: $#"
echo "All arguments: $@"
```

## 10. File Operations

* `touch`: Create empty files.
* `mkdir`: Create directories.
* `rm`: Remove files or directories.
* `cp`: Copy files or directories.
* `mv`: Move or rename files or directories.
* `cat`: Display file content.
* `grep`: Search for patterns in files.
* `sed`: Stream editor for text manipulation.
* `awk`: Text processing tool.

```bash
#!/bin/bash

touch myfile.txt
echo "This is some text" > myfile.txt
cat myfile.txt
mkdir mydir
mv myfile.txt mydir/
```

## 11. Exit Codes

* `exit 0` indicates success.
* `exit 1` or any non-zero value indicates an error.
* `$?` holds the exit code of the last executed command.

```bash
#!/bin/bash

ls non_existent_file.txt

if [[ $? -ne 0 ]]; then
  echo "Error: File not found."
  exit 1
fi

echo "File found."
exit 0
```

## 12. Debugging

* `bash -x script.sh` enables tracing (displays each command before execution).
* `set -x` inside the script enables tracing from that point onward.
* `set +x` disables tracing.

```bash
#!/bin/bash -x # or set -x

echo "This is for debugging"
```

```markdown
# Advanced Bash Scripting Techniques

Building upon the basics, here are some advanced Bash scripting techniques:

## 1. Arrays

* Arrays store multiple values in a single variable.
* Indexed arrays use numerical indices (starting from 0).
* Associative arrays use string keys (available in Bash 4.0+).

```bash
#!/bin/bash

# Indexed array
fruits=("apple" "banana" "cherry")
echo "${fruits[0]}"  # Accessing the first element
echo "${fruits[@]}"  # Accessing all elements
echo "${#fruits[@]}" # get the length of the array

# Associative array (Bash 4.0+)
declare -A colors
colors["apple"]="red"
colors["banana"]="yellow"
echo "${colors["apple"]}"
echo "${!colors[@]}" # get the keys of the associative array
echo "${colors[@]}" #get the values of the associative array
```

## 2. Regular Expressions

* `grep`, `sed`, and `awk` use regular expressions for pattern matching.
* Bash itself supports regular expressions using `[[ ... =~ ... ]]`.

```bash
#!/bin/bash

string="hello world 123"

if [[ "$string" =~ [0-9]+ ]]; then
  echo "String contains numbers."
fi

# Example using grep
grep -E "[a-z]+" file.txt

#Example using sed
sed 's/[0-9]*/REPLACED/g' file.txt

#Example using awk
awk '/pattern/{print $1}' file.txt
```

## 3. Signal Handling

* Scripts can respond to signals (e.g., Ctrl+C, termination).
* `trap` command sets signal handlers.

```bash
#!/bin/bash

cleanup() {
  echo "Cleaning up..."
  # Perform cleanup tasks here
  exit 1
}

trap cleanup SIGINT SIGTERM #Trap keyboard interrupt and termination signals.

while true; do
  echo "Running..."
  sleep 1
done
```

## 4. Input Validation

* Validate user input to prevent errors.
* Use regular expressions or conditional statements.

```bash
#!/bin/bash

read -p "Enter a number: " number

if [[ ! "$number" =~ ^[0-9]+$ ]]; then
  echo "Invalid input. Please enter a number."
  exit 1
fi

echo "You entered: $number"
```

## 5. Process Substitution

* `<(command)` or `>(command)` substitutes the output or input of a command as a file.
* Useful for comparing or processing command outputs.

```bash
#!/bin/bash

diff <(ls file1.txt) <(ls file2.txt)
```

## 6. Here Documents and Here Strings

* Here documents (`<<`) pass multi-line input to a command.
* Here strings (`<<<`) pass a single string to a command.

```bash
#!/bin/bash

# Here document
cat <<EOF
This is a multi-line
input to cat.
EOF

# Here string
grep "pattern" <<< "This is a test string."
```

## 7. Shell Options (`set`)

* `set` command modifies shell behavior.
* `set -u` (treat unset variables as errors).
* `set -e` (exit immediately if a command fails).
* `set -o pipefail` (make a pipeline fail if any command in it fails).

```bash
#!/bin/bash

set -euo pipefail #good practice.

undefined_variable="test"

echo "The variable is $undefined_variable"

ls non_existant_file | grep test

echo "This line will not be reached if the ls or grep command fails"

```

## 8. Coprocesses

* Coprocesses run a command in the background and allow two-way communication.
* Useful for interactive commands.

```bash
#!/bin/bash

coproc my_command {
  read -r line
  echo "Received: $line"
  echo "Reply from bash" >&${my_command[1]}
}

echo "Hello from Bash" >&${my_command[1]}
read -r reply <&${my_command[0]}
echo "Reply: $reply"
```

## 9. Parameter Expansion

* Bash provides advanced parameter expansion features.
* `${variable:offset:length}` (substring extraction).
* `${variable#pattern}` (remove prefix).
* `${variable%pattern}` (remove suffix).
* `${variable/pattern/replacement}` (replace pattern).

```bash
#!/bin/bash

string="hello world"
echo "${string:6:5}"  # world
echo "${string#hello }" # world
echo "${string% world}" # hello
echo "${string/world/universe}" # hello universe
```

## 10. Debugging with `declare -p` and `compgen`

* `declare -p` can display the attributes and value of variables, including arrays and associative arrays. This is helpful for examining internal state.
* `compgen` can generate possible completions, useful for examining available commands, aliases, and functions.

```bash
#!/bin/bash

my_array=("one" "two" "three")
declare -p my_array

compgen -c # List all commands.
compgen -a #List all aliases.
compgen -A #List all array variable names.
compgen -b #List all built in commands.
```

These advanced techniques empower you to write more robust and efficient Bash scripts for complex automation tasks.
```

```
