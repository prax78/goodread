### Summary of Useful `itertools` Functions

#### 1. `count()`
Generates an infinite sequence of numbers, starting from a given value.
```python
import itertools
counter = itertools.count(start=10, step=2)
for i in range(5):
    print(next(counter))
```

#### 2. `cycle()`
Cycles through elements of an iterable indefinitely.
```python
import itertools
cycler = itertools.cycle([1, 2, 3])
for _ in range(10):
    print(next(cycler))
```

#### 3. `repeat()`
Repeats a single value indefinitely or a specified number of times.
```python
import itertools
repeater = itertools.repeat('A')
for _ in range(5):
    print(next(repeater))
```
Limited repetition:
```python
limited_repeater = itertools.repeat('B', 4)
for value in limited_repeater:
    print(value)
```

#### 4. `combinations()`
Generates all possible combinations of a specified length.
```python
import itertools
comb = itertools.combinations([1, 2, 3], 2)
for c in comb:
    print(c)
```

#### 5. `permutations()`
Generates all possible permutations of a specified length.
```python
import itertools
perm = itertools.permutations([1, 2, 3], 2)
for p in perm:
    print(p)
```

#### 6. `product()`
Generates the Cartesian product of input iterables.
```python
import itertools
prod = itertools.product([1, 2], ['A', 'B'])
for p in prod:
    print(p)
```

#### 7. `chain()`
Chains multiple iterables together into a single iterator.
```python
import itertools
ch = itertools.chain([1, 2, 3], ['A', 'B', 'C'])
for item in ch:
    print(item)
```

#### 8. `compress()`
Filters elements from one iterable based on the values from another iterable.
```python
import itertools
comp = itertools.compress(['A', 'B', 'C', 'D'], [1, 0, 1, 0])
for c in comp:
    print(c)
```

#### 9. `accumulate()`
Returns accumulated sums or results of other binary functions.
```python
import itertools
acc = itertools.accumulate([1, 2, 3, 4])
for a in acc:
    print(a)
```

#### 10. `groupby()`
Groups consecutive elements that have the same key.
```python
import itertools
grp = itertools.groupby([1, 1, 2, 2, 3, 3, 3])
for key, group in grp:
    print(key, list(group))
```
The `functools` module in Python is a standard library module that provides higher-order functions for functional programming. Here are the key classes and functions in the `functools` module, along with explanations and examples:



### 1. **`functools.partial`**
This function is used to create a "partial" function where some arguments are pre-filled.

**Example:**
```python
from functools import partial

def multiply(x, y):
    return x * y

double = partial(multiply, y=2)
print(double(5))  # Output: 10
```
**Explanation:** The `double` function multiplies the input by 2 because `y` is pre-filled.

---

### 2. **`functools.reduce`**
Applies a function cumulatively to the items of an iterable, reducing it to a single value.

**Example:**
```python
from functools import reduce

numbers = [1, 2, 3, 4]
result = reduce(lambda x, y: x * y, numbers)
print(result)  # Output: 24
```
**Explanation:** The `reduce` function multiplies all elements in the list.

---

### 3. **`functools.lru_cache`**
Adds caching to a function to improve performance for expensive or frequently called operations.

**Example:**
```python
from functools import lru_cache

@lru_cache(maxsize=32)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))  # Output: 55
```
**Explanation:** The `lru_cache` decorates the `fibonacci` function to cache its results.

---

### 4. **`functools.singledispatch`**
Creates a single-dispatch generic function, allowing you to define behavior for different types.

**Example:**
```python
from functools import singledispatch

@singledispatch
def process(arg):
    print(f"Default: {arg}")

@process.register(int)
def _(arg):
    print(f"Integer: {arg}")

@process.register(str)
def _(arg):
    print(f"String: {arg}")

process(42)        # Output: Integer: 42
process("Hello")   # Output: String: Hello
process(3.14)      # Output: Default: 3.14
```
**Explanation:** The `singledispatch` function dispatches based on the argument type.

---

### 5. **`functools.wraps`**
A decorator used to preserve metadata when wrapping a function with another function.

**Example:**
```python
from functools import wraps

def decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@decorator
def greet(name):
    return f"Hello, {name}!"

print(greet("Prakash"))  # Output: "Calling greet", "Hello, Prakash!"
```
**Explanation:** The `wraps` decorator helps retain the original function's metadata, such as its name.

---

### Other Functions
- **`functools.cmp_to_key`**: Converts a comparison function to a key function for sorting.
- **`functools.total_ordering`**: Simplifies the creation of rich comparison methods in a class.

Absolutely! Let's dive into each class from the `collections` module with illustrative code snippets.

**1. `namedtuple()`**

```python
from collections import namedtuple

# Define a namedtuple 'Point' with fields 'x' and 'y'
Point = namedtuple('Point', ['x', 'y'])

# Create instances of Point
p1 = Point(11, 22)
p2 = Point(x=33, y=44)

# Access fields by name
print(p1.x, p1.y)  # Output: 11 22
print(p2.x, p2.y)  # Output: 33 44

# Access fields by index (like a regular tuple)
print(p1[0], p1[1]) # Output: 11 22

#Named tuples are immutable.
#p1.x = 5 #This will cause an error.
```

**2. `deque` (Double-Ended Queue)**

```python
from collections import deque

# Create a deque
d = deque(['a', 'b', 'c'])

# Append and appendleft
d.append('d')
d.appendleft('e')
print(d)  # Output: deque(['e', 'a', 'b', 'c', 'd'])

# Pop and popleft
print(d.pop())  # Output: d
print(d.popleft()) # Output: e
print(d)  # Output: deque(['a', 'b', 'c'])

# Rotate
d.rotate(1) #Rotate right one position.
print(d) #Output: deque(['c', 'a', 'b'])

d.rotate(-1) #Rotate left one position.
print(d) #Output: deque(['a', 'b', 'c'])

```

**3. `ChainMap`**

```python
from collections import ChainMap

# Create two dictionaries
dict1 = {'a': 1, 'b': 2}
dict2 = {'b': 3, 'c': 4}

# Create a ChainMap
chain = ChainMap(dict1, dict2)

# Access values
print(chain['a'])  # Output: 1 (from dict1)
print(chain['b'])  # Output: 2 (from dict1, since it's searched first)
print(chain['c'])  # Output: 4 (from dict2)

# Modify the first dictionary
dict1['b'] = 5
print(chain['b'])  # Output: 5 (reflects the change in dict1)

#Add a new dictionary to the front of the chain.
dict3 = {'a': 10, 'd': 11}
new_chain = chain.new_child(dict3)
print(new_chain['a']) #Output: 10
print(new_chain['d']) #Output: 11

```

**4. `Counter`**

```python
from collections import Counter

# Count occurrences of elements in a list
data = ['a', 'b', 'c', 'a', 'b', 'a', 'd']
counter = Counter(data)

print(counter)  # Output: Counter({'a': 3, 'b': 2, 'c': 1, 'd': 1})

# Most common elements
print(counter.most_common(2))  # Output: [('a', 3), ('b', 2)]

# Access counts
print(counter['a'])  # Output: 3

#Update the counter.
counter.update(['a', 'e'])
print(counter) #Output: Counter({'a': 4, 'b': 2, 'c': 1, 'd': 1, 'e': 1})

```

**5. `OrderedDict`**

```python
from collections import OrderedDict

# Create an OrderedDict
ordered_dict = OrderedDict()
ordered_dict['a'] = 1
ordered_dict['b'] = 2
ordered_dict['c'] = 3

# Iterate and print items (maintains insertion order)
for key, value in ordered_dict.items():
    print(key, value)
# Output:
# a 1
# b 2
# c 3

#Pop items in LIFO order
print(ordered_dict.popitem()) #Output: ('c', 3)
print(ordered_dict) #Output: OrderedDict([('a', 1), ('b', 2)])

```

**6. `defaultdict`**

```python
from collections import defaultdict

# Create a defaultdict with a default value of list
default_dict = defaultdict(list)

# Append values to lists based on keys
data = [('a', 1), ('b', 2), ('a', 3), ('c', 4)]
for key, value in data:
    default_dict[key].append(value)

print(default_dict)  # Output: defaultdict(<class 'list'>, {'a': [1, 3], 'b': [2], 'c': [4]})

#Access a nonexistant key.
print(default_dict['d']) #Output: [] Because a list was the default.

#Create a defaultdict with a default value of int.
default_int_dict = defaultdict(int)
words = ['one','two','one','three']

for word in words:
    default_int_dict[word]+=1

print(default_int_dict) #Output: defaultdict(<class 'int'>, {'one': 2, 'two': 1, 'three': 1})
```

These code snippets should give you a solid understanding of how to use each class from the `collections` module.
