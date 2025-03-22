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
