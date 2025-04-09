# 自动推导类型

auto 用于自动推导变量的类型。它让编译器根据变量的初始化表达式，自动推断变量的类型，简化代码编写。

```cpp
auto x = 42;       // 推导为 int
auto y = 3.14;     // 推导为 double
auto z = "Hello";  // 推导为 const char*
```

---

decltype 与 auto 类似，也是用于自动推导变量的类型。它可以帮助开发者在编译期确定变量或表达式的类型，但 decltype 更灵活，可以用于变量、表达式或函数的返回值类型推导。

decltype 的类型推导规则如下：

- 如果表达式是没有括号的变量名，decltype 返回该变量的类型。
- 如果表达式是被括号括起来的变量，decltype 会将变量视为左值表达式，返回该变量的引用类型。

```cpp
int x = 10;

decltype(x) a = x;   // 推导为 int
decltype((x)) b = x; // 推导为 int&（引用）

a = 20; // 修改 a 不影响 x
b = 30; // 修改 b 会影响 x
```

```cpp
int x = 10;
decltype(x) y = 20;  // y 的类型与 x 相同
cout << "y: " << y << endl;

const int z = 30;
decltype(z) w = z;  // w 的类型为 const int
// w = 40;  // 错误：w 是 const
```

```cpp
int a = 10, b = 20;
decltype(a + b) result = a + b;  // result 的类型是 int
cout << "result: " << result << endl;
```

- 表达式 a + b 的类型是 int，因此 decltype(a + b) 推导出 int。

```cpp
int x = 10;
int& ref = x;  // ref 是 x 的引用

decltype(ref) y = x;  // y 是 int& 类型（引用）
y = 20;               // 修改 y 会改变 x

cout << "x: " << x << endl;
```

- decltype(ref) 推导出 int&，所以 y 是一个引用，绑定到 x。

```cpp
int x = 10;
int* ptr = &x;  // ptr 是 int 的指针

decltype(ptr) newPtr = &x;  // newPtr 的类型为 int*
*newPtr = 20;              // 修改 newPtr 指向的值

cout << "x: " << x << endl;
```

- decltype(ptr) 推导出 int\*，所以 newPtr 是一个指向 int 的指针。

```cpp
const int x = 10;
int y = 20;

decltype(x) a = x;  // a 的类型为 const int
// a = 30;  // 错误：a 是 const

decltype((y)) b = y;  // b 的类型为 int&（引用）
b = 40;               // 修改 b 会改变 y

cout << "y: " << y << endl;
```

- decltype(x) 推导出 const int，所以 a 是一个 const 类型变量，不能修改。
- decltype((y)) 推导出 int&（引用），因为 y 是通过括号传递的，decltype 会推导为引用类型。

---

通过 auto 自动推导函数返回值：

```cpp
auto add(int a, int b) {
    return a + b;  // 返回值自动推导为 int
}

int main() {
    std::cout << add(3, 5) << std::endl;  // 输出 8
    return 0;
}
```

通过 auto 自动推导 lambda 函数返回值：

```cpp
auto add = [](int a, int b) { return a + b; };  // Lambda
std::cout << add(3, 5) << std::endl;  // 输出 8
```
---

通过 auto + decltype 自动推导函数返回值：

```cpp
template <typename T1, typename T2>
auto multiply(T1 a, T2 b) -> decltype(a * b) {  // 返回值类型是 a*b 的类型
    return a * b;
}

int main() {
    std::cout << multiply(2, 3.5) << std::endl;  // 输出 7
    return 0;
}
```

# 整数类型提升

当执行表达式计算时，所有小于 int 大小的整型类型（如 char, unsigned char, short, unsigned short）都会被提升为至少 int 或 unsigned int 类型，这种行为可以确保计算的类型有足够的范围和精度。

- 如果操作数是有符号类型（如 char, short），它们会被提升为 int。
- 如果操作数是无符号类型（如 unsigned char, unsigned short），它们会被提升为 int，但如果 int 无法容纳其值，则提升为 unsigned int。

```cpp
char c1 = 10;
char c2 = 20;
short s1 = 100;
auto res = c1 + c2 + s1;
std::cout << "type: " << typeid(res).name() << std::endl; // 'i' 表示 int
```

# size_t

size_t 是一种无符号整数类型，因此不会出现负值，专门用于表示 对象的大小 或 数组的索引。

它是标准库定义的类型别名，通常通过 typedef 或 using 定义。。定义在头文件 stddef.h（C） 和 cstddef（C++）中。

- 在 32 位系统中，size_t 通常是 unsigned int，占 4 字节。
- 在 64 位系统中，size_t 通常是 unsigned long 或 unsigned long long，占 8 字节。

```cpp
typedef unsigned int size_t;  // 这是常见的定义之一
```

在内存中，size_t 用于表示对象的大小。函数 sizeof 返回值的类型就是 size_t。

```cpp
int arr[10];

size_t arrSize = sizeof(arr);
```

由于数组的最大大小受系统限制，size_t 是表示索引的合适类型。

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

for (size_t i = 0; i < numbers.size(); ++i) {
    std::cout << "Index: " << i << ", Value: " << numbers[i] << std::endl;
}
```

许多标准库函数（如 malloc, strlen, vector::size）的返回值或参数类型是 size_t。

```cpp
size_t size = 10;
int* arr = (int*)malloc(size * sizeof(int)); // malloc 的参数类型是 size_t

if (arr) {
    std::cout << "Memory allocated successfully." << std::endl;
    free(arr);
} else {
    std::cout << "Memory allocation failed." << std::endl;
}
```

```cpp
const char* str = "Hello, world!";
size_t length = strlen(str); // strlen 返回 size_t

std::cout << "Length of the string: " << length << std::endl;
```

# typedef

typedef 用于为现有类型创建一个新的 类型别名。它通过为复杂的类型定义一个简洁的名字，提升代码的可读性和可维护性。

```cpp
typedef existing_type new_type_name;
```

```cpp
typedef unsigned int uint;

int main() {
    uint x = 100; // uint 是 unsigned int 的别名
    std::cout << "x: " << x << std::endl;
    return 0;
}
```

```cpp
typedef int* IntPtr; // 为指针定义别名

int main() {
    int a = 10;
    IntPtr p = &a; // p 是一个指向 int 的指针

    std::cout << "Value of a: " << *p << std::endl;
    return 0;
}
```

```cpp
typedef int IntArray[5]; // 定义一个数组类型别名

int main() {
    IntArray arr = {1, 2, 3, 4, 5}; // 使用别名创建数组

    for (int i = 0; i < 5; ++i) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;

    return 0;
}
```

```cpp
typedef int (*Operation)(int, int); // 定义函数指针类型

int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}

int main() {
    Operation op = add; // op 是一个函数指针
    std::cout << "Addition: " << op(3, 4) << std::endl;

    op = multiply;
    std::cout << "Multiplication: " << op(3, 4) << std::endl;

    return 0;
}
```

```cpp
// 使用 typedef 为结构体定义别名
typedef struct {
    int id;
    char name[50];
} Student;

int main() {
    Student s = {1, "John"};
    std::cout << "ID: " << s.id << ", Name: " << s.name << std::endl;
    return 0;
}
```

# using

在 C++11 中，引入了 using 关键字，它可以替代 typedef，并且在定义复杂模板类型别名时更加简洁。

```cpp
// 使用 typedef 定义类型别名
typedef unsigned int uint1;

// 使用 using 定义类型别名
using uint2 = unsigned int;
```

在定义模板类型别名时，using 比 typedef 更加直观。

```cpp
// 使用 typedef 定义模板别名
typedef std::vector<int> IntVector;

// 使用 using 定义模板别名
using IntList = std::vector<int>;

int main() {
    IntVector vec1 = {1, 2, 3};
    IntList vec2 = {4, 5, 6};

    std::cout << "First vector size: " << vec1.size() << std::endl;
    std::cout << "Second vector size: " << vec2.size() << std::endl;

    return 0;
}
```

# 自动类型转换

自动类型转换是由编译器完成的，当不涉及潜在的数据丢失或行为问题时，编译器会自动将一种类型转换为另一种兼容类型。

```cpp
int a = 10;
double b = 3.5;

// 自动类型转换：int 转为 double
double result = a + b;  // a 被隐式转换为 double 类型
cout << "Result: " << result << endl;  // 输出：13.5

// 自动类型转换：char 转为 int
char c = 'A';
int ascii = c;  // 'A' 的 ASCII 值为 65
cout << "ASCII of 'A': " << ascii << endl;  // 输出：65
```

# 强制类型转换

强制类型转换是由程序员显式指定的类型转换，用于解决类型不兼容或编译器无法自动处理的情况。

1. C 风格的强制类型转换：

```cpp
double pi = 3.14159;

// 强制类型转换：double 转为 int
int truncatedPi = (int) pi;
```

2. C++ 风格的强制类型转换：

- 使用 static_cast, dynamic_cast, const_cast, reinterpret_cast 进行类型转换。

```cpp
double pi = 3.14159;

// 强制类型转换：使用 static_cast
int truncatedPi = static_cast<int>(pi);
```

# static_cast

static_cast 会在编译时验证源类型和目标类型之间是否可以合法地进行转换（例如：是否兼容或是否可以隐式转换），一旦通过编译，static_cast 在运行时不会进行任何额外的类型检查，转换操作直接执行。

```cpp
class Base {};
class Derived : public Base {};

int main() {
    Base* base = new Base();
    Derived* derived = static_cast<Derived*>(base); // 编译通过，源类型与目标类型兼容
    return 0;
}
```

```cpp
int main() {
    Unrelated* unrelated = nullptr;
    int* intPtr = static_cast<int*>(unrelated); // 编译错误：类型不兼容
    return 0;
}
```

static_cast 不会验证指针在运行时的实际类型，只根据编译时的信息进行类型转换。这意味着，如果使用 static_cast 将基类指针转换为派生类指针，但指针实际并不指向派生类对象，可能导致 未定义行为。

```cpp
class Base {
public:
    virtual ~Base() = default;
};

class Derived : public Base {};

int main() {
    Base* base = new Base(); // 基类指针指向基类对象
    Derived* derived = static_cast<Derived*>(base); // 编译通过，但运行时不安全

    // 未定义行为：尝试使用 derived
    return 0;
}
```

- 编译器只验证 Base* 和 Derived* 之间的转换是否合理，而不会检查 base 是否指向一个 Derived 对象。
- 运行时 base 实际指向 Base 对象，强制转换为 Derived* 后访问派生类特有成员会导致未定义行为。

# dynamic_cast

dynamic_cast 适用于基类与派生类之间的多态类型转换，不仅仅会在编译时检查，也会在运行时检查。

- 编译时检查：
  - 源类型和目标类型之间必须存在继承关系。
  - 源类型必须是指针或引用类型。
  - 源类型的基类必须包含虚函数表（即 RTTI 支持）。
- 运行时检查：
  - 如果转换失败，并且是指针类型，则会返回 nullptr。
  - 如果转换失败，并且是引用类型，则会抛出 std::bad_cast 异常。

```cpp
class Base {
public:
    virtual ~Base() = default; // 必须有虚函数，支持运行时类型信息（RTTI）
};

class Derived : public Base {};

int main() {
    Base* base = new Base(); // 基类指针指向基类对象
    Derived* derived = dynamic_cast<Derived*>(base); // 运行时检查

    if (derived == nullptr) {
        std::cout << "Conversion failed: base is not a Derived." << std::endl;
    }

    delete base;
    return 0;
}
```

- 编译器会报错，因为 Base 没有虚函数，无法支持运行时类型信息（RTTI）。

# const_cast

const_cast 用于去除对象的 const 限定符（如调用接受非常量参数的函数），添加或去除 volatile 限定符。

- 只能用于指针或引用类型。
- 不能用于修改常量对象的值，否则行为未定义。
- 运行时没有额外开销。

```cpp
void modify(int& x) {
    x = 42; // 修改 x 的值
}

int main() {
    const int value = 10;
    const int* constPtr = &value;

    // 去除 const 限定符
    int* nonConstPtr = const_cast<int*>(constPtr);
    *nonConstPtr = 20; // 行为未定义，试图修改常量对象

    int nonConstValue = 30;
    modify(const_cast<int&>(nonConstValue)); // 合法，修改非常量对象
    std::cout << "nonConstValue: " << nonConstValue << std::endl;

    return 0;
}
```

# reinterpret_cast

reinterpret_cast 提供了更底层、更直接的类型转换功能，不进行类型检查，用于将一种类型的对象“按位重解释”为另一种完全不同的类型。它主要用于指针之间、指针与整型之间、函数指针之间的转换，但并不保证转换后的结果是有意义或安全的。它只是改变编译器对内存中数据的解释方式，使用不当可能导致未定义行为，因此需要谨慎使用。

```cpp
int number = 42;
int* int_ptr = &number;

// 将 int* 转换为 void*
void* void_ptr = reinterpret_cast<void*>(int_ptr);

// 再将 void* 转换回 int*
int* new_int_ptr = reinterpret_cast<int*>(void_ptr);

// 解引用指针
cout << "Value: " << *new_int_ptr << endl;  // 输出：42
```

```cpp
// 将 int* 转换为 char*，以便按字节访问内存
char* bytePtr = reinterpret_cast<char*>(&number);

std::cout << "Memory bytes of number: ";
for (size_t i = 0; i < sizeof(number); ++i) {
    // 输出每个字节的十六进制表示
    std::cout << "0x" << std::hex << std::setw(2) << std::setfill('0')
              << (static_cast<unsigned int>(static_cast<unsigned char>(bytePtr[i]))) << " ";
}
```