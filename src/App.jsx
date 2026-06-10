import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// ─── COLOR THEME ──────────────────────────────────────────────────────────────
const T = {
  bg:       "#0a0f0a",   // deep forest black
  surface:  "#111811",   // dark green-tinted surface
  card:     "#162016",   // card background
  border:   "#2a3d2a",   // green-tinted border
  muted:    "#4a6e4a",   // muted green text
  text:     "#d4edda",   // soft green-white text
  heading:  "#a8ff78",   // bright lime accent
  accent:   "#56e39f",   // mint green
  gold:     "#ffd166",   // warm amber/gold
  blue:     "#06d6a0",   // teal
  red:      "#ff6b6b",   // coral red
  purple:   "#c77dff",   // soft purple
};

// ─── Quick Review Markdown ────────────────────────────────────────────────────
const quickReviewMD = `# 🐍 Python DSA — Quick Review Notes
> Cover all 35 topics. Read in ~15 min.

---

## 🟢 PYTHON BASICS (Topics 1–8)

### 1. Variables & Data Types
- Python is dynamically typed — no need to declare types.
- Core types: \`int\`, \`float\`, \`str\`, \`bool\`, \`NoneType\`
- Type casting: \`int("5")\`, \`str(42)\`, \`float("3.14")\`

### 2. Lists
- Mutable ordered sequence: \`nums = [1, 2, 3]\`
- Index: \`nums[0]\`, Slice: \`nums[1:3]\`, Append: \`nums.append(4)\`
- List comprehension: \`[x*2 for x in nums]\`

### 3. Tuples & Sets
- Tuple: immutable list \`(1, 2, 3)\` — use when data shouldn't change.
- Set: unordered unique elements \`{1, 2, 3}\` — O(1) lookup.

### 4. Dictionaries
- Key-value store: \`d = {"name": "Alice", "age": 22}\`
- Access: \`d["name"]\`, Get: \`d.get("key", default)\`
- Dict comprehension: \`{k: v for k, v in items}\`

### 5. Functions
- \`def greet(name, greeting="Hello"): return f"{greeting}, {name}!"\`
- \`*args\` for variable positional, \`**kwargs\` for variable keyword args.
- Lambda: \`square = lambda x: x**2\`

### 6. OOP Basics
- Class, \`__init__\`, instance methods, \`self\`.
- Inheritance: \`class Dog(Animal):\`
- Special methods: \`__str__\`, \`__repr__\`, \`__len__\`

### 7. Recursion
- Function calling itself with a base case to stop.
- \`factorial(n) = n * factorial(n-1)\`, base: \`factorial(0) = 1\`
- Each call adds a frame to the call stack.

### 8. Complexity (Big-O)
- O(1) → constant, O(log n) → binary search, O(n) → linear scan
- O(n log n) → merge sort, O(n²) → nested loops, O(2ⁿ) → brute recursion

---

## 🟡 DATA STRUCTURES (Topics 9–20)

### 9. Arrays / Lists
- Random access O(1), insert/delete O(n), append O(1) amortized.
- Two pointer, sliding window — core patterns.

### 10. Strings
- Immutable in Python. Slicing, join, split, strip, replace.
- Pattern: reverse \`s[::-1]\`, palindrome check, anagram check.

### 11. Stack
- LIFO. Python list as stack: \`append()\` push, \`pop()\` pop.
- Use: balanced parentheses, function call stack, undo operations.

### 12. Queue
- FIFO. Use \`collections.deque\` for O(1) operations.
- BFS traversal, task scheduling, sliding window max.

### 13. Linked List
- Nodes with \`val\` and \`next\`. No random access — O(n) search.
- Reverse, detect cycle (Floyd's algorithm), find middle (slow/fast pointer).

### 14. Hash Map / Hash Set
- Average O(1) insert/lookup. Python's \`dict\` and \`set\`.
- Use: frequency count, two-sum, anagram groups, caching.

### 15. Binary Tree
- Each node has at most 2 children. Root, leaf, height.
- Traversals: Inorder (Left-Root-Right), Preorder, Postorder.

### 16. Binary Search Tree (BST)
- Left < Root < Right for all nodes. Search/Insert O(log n) average.
- Inorder traversal gives sorted order.

### 17. Heap / Priority Queue
- Min-heap: smallest at top. Python's \`heapq\` module.
- Use: K largest/smallest elements, Dijkstra's, merge sorted lists.

### 18. Trie
- Prefix tree. O(L) insert and search where L = word length.
- Use: autocomplete, spell check, prefix matching.

### 19. Graph (Adjacency List)
- Vertices + edges. Directed/undirected, weighted/unweighted.
- BFS: level order, shortest path (unweighted). DFS: paths, cycles.

### 20. Union-Find (Disjoint Set)
- Track which set each element belongs to. With path compression + rank: nearly O(1).
- Use: cycle detection, number of connected components, Kruskal's MST.

---

## 🔴 ALGORITHMS (Topics 21–35)

### 21. Binary Search
- Sorted array → O(log n). Left/right pointer pattern.
- Variants: search rotated array, find first/last occurrence.

### 22. Two Pointers
- Left and right pointer moving inward. O(n). 
- Use: two-sum sorted, remove duplicates, container with most water.

### 23. Sliding Window
- Expand/shrink a window over array/string. O(n).
- Use: max sum subarray of size k, longest substring without repeat.

### 24. Recursion & Backtracking
- Try → recurse → undo. Prune with constraints.
- Use: permutations, subsets, N-Queens, Sudoku solver.

### 25. Merge Sort
- Divide → sort halves → merge. O(n log n) guaranteed.
- Stable sort. Used in external sorting.

### 26. Quick Sort
- Pivot → partition → recurse. O(n log n) avg, O(n²) worst.
- In-place. QuickSelect for Kth element in O(n) avg.

### 27. BFS (Breadth-First Search)
- Level by level using a queue. O(V + E).
- Shortest path in unweighted graph, level order traversal.

### 28. DFS (Depth-First Search)
- Go deep first using stack/recursion. O(V + E).
- Connected components, cycle detection, topological sort.

### 29. Dynamic Programming (DP)
- Break into subproblems, store results (memoization/tabulation).
- Identify: optimal substructure + overlapping subproblems.
- Classic: Fibonacci, coin change, longest common subsequence.

### 30. Greedy Algorithms
- Make locally optimal choice at each step. No backtracking.
- Use: activity selection, Huffman coding, Kruskal's MST, interval scheduling.

### 31. Topological Sort
- Linear ordering of vertices in a DAG. Uses DFS or Kahn's (BFS).
- Use: task scheduling, course prerequisites, build systems.

### 32. Dijkstra's Algorithm
- Shortest path in weighted graph (non-negative weights). O((V+E) log V).
- Uses min-heap. Greedy approach.

### 33. Divide and Conquer
- Split problem → solve halves → combine. O(n log n) typical.
- Examples: merge sort, quick sort, matrix multiplication.

### 34. Bit Manipulation
- XOR: \`a ^ b\`, AND: \`a & b\`, OR: \`a | b\`, NOT: \`~a\`, Shift: \`<<\` \`>>\`
- Find single number (XOR), check power of 2 \`(n & n-1) == 0\`.

### 35. Interview Patterns
- Fast/Slow pointer (cycle detection), Monotonic stack, Prefix sums.
- Know when to use each: frequency → HashMap, ordering → sort+2ptr.

---
*Basics 1–8 → Data Structures 9–20 → Algorithms 21–35*
`;

// ─── BASICS Topics 1–8 ───────────────────────────────────────────────────────
const basicTopics = [
  {
    id: 1, emoji: "🐍", title: "Variables & Data Types", color: T.accent,
    theory: [
      "Python is dynamically typed — variables get their type when you assign a value, no declaration needed.",
      "Core built-in types: int (whole numbers), float (decimals), str (text), bool (True/False), and NoneType (None).",
      "You can check a variable's type with type(x) and convert between types using int(), float(), str(), bool().",
      "Python uses duck typing: if it walks like a duck and quacks like a duck, it's a duck. Type only matters at runtime.",
    ],
    notes: [
      "Variable names are case-sensitive: count and Count are different variables.",
      "Use snake_case for variable names: my_variable, not myVariable.",
      "int overflow doesn't exist in Python — integers can be arbitrarily large.",
      "None is Python's null — check with `is None`, not `== None`.",
      "f-strings (f'Hello {name}') are the modern way to format strings — prefer over .format() or %.",
    ],
    code: `# Basic variable assignment — no type declaration needed
name = "Alice"
age = 22
height = 5.7
is_student = True
nothing = None

# Type checking and conversion
print(type(age))           # <class 'int'>
print(type(name))          # <class 'str'>
print(int("42"))           # 42
print(float("3.14"))       # 3.14
print(str(100))            # "100"
print(bool(0))             # False
print(bool("hello"))       # True

# f-strings — modern string formatting
greeting = f"My name is {name} and I am {age} years old."
print(greeting)

# Multiple assignment
x, y, z = 1, 2, 3
a = b = c = 0

# Constants (by convention, ALL_CAPS)
MAX_SIZE = 100
PI = 3.14159`,
  },
  {
    id: 2, emoji: "📋", title: "Lists", color: T.gold,
    theory: [
      "A list is an ordered, mutable (changeable) sequence of items. Items can be of any type and can be mixed.",
      "Lists use zero-based indexing: first element is index 0. Negative indices count from the end: -1 is the last element.",
      "Slicing gives you a sublist: nums[start:stop:step]. The stop index is excluded.",
      "List comprehension is a concise, Pythonic way to create lists: [expression for item in iterable if condition].",
    ],
    notes: [
      "append() adds to end — O(1). insert(i, val) adds at index i — O(n). pop() removes last — O(1). pop(i) — O(n).",
      "len(list) → size. list.sort() sorts in place. sorted(list) returns new sorted list.",
      "list.count(val) counts occurrences. list.index(val) returns first index of val.",
      "'in' operator checks membership: 5 in nums — O(n) for lists. Use set for O(1) lookup.",
      "Lists are passed by reference — modifying inside a function changes the original.",
    ],
    code: `# Creating lists
nums = [3, 1, 4, 1, 5, 9, 2, 6]
mixed = [1, "hello", 3.14, True, None]
empty = []

# Indexing and slicing
print(nums[0])       # 3 — first element
print(nums[-1])      # 6 — last element
print(nums[2:5])     # [4, 1, 5] — index 2 to 4
print(nums[::-1])    # reverse the list
print(nums[::2])     # every other element

# Common operations
nums.append(7)       # add to end
nums.insert(0, 0)    # insert 0 at index 0
nums.pop()           # remove and return last
nums.remove(1)       # remove first occurrence of 1
nums.sort()          # sort in place
nums.reverse()       # reverse in place

# List comprehension — Pythonic!
squares = [x**2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
flat = [val for row in [[1,2],[3,4]] for val in row]

# Useful built-ins
print(len(nums))     # length
print(sum(nums))     # sum
print(max(nums))     # max value
print(min(nums))     # min value
print(sorted(nums))  # sorted copy (original unchanged)`,
  },
  {
    id: 3, emoji: "🔒", title: "Tuples & Sets", color: T.purple,
    theory: [
      "A tuple is an immutable ordered sequence. Once created, you can't change its elements. Use for fixed data.",
      "Tuples are faster than lists and can be used as dictionary keys (since they're hashable).",
      "A set is an unordered collection of unique elements. No duplicates allowed. Backed by a hash table.",
      "Sets provide O(1) average time for add, remove, and membership testing — much faster than lists for lookup.",
    ],
    notes: [
      "Create a tuple: t = (1, 2, 3) or just t = 1, 2, 3. Single-element tuple needs a trailing comma: (5,).",
      "Tuple unpacking: a, b, c = (1, 2, 3) — clean and Pythonic.",
      "Set operations: union (|), intersection (&), difference (-), symmetric difference (^).",
      "frozenset is an immutable set — can be used as a dict key.",
      "Use a set when you need fast membership check and don't care about order or duplicates.",
    ],
    code: `# TUPLES — immutable ordered sequences
point = (3, 7)
rgb = (255, 128, 0)
single = (42,)      # note the comma!

# Tuple unpacking
x, y = point
a, b, *rest = (1, 2, 3, 4, 5)
print(a, b, rest)   # 1 2 [3, 4, 5]

# Swap using tuples (classic Python trick)
a, b = b, a

# SETS — unordered unique elements
s = {1, 2, 3, 2, 1}   # {1, 2, 3} — duplicates removed
empty_set = set()      # NOT {} — that's an empty dict!

# Set operations
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}
print(A | B)   # union: {1,2,3,4,5,6}
print(A & B)   # intersection: {3,4}
print(A - B)   # difference: {1,2}
print(A ^ B)   # symmetric diff: {1,2,5,6}

# Fast membership check — O(1) vs O(n) for list!
words = {"apple", "banana", "cherry"}
print("apple" in words)    # True — O(1)

# Remove duplicates from a list
nums = [1, 2, 2, 3, 3, 3, 4]
unique = list(set(nums))   # order NOT preserved!`,
  },
  {
    id: 4, emoji: "📖", title: "Dictionaries", color: T.blue,
    theory: [
      "A dictionary maps keys to values. Keys must be unique and hashable (strings, ints, tuples).",
      "Python dicts maintain insertion order (since Python 3.7+). Under the hood, they're hash tables.",
      "Average O(1) time for get, set, and delete — making dicts extremely useful for counting, caching, and grouping.",
      "Nested dicts and dict comprehensions make complex data structures easy to build.",
    ],
    notes: [
      "d[key] raises KeyError if key missing. d.get(key, default) returns default instead — safer.",
      "d.keys(), d.values(), d.items() return view objects — efficient, reflect changes to dict.",
      "Iterate: for k, v in d.items(): — this is the Pythonic way.",
      "Counter from collections is a specialized dict for counting frequencies.",
      "defaultdict(list) auto-creates a list for new keys — great for grouping.",
    ],
    code: `# Creating dictionaries
person = {"name": "Alice", "age": 22, "city": "Delhi"}
empty = {}
from_pairs = dict([("a", 1), ("b", 2)])

# Access and modification
print(person["name"])           # "Alice"
print(person.get("age"))        # 22
print(person.get("phone", "N/A"))  # "N/A" — safe!
person["email"] = "alice@ex.com"   # add key
del person["city"]                 # delete key
person.update({"age": 23, "job": "Dev"})

# Iterating
for key in person:
    print(key, person[key])
for k, v in person.items():
    print(f"{k}: {v}")

# Dict comprehension
squares = {x: x**2 for x in range(1, 6)}
# {1:1, 2:4, 3:9, 4:16, 5:25}

# Frequency count — very common pattern!
from collections import Counter, defaultdict
text = "mississippi"
freq = Counter(text)  # Counter({'s':4,'i':4,'p':2,'m':1})

# Group by — defaultdict pattern
from collections import defaultdict
words = ["apple", "ant", "banana", "bear", "cat"]
grouped = defaultdict(list)
for w in words:
    grouped[w[0]].append(w)
# {'a': ['apple', 'ant'], 'b': ['banana', 'bear'], 'c': ['cat']}`,
  },
  {
    id: 5, emoji: "⚙️", title: "Functions & Lambda", color: "#ff9f43",
    theory: [
      "Functions are defined with def. They let you reuse logic, make code readable, and divide complex problems.",
      "Parameters can have default values, and you can pass arguments by name (keyword arguments).",
      "*args collects extra positional arguments into a tuple. **kwargs collects extra keyword arguments into a dict.",
      "Lambda creates a small anonymous function inline: lambda x, y: x + y. Best for simple one-liners.",
    ],
    notes: [
      "Python functions are first-class objects — you can pass them as arguments, return them, store in variables.",
      "Mutable default arguments (like lists) are shared across calls — a common bug. Use None instead.",
      "Closures: inner functions remember variables from enclosing scope even after the outer function returns.",
      "Use functools.lru_cache or @cache for memoization — speeds up recursive functions dramatically.",
      "Generators (yield) produce values lazily — memory efficient for large sequences.",
    ],
    code: `# Basic function with defaults
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("Alice"))           # "Hello, Alice!"
print(greet("Bob", "Hi"))       # "Hi, Bob!"
print(greet(greeting="Hey", name="Carol"))  # keyword args

# *args and **kwargs
def log(*args, **kwargs):
    print("Args:", args)
    print("Kwargs:", kwargs)

log(1, 2, 3, name="Alice", age=22)

# Lambda — anonymous function
square = lambda x: x**2
add = lambda x, y: x + y

# Used with sorted(), map(), filter()
names = ["Alice", "Bob", "Charlie", "Dave"]
sorted_by_len = sorted(names, key=lambda x: len(x))

nums = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x*2, nums))
evens = list(filter(lambda x: x%2==0, nums))

# Memoization with decorator
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

# Generator function (memory efficient)
def infinite_counter(start=0):
    n = start
    while True:
        yield n
        n += 1`,
  },
  {
    id: 6, emoji: "🏛️", title: "OOP (Classes & Objects)", color: T.red,
    theory: [
      "A class is a blueprint. An object is an instance created from that blueprint.",
      "__init__ is the constructor — called automatically when you create an object. It sets up the initial state.",
      "self refers to the current instance. All instance methods must have self as the first parameter.",
      "Inheritance lets a class inherit attributes and methods from a parent class, enabling code reuse.",
    ],
    notes: [
      "__str__ defines str(obj) and print(obj). __repr__ defines repr(obj) — use for debugging.",
      "__len__, __getitem__, __iter__ make objects behave like built-in types (duck typing).",
      "@property turns a method into an attribute — no parentheses when calling.",
      "@staticmethod doesn't use self or cls. @classmethod uses cls — useful for factory methods.",
      "super() calls the parent class method — essential in inheritance chains.",
    ],
    code: `class Animal:
    species_count = 0  # class variable (shared)

    def __init__(self, name, sound):
        self.name = name       # instance variable
        self.sound = sound
        Animal.species_count += 1

    def speak(self):
        return f"{self.name} says {self.sound}!"

    def __str__(self):
        return f"Animal({self.name})"

    def __repr__(self):
        return f"Animal(name={self.name!r}, sound={self.sound!r})"

# Inheritance
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Woof")  # call parent __init__
        self.breed = breed

    def fetch(self):
        return f"{self.name} fetches the ball!"

    def speak(self):  # method override
        return f"{super().speak()} (tail wagging)"

# Usage
a = Animal("Cat", "Meow")
d = Dog("Rex", "Labrador")
print(a.speak())        # "Cat says Meow!"
print(d.speak())        # "Rex says Woof! (tail wagging)"
print(d.fetch())        # "Rex fetches the ball!"
print(Animal.species_count)  # 2

# Dataclass — modern Python OOP shortcut
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

    def distance(self):
        return (self.x**2 + self.y**2)**0.5

p = Point(3, 4)
print(p.distance())  # 5.0`,
  },
  {
    id: 7, emoji: "🔄", title: "Recursion", color: T.accent,
    theory: [
      "Recursion is when a function calls itself to solve a smaller version of the same problem.",
      "Every recursive function needs a base case (the stopping condition) and a recursive case.",
      "Python's default recursion limit is 1000. Use sys.setrecursionlimit() or convert to iteration if needed.",
      "The call stack grows with each recursive call. Too many calls → RecursionError (stack overflow).",
    ],
    notes: [
      "Think: what is the simplest version of this problem? That's your base case.",
      "Draw the recursion tree to understand time complexity: nodes = function calls.",
      "Tail recursion (recursive call is the last operation) can be optimized, but Python doesn't do this natively.",
      "Memoization turns exponential recursive algorithms into linear ones by caching results.",
      "Recursive problems: Fibonacci, factorial, tree traversals, flood fill, permutations, subsets.",
    ],
    code: `import sys
sys.setrecursionlimit(10000)

# Factorial — classic example
def factorial(n):
    if n == 0:      # base case
        return 1
    return n * factorial(n - 1)  # recursive case

# Fibonacci — exponential without memoization!
def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n-1) + fib_naive(n-2)  # O(2^n) — slow!

# Fibonacci with memoization — O(n)
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

# Power (x^n) — divide and conquer recursion
def power(x, n):
    if n == 0:      # base case
        return 1
    if n % 2 == 0:  # even: x^n = (x^(n/2))^2
        half = power(x, n // 2)
        return half * half
    return x * power(x, n - 1)

# Recursive sum of a list
def recursive_sum(arr):
    if not arr:      # base case: empty list
        return 0
    return arr[0] + recursive_sum(arr[1:])

# Binary search — recursive version
def binary_search(arr, target, lo, hi):
    if lo > hi:
        return -1
    mid = (lo + hi) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid+1, hi)
    else:
        return binary_search(arr, target, lo, mid-1)`,
  },
  {
    id: 8, emoji: "⏱️", title: "Big-O Complexity", color: T.gold,
    theory: [
      "Big-O notation describes how an algorithm's time (or space) grows as input size n grows.",
      "We care about the worst case (upper bound) and ignore constants and lower-order terms. O(2n) → O(n).",
      "Common complexities in order: O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)",
      "Space complexity works the same way — how much extra memory does the algorithm use?",
    ],
    notes: [
      "O(1): array index, hash map get/set, push/pop from end of list.",
      "O(log n): binary search, balanced BST operations, heap push/pop.",
      "O(n): linear scan, traversing a list/tree, simple loops.",
      "O(n log n): merge sort, heap sort, most efficient comparison-based sorts.",
      "O(n²): nested loops, bubble/insertion/selection sort, brute-force pair comparison.",
    ],
    code: `# O(1) — constant time: doesn't grow with n
def get_first(arr):
    return arr[0]    # always 1 operation

# O(log n) — logarithmic: halves problem each time
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

# O(n) — linear: one pass through n elements
def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

# O(n log n) — merge sort
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]

# O(n²) — quadratic: nested loops
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]`,
  },
];

// ─── DATA STRUCTURES Topics 9–20 ─────────────────────────────────────────────
const dsTopics = [
  {
    id: 9, emoji: "📊", title: "Arrays / Lists (Two Pointer & Sliding Window)", color: T.accent,
    theory: [
      "Arrays (lists in Python) are contiguous memory. Random access O(1), insert/delete in middle O(n).",
      "Two Pointer: use two indices moving toward each other or both moving forward. Reduces O(n²) to O(n).",
      "Sliding Window: maintain a window of elements that slides over the array. Key for subarray/substring problems.",
      "Prefix Sum: precompute cumulative sums so range sum queries are O(1) instead of O(n).",
    ],
    notes: [
      "Two pointer works best on sorted arrays or when you can define a clear pointer movement rule.",
      "Sliding window has two variants: fixed size and variable size (expand/shrink based on condition).",
      "Prefix sums: prefix[i] = arr[0]+...+arr[i]. Sum of arr[l..r] = prefix[r] - prefix[l-1].",
      "In-place operations save O(n) space. Many problems ask you to modify the array without extra memory.",
    ],
    code: `# TWO POINTER — Two Sum (sorted array)
def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        s = nums[left] + nums[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1
        else:
            right -= 1
    return []

# TWO POINTER — Remove Duplicates In Place
def remove_duplicates(nums):
    if not nums:
        return 0
    slow = 0
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    return slow + 1

# SLIDING WINDOW (fixed size) — Max Sum of K elements
def max_sum_k(nums, k):
    window_sum = sum(nums[:k])
    max_sum = window_sum
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)
    return max_sum

# SLIDING WINDOW (variable) — Longest substring no repeats
def length_of_longest_substring(s):
    char_set = set()
    left = max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len

# PREFIX SUM — Range sum query
def build_prefix(arr):
    prefix = [0] * (len(arr) + 1)
    for i, v in enumerate(arr):
        prefix[i+1] = prefix[i] + v
    return prefix

def range_sum(prefix, l, r):  # inclusive [l, r]
    return prefix[r+1] - prefix[l]`,
  },
  {
    id: 10, emoji: "🔤", title: "Strings", color: T.gold,
    theory: [
      "Strings in Python are immutable sequences of Unicode characters. You can't change a character in place.",
      "Most string operations create a new string. This means concatenating in a loop is O(n²) — use ''.join() instead.",
      "Common patterns: palindrome check, anagram detection, character frequency counting, string reversal.",
      "Regular expressions (re module) are powerful for pattern matching but often overkill — know basic string methods first.",
    ],
    notes: [
      "s[::-1] reverses a string. s.lower(), s.upper(), s.strip(), s.split(), s.join() are essential.",
      "Use Counter(s) for frequency analysis — much cleaner than manual dict building.",
      "sorted(s) returns a sorted list of characters — useful for anagram check.",
      "ord('a') → 97, chr(97) → 'a'. Useful for numeric character manipulation.",
      "String formatting: f-strings (f'{x}'), format(), %-formatting (legacy).",
    ],
    code: `from collections import Counter

# Palindrome check
def is_palindrome(s):
    s = s.lower().replace(" ", "")
    return s == s[::-1]

# Anagram check — two strings, same characters
def is_anagram(s, t):
    return Counter(s) == Counter(t)
    # or: return sorted(s) == sorted(t)

# Reverse words in a string
def reverse_words(s):
    return " ".join(s.split()[::-1])

# First non-repeating character
def first_unique_char(s):
    count = Counter(s)
    for i, c in enumerate(s):
        if count[c] == 1:
            return i
    return -1

# Valid parentheses
def is_valid(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for c in s:
        if c in '({[':
            stack.append(c)
        elif c in mapping:
            if not stack or stack[-1] != mapping[c]:
                return False
            stack.pop()
    return not stack

# Longest palindromic substring (expand around center)
def longest_palindrome(s):
    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1; r += 1
        return s[l+1:r]

    result = ""
    for i in range(len(s)):
        odd = expand(i, i)
        even = expand(i, i+1)
        result = max(result, odd, even, key=len)
    return result`,
  },
  {
    id: 11, emoji: "📚", title: "Stack", color: T.purple,
    theory: [
      "A stack is a Last-In-First-Out (LIFO) data structure. The last element pushed is the first one popped.",
      "Python's list works perfectly as a stack: append() to push, pop() to pop, list[-1] to peek.",
      "Stacks are used whenever you need to track 'history' or reverse an order: function calls, undo, bracket matching.",
      "Monotonic stack: maintain a stack that's always increasing or always decreasing — great for 'next greater element' problems.",
    ],
    notes: [
      "All stack operations (push, pop, peek) are O(1). Use list as stack in Python — no need to import anything.",
      "Recognize stack problems: 'evaluate expression', 'valid parentheses', 'backspace string', 'simplify path'.",
      "For min/max stack: maintain a second stack tracking the current min/max at each level.",
      "Iterative DFS uses an explicit stack instead of the call stack (avoids recursion depth limits).",
    ],
    code: `# Stack using Python list
stack = []
stack.append(1)  # push → [1]
stack.append(2)  # push → [1, 2]
stack.append(3)  # push → [1, 2, 3]
print(stack[-1]) # peek → 3
print(stack.pop()) # pop → 3, stack=[1,2]

# PROBLEM: Valid Parentheses
def is_valid(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}
    for c in s:
        if c in "([{":
            stack.append(c)
        elif c in pairs:
            if not stack or stack[-1] != pairs[c]:
                return False
            stack.pop()
    return len(stack) == 0

# PROBLEM: Min Stack — O(1) getMin()
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)
        min_val = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(min_val)

    def pop(self):
        self.stack.pop()
        self.min_stack.pop()

    def get_min(self):
        return self.min_stack[-1]

# PROBLEM: Next Greater Element (Monotonic Stack)
def next_greater(nums):
    result = [-1] * len(nums)
    stack = []  # stores indices
    for i, val in enumerate(nums):
        while stack and nums[stack[-1]] < val:
            result[stack.pop()] = val
        stack.append(i)
    return result`,
  },
  {
    id: 12, emoji: "🚶", title: "Queue & Deque", color: T.blue,
    theory: [
      "A queue is a First-In-First-Out (FIFO) structure. The first element added is the first one removed.",
      "Use collections.deque for O(1) operations on both ends. Python's list is O(n) for pop(0) — avoid it!",
      "BFS (Breadth-First Search) always uses a queue. Level order traversal uses a queue.",
      "Deque (double-ended queue) supports O(1) append and popleft from both ends — more flexible than a plain queue.",
    ],
    notes: [
      "from collections import deque; q = deque(). append() adds to right, appendleft() to left, popleft() removes from left.",
      "queue.Queue is thread-safe. Use deque for single-threaded performance.",
      "Sliding window maximum uses a monotonic deque — elements in decreasing order, window elements only.",
      "LRU Cache uses a combination of dict + deque (or OrderedDict).",
    ],
    code: `from collections import deque

# Basic queue operations — O(1) all
q = deque()
q.append(1)       # enqueue right
q.append(2)
q.append(3)
print(q.popleft()) # dequeue left → 1
print(q[0])        # peek front → 2

# BFS — Level order traversal of a tree
def level_order(root):
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):   # process one level at a time
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result

# BFS — Shortest path in unweighted grid
def shortest_path(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    queue = deque([(start, 0)])   # (position, distance)
    visited = {start}
    while queue:
        (r, c), dist = queue.popleft()
        if (r, c) == end:
            return dist
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r+dr, c+dc
            if 0 <= nr < rows and 0 <= nc < cols and \
               grid[nr][nc] == 0 and (nr,nc) not in visited:
                visited.add((nr, nc))
                queue.append(((nr, nc), dist + 1))
    return -1

# Sliding window maximum — monotonic deque
def max_sliding_window(nums, k):
    dq = deque()  # stores indices, decreasing values
    result = []
    for i, val in enumerate(nums):
        while dq and nums[dq[-1]] < val:
            dq.pop()
        dq.append(i)
        if dq[0] == i - k:  # out of window
            dq.popleft()
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result`,
  },
  {
    id: 13, emoji: "🔗", title: "Linked List", color: T.red,
    theory: [
      "A linked list is a sequence of nodes where each node stores a value and a pointer to the next node.",
      "Unlike arrays, there's no random access — you must traverse from head. But insertion/deletion is O(1) if you have the node.",
      "Fast & Slow pointer (Floyd's algorithm): use two pointers moving at different speeds to find cycles, middle, Nth from end.",
      "Reversing a linked list is a fundamental operation — master this pattern as it appears in many problems.",
    ],
    notes: [
      "Always check for edge cases: empty list (head is None), single node, two nodes.",
      "Use a dummy head node to simplify insertion/deletion at the beginning.",
      "For cycle detection: fast moves 2 steps, slow moves 1. If they meet, there's a cycle.",
      "For middle of linked list: when fast reaches end, slow is at middle.",
      "In Python, you'll often implement ListNode class yourself in coding interviews.",
    ],
    code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Build a linked list from array
def build_list(arr):
    dummy = ListNode(0)
    cur = dummy
    for val in arr:
        cur.next = ListNode(val)
        cur = cur.next
    return dummy.next

# REVERSE a linked list — iterative
def reverse_list(head):
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev

# FIND MIDDLE — slow/fast pointer
def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow

# DETECT CYCLE — Floyd's algorithm
def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False

# MERGE TWO SORTED LISTS
def merge_two_lists(l1, l2):
    dummy = ListNode(0)
    cur = dummy
    while l1 and l2:
        if l1.val <= l2.val:
            cur.next = l1; l1 = l1.next
        else:
            cur.next = l2; l2 = l2.next
        cur = cur.next
    cur.next = l1 or l2
    return dummy.next

# NTH FROM END — two pointer trick
def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n + 1):
        fast = fast.next
    while fast:
        slow = slow.next
        fast = fast.next
    slow.next = slow.next.next
    return dummy.next`,
  },
  {
    id: 14, emoji: "🗺️", title: "HashMap & HashSet", color: T.accent,
    theory: [
      "Hash maps store key-value pairs with O(1) average time for insert, lookup, and delete.",
      "They work by applying a hash function to the key to find a bucket. Collisions are handled by chaining or probing.",
      "Two Sum, frequency counting, grouping anagrams, caching — these all rely on hash maps.",
      "Hash sets are just hash maps where we only care about keys (membership), not values.",
    ],
    notes: [
      "Python dict and set are hash-based. Counter extends dict with .most_common() and arithmetic.",
      "Beware: dicts can't have mutable keys (no lists as keys — use tuples).",
      "For anagram grouping: sort each word as key, or use Counter as key (frozenset of items).",
      "Design HashMap: use array of buckets, linked list for chaining. Load factor determines resize.",
    ],
    code: `from collections import Counter, defaultdict

# TWO SUM — O(n) with hash map
def two_sum(nums, target):
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# FREQUENCY COUNT
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
freq = Counter(words)
print(freq.most_common(2))  # [('apple',3), ('banana',2)]

# GROUP ANAGRAMS
def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))  # sorted tuple as key
        groups[key].append(s)
    return list(groups.values())

# LONGEST CONSECUTIVE SEQUENCE — O(n)
def longest_consecutive(nums):
    num_set = set(nums)
    best = 0
    for n in num_set:
        if n - 1 not in num_set:  # start of sequence
            cur = n
            streak = 1
            while cur + 1 in num_set:
                cur += 1; streak += 1
            best = max(best, streak)
    return best

# SUBARRAY SUM EQUALS K — prefix sum + hash map
def subarray_sum(nums, k):
    count = 0
    prefix = 0
    prefix_count = {0: 1}
    for n in nums:
        prefix += n
        count += prefix_count.get(prefix - k, 0)
        prefix_count[prefix] = prefix_count.get(prefix, 0) + 1
    return count`,
  },
  {
    id: 15, emoji: "🌲", title: "Binary Tree", color: T.purple,
    theory: [
      "A binary tree has nodes where each node has at most 2 children: left and right.",
      "Three traversals: Inorder (Left-Root-Right), Preorder (Root-Left-Right), Postorder (Left-Right-Root).",
      "Tree height = longest path from root to leaf. Balanced tree: height is O(log n). Degenerate: O(n).",
      "BFS (level order) uses a queue. DFS traversals can be recursive or iterative with a stack.",
    ],
    notes: [
      "Inorder of BST gives sorted sequence. Preorder can reconstruct the tree. Postorder for deletion.",
      "Depth-first always uses O(h) space (call stack or explicit stack) where h = height.",
      "Common problems: max depth, lowest common ancestor, balanced check, path sum, diameter.",
      "Diameter = longest path between any two nodes (may not pass through root).",
    ],
    code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# INORDER traversal — recursive
def inorder(root):
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

# INORDER — iterative with stack
def inorder_iter(root):
    result, stack = [], []
    curr = root
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        result.append(curr.val)
        curr = curr.right
    return result

# MAX DEPTH
def max_depth(root):
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

# IS BALANCED — check height at same time
def is_balanced(root):
    def height(node):
        if not node:
            return 0
        lh = height(node.left)
        rh = height(node.right)
        if lh == -1 or rh == -1 or abs(lh - rh) > 1:
            return -1
        return 1 + max(lh, rh)
    return height(root) != -1

# LOWEST COMMON ANCESTOR
def lca(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lca(root.left, p, q)
    right = lca(root.right, p, q)
    return root if left and right else left or right

# DIAMETER (longest path between any 2 nodes)
def diameter(root):
    result = [0]
    def depth(node):
        if not node:
            return 0
        l, r = depth(node.left), depth(node.right)
        result[0] = max(result[0], l + r)
        return 1 + max(l, r)
    depth(root)
    return result[0]`,
  },
  {
    id: 16, emoji: "🔍", title: "Binary Search Tree (BST)", color: T.blue,
    theory: [
      "In a BST: for every node, all values in the left subtree are smaller, and all in the right subtree are larger.",
      "Search, insert, delete are O(log n) in a balanced BST but O(n) in a degenerate (sorted) input tree.",
      "Inorder traversal of a BST always gives elements in sorted order — a key property.",
      "Balanced BSTs like AVL or Red-Black trees maintain O(log n) height automatically (Python's sortedcontainers.SortedList).",
    ],
    notes: [
      "Validate a BST by passing min/max bounds down the recursion — don't just check parent vs children.",
      "Kth smallest in BST: inorder traversal with a counter.",
      "BST to Greater Sum Tree: reverse inorder (right-root-left) with running sum.",
      "Delete from BST: handle 3 cases — no child, one child, two children (replace with inorder successor).",
    ],
    code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# SEARCH in BST
def search(root, target):
    if not root:
        return None
    if root.val == target:
        return root
    elif target < root.val:
        return search(root.left, target)
    else:
        return search(root.right, target)

# INSERT into BST
def insert(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    elif val > root.val:
        root.right = insert(root.right, val)
    return root

# VALIDATE BST — pass bounds!
def is_valid_bst(root, lo=float('-inf'), hi=float('inf')):
    if not root:
        return True
    if not (lo < root.val < hi):
        return False
    return (is_valid_bst(root.left, lo, root.val) and
            is_valid_bst(root.right, root.val, hi))

# KTH SMALLEST — inorder with counter
def kth_smallest(root, k):
    stack = []
    curr = root
    count = 0
    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        count += 1
        if count == k:
            return curr.val
        curr = curr.right`,
  },
  {
    id: 17, emoji: "⛰️", title: "Heap / Priority Queue", color: "#ff9f43",
    theory: [
      "A heap is a complete binary tree where each node satisfies the heap property: parent ≤ children (min-heap).",
      "Python's heapq module provides a min-heap. For max-heap, negate the values (-val).",
      "All heap operations: push O(log n), pop O(log n), peek O(1), heapify O(n).",
      "Priority queues are heaps with a priority. Perfect for: K largest/smallest, Dijkstra's, merge sorted arrays.",
    ],
    notes: [
      "heapq.heappush(heap, val), heapq.heappop(heap), heap[0] to peek min.",
      "heapq.nlargest(k, arr) and heapq.nsmallest(k, arr) are convenience functions.",
      "For custom priority: push tuples (priority, value). Python compares tuples lexicographically.",
      "heapq.heapify(arr) converts a list to a heap in O(n) — better than pushing n elements.",
    ],
    code: `import heapq

# Min-heap basics
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 4)
heapq.heappush(heap, 1)
print(heap[0])           # peek min → 1
print(heapq.heappop(heap))  # pop min → 1

# Max-heap: negate values
max_heap = []
for val in [3, 1, 4, 1, 5]:
    heapq.heappush(max_heap, -val)
print(-heapq.heappop(max_heap))  # 5 (largest)

# KTH LARGEST ELEMENT — min-heap of size k
def find_kth_largest(nums, k):
    heap = []
    for n in nums:
        heapq.heappush(heap, n)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]

# K MOST FREQUENT ELEMENTS
from collections import Counter
def top_k_frequent(nums, k):
    freq = Counter(nums)
    return heapq.nlargest(k, freq.keys(), key=freq.get)

# MERGE K SORTED LISTS
def merge_k_sorted(lists):
    heap = []
    result = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))
    while heap:
        val, i, j = heapq.heappop(heap)
        result.append(val)
        if j + 1 < len(lists[i]):
            heapq.heappush(heap, (lists[i][j+1], i, j+1))
    return result`,
  },
  {
    id: 18, emoji: "🌳", title: "Trie (Prefix Tree)", color: T.accent,
    theory: [
      "A Trie is a tree where each node represents a character. Paths from root to marked nodes represent words.",
      "O(L) time for insert and search where L = length of the word — independent of number of words stored.",
      "Extremely efficient for prefix matching, autocomplete, spell checking, and IP routing.",
      "Each node typically stores a dict of children and a boolean is_end marking complete words.",
    ],
    notes: [
      "Space: O(ALPHABET_SIZE × L × N) where N = number of words. Can be memory-heavy for large alphabets.",
      "For interview: implement Trie class with insert(), search(), startsWith() methods.",
      "Word Search II (find all words in a grid) is solved with Trie + DFS backtracking.",
      "Compressed Trie (Radix Tree) merges single-child chains — more space efficient.",
    ],
    code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                node.children[ch] = TrieNode()
            node = node.children[ch]
        node.is_end = True

    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.is_end

    def starts_with(self, prefix):
        node = self.root
        for ch in prefix:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return True

    def get_all_words(self):
        result = []
        def dfs(node, path):
            if node.is_end:
                result.append(path)
            for ch, child in node.children.items():
                dfs(child, path + ch)
        dfs(self.root, "")
        return result

# Usage
trie = Trie()
for word in ["apple", "app", "application", "apply", "apt"]:
    trie.insert(word)

print(trie.search("app"))       # True
print(trie.search("ap"))        # False
print(trie.starts_with("app"))  # True
print(trie.get_all_words())     # all inserted words`,
  },
  {
    id: 19, emoji: "🕸️", title: "Graph (BFS & DFS)", color: T.purple,
    theory: [
      "A graph is a set of vertices (nodes) connected by edges. Can be directed/undirected, weighted/unweighted.",
      "Represented as adjacency list (dict of lists) for sparse graphs or adjacency matrix for dense graphs.",
      "BFS explores level by level using a queue — finds shortest path in unweighted graphs.",
      "DFS explores as deep as possible using a stack/recursion — finds connected components, detects cycles.",
    ],
    notes: [
      "Always track visited nodes to avoid infinite loops in cyclic graphs.",
      "Connected components: run DFS/BFS from each unvisited node, count starts.",
      "Cycle detection: in DFS, if you revisit a node in the current path, there's a cycle.",
      "Topological sort: only for DAGs. DFS-based or Kahn's (BFS-based with in-degrees).",
    ],
    code: `from collections import deque

# Adjacency list representation
graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 5],
    3: [1],
    4: [1],
    5: [2],
}

# BFS — shortest path
def bfs(graph, start, target):
    visited = {start}
    queue = deque([(start, [start])])
    while queue:
        node, path = queue.popleft()
        if node == target:
            return path
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    return []

# DFS — recursive
def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited

# NUMBER OF CONNECTED COMPONENTS
def count_components(n, edges):
    graph = {i: [] for i in range(n)}
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)
    visited = set()
    count = 0
    for node in range(n):
        if node not in visited:
            dfs(graph, node, visited)
            count += 1
    return count

# NUMBER OF ISLANDS (grid BFS)
def num_islands(grid):
    rows, cols = len(grid), len(grid[0])
    count = 0

    def bfs(r, c):
        q = deque([(r, c)])
        grid[r][c] = "0"
        while q:
            row, col = q.popleft()
            for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:
                nr, nc = row+dr, col+dc
                if 0<=nr<rows and 0<=nc<cols and grid[nr][nc]=="1":
                    grid[nr][nc] = "0"
                    q.append((nr, nc))

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                bfs(r, c)
                count += 1
    return count`,
  },
  {
    id: 20, emoji: "🔀", title: "Union-Find (Disjoint Set)", color: T.gold,
    theory: [
      "Union-Find tracks which elements belong to the same group (connected component).",
      "Two operations: find(x) returns the root of x's group, union(x, y) merges two groups.",
      "With path compression (flatten the tree during find) and union by rank (attach smaller tree under larger), operations are nearly O(1) — technically O(α(n)) (inverse Ackermann).",
      "Perfect for: cycle detection in undirected graphs, number of connected components, Kruskal's MST.",
    ],
    notes: [
      "Path compression: when doing find(x), make every node on the path point directly to the root.",
      "Union by rank: keep track of tree depth. Always attach the shallower tree under the deeper.",
      "Weighted Union-Find: store the weight/ratio between nodes for problems like parallel courses.",
      "Can detect when two nodes are already in the same set before unioning — this means a cycle.",
    ],
    code: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.components = n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # already connected!
        # union by rank
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        self.components -= 1
        return True

    def connected(self, x, y):
        return self.find(x) == self.find(y)

# DETECT CYCLE in undirected graph
def has_cycle(n, edges):
    uf = UnionFind(n)
    for a, b in edges:
        if not uf.union(a, b):
            return True   # already in same component!
    return False

# NUMBER OF CONNECTED COMPONENTS
def count_components(n, edges):
    uf = UnionFind(n)
    for a, b in edges:
        uf.union(a, b)
    return uf.components

# KRUSKAL'S MST — sort edges by weight, greedily add
def kruskal_mst(n, edges):
    edges.sort(key=lambda e: e[2])  # sort by weight
    uf = UnionFind(n)
    mst = []
    for u, v, w in edges:
        if uf.union(u, v):
            mst.append((u, v, w))
    return mst`,
  },
];

// ─── ALGORITHMS Topics 21–35 ─────────────────────────────────────────────────
const algoTopics = [
  {
    id: 21, emoji: "🔎", title: "Binary Search", color: T.accent,
    theory: [
      "Binary search finds a target in a sorted array in O(log n) by halving the search space each step.",
      "The key insight: if the middle element isn't the target, we can eliminate half the array.",
      "Template: maintain lo and hi pointers. Move lo when arr[mid] < target, hi when arr[mid] > target.",
      "Binary search applies beyond sorted arrays — any 'monotonic condition' (true-true-...-false-false-...) can be binary searched.",
    ],
    notes: [
      "Classic bug: mid = (lo + hi) // 2 is fine in Python (no integer overflow). In C/Java: mid = lo + (hi-lo)//2.",
      "For first/last occurrence: use lo <= hi and careful pointer updates.",
      "Binary search on answer: when asked for minimum/maximum value satisfying a condition, binary search the answer space.",
      "Time O(log n), space O(1) iterative or O(log n) recursive.",
    ],
    code: `# BASIC binary search
def binary_search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

# FIRST OCCURRENCE of target
def first_occurrence(nums, target):
    lo, hi, result = 0, len(nums)-1, -1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            result = mid
            hi = mid - 1   # keep searching left!
        elif nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return result

# SEARCH IN ROTATED SORTED ARRAY
def search_rotated(nums, target):
    lo, hi = 0, len(nums)-1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:   # left half sorted
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:                        # right half sorted
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1

# BINARY SEARCH ON ANSWER — Minimum capacity to ship in D days
def ship_within_days(weights, days):
    def can_ship(capacity):
        ships, load = 1, 0
        for w in weights:
            if load + w > capacity:
                ships += 1; load = 0
            load += w
        return ships <= days

    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if can_ship(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo`,
  },
  {
    id: 22, emoji: "↔️", title: "Two Pointers", color: T.gold,
    theory: [
      "Two pointers uses two indices to reduce a nested O(n²) loop to O(n) by taking advantage of sorted order or a converging condition.",
      "Opposite direction: start left=0, right=end, move based on comparison (e.g., two-sum).",
      "Same direction (fast/slow): slow pointer follows confirmed valid state, fast pointer explores (e.g., remove duplicates).",
      "Three-sum extends two-sum: fix one element, then two-pointer on the remaining sorted subarray.",
    ],
    notes: [
      "Two pointer requires sorted input for opposite-direction approach (sort first if needed).",
      "Same-direction two pointer doesn't need sorting — tracks two positions in same array.",
      "Container with most water: move the pointer with the shorter height inward.",
      "Trapping rain water: for each position, water = min(max_left, max_right) - height[i].",
    ],
    code: `# TWO SUM (sorted array) — opposite direction
def two_sum_sorted(nums, target):
    left, right = 0, len(nums)-1
    while left < right:
        s = nums[left] + nums[right]
        if s == target: return [left, right]
        elif s < target: left += 1
        else: right -= 1
    return []

# THREE SUM — fix one, two-pointer rest
def three_sum(nums):
    nums.sort()
    result = []
    for i in range(len(nums)-2):
        if i > 0 and nums[i] == nums[i-1]: continue  # skip dups
        l, r = i+1, len(nums)-1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s == 0:
                result.append([nums[i], nums[l], nums[r]])
                while l < r and nums[l] == nums[l+1]: l += 1
                while l < r and nums[r] == nums[r-1]: r -= 1
                l += 1; r -= 1
            elif s < 0: l += 1
            else: r -= 1
    return result

# CONTAINER WITH MOST WATER
def max_area(heights):
    left, right = 0, len(heights)-1
    max_water = 0
    while left < right:
        area = min(heights[left], heights[right]) * (right - left)
        max_water = max(max_water, area)
        if heights[left] < heights[right]:
            left += 1
        else:
            right -= 1
    return max_water

# TRAPPING RAIN WATER — two pointer O(n), O(1) space
def trap(height):
    left, right = 0, len(height)-1
    left_max = right_max = 0
    water = 0
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max: left_max = height[left]
            else: water += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max: right_max = height[right]
            else: water += right_max - height[right]
            right -= 1
    return water`,
  },
  {
    id: 23, emoji: "🪟", title: "Sliding Window", color: T.blue,
    theory: [
      "Sliding window maintains a contiguous subarray/substring satisfying some condition, expanding or shrinking as needed.",
      "Fixed window: advance both ends together (e.g., max sum of exactly K elements).",
      "Variable window: expand right pointer, shrink left pointer when condition violated (e.g., longest substring with constraint).",
      "Key insight: you don't reset from scratch — you slide forward, adding/removing one element at a time, keeping window valid.",
    ],
    notes: [
      "Use a deque for max/min in a sliding window — O(n) overall.",
      "Two different hash maps to track character frequencies: one for window, one for target.",
      "Minimum window substring: classic hard problem — track how many chars are 'satisfied'.",
      "At most K distinct characters: two-pointer with a frequency dict.",
    ],
    code: `from collections import defaultdict, deque

# FIXED WINDOW — max sum of k elements
def max_sum_k(nums, k):
    window = sum(nums[:k])
    best = window
    for i in range(k, len(nums)):
        window += nums[i] - nums[i-k]
        best = max(best, window)
    return best

# VARIABLE WINDOW — longest substring without repeat
def longest_no_repeat(s):
    seen = {}
    left = best = 0
    for right, ch in enumerate(s):
        if ch in seen and seen[ch] >= left:
            left = seen[ch] + 1
        seen[ch] = right
        best = max(best, right - left + 1)
    return best

# LONGEST SUBSTRING WITH AT MOST K DISTINCT CHARS
def at_most_k_distinct(s, k):
    count = defaultdict(int)
    left = best = 0
    for right, ch in enumerate(s):
        count[ch] += 1
        while len(count) > k:
            count[s[left]] -= 1
            if count[s[left]] == 0: del count[s[left]]
            left += 1
        best = max(best, right - left + 1)
    return best

# MINIMUM WINDOW SUBSTRING
def min_window(s, t):
    need = defaultdict(int)
    for c in t: need[c] += 1
    have, required = 0, len(need)
    window = defaultdict(int)
    result = ""
    left = 0
    for right, c in enumerate(s):
        window[c] += 1
        if c in need and window[c] == need[c]:
            have += 1
        while have == required:
            if not result or right-left+1 < len(result):
                result = s[left:right+1]
            window[s[left]] -= 1
            if s[left] in need and window[s[left]] < need[s[left]]:
                have -= 1
            left += 1
    return result`,
  },
  {
    id: 24, emoji: "🎯", title: "Backtracking", color: T.red,
    theory: [
      "Backtracking is an algorithmic technique that builds candidates for a solution and abandons ('backtracks') ones that fail to satisfy constraints.",
      "Pattern: choose → explore → unchoose. Try an option, recurse, undo the option.",
      "Used when you need to enumerate all possibilities: permutations, subsets, combinations, N-queens, Sudoku.",
      "Pruning: add constraints to skip branches early — turns exponential into manageable in practice.",
    ],
    notes: [
      "Time complexity is often exponential (O(n!) for permutations, O(2ⁿ) for subsets) — but pruning helps.",
      "Always mark state as 'in progress' before recursing and unmark after (undo step).",
      "For subsets/combinations: pass a start index to avoid reusing elements.",
      "For permutations: use a visited set or swap elements in-place.",
    ],
    code: `# SUBSETS — O(2^n)
def subsets(nums):
    result = []
    def backtrack(start, path):
        result.append(list(path))
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()              # undo!
    backtrack(0, [])
    return result

# PERMUTATIONS — O(n!)
def permutations(nums):
    result = []
    def backtrack(path, used):
        if len(path) == len(nums):
            result.append(list(path))
            return
        for i, n in enumerate(nums):
            if used[i]: continue
            used[i] = True
            path.append(n)
            backtrack(path, used)
            path.pop()              # undo!
            used[i] = False         # undo!
    backtrack([], [False]*len(nums))
    return result

# COMBINATION SUM — reuse allowed
def combination_sum(candidates, target):
    result = []
    def backtrack(start, path, remaining):
        if remaining == 0:
            result.append(list(path))
            return
        for i in range(start, len(candidates)):
            c = candidates[i]
            if c > remaining: break  # pruning (sorted input)
            path.append(c)
            backtrack(i, path, remaining - c)   # i (not i+1) allows reuse
            path.pop()
    candidates.sort()
    backtrack(0, [], target)
    return result

# N-QUEENS
def solve_n_queens(n):
    result = []
    cols = set(); diag1 = set(); diag2 = set()
    board = [["."]*n for _ in range(n)]
    def backtrack(row):
        if row == n:
            result.append(["".join(r) for r in board])
            return
        for col in range(n):
            if col in cols or (row-col) in diag1 or (row+col) in diag2:
                continue
            cols.add(col); diag1.add(row-col); diag2.add(row+col)
            board[row][col] = "Q"
            backtrack(row + 1)
            cols.remove(col); diag1.remove(row-col); diag2.remove(row+col)
            board[row][col] = "."
    backtrack(0)
    return result`,
  },
  {
    id: 25, emoji: "💎", title: "Dynamic Programming", color: T.purple,
    theory: [
      "Dynamic Programming (DP) solves problems by breaking them into overlapping subproblems and storing results to avoid recomputation.",
      "Two conditions: optimal substructure (optimal solution built from optimal subproblems) and overlapping subproblems (same subproblem solved multiple times).",
      "Top-down (memoization): recursive with caching. Bottom-up (tabulation): iterative, fills a table from base cases.",
      "Common patterns: 1D DP, 2D DP (grids), knapsack, LCS, LIS, interval DP.",
    ],
    notes: [
      "Identify the state: what information defines a subproblem? Often (index, remaining, ...) → dp[i][j].",
      "Write the recurrence: dp[i] depends on which previous states?",
      "Base cases: what are the smallest subproblems you can solve directly?",
      "Space optimization: many 1D DP problems only need current and previous row (O(n) → O(1) space).",
    ],
    code: `from functools import lru_cache

# FIBONACCI — 1D DP
def fib(n):
    if n <= 1: return n
    dp = [0] * (n+1)
    dp[1] = 1
    for i in range(2, n+1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# COIN CHANGE — minimum coins
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount+1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a-c])
    return dp[amount] if dp[amount] != float('inf') else -1

# LONGEST INCREASING SUBSEQUENCE — O(n^2)
def lis(nums):
    dp = [1] * len(nums)
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j]+1)
    return max(dp)

# LONGEST COMMON SUBSEQUENCE — 2D DP
def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(1, m+1):
        for j in range(1, n+1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = 1 + dp[i-1][j-1]
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[m][n]

# 0/1 KNAPSACK
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0]*(capacity+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for w in range(capacity+1):
            dp[i][w] = dp[i-1][w]  # don't take item i
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], values[i-1]+dp[i-1][w-weights[i-1]])
    return dp[n][capacity]`,
  },
  {
    id: 26, emoji: "🌿", title: "Greedy Algorithms", color: T.gold,
    theory: [
      "Greedy makes the locally optimal choice at each step, hoping this leads to a globally optimal solution.",
      "Unlike DP, greedy never backtracks. It only works when the greedy choice property and optimal substructure hold.",
      "Proving correctness: exchange argument (show swapping any non-greedy choice to greedy doesn't worsen the solution).",
      "Common greedy problems: interval scheduling, Huffman coding, minimum spanning tree, activity selection.",
    ],
    notes: [
      "Interval scheduling: sort by end time, pick earliest ending non-overlapping interval.",
      "Jump game: track the farthest you can reach. If current index > max reach, stuck.",
      "Meeting rooms: sort by start time, use min-heap of end times for room count.",
      "Greedy often pairs with sorting — sort first to make the greedy choice obvious.",
    ],
    code: `# JUMP GAME — can you reach the end?
def can_jump(nums):
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach: return False
        max_reach = max(max_reach, i + jump)
    return True

# JUMP GAME II — minimum jumps
def jump(nums):
    jumps = cur_end = cur_far = 0
    for i in range(len(nums)-1):
        cur_far = max(cur_far, i + nums[i])
        if i == cur_end:
            jumps += 1
            cur_end = cur_far
    return jumps

# INTERVAL SCHEDULING — max non-overlapping intervals
def erase_overlap_intervals(intervals):
    intervals.sort(key=lambda x: x[1])  # sort by end time!
    count = 0
    prev_end = float('-inf')
    for start, end in intervals:
        if start >= prev_end:
            prev_end = end
        else:
            count += 1  # overlap — remove this one
    return count

# MEETING ROOMS II — minimum rooms needed
import heapq
def min_meeting_rooms(intervals):
    intervals.sort()
    heap = []  # min-heap of end times
    for start, end in intervals:
        if heap and heap[0] <= start:
            heapq.heapreplace(heap, end)
        else:
            heapq.heappush(heap, end)
    return len(heap)

# GAS STATION — circular greedy
def can_complete_circuit(gas, cost):
    if sum(gas) < sum(cost): return -1
    tank = start = 0
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        if tank < 0:
            start = i + 1
            tank = 0
    return start`,
  },
  {
    id: 27, emoji: "📐", title: "Sorting Algorithms", color: T.blue,
    theory: [
      "Merge Sort: divide array in half, sort each half, merge. O(n log n) guaranteed, stable, O(n) extra space.",
      "Quick Sort: pick pivot, partition around it, recurse. O(n log n) average, O(n²) worst, in-place, not stable.",
      "Heap Sort: build a heap, extract max n times. O(n log n) always, in-place, not stable.",
      "Comparison-based sorts can't do better than O(n log n). Linear sorts (counting, radix) work on specific input types.",
    ],
    notes: [
      "Python's sort() and sorted() use Timsort — O(n log n) worst, O(n) best (already sorted), stable.",
      "For interview: know merge sort and quick sort implementations cold.",
      "QuickSelect finds Kth smallest in O(n) average — partition without full sort.",
      "Counting sort: O(n + k) where k = value range. Only for integers in a known range.",
    ],
    code: `# MERGE SORT — O(n log n), stable
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]

# QUICK SORT — O(n log n) avg, in-place
def quick_sort(arr, lo, hi):
    if lo < hi:
        p = partition(arr, lo, hi)
        quick_sort(arr, lo, p-1)
        quick_sort(arr, p+1, hi)

def partition(arr, lo, hi):
    pivot = arr[hi]
    i = lo - 1
    for j in range(lo, hi):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[hi] = arr[hi], arr[i+1]
    return i + 1

# QUICKSELECT — Kth smallest, O(n) average
def quick_select(nums, k):
    k -= 1  # 0-indexed
    lo, hi = 0, len(nums)-1
    while lo < hi:
        pivot_idx = partition(nums, lo, hi)
        if pivot_idx == k: break
        elif pivot_idx < k: lo = pivot_idx + 1
        else: hi = pivot_idx - 1
    return nums[k]

# COUNTING SORT — O(n + k) for integers
def counting_sort(arr, max_val):
    count = [0] * (max_val + 1)
    for n in arr: count[n] += 1
    result = []
    for val, freq in enumerate(count):
        result.extend([val] * freq)
    return result`,
  },
  {
    id: 28, emoji: "🔃", title: "Topological Sort", color: T.red,
    theory: [
      "Topological sort gives a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every edge u→v, u comes before v.",
      "Only possible if the graph has no cycles (DAG). If a cycle exists, topological sort fails.",
      "Kahn's algorithm (BFS): repeatedly remove nodes with in-degree 0. If not all nodes removed → cycle exists.",
      "DFS-based: post-order DFS, add to stack on finish. Reverse the stack for topological order.",
    ],
    notes: [
      "Classic problems: course schedule, build order, task dependencies, critical path.",
      "Course Schedule II asks for the actual order — return the topological sort.",
      "Kahn's algorithm also detects cycles: if the queue empties before processing all nodes → cycle.",
      "Longest path in a DAG: process nodes in topological order, relax edges.",
    ],
    code: `from collections import deque, defaultdict

# KAHN'S ALGORITHM (BFS topological sort)
def topo_sort_kahn(n, edges):
    graph = defaultdict(list)
    in_degree = [0] * n
    for u, v in edges:
        graph[u].append(v)
        in_degree[v] += 1

    queue = deque([i for i in range(n) if in_degree[i] == 0])
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return order if len(order) == n else []  # empty if cycle

# DFS-BASED topological sort
def topo_sort_dfs(n, edges):
    graph = defaultdict(list)
    for u, v in edges:
        graph[u].append(v)

    visited = set()
    in_stack = set()
    result = []
    has_cycle = [False]

    def dfs(node):
        if node in in_stack:
            has_cycle[0] = True; return
        if node in visited: return
        in_stack.add(node)
        for neighbor in graph[node]:
            dfs(neighbor)
        in_stack.remove(node)
        visited.add(node)
        result.append(node)

    for i in range(n):
        if i not in visited:
            dfs(i)

    if has_cycle[0]: return []
    return result[::-1]

# COURSE SCHEDULE — can you finish all courses?
def can_finish(num_courses, prerequisites):
    order = topo_sort_kahn(num_courses, prerequisites)
    return len(order) == num_courses`,
  },
  {
    id: 29, emoji: "🗾", title: "Dijkstra's Algorithm", color: T.accent,
    theory: [
      "Dijkstra's finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative weights.",
      "Uses a min-heap (priority queue) to always process the currently closest unvisited vertex.",
      "Time complexity: O((V + E) log V) with a heap. Classic O(V²) with an array.",
      "Does NOT work with negative edge weights — use Bellman-Ford for that.",
    ],
    notes: [
      "Always add (distance, node) to the heap. When you pop a node, check if it's already been processed.",
      "dist[node] tracks the best known distance from source. Initialize to infinity, source to 0.",
      "For shortest path reconstruction: track prev[node] = which node we came from.",
      "Bidirectional Dijkstra runs from source and target simultaneously — faster for point-to-point queries.",
    ],
    code: `import heapq
from collections import defaultdict

def dijkstra(graph, source):
    """
    graph: dict of {node: [(neighbor, weight), ...]}
    returns: dict of {node: shortest_distance_from_source}
    """
    dist = {node: float('inf') for node in graph}
    dist[source] = 0
    heap = [(0, source)]   # (distance, node)

    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]:
            continue   # already found a better path
        for v, weight in graph[u]:
            new_dist = dist[u] + weight
            if new_dist < dist[v]:
                dist[v] = new_dist
                heapq.heappush(heap, (new_dist, v))

    return dist

# NETWORK DELAY TIME — time for signal to reach all nodes
def network_delay_time(times, n, k):
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))

    dist = dijkstra(graph, k)
    max_time = max(dist.values())
    return max_time if max_time < float('inf') else -1

# PATH WITH MINIMUM EFFORT (grid)
def minimum_effort_path(heights):
    rows, cols = len(heights), len(heights[0])
    dist = [[float('inf')]*cols for _ in range(rows)]
    dist[0][0] = 0
    heap = [(0, 0, 0)]  # (effort, row, col)
    while heap:
        effort, r, c = heapq.heappop(heap)
        if r == rows-1 and c == cols-1: return effort
        if effort > dist[r][c]: continue
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r+dr, c+dc
            if 0 <= nr < rows and 0 <= nc < cols:
                new_effort = max(effort, abs(heights[nr][nc]-heights[r][c]))
                if new_effort < dist[nr][nc]:
                    dist[nr][nc] = new_effort
                    heapq.heappush(heap, (new_effort, nr, nc))`,
  },
  {
    id: 30, emoji: "✂️", title: "Divide and Conquer", color: T.purple,
    theory: [
      "Divide and conquer splits a problem into smaller subproblems of the same type, solves them recursively, then combines results.",
      "Three steps: Divide (split), Conquer (recurse), Combine (merge results).",
      "Master theorem: T(n) = aT(n/b) + f(n). Time complexity follows from comparing f(n) to n^(log_b a).",
      "Classic examples: Merge Sort, Quick Sort, Binary Search, Karatsuba multiplication, Closest Pair of Points.",
    ],
    notes: [
      "D&C works when subproblems are independent (no overlapping). DP is used when subproblems overlap.",
      "Recursion tree method: draw the tree, multiply cost per level by number of levels.",
      "Maximum subarray (Kadane's) has a D&C version: O(n log n). Kadane's O(n) is better, but D&C is elegant.",
      "Closest pair of points: split by median x, solve halves, combine in O(n) strip scan — O(n log n) total.",
    ],
    code: `# MERGE SORT — canonical D&C
def merge_sort(arr):
    if len(arr) <= 1: return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])   # conquer left
    right = merge_sort(arr[mid:])  # conquer right
    return merge(left, right)      # combine

def merge(l, r):
    res = []; i = j = 0
    while i < len(l) and j < len(r):
        if l[i] <= r[j]: res.append(l[i]); i += 1
        else: res.append(r[j]); j += 1
    return res + l[i:] + r[j:]

# MAXIMUM SUBARRAY — D&C version O(n log n)
def max_subarray_dc(arr, lo, hi):
    if lo == hi: return arr[lo]
    mid = (lo + hi) // 2
    left_max = max_subarray_dc(arr, lo, mid)
    right_max = max_subarray_dc(arr, mid+1, hi)
    # Cross-max: extend from mid outward
    left_sum = cur = 0
    for i in range(mid, lo-1, -1):
        cur += arr[i]; left_sum = max(left_sum, cur)
    right_sum = cur = 0
    for i in range(mid+1, hi+1):
        cur += arr[i]; right_sum = max(right_sum, cur)
    return max(left_max, right_max, left_sum + right_sum)

# COUNT INVERSIONS — D&C on merge step
def count_inversions(arr):
    if len(arr) <= 1: return arr, 0
    mid = len(arr) // 2
    left, lc = count_inversions(arr[:mid])
    right, rc = count_inversions(arr[mid:])
    merged, mc = merge_count(left, right)
    return merged, lc + rc + mc

def merge_count(l, r):
    res = []; count = 0; i = j = 0
    while i < len(l) and j < len(r):
        if l[i] <= r[j]: res.append(l[i]); i += 1
        else: res.append(r[j]); count += len(l) - i; j += 1
    res += l[i:] + r[j:]
    return res, count`,
  },
  {
    id: 31, emoji: "⚡", title: "Bit Manipulation", color: T.gold,
    theory: [
      "Bit manipulation operates directly on binary representations of numbers. Extremely fast (single CPU instruction).",
      "Key operations: AND (&), OR (|), XOR (^), NOT (~), left shift (<<), right shift (>>).",
      "XOR properties: a^a = 0, a^0 = a, XOR is commutative and associative — great for finding the single number.",
      "Checking if bit i is set: (n >> i) & 1. Setting bit i: n | (1 << i). Clearing bit i: n & ~(1 << i).",
    ],
    notes: [
      "n & (n-1) removes the lowest set bit. n & (-n) isolates the lowest set bit.",
      "Power of 2 check: n > 0 and n & (n-1) == 0.",
      "Count set bits: bin(n).count('1') or Brian Kernighan's algorithm: loop n &= (n-1).",
      "In Python, integers have arbitrary precision — left shift won't cause overflow.",
    ],
    code: `# BASIC BIT OPERATIONS
n = 0b1010   # 10 in binary

# Check if bit i is set
def is_set(n, i):
    return (n >> i) & 1 == 1

# Set bit i
def set_bit(n, i):
    return n | (1 << i)

# Clear bit i
def clear_bit(n, i):
    return n & ~(1 << i)

# Toggle bit i
def toggle_bit(n, i):
    return n ^ (1 << i)

# POWER OF 2 — O(1)
def is_power_of_two(n):
    return n > 0 and (n & (n-1)) == 0

# COUNT SET BITS — Brian Kernighan
def count_bits(n):
    count = 0
    while n:
        n &= (n-1)   # removes lowest set bit
        count += 1
    return count

# SINGLE NUMBER — find number appearing once (rest appear twice)
def single_number(nums):
    result = 0
    for n in nums:
        result ^= n   # a^a=0, a^0=a
    return result

# MISSING NUMBER — [0..n] with one missing
def missing_number(nums):
    n = len(nums)
    return n*(n+1)//2 - sum(nums)
    # Or XOR approach: XOR all indices and values

# SUBSETS using bitmask
def subsets_bitmask(nums):
    n = len(nums)
    result = []
    for mask in range(1 << n):   # 0 to 2^n - 1
        subset = [nums[i] for i in range(n) if mask & (1 << i)]
        result.append(subset)
    return result

# ADD WITHOUT + operator
def add(a, b):
    while b:
        carry = a & b
        a = a ^ b
        b = carry << 1
    return a`,
  },
  {
    id: 32, emoji: "🗂️", title: "Monotonic Stack & Queue", color: T.blue,
    theory: [
      "A monotonic stack maintains elements in a strictly increasing or decreasing order as you push.",
      "When a new element violates the monotonic property, pop until it's restored. The popped elements can't be the answer to future queries.",
      "Monotonic queue (deque) is used for sliding window maximum/minimum in O(n) total.",
      "Key insight: each element is pushed and popped at most once — total O(n) time.",
    ],
    notes: [
      "Increasing stack: useful for 'next smaller element', 'largest rectangle in histogram'.",
      "Decreasing stack: useful for 'next greater element', 'daily temperatures'.",
      "Daily temperatures: for each day, how many days until warmer temperature? Decreasing stack.",
      "Largest rectangle in histogram: for each bar, find the nearest shorter bars on both sides — increasing stack.",
    ],
    code: `# NEXT GREATER ELEMENT — O(n) with monotonic stack
def next_greater_element(nums):
    result = [-1] * len(nums)
    stack = []  # stores indices, decreasing values
    for i, val in enumerate(nums):
        while stack and nums[stack[-1]] < val:
            result[stack.pop()] = val
        stack.append(i)
    return result

# DAILY TEMPERATURES
def daily_temperatures(temps):
    result = [0] * len(temps)
    stack = []  # indices with decreasing temperatures
    for i, t in enumerate(temps):
        while stack and temps[stack[-1]] < t:
            j = stack.pop()
            result[j] = i - j
        stack.append(i)
    return result

# LARGEST RECTANGLE IN HISTOGRAM — O(n)
def largest_rectangle(heights):
    stack = [-1]   # sentinel
    max_area = 0
    for i, h in enumerate(heights):
        while stack[-1] != -1 and heights[stack[-1]] >= h:
            height = heights[stack.pop()]
            width = i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    while stack[-1] != -1:
        height = heights[stack.pop()]
        width = len(heights) - stack[-1] - 1
        max_area = max(max_area, height * width)
    return max_area

# SUM OF SUBARRAY MINIMUMS — contribution technique
def sum_subarray_mins(arr):
    MOD = 10**9 + 7
    n = len(arr)
    left = [0] * n   # nearest smaller to left
    right = [0] * n  # nearest smaller or equal to right
    stack = []
    for i in range(n):
        while stack and arr[stack[-1]] >= arr[i]: stack.pop()
        left[i] = i - (stack[-1] if stack else -1)
        stack.append(i)
    stack = []
    for i in range(n-1, -1, -1):
        while stack and arr[stack[-1]] > arr[i]: stack.pop()
        right[i] = (stack[-1] if stack else n) - i
        stack.append(i)
    return sum(a * l * r for a, l, r in zip(arr, left, right)) % MOD`,
  },
  {
    id: 33, emoji: "🔢", title: "Math & Number Theory", color: T.accent,
    theory: [
      "Number theory problems appear often: GCD, LCM, prime checking, prime factorization, modular arithmetic.",
      "GCD (Greatest Common Divisor): Euclidean algorithm gcd(a, b) = gcd(b, a % b). O(log(min(a,b))).",
      "Sieve of Eratosthenes: find all primes up to N in O(N log log N).",
      "Modular arithmetic: (a + b) % m = ((a % m) + (b % m)) % m. Essential for large number problems.",
    ],
    notes: [
      "Python has math.gcd() built-in. LCM = a * b // gcd(a, b).",
      "Fast power (exponentiation by squaring): compute a^b mod m in O(log b). pow(a, b, m) in Python.",
      "For n! mod p where p is prime, use Wilson's theorem or precompute factorials.",
      "Chinese Remainder Theorem (CRT): solve system of congruences.",
    ],
    code: `import math

# GCD — Euclidean algorithm
def gcd(a, b):
    while b:
        a, b = b, a % b
    return a

def lcm(a, b):
    return a * b // gcd(a, b)

# Is prime — O(sqrt(n))
def is_prime(n):
    if n < 2: return False
    if n < 4: return True
    if n % 2 == 0 or n % 3 == 0: return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i+2) == 0: return False
        i += 6
    return True

# SIEVE OF ERATOSTHENES — all primes up to n
def sieve(n):
    is_prime = [True] * (n+1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5)+1):
        if is_prime[i]:
            for j in range(i*i, n+1, i):
                is_prime[j] = False
    return [i for i in range(2, n+1) if is_prime[i]]

# FAST POWER — Python built-in handles this!
result = pow(2, 10, 1000)    # 2^10 mod 1000 = 24

# Manual implementation
def fast_pow(base, exp, mod):
    result = 1
    base %= mod
    while exp > 0:
        if exp % 2 == 1:
            result = result * base % mod
        exp //= 2
        base = base * base % mod
    return result

# UNIQUE PATHS — combinatorics
def unique_paths(m, n):
    # C(m+n-2, m-1) = (m+n-2)! / ((m-1)! * (n-1)!)
    return math.comb(m+n-2, m-1)`,
  },
  {
    id: 34, emoji: "🎪", title: "Prefix Sum & Difference Array", color: T.red,
    theory: [
      "Prefix sum allows range sum queries in O(1) after O(n) preprocessing.",
      "prefix[i] = arr[0] + arr[1] + ... + arr[i]. Sum of arr[l..r] = prefix[r] - prefix[l-1].",
      "2D prefix sum enables O(1) rectangle sum queries in a grid.",
      "Difference array enables O(1) range updates: add val to arr[l..r] by marking +val at l and -val at r+1.",
    ],
    notes: [
      "Subarray sum equals k: use prefix sum + hashmap to count subarrays in O(n).",
      "Number of subarrays with sum divisible by k: prefix mod k + hashmap.",
      "2D prefix: prefix[i][j] = grid[i][j] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1].",
      "Difference arrays are great for 'add v to range [l,r]' type problems with multiple updates.",
    ],
    code: `# 1D PREFIX SUM
def build_prefix(arr):
    n = len(arr)
    prefix = [0] * (n+1)
    for i in range(n):
        prefix[i+1] = prefix[i] + arr[i]
    return prefix

def range_sum(prefix, l, r):  # [l, r] inclusive
    return prefix[r+1] - prefix[l]

# SUBARRAY SUM EQUALS K
def subarray_sum_k(nums, k):
    count = 0
    prefix = 0
    freq = {0: 1}
    for n in nums:
        prefix += n
        count += freq.get(prefix - k, 0)
        freq[prefix] = freq.get(prefix, 0) + 1
    return count

# 2D PREFIX SUM
def build_2d_prefix(grid):
    rows, cols = len(grid), len(grid[0])
    prefix = [[0]*(cols+1) for _ in range(rows+1)]
    for i in range(1, rows+1):
        for j in range(1, cols+1):
            prefix[i][j] = (grid[i-1][j-1]
                           + prefix[i-1][j]
                           + prefix[i][j-1]
                           - prefix[i-1][j-1])
    return prefix

def rect_sum(prefix, r1, c1, r2, c2):  # (r1,c1) to (r2,c2) inclusive
    return (prefix[r2+1][c2+1]
           - prefix[r1][c2+1]
           - prefix[r2+1][c1]
           + prefix[r1][c1])

# DIFFERENCE ARRAY — range update in O(1)
def range_add(diff, l, r, val):
    diff[l] += val
    if r + 1 < len(diff):
        diff[r+1] -= val

def build_from_diff(diff):
    result = []
    cur = 0
    for d in diff:
        cur += d
        result.append(cur)
    return result`,
  },
  {
    id: 35, emoji: "🏆", title: "Interview Patterns & Tips", color: T.gold,
    theory: [
      "Recognizing patterns is the real skill. Given a problem type, you should immediately think of the matching technique.",
      "Frequency / grouping / lookup → HashMap or Counter. Range minimum/maximum → Segment tree or sparse table.",
      "Cycle detection in linked list / functional graph → Fast & Slow pointers. Shortest path → BFS (unweighted) or Dijkstra (weighted).",
      "Optimization (min/max something) → DP or Greedy. All possibilities/paths → Backtracking. Sorted data → Binary Search or Two Pointer.",
    ],
    notes: [
      "After reading a problem: identify input type, what's asked, constraints (n size tells you target time complexity).",
      "n ≤ 20: O(2ⁿ) or O(n!) okay. n ≤ 500: O(n²) okay. n ≤ 10⁵: O(n log n) needed. n ≤ 10⁶: O(n) only.",
      "Talk through your approach before coding. Mention time/space complexity. Handle edge cases.",
      "Python tips: use collections (Counter, defaultdict, deque), heapq, itertools, functools.lru_cache.",
    ],
    code: `# PATTERN CHEAT SHEET

# 1. Frequency / counting → Counter + dict
from collections import Counter
freq = Counter([1,1,2,3,3,3])  # {3:3, 1:2, 2:1}

# 2. Sliding window → two pointers + window state
def sliding_template(arr, k):
    left = 0
    for right in range(len(arr)):
        # expand window with arr[right]
        while "condition violated":
            # shrink from left
            left += 1
        # update answer here

# 3. Binary search on answer → feasibility function
def binary_search_answer(lo, hi):
    while lo < hi:
        mid = (lo + hi) // 2
        if feasible(mid): hi = mid
        else: lo = mid + 1
    return lo

# 4. BFS / multi-source BFS
from collections import deque
def multi_source_bfs(grid, sources):
    q = deque(sources)
    visited = set(sources)
    dist = {s: 0 for s in sources}
    while q:
        node = q.popleft()
        for neighbor in get_neighbors(node):
            if neighbor not in visited:
                visited.add(neighbor)
                dist[neighbor] = dist[node] + 1
                q.append(neighbor)

# 5. Backtracking template
def backtrack(state, choices):
    if is_complete(state):
        record(state); return
    for choice in choices:
        if is_valid(choice, state):
            make(choice, state)      # choose
            backtrack(state, choices)  # explore
            undo(choice, state)      # unchoose

# 6. DP template
def dp_template(arr):
    n = len(arr)
    dp = [base_case] * (n + 1)
    for i in range(1, n + 1):
        for j in range(i):    # or just previous state
            dp[i] = transition(dp[i], dp[j], arr)
    return dp[n]`,
  },
];

// ─── Interview Definitions ───────────────────────────────────────────────────
const interviewCategories = [
  {
    label: "Basics", emoji: "🐍", color: T.accent,
    terms: [
      { term: "Time Complexity", simple: "How much time an algorithm takes as input grows.", technical: "Big-O notation describes the upper-bound growth rate of an algorithm's running time, ignoring constants and lower-order terms, as input size n approaches infinity.", tip: "Always state complexity after every solution. Mention both time and space." },
      { term: "Space Complexity", simple: "How much extra memory an algorithm uses as input grows.", technical: "Auxiliary space complexity counts only the extra space used beyond the input. O(1) = constant, O(n) = linear, O(log n) = recursion stack in balanced D&C.", tip: "Interview tip: can you optimize the space? Many DP solutions can reduce from O(n) to O(1) by only keeping last 1-2 rows." },
      { term: "Mutable vs Immutable", simple: "Mutable = can change after creation. Immutable = cannot.", technical: "In Python: list, dict, set are mutable. int, float, str, tuple, frozenset are immutable. Immutable objects can be dict keys or set elements (they're hashable). Mutable objects cannot.", tip: "Common bug: using a mutable default argument in a function definition. Default args are evaluated once." },
      { term: "Pass by Object Reference", simple: "Python passes references to objects, not copies.", technical: "When you pass a mutable object (list, dict) to a function, the function can modify it. When you reassign the parameter inside the function, the original isn't affected. Use obj[:] = new_list to replace in place.", tip: "Draw a box-and-arrow diagram to explain this. Very common interview follow-up." },
    ],
  },
  {
    label: "Data Structures", emoji: "🏗️", color: T.gold,
    terms: [
      { term: "Hash Table Collision", simple: "When two different keys hash to the same bucket.", technical: "Handled by chaining (linked list at each bucket) or open addressing (probe to next empty slot). Load factor = n/m where n = entries, m = buckets. Python's dict resizes at ~67% load factor.", tip: "Know both strategies. Mention that Python uses open addressing with a compact hash table." },
      { term: "Balanced BST", simple: "A BST that keeps itself short so operations stay fast.", technical: "A balanced BST guarantees O(log n) height by rebalancing on insert/delete. AVL trees maintain height difference ≤ 1 between subtrees. Red-Black trees are less strictly balanced but easier to implement. Python's sortedcontainers.SortedList uses a variant.", tip: "If asked for O(log n) insert+search+delete with order, think balanced BST or sorted list." },
      { term: "Amortized O(1)", simple: "Most operations are O(1), occasional expensive ones are averaged out.", technical: "Dynamic array (Python list) doubling: each append is O(1) amortized because we double capacity (2x) each time. Total cost of n appends = O(n), so per append = O(1). Potential method proves this formally.", tip: "Explain with the bank account analogy: save credit on cheap operations to pay for expensive ones." },
      { term: "LRU Cache", simple: "Cache that evicts the least recently used item when full.", technical: "Implemented with an OrderedDict (Python) or doubly-linked list + hash map. Get and put both O(1). Move accessed node to front. Evict from back when over capacity.", tip: "Follow-up: implement from scratch. Key insight: dict for O(1) lookup, DLL for O(1) eviction." },
    ],
  },
  {
    label: "Algorithms", emoji: "⚙️", color: T.blue,
    terms: [
      { term: "DP vs Greedy", simple: "DP tries all options and picks the best. Greedy always picks the local best.", technical: "DP: optimal substructure + overlapping subproblems → store all subproblem results. Greedy: optimal substructure + greedy choice property → one pass. DP always correct; greedy only correct for specific problems (prove via exchange argument).", tip: "Fractional knapsack → greedy. 0/1 knapsack → DP. If you can prove the greedy choice never hurts globally, greedy works." },
      { term: "BFS vs DFS", simple: "BFS explores level by level. DFS goes as deep as possible first.", technical: "BFS: queue, O(V+E), finds shortest path in unweighted graph, good for level-order problems. DFS: stack/recursion, O(V+E), good for cycle detection, topological sort, backtracking, connected components.", tip: "BFS = shortest path, levels. DFS = all paths, cycles, backtracking. Know both iterative versions." },
      { term: "Memoization vs Tabulation", simple: "Memoization: cache recursive results top-down. Tabulation: fill table bottom-up iteratively.", technical: "Memoization (top-down): natural recursion + @lru_cache. Only computes needed states. Tabulation (bottom-up): explicit loop filling dp array from base cases. No recursion stack. Usually faster in practice.", tip: "Start with memoization for clarity, then optimize to tabulation if recursion stack is an issue." },
      { term: "Stable Sort", simple: "Equal elements keep their relative original order after sorting.", technical: "Python's sort() and sorted() use Timsort — guaranteed stable. Merge sort is stable. Quick sort is not stable by default. Stability matters when sorting objects by multiple keys sequentially.", tip: "Python guarantees sort stability. Use key= parameter: sorted(students, key=lambda s: s.grade)." },
    ],
  },
  {
    label: "Advanced", emoji: "🔴", color: T.red,
    terms: [
      { term: "Segment Tree", simple: "Tree structure for fast range queries and point updates.", technical: "Segment tree supports O(log n) range sum/min/max queries and O(log n) point updates. Build in O(n). Use lazy propagation for O(log n) range updates. Space O(4n). Implemented as an array.", tip: "If problem needs both range queries AND updates, think segment tree. If only queries, prefix sum suffices." },
      { term: "P vs NP", simple: "P = problems quickly solvable. NP = problems quickly verifiable. We don't know if P = NP.", technical: "P: decision problems solvable in polynomial time. NP: solutions verifiable in polynomial time. NP-hard: at least as hard as any NP problem. NP-complete = NP ∩ NP-hard. Examples: SAT, 3-coloring, subset sum.", tip: "If a problem is NP-complete, use approximation algorithms or backtracking with pruning. Don't try to find polynomial solution." },
      { term: "Sliding Window vs Two Pointer", simple: "Both use two indices. Sliding window is for subarrays/substrings; two pointer is for sorted arrays or opposite ends.", technical: "Sliding window: maintain a contiguous window, track state (set, dict) of window contents, expand right/shrink left. Two pointer (opposite): works on sorted arrays, both ends move inward. Two pointer (same dir): fast/slow pointer for cycle detection or partitioning.", tip: "Sliding window always maintains a subarray. Two pointer may not (e.g., two separate arrays)." },
      { term: "Rolling Hash", simple: "Hash function computed incrementally — O(1) update by adding/removing one character.", technical: "Rabin-Karp uses rolling hash for O(n+m) pattern matching. hash(s[i..i+m-1]) computed from hash(s[i-1..i+m-2]) in O(1) using polynomial hashing: h = (h * base - remove * base^m + add) % mod.", tip: "Rolling hash is the key to O(n) substring problems. Python's built-in hash is not rolling — implement manually." },
    ],
  },
];

// ─── Navbar ──────────────────────────────────────────────────────────────────
function Navbar() {
  const loc = useLocation();
  const links = [
    { to: "/",            label: "🏠 Home" },
    { to: "/quick-review", label: "⚡ Quick Review" },
    { to: "/basic",       label: "🐍 Basics" },
    { to: "/ds",          label: "🏗️ Data Structures" },
    { to: "/algorithms",  label: "⚙️ Algorithms" },
    { to: "/interview",   label: "🎤 Interview" },
  ];
  return (
    <nav style={{
      background: T.surface,
      borderBottom: `1px solid ${T.border}`,
      padding: "0 24px",
      display: "flex", alignItems: "center",
      gap: "4px", flexWrap: "wrap",
      position: "sticky", top: 0, zIndex: 100,
    }}>
      <div style={{ color: T.heading, fontWeight: "800", fontSize: "20px", marginRight: "16px", padding: "14px 0", letterSpacing: "-0.5px" }}>
        🐍 PyDSA
      </div>
      {links.map(l => (
        <Link key={l.to} to={l.to} style={{
          padding: "14px 14px",
          color: loc.pathname === l.to ? T.heading : T.muted,
          textDecoration: "none",
          fontSize: "15px", fontWeight: "600",
          borderBottom: loc.pathname === l.to ? `2px solid ${T.heading}` : "2px solid transparent",
          transition: "all 0.15s",
        }}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function Home() {
  const cards = [
    { to: "/quick-review", emoji: "⚡", title: "Quick Review",   desc: "All 35 topics in 15 minutes. Perfect before an interview.", color: T.heading },
    { to: "/basic",        emoji: "🐍", title: "Python Basics",  desc: "Variables, Lists, Dicts, OOP, Recursion, Big-O.", color: T.accent },
    { to: "/ds",           emoji: "🏗️", title: "Data Structures", desc: "Arrays, Stack, Queue, Trees, Graphs, Trie, Union-Find.", color: T.gold },
    { to: "/algorithms",   emoji: "⚙️", title: "Algorithms",     desc: "Binary Search, DP, Backtracking, Greedy, Sorting, Dijkstra.", color: T.blue },
    { to: "/interview",    emoji: "🎤", title: "Interview Prep", desc: "Key definitions, simple + technical answers, interview tips.", color: T.purple },
  ];
  return (
    <div style={{ background: T.bg, minHeight: "100vh", padding: "60px 40px", fontFamily: "'Fira Code', 'Courier New', monospace" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ fontSize: "80px", marginBottom: "16px" }}>🐍</div>
          <h1 style={{ margin: "0 0 16px", fontSize: "52px", fontWeight: "900", color: T.heading, letterSpacing: "-1px" }}>
            Python DSA
          </h1>
          <p style={{ color: T.muted, fontSize: "22px", margin: "0 0 8px" }}>
            From absolute basics to advanced algorithms
          </p>
          <p style={{ color: T.text, fontSize: "17px", opacity: 0.7 }}>
            35 topics · Theory + Notes + Code examples
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {cards.map(c => (
            <Link key={c.to} to={c.to} style={{ textDecoration: "none" }}>
              <div style={{
                background: T.card, border: `1px solid ${T.border}`,
                borderTop: `3px solid ${c.color}`,
                borderRadius: "14px", padding: "28px",
                transition: "transform 0.15s, border-color 0.15s",
                cursor: "pointer",
              }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ fontSize: "36px", marginBottom: "14px" }}>{c.emoji}</div>
                <h3 style={{ margin: "0 0 10px", fontSize: "22px", color: c.color, fontWeight: "800" }}>{c.title}</h3>
                <p style={{ margin: 0, color: T.muted, fontSize: "16px", lineHeight: "1.6" }}>{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: "64px", padding: "32px", background: T.card, borderRadius: "14px", border: `1px solid ${T.border}` }}>
          <h3 style={{ margin: "0 0 20px", color: T.heading, fontSize: "22px" }}>📊 Coverage</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
            {[
              ["🐍 Python Basics", "8 topics", T.accent],
              ["🏗️ Data Structures", "12 topics", T.gold],
              ["⚙️ Algorithms", "15 topics", T.blue],
              ["🎤 Interview", "16 terms", T.purple],
            ].map(([label, count, color]) => (
              <div key={label} style={{ textAlign: "center", padding: "20px 16px", background: T.surface, borderRadius: "10px", border: `1px solid ${T.border}` }}>
                <div style={{ fontSize: "30px", marginBottom: "8px" }}>{label.split(" ")[0]}</div>
                <div style={{ color: color, fontWeight: "700", fontSize: "16px" }}>{label.split(" ").slice(1).join(" ")}</div>
                <div style={{ color: T.muted, fontSize: "14px", marginTop: "4px" }}>{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Quick Review ─────────────────────────────────────────────────────────────
function QuickReview() {
  const lines = quickReviewMD.split("\n");
  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: "'Fira Code', 'Courier New', monospace" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 32px" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>
          {[["🟢 Basics", T.accent], ["🟡 Data Structures", T.gold], ["🔴 Algorithms", T.red]].map(([label, color]) => (
            <span key={label} style={{ padding: "6px 16px", background: color + "22", border: `1px solid ${color}44`, borderRadius: "20px", color, fontSize: "14px" }}>{label}</span>
          ))}
        </div>
        {lines.map((line, i) => {
          if (line.startsWith("# ")) return <h1 key={i} style={{ color: T.heading, fontSize: "36px", margin: "0 0 16px", fontWeight: "900" }}>{line.slice(2)}</h1>;
          if (line.startsWith("## ")) return <h2 key={i} style={{ color: T.gold, fontSize: "26px", margin: "40px 0 16px", borderBottom: `1px solid ${T.border}`, paddingBottom: "8px" }}>{line.slice(3)}</h2>;
          if (line.startsWith("### ")) return <h3 key={i} style={{ color: T.accent, fontSize: "20px", margin: "24px 0 10px" }}>{line.slice(4)}</h3>;
          if (line.startsWith("> ")) return <blockquote key={i} style={{ borderLeft: `3px solid ${T.gold}`, paddingLeft: "16px", margin: "0 0 16px", color: T.muted, fontSize: "17px" }}>{line.slice(2)}</blockquote>;
          if (line.startsWith("- ")) return <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "8px", paddingLeft: "8px" }}><span style={{ color: T.accent, marginTop: "2px" }}>→</span><span style={{ color: T.text, lineHeight: "1.7", fontSize: "16px" }} dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/`([^`]+)`/g, `<code style="background:#1a2e1a;padding:2px 6px;border-radius:4px;color:${T.accent};font-size:14px">$1</code>`) }} /></div>;
          if (line.startsWith("---")) return <hr key={i} style={{ border: "none", borderTop: `1px solid ${T.border}`, margin: "24px 0" }} />;
          if (line.trim() === "") return <div key={i} style={{ height: "8px" }} />;
          if (line.startsWith("*")) return <p key={i} style={{ color: T.muted, fontSize: "15px", fontStyle: "italic" }}>{line.replace(/\*/g, "")}</p>;
          return <p key={i} style={{ color: T.text, lineHeight: "1.7", fontSize: "16px", marginBottom: "8px" }} dangerouslySetInnerHTML={{ __html: line.replace(/`([^`]+)`/g, `<code style="background:#1a2e1a;padding:2px 6px;border-radius:4px;color:${T.accent};font-size:14px">$1</code>`).replace(/\*\*([^*]+)\*\*/g, `<strong style="color:${T.text}">$1</strong>`) }} />;
        })}
      </div>
    </div>
  );
}

// ─── Shared Topic Viewer ──────────────────────────────────────────────────────
function TopicViewer({ topics, sectionLabel, sectionRange }) {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState("theory");
  const topic = topics[selected];

  return (
    <div style={{ fontFamily: "'Fira Code', 'Courier New', monospace", background: T.bg, minHeight: "100vh", display: "flex", color: T.text }}>
      {/* Sidebar */}
      <div style={{ width: "240px", minWidth: "240px", background: T.surface, borderRight: `1px solid ${T.border}`, overflowY: "auto", padding: "16px 0" }}>
        <div style={{ padding: "0 18px 18px", borderBottom: `1px solid ${T.border}`, marginBottom: "8px" }}>
          <div style={{ fontSize: "12px", color: T.muted, letterSpacing: "2px", textTransform: "uppercase" }}>{sectionLabel}</div>
          <div style={{ fontSize: "20px", fontWeight: "800", color: T.heading, marginTop: "4px" }}>{sectionRange}</div>
        </div>
        {topics.map((t, i) => (
          <button key={t.id} onClick={() => { setSelected(i); setTab("theory"); }} style={{
            display: "flex", alignItems: "center", gap: "10px",
            width: "100%", padding: "12px 18px",
            background: selected === i ? T.card : "transparent",
            border: "none",
            borderLeft: selected === i ? `3px solid ${t.color}` : "3px solid transparent",
            color: selected === i ? T.text : T.muted,
            cursor: "pointer", textAlign: "left", fontSize: "14px", transition: "all 0.15s",
          }}>
            <span style={{ fontSize: "18px" }}>{t.emoji}</span>
            <span style={{ lineHeight: "1.3", fontWeight: selected === i ? "700" : "400" }}>{t.id}. {t.title}</span>
          </button>
        ))}
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Header */}
        <div style={{ padding: "32px 36px 20px", borderBottom: `1px solid ${T.border}`, background: T.bg, position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "18px" }}>
            <span style={{ fontSize: "36px" }}>{topic.emoji}</span>
            <div>
              <span style={{ fontSize: "13px", color: T.muted, letterSpacing: "1px" }}>TOPIC {topic.id}</span>
              <h1 style={{ margin: 0, fontSize: "28px", color: topic.color, fontWeight: "900" }}>{topic.title}</h1>
            </div>
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            {["theory", "notes", "code"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "8px 20px", borderRadius: "8px", border: "1px solid",
                borderColor: tab === t ? topic.color : T.border,
                background: tab === t ? topic.color + "22" : "transparent",
                color: tab === t ? topic.color : T.muted,
                cursor: "pointer", fontSize: "14px", fontFamily: "inherit",
                textTransform: "capitalize", fontWeight: tab === t ? "700" : "400",
              }}>
                {t === "theory" ? "📖 Theory" : t === "notes" ? "📌 Notes" : "💻 Code"}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "32px 36px" }}>
          {tab === "theory" && (
            <div>
              {topic.theory.map((point, i) => (
                <div key={i} style={{
                  display: "flex", gap: "16px", marginBottom: "16px",
                  padding: "20px", background: T.card, borderRadius: "12px",
                  border: `1px solid ${T.border}`, borderLeft: `4px solid ${topic.color}`,
                }}>
                  <span style={{ color: topic.color, fontWeight: "800", fontSize: "18px", minWidth: "26px" }}>{i + 1}.</span>
                  <p style={{ margin: 0, color: T.text, lineHeight: "1.8", fontSize: "17px" }}>{point}</p>
                </div>
              ))}
            </div>
          )}
          {tab === "notes" && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: "12px", padding: "24px" }}>
              {topic.notes.map((note, i) => (
                <div key={i} style={{
                  display: "flex", gap: "12px", padding: "14px 0",
                  borderBottom: i < topic.notes.length - 1 ? `1px solid ${T.border}` : "none",
                }}>
                  <span style={{ color: topic.color, fontSize: "20px", marginTop: "2px" }}>→</span>
                  <p style={{ margin: 0, color: T.text, lineHeight: "1.8", fontSize: "17px" }}>{note}</p>
                </div>
              ))}
            </div>
          )}
          {tab === "code" && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ background: T.surface, padding: "12px 18px", display: "flex", alignItems: "center", gap: "8px", borderBottom: `1px solid ${T.border}` }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
                <span style={{ fontSize: "14px", color: T.muted, marginLeft: "8px" }}>example.py</span>
              </div>
              <pre style={{ margin: 0, padding: "24px", overflowX: "auto", fontSize: "15px", lineHeight: "1.9", color: T.text, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                <code>{topic.code}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 36px 40px", gap: "12px" }}>
          <button onClick={() => { setSelected(Math.max(0, selected - 1)); setTab("theory"); }} disabled={selected === 0}
            style={{ padding: "12px 24px", borderRadius: "10px", border: `1px solid ${T.border}`, background: selected === 0 ? T.card : T.surface, color: selected === 0 ? T.muted : T.text, cursor: selected === 0 ? "not-allowed" : "pointer", fontSize: "16px", fontFamily: "inherit", fontWeight: "600" }}>
            ← Previous
          </button>
          <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
            {topics.map((_, i) => (
              <div key={i} onClick={() => { setSelected(i); setTab("theory"); }} style={{
                width: selected === i ? "22px" : "9px", height: "9px", borderRadius: "5px",
                background: selected === i ? topic.color : T.border, cursor: "pointer", transition: "all 0.2s",
              }} />
            ))}
          </div>
          <button onClick={() => { setSelected(Math.min(topics.length - 1, selected + 1)); setTab("theory"); }} disabled={selected === topics.length - 1}
            style={{ padding: "12px 24px", borderRadius: "10px", border: `1px solid ${T.border}`, background: selected === topics.length - 1 ? T.card : T.surface, color: selected === topics.length - 1 ? T.muted : T.text, cursor: selected === topics.length - 1 ? "not-allowed" : "pointer", fontSize: "16px", fontFamily: "inherit", fontWeight: "600" }}>
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Interview Defs ───────────────────────────────────────────────────────────
function InterviewDefs() {
  const [activeCat, setActiveCat] = useState(0);
  const [activeTerm, setActiveTerm] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const cat = interviewCategories[activeCat];
  const item = cat.terms[activeTerm];
  let globalIndex = 0;
  for (let i = 0; i < activeCat; i++) globalIndex += interviewCategories[i].terms.length;
  globalIndex += activeTerm + 1;
  const totalTerms = interviewCategories.reduce((s, c) => s + c.terms.length, 0);

  function nextTerm() {
    if (activeTerm < cat.terms.length - 1) { setActiveTerm(activeTerm + 1); setShowTip(false); }
    else if (activeCat < interviewCategories.length - 1) { setActiveCat(activeCat + 1); setActiveTerm(0); setShowTip(false); }
  }
  function prevTerm() {
    if (activeTerm > 0) { setActiveTerm(activeTerm - 1); setShowTip(false); }
    else if (activeCat > 0) {
      const prev = interviewCategories[activeCat - 1];
      setActiveCat(activeCat - 1); setActiveTerm(prev.terms.length - 1); setShowTip(false);
    }
  }

  return (
    <div style={{ fontFamily: "'Fira Code', 'Courier New', monospace", background: T.bg, minHeight: "100vh", display: "flex", flexDirection: "column", color: T.text }}>
      {/* Top bar */}
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${T.border}`, background: T.surface, display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: "13px", color: T.muted, letterSpacing: "2px", textTransform: "uppercase" }}>Python DSA Interview</div>
          <div style={{ fontSize: "20px", fontWeight: "800", color: T.heading }}>Key Definitions</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {interviewCategories.map((c, i) => (
            <button key={i} onClick={() => { setActiveCat(i); setActiveTerm(0); setShowTip(false); }} style={{
              padding: "6px 14px", borderRadius: "20px", border: "1px solid",
              borderColor: activeCat === i ? c.color : T.border,
              background: activeCat === i ? c.color + "22" : "transparent",
              color: activeCat === i ? c.color : T.muted,
              cursor: "pointer", fontSize: "14px", fontFamily: "inherit", fontWeight: activeCat === i ? "700" : "400",
            }}>{c.emoji} {c.label}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: "220px", minWidth: "220px", background: T.surface, borderRight: `1px solid ${T.border}`, overflowY: "auto", padding: "8px 0" }}>
          {cat.terms.map((t, i) => (
            <button key={i} onClick={() => { setActiveTerm(i); setShowTip(false); }} style={{
              display: "block", width: "100%", padding: "12px 16px",
              background: activeTerm === i ? T.card : "transparent",
              border: "none", borderLeft: activeTerm === i ? `3px solid ${cat.color}` : "3px solid transparent",
              color: activeTerm === i ? T.text : T.muted, cursor: "pointer", textAlign: "left", fontSize: "15px",
              fontWeight: activeTerm === i ? "700" : "400",
            }}>{t.term}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 36px" }}>
          {/* Progress */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
            <span style={{ fontSize: "14px", color: T.muted }}>{globalIndex} / {totalTerms}</span>
            <div style={{ flex: 1, height: "5px", background: T.card, borderRadius: "3px" }}>
              <div style={{ height: "5px", borderRadius: "3px", background: cat.color, width: `${(globalIndex / totalTerms) * 100}%`, transition: "width 0.3s" }} />
            </div>
            <span style={{ fontSize: "14px", color: cat.color, fontWeight: "700" }}>{cat.label}</span>
          </div>

          {/* Term card */}
          <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: "14px", padding: "28px 32px", marginBottom: "20px", borderTop: `4px solid ${cat.color}` }}>
            <h2 style={{ margin: "0 0 24px", fontSize: "30px", color: cat.color, fontWeight: "900" }}>{item.term}</h2>

            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "12px", letterSpacing: "2px", color: T.muted, textTransform: "uppercase", marginBottom: "10px" }}>🗣️ Simple Answer (1 sentence)</div>
              <p style={{ margin: 0, color: T.text, lineHeight: "1.8", fontSize: "18px", padding: "16px 20px", background: T.bg, borderRadius: "10px", borderLeft: `4px solid ${cat.color}` }}>{item.simple}</p>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "12px", letterSpacing: "2px", color: T.muted, textTransform: "uppercase", marginBottom: "10px" }}>💻 Technical Answer</div>
              <p style={{ margin: 0, color: T.text, lineHeight: "1.8", fontSize: "17px", padding: "16px 20px", background: T.bg, borderRadius: "10px", borderLeft: `4px solid ${T.border}` }}>{item.technical}</p>
            </div>

            <button onClick={() => setShowTip(!showTip)} style={{
              padding: "10px 20px", borderRadius: "10px",
              border: `1px solid ${showTip ? T.gold : T.border}`,
              background: showTip ? T.gold + "22" : "transparent",
              color: showTip ? T.gold : T.muted,
              cursor: "pointer", fontSize: "15px", fontFamily: "inherit", fontWeight: "600",
            }}>{showTip ? "Hide" : "Show"} Interview Tip 💡</button>

            {showTip && (
              <div style={{ marginTop: "14px", padding: "16px 20px", background: T.gold + "11", border: `1px solid ${T.gold}44`, borderRadius: "10px", color: T.gold, fontSize: "16px", lineHeight: "1.8" }}>
                💡 {item.tip}
              </div>
            )}
          </div>

          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
            <button onClick={prevTerm} disabled={activeCat === 0 && activeTerm === 0}
              style={{ padding: "12px 24px", borderRadius: "10px", border: `1px solid ${T.border}`, background: T.surface, color: T.text, cursor: "pointer", fontSize: "16px", fontFamily: "inherit", fontWeight: "600", opacity: activeCat === 0 && activeTerm === 0 ? 0.4 : 1 }}>
              ← Previous
            </button>
            <div style={{ display: "flex", gap: "6px", alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
              {cat.terms.map((_, i) => (
                <div key={i} onClick={() => { setActiveTerm(i); setShowTip(false); }} style={{
                  width: activeTerm === i ? "22px" : "9px", height: "9px", borderRadius: "5px",
                  background: activeTerm === i ? cat.color : T.border, cursor: "pointer", transition: "all 0.2s",
                }} />
              ))}
            </div>
            <button onClick={nextTerm} disabled={activeCat === interviewCategories.length - 1 && activeTerm === cat.terms.length - 1}
              style={{ padding: "12px 24px", borderRadius: "10px", border: `1px solid ${T.border}`, background: T.surface, color: T.text, cursor: "pointer", fontSize: "16px", fontFamily: "inherit", fontWeight: "600", opacity: activeCat === interviewCategories.length - 1 && activeTerm === cat.terms.length - 1 ? 0.4 : 1 }}>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"            element={<Home />} />
        <Route path="/quick-review" element={<QuickReview />} />
        <Route path="/basic"       element={<TopicViewer topics={basicTopics} sectionLabel="Python Basics" sectionRange="Topics 1–8" />} />
        <Route path="/ds"          element={<TopicViewer topics={dsTopics} sectionLabel="Data Structures" sectionRange="Topics 9–20" />} />
        <Route path="/algorithms"  element={<TopicViewer topics={algoTopics} sectionLabel="Algorithms" sectionRange="Topics 21–35" />} />
        <Route path="/interview"   element={<InterviewDefs />} />
      </Routes>
    </Router>
  );
}
