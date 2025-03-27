```markdown
# Golang: Basics to Advanced

This document outlines Golang concepts from basic to advanced, suitable for learning and reference.

## Basics

### 1. Setup and Hello World

* **Installation:** Download and install Go from [golang.org](https://golang.org/).
* **Environment Setup:** Configure `GOPATH` and `GOROOT` (though `GOPATH` is less relevant with modules).
* **Hello World:**

    ```go
    package main

    import "fmt"

    func main() {
        fmt.Println("Hello, World!")
    }
    ```

    * `go run main.go` to execute.
    * `go build main.go` to create an executable.

### 2. Variables and Data Types

* **Variables:**
    * Declaration: `var name string = "John"` or `name := "John"` (short variable declaration).
    * Zero values: Variables declared without an initial value are assigned a zero value (e.g., `0` for integers, `""` for strings, `false` for booleans).
* **Data Types:**
    * `int`, `int8`, `int16`, `int32`, `int64`
    * `uint`, `uint8`, `uint16`, `uint32`, `uint64`, `uintptr`
    * `float32`, `float64`
    * `complex64`, `complex128`
    * `bool`
    * `string`
    * `rune` (alias for `int32`, representing a Unicode code point)
    * `byte` (alias for `uint8`)

### 3. Control Flow

* **`if` statements:**

    ```go
    if condition {
        // code
    } else if condition2 {
        // code
    } else {
        // code
    }
    ```

* **`for` loops:**

    ```go
    for i := 0; i < 10; i++ {
        // code
    }

    for condition {
        // code
    }

    for {
        // infinite loop
    }
    ```

* **`switch` statements:**

    ```go
    switch expression {
    case value1:
        // code
    case value2:
        // code
    default:
        // code
    }
    ```

### 4. Arrays and Slices

* **Arrays:** Fixed-size sequences.

    ```go
    var arr [5]int
    arr := [5]int{1, 2, 3, 4, 5}
    ```

* **Slices:** Dynamically sized sequences.

    ```go
    slice := []int{1, 2, 3}
    slice = append(slice, 4)
    ```

* **`make` function:** Used to create slices and maps.
    * `make([]int, length, capacity)`

### 5. Maps

* Key-value pairs.

    ```go
    m := make(map[string]int)
    m["key"] = 10
    value, ok := m["key"] // ok checks if key exists
    ```

### 6. Functions

* Defining functions:

    ```go
    func add(x, y int) int {
        return x + y
    }

    func multipleReturns(x, y int) (int, string) {
        return x + y, "sum"
    }
    ```

* Variadic functions:

    ```go
    func sum(nums ...int) int {
        // ...
    }
    ```

### 7. Pointers

* Pointers store memory addresses.

    ```go
    var x int = 10
    var ptr *int = &x
    fmt.Println(*ptr) // Dereferencing
    ```

### 8. Structs

* Custom data types.

    ```go
    type Person struct {
        Name string
        Age  int
    }

    p := Person{Name: "Alice", Age: 30}
    ```

### 9. Methods

* Functions associated with a type.

    ```go
    func (p Person) greet() string {
        return "Hello, " + p.Name
    }
    ```

### 10. Interfaces

* Define sets of method signatures.

    ```go
    type Greeter interface {
        greet() string
    }

    func sayHello(g Greeter) {
        fmt.Println(g.greet())
    }
    ```

## Advanced

### 11. Goroutines and Concurrency

* **Goroutines:** Lightweight threads managed by Go runtime.

    ```go
    go func() {
        // code
    }()
    ```

* **Channels:** Used for communication between goroutines.

    ```go
    ch := make(chan int)
    go func() {
        ch <- 10
    }()
    value := <-ch
    ```

* **Buffered Channels:**

    ```go
    ch := make(chan int, 10)
    ```

* **Select Statements:** Used to multiplex channels.

    ```go
    select {
    case msg1 := <-ch1:
        // code
    case msg2 := <-ch2:
        // code
    default:
        // code
    }
    ```

* **Mutexes:** Used for synchronization.

    ```go
    var mu sync.Mutex
    mu.Lock()
    // critical section
    mu.Unlock()
    ```

* **WaitGroups:** Used to wait for goroutines to finish.

    ```go
    var wg sync.WaitGroup
    wg.Add(1)
    go func() {
        // code
        wg.Done()
    }()
    wg.Wait()
    ```

### 12. Errors

* Error handling:

    ```go
    func divide(x, y int) (int, error) {
        if y == 0 {
            return 0, fmt.Errorf("division by zero")
        }
        return x / y, nil
    }
    ```

### 13. Defer, Panic, and Recover

* **`defer`:** Used to schedule a function call to be executed after the surrounding function returns.

    ```go
    defer file.Close()
    ```

* **`panic`:** Used to indicate a fatal error.

    ```go
    panic("error message")
    ```

* **`recover`:** Used to handle panics.

    ```go
    func handlePanic() {
        if r := recover(); r != nil {
            fmt.Println("Recovered:", r)
        }
    }
    defer handlePanic()
    ```

### 14. Packages and Modules

* **Packages:** Used to organize code.
* **Modules:** Used for dependency management.
    * `go mod init <module_name>`
    * `go get <package>`

### 15. Reflection

* Used to inspect variables and types at runtime.

    ```go
    import "reflect"

    typeOf := reflect.TypeOf(someVariable)
    valueOf := reflect.ValueOf(someVariable)
    ```

### 16. Context

* Used for request-scoped values, cancellation, and timeouts.

    ```go
    import "context"

    ctx, cancel := context.WithCancel(context.Background())
    defer cancel()

    ctx, timeoutCancel := context.WithTimeout(context.Background(), time.Second)
    defer timeoutCancel()
    ```

### 17. Testing

* Built-in testing support.

    ```go
    // file: mypackage_test.go
    import "testing"

    func TestAdd(t *testing.T) {
        result := add(1, 2)
        if result != 3 {
            t.Errorf("Expected 3, got %d", result)
        }
    }
    ```

    * `go test` to run tests.

### 18. Embedding

* Embedding structs or interfaces into other structs.

    ```go
    type Animal struct {
        Name string
    }

    type Dog struct {
        Animal
        Breed string
    }
    ```

### 19. Generics (Go 1.18+)

* Allows writing functions and types that can work with any type.

    ```go
    func genericPrint[T any](s []T) {
        for _, v := range s {
            fmt.Println(v)
        }
    }
    ```

# Golang: Basics to Advanced

## Table of Contents
1. [Introduction](#introduction)
2. [Basic Syntax](#basic-syntax)
3. [Data Types](#data-types)
4. [Control Structures](#control-structures)
5. [Functions](#functions)
6. [Pointers](#pointers)
7. [Structs](#structs)
8. [Interfaces](#interfaces)
9. [Concurrency](#concurrency)
10. [Error Handling](#error-handling)
11. [Advanced Topics](#advanced-topics)
12. [Best Practices](#best-practices)

---

## Introduction

Go (Golang) is a statically typed, compiled programming language designed at Google. It's known for:
- Simplicity
- Fast compilation
- Built-in concurrency
- Garbage collection
- Strong standard library

### Installation
```bash
# Download from https://golang.org/dl/
# Verify installation
go version
```

### Hello World
```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}
```

---

## Basic Syntax

### Packages
- Every Go file belongs to a package
- `main` package is the entry point

### Imports
```go
import (
    "fmt"
    "math"
)
```

### Variables
```go
var name string = "Go"
var age = 10 // Type inference
shortHand := true // Only inside functions
```

### Constants
```go
const Pi = 3.14
const (
    StatusOK = 200
    StatusNotFound = 404
)
```

---

## Data Types

### Basic Types
- `bool`
- `string`
- `int`, `int8`, `int16`, `int32`, `int64`
- `uint`, `uint8`, `uint16`, `uint32`, `uint64`, `uintptr`
- `byte` (alias for uint8)
- `rune` (alias for int32, represents a Unicode code point)
- `float32`, `float64`
- `complex64`, `complex128`

### Zero Values
- `0` for numeric types
- `false` for bool
- `""` for strings

### Type Conversion
```go
var i int = 42
var f float64 = float64(i)
var u uint = uint(f)
```

---

## Control Structures

### If-Else
```go
if x > 0 {
    return "positive"
} else if x < 0 {
    return "negative"
} else {
    return "zero"
}
```

### For Loop
```go
// Traditional for
for i := 0; i < 10; i++ {
    fmt.Println(i)
}

// While equivalent
sum := 1
for sum < 1000 {
    sum += sum
}

// Infinite loop
for {
    // ...
}
```

### Switch
```go
switch os := runtime.GOOS; os {
case "darwin":
    fmt.Println("macOS")
case "linux":
    fmt.Println("Linux")
default:
    fmt.Printf("%s.\n", os)
}
```

---

## Functions

### Basic Function
```go
func add(x int, y int) int {
    return x + y
}
```

### Multiple Return Values
```go
func swap(x, y string) (string, string) {
    return y, x
}
```

### Named Return Values
```go
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return
}
```

### Variadic Functions
```go
func sum(nums ...int) int {
    total := 0
    for _, num := range nums {
        total += num
    }
    return total
}
```

### Anonymous Functions
```go
func() {
    fmt.Println("Anonymous function")
}()
```

---

## Pointers

```go
var p *int
i := 42
p = &i
fmt.Println(*p) // Read i through pointer
*p = 21         // Set i through pointer
```

### Pointer Receivers
```go
type Vertex struct {
    X, Y float64
}

func (v *Vertex) Scale(f float64) {
    v.X = v.X * f
    v.Y = v.Y * f
}
```

---

## Structs

### Definition
```go
type Person struct {
    Name string
    Age  int
}
```

### Usage
```go
p := Person{"Alice", 30}
p := Person{Name: "Alice", Age: 30} // Named fields
p.Name = "Bob"
```

### Embedded Structs
```go
type Employee struct {
    Person
    JobTitle string
}
```

---

## Interfaces

### Basic Interface
```go
type Shape interface {
    Area() float64
    Perimeter() float64
}
```

### Implementing an Interface
```go
type Rectangle struct {
    Width, Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r Rectangle) Perimeter() float64 {
    return 2 * (r.Width + r.Height)
}
```

### Empty Interface
```go
func describe(i interface{}) {
    fmt.Printf("(%v, %T)\n", i, i)
}
```

---

## Concurrency

### Goroutines
```go
func say(s string) {
    for i := 0; i < 5; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(s)
    }
}

func main() {
    go say("world")
    say("hello")
}
```

### Channels
```go
ch := make(chan int)

// Send
ch <- v

// Receive
v := <-ch
```

### Buffered Channels
```go
ch := make(chan int, 100)
```

### Select
```go
select {
case msg1 := <-ch1:
    fmt.Println("Received", msg1)
case msg2 := <-ch2:
    fmt.Println("Received", msg2)
case ch3 <- 3:
    fmt.Println("Sent 3")
default:
    fmt.Println("No communication")
}
```

### Sync Package
```go
var mu sync.Mutex
mu.Lock()
// Critical section
mu.Unlock()
```

---

## Error Handling

### Basic Error Handling
```go
f, err := os.Open("filename.ext")
if err != nil {
    log.Fatal(err)
}
// Use f
```

### Custom Errors
```go
type MyError struct {
    When time.Time
    What string
}

func (e *MyError) Error() string {
    return fmt.Sprintf("at %v, %s", e.When, e.What)
}

func run() error {
    return &MyError{
        time.Now(),
        "it didn't work",
    }
}
```

### Defer, Panic, Recover
```go
func main() {
    defer fmt.Println("This will be executed last")
    
    f()
    fmt.Println("Returned normally from f.")
}

func f() {
    defer func() {
        if r := recover(); r != nil {
            fmt.Println("Recovered in f", r)
        }
    }()
    fmt.Println("Calling g.")
    g(0)
    fmt.Println("Returned normally from g.")
}

func g(i int) {
    if i > 3 {
        fmt.Println("Panicking!")
        panic(fmt.Sprintf("%v", i))
    }
    defer fmt.Println("Defer in g", i)
    fmt.Println("Printing in g", i)
    g(i + 1)
}
```

---

## Advanced Topics

### Reflection
```go
func reflectType(x interface{}) {
    t := reflect.TypeOf(x)
    fmt.Printf("type:%v kind:%v\n", t.Name(), t.Kind())
}
```

### Generics (Go 1.18+)
```go
func MapKeys[K comparable, V any](m map[K]V) []K {
    r := make([]K, 0, len(m))
    for k := range m {
        r = append(r, k)
    }
    return r
}
```

### Context
```go
func worker(ctx context.Context) {
    for {
        select {
        case <-ctx.Done():
            fmt.Println("Worker cancelled")
            return
        default:
            // Do work
        }
    }
}
```

### Testing
```go
func TestAdd(t *testing.T) {
    got := Add(2, 3)
    want := 5
    if got != want {
        t.Errorf("got %d, want %d", got, want)
    }
}
```

### Benchmarking
```go
func BenchmarkAdd(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Add(1, 2)
    }
}
```

---

## Best Practices

1. **Error Handling**: Always handle errors explicitly
2. **Concurrency**: Use channels for communication between goroutines
3. **Naming**: Use camelCase for variables and PascalCase for exported names
4. **Documentation**: Use doc comments for exported functions and types
5. **Testing**: Write tests alongside your code
6. **Dependency Management**: Use Go modules (`go mod`)
7. **Formatting**: Use `gofmt` or `goimports`
8. **Linting**: Use tools like `golangci-lint`
9. **Profiling**: Use built-in profiling tools (`pprof`)
10. **Simplicity**: Prefer simple, readable code over clever optimizations

---

This guide covers from basic to advanced Go concepts. For more details, refer to the official [Go documentation](https://golang.org/doc/).
