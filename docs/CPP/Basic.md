### 输入流

cin 在读取数据时默认会忽略空白字符（如空格、换行符和制表符）作为分隔符，并在遇到空格或换行符时停止读取。这适用于基本的输入操作，如读取整数、浮点数和字符串。

- 对于基本数据类型（如 int, float）：cin 会跳过所有空白字符，直到遇到第一个非空白字符开始读取，再次遇到空格、换行符或制表符时停止读取。
- 对于字符串（string 类型）：cin >> string_variable 读取一个以空白字符（如空格、换行符或制表符）结束的单词，读取时，不包括空白字符。

```cpp
string word;
cout << "Enter a word: ";
cin >> word;  // 默认读取到空格或换行符为止
cout << "You entered: " << word << endl;
```

```
### Input ###

Hello World!

### Output ###

Enter a word: Hello
You entered: Hello
```

如果你需要输入一个完整的句子而不是单个单词，cin 无法正常工作，因为它会在第一个空格处停止。可以使用 getline 读取整行。

```cpp
string sentence;
cout << "Enter a sentence: ";
getline(cin, sentence);  // 读取整行，包括空格
cout << "You entered: " << sentence << endl;
```

```
### Input ###

Hello World!

### Output ###

Enter a sentence: Hello World!
You entered: Hello World!
```

### 输入流状态

输入流有四种主要状态：

- goodbit：表示流处于正常状态，可以继续进行操作。
- eofbit：表示已经到达输入流的末尾（例如，读取文件到末尾或用户输入的终止符）。
- failbit：表示流遇到非致命错误，例如试图读取错误类型的数据（如从 int 输入读取字母）。
- badbit：表示流遇到严重错误，例如硬件故障或不可恢复的错误。

输入流状态函数：

- cin.good()	true	输入流处于正常状态，未发生错误	检查输入流是否可以继续读取。
- cin.fail()	true	输入流发生了非致命错误（类型不匹配、格式错误等）	检测用户输入是否符合预期的数据类型。
- cin.eof()	true	到达输入流的末尾	检查输入结束（例如文件输入的末尾或终止符，或用户通过 Ctrl+D 或 Ctrl+Z 手动结束输入）。
- cin.bad()	true	输入流发生了不可恢复的错误	检查输入流是否损坏（如硬件错误或系统问题）。

```cpp
int sum = 0;     // 累加的总和
int number;      // 存储当前输入的整数

cout << "Enter integers to sum them up. Type 'Ctrl+D' (Linux/macOS) or 'Ctrl+Z' (Windows) to finish.\n";

while (true) {
    cout << "Enter a number: ";
    cin >> number;  // 尝试读取用户输入

    // 检查流状态
    if (cin.eof()) {  // 用户按下 Ctrl+D/Ctrl+Z，输入结束
        cout << "End of input detected. Exiting...\n";
        break;
    } else if (cin.fail()) {  // 输入不是整数
        cout << "Invalid input. Please enter a valid integer.\n";
        cin.clear();  // 清除 fail 状态
        cin.ignore(numeric_limits<streamsize>::max(), '\n');  // 丢弃无效输入
        continue;  // 回到循环顶部
    } else if (cin.good()) {  // 输入成功
        sum += number;  // 累加有效整数
    }
}

// 输出结果
cout << "Total sum: " << sum << endl;
```

```
### Input ###

Enter integers to sum them up. Type 'Ctrl+D' (Linux/macOS) or 'Ctrl+Z' (Windows) to finish.
Enter a number: 10
Enter a number: 20
Enter a number: hello
Invalid input. Please enter a valid integer.
Enter a number: 30
Enter a number: (Ctrl+D or Ctrl+Z)

### Output ###

Enter integers to sum them up. Type 'Ctrl+D' (Linux/macOS) or 'Ctrl+Z' (Windows) to finish.
Enter a number: 10
Enter a number: 20
Enter a number: hello
Invalid input. Please enter a valid integer.
Enter a number: 30
Enter a number: End of input detected. Exiting...
Total sum: 60
```

### 缓冲区

缓冲区是一个中间存储区域，用来临时存储从输入设备读取的数据或即将输出到输出设备的数据。它的主要作用是提高性能，因为与硬件设备直接交互的操作相对耗时。

当用户通过键盘输入时，所有输入的字符会先存入输入缓冲区，直到按下 Enter 键。然后，程序从缓冲区中读取数据。

- 用户输入的内容不会立即传递给程序，只有按下 Enter 键后，输入才会生效。
- 输入缓冲区会保留未使用的数据，供后续读取

当程序使用 cout 进行输出时，数据会先存入输出缓冲区，并不会立即显示在控制台上：

- 当遇到换行符（endl 或 '\n'）时，缓冲区的内容会被刷新到屏幕。
- 如果程序正常结束（例如 return 0），缓冲区也会被自动刷新。
- 也可以手动调用 std::flush 来强制刷新输出缓冲区。

### 缓冲区的工作流程

```cpp
char c1, c2;
cout << "Enter two characters: ";
cin >> c1 >> c2;  // 连续读取两个字符
cout << "First: " << c1 << ", Second: " << c2 << endl;
```

- 用户输入 A，然后按下空格，输入 B，最后按下 Enter。
- 键入的字符 A 和 B 进入输入缓冲区，缓冲区内容为：A B\n。
- cin >> c1 读取第一个字符 A，cin >> c2 读取第二个字符 B。
- 缓冲区在读取后清空。

### 手动刷新缓冲区

延迟输出：

```cpp
cout << "Hello, ";
sleep(2);  // 等待 2 秒
cout << "World!" << endl;
```

```
（等待 2 秒后）Hello, World!
```

手动刷新缓冲区

```cpp
cout << "Hello, ";
cout.flush();  // 手动刷新输出缓冲区
sleep(2);      // 等待 2 秒
cout << "World!" << endl;
```

```
Hello, （等待 2 秒后）World!
```

### 缓冲区的残留问题

缓冲区残留问题指的是，当你从标准输入（如键盘）中读取数据时，输入缓冲区可能会保留未处理的字符（如换行符 \n、空格等），这些残留字符可能会导致后续的输入操作行为异常。

#### cin 和 getline() 混用时的缓冲区残留

```cpp
int number;
string line;

cout << "Enter a number: ";
cin >> number;  // 输入一个整数

cout << "Enter a line: ";
getline(cin, line);  // 尝试读取一整行

cout << "Number: " << number << ", Line: " << line << endl;
```

```
### Input ###

42
Hello, World!

### Output ###

Enter a number: 42
Enter a line: Number: 42, Line:
```

- 当 cin >> number 读取了整数 42 时，用户按下 Enter，产生了一个换行符 \n，但 cin 不会读取这个换行符。
- 换行符 \n 仍然留在输入缓冲区中。
- 当 getline(cin, line) 被调用时，它会直接读取缓冲区中的换行符，认为用户输入了一整行空行，结果 line 为空。

#### 连续使用 cin 读取字符或字符串

```cpp
char c1, c2;

cout << "Enter the first character: ";
cin >> c1;  // 读取第一个字符

cout << "Enter the second character: ";
cin >> c2;  // 读取第二个字符

cout << "First: " << c1 << ", Second: " << c2 << endl;
```

```
### Input ###

A
B

### Output ###

Enter the first character: A
Enter the second character: B
First: A, Second: B
```

- 用户输入 A 后按下 Enter，换行符 \n 留在缓冲区中。
- 第二次调用 cin >> c2 时，它会跳过换行符，等待用户输入新的字符。
- 这可能会给用户带来困惑，因为程序没有明显提示换行符的作用。

#### 使用 cin.ignore() 丢弃残留字符

```cpp
cin.ignore(1000, '\n');  // 丢弃缓冲区中最多 1000 个字符，直到遇到换行符

cin.ignore(); // 丢弃缓冲区中的 1 个字符

cin.ignore(2); // 丢弃缓冲区中的 2 个字符
```

```cpp
int number;
string line;

cout << "Enter a number: ";
cin >> number;  // 读取整数

cin.ignore(1000, '\n');  // 清除缓冲区中残留的换行符

cout << "Enter a line: ";
getline(cin, line);  // 正常读取一整行

cout << "Number: " << number << ", Line: " << line << endl;
```

### 左值表达式

左值表达式（lvalue expression） 是指在程序执行过程中有特定的内存地址，可以被明确引用的值。左值表示一个可寻址的实体，通常是变量、数组元素或某些返回引用的表达式。

- 左值表达式有明确的存储位置，可以通过地址访问。
- 左值可以被赋值，因此它可以出现在赋值操作的左侧（但不是所有左值都能修改，如 const 左值）。
- 左值通常是变量或数组元素，生命周期至少持续到其所在作用域结束。

```cpp
```

### 自动推导类型

auto 用于自动推导变量的类型。它让编译器根据变量的初始化表达式，自动推断变量的类型，简化代码编写。

```cpp
auto x = 42;       // 推导为 int
auto y = 3.14;     // 推导为 double
auto z = "Hello";  // 推导为 const char*
```

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

### 整数类型提升

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

### 类型转换

类型转换分为 自动类型转换 和 强制类型转换。类型转换用于将一个数据类型转换为另一个数据类型，以解决类型不匹配的问题。

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

强制类型转换是由程序员显式指定的类型转换，用于解决类型不兼容或编译器无法自动处理的情况。

```cpp
double pi = 3.14159;

// 强制类型转换：double 转为 int
int truncatedPi = (int) pi;
```

```cpp
double pi = 3.14159;

// 强制类型转换：使用 static_cast
int truncatedPi = static_cast<int>(pi);
```

### 命名空间

命名空间（Namespace）是 C++ 中的一种用来组织代码和避免命名冲突的机制。它的主要作用是将名字（变量名、函数名、类名等）划分到不同的“空间”中，从而使得多个名字可以共存而不会冲突。

在一个项目中，可能会有很多开发者共同工作，同时也会用到不同的第三方库。这些库或开发者可能定义了一些同名的函数或变量。例如：

```cpp
#include <iostream>

void print() {
    std::cout << "This is my print function!" << std::endl;
}

int main() {
    print(); // 调用自己的 print 函数
    return 0;
}
```

现在，假设我们引入了一个第三方库，这个库里也有一个 print 函数。如果库没有使用命名空间，而直接定义了 print，就会引发命名冲突！此时，编译器无法确定你在 main 中调用的 print 函数是你自己的，还是来自第三方库的。

命名空间允许你将名字分组到不同的“空间”中。每个命名空间中的名字是独立的，即使名字相同，也不会冲突。

```cpp
namespace mynamespace {
    void print() {
        std::cout << "This is my print function!" << std::endl;
    }
}

namespace thirdparty {
    void print() {
        std::cout << "This is a print function from the third-party library!" << std::endl;
    }
}

int main() {
    mynamespace::print(); // 调用 mynamespace 中的 print 函数
    thirdparty::print();  // 调用 thirdparty 中的 print 函数
    return 0;
}
```

可以通过 using 引入单个成员，直接使用某个命名空间的特定成员，而不是每次都写命名空间。

```cpp
using std::cout; // 只引入 std::cout
using std::sqrt; // 只引入 std::sqrt

int main() {
    cout << "Square root of 16 is: " << sqrt(16) << std::endl;
    return 0;
}
```

可以通过 using 引入整个命名空间（尽量避免在大型项目中使用，以防止命名冲突）。

```cpp
using namespace std;

int main() {
    cout << "Using directive example" << endl;
    return 0;
}
```

### 宏定义

宏定义是 C++ 中的一个预处理指令，用于定义一个标识符或表达式。这些宏在程序编译前会由预处理器替换为指定的值或代码片段。宏定义类似于文本替换，编译器并不会检查宏定义的语法正确性。

```cpp
#define PI 3.14159  // 定义圆周率
#define AREA(r) (PI * (r) * (r))  // 定义计算圆面积的宏

int main() {
    double radius = 5.0;
    cout << "Radius: " << radius << endl;
    cout << "Area: " << AREA(radius) << endl;  // 使用宏计算圆面积
    return 0;
}
```

宏可以用来简化代码中的重复内容：

```cpp
#define PRINT_HELLO cout << "Hello, World!" << endl;

int main() {
    PRINT_HELLO;  // 替换为：cout << "Hello, World!" << endl;
    return 0;
}
```

宏可以类似函数使用，但它的实现方式是直接文本替换，而不是通过函数调用。

```cpp
#define SQUARE(x) ((x) * (x))  // 宏定义
int square(int x) { return x * x; }  // 函数定义

int main() {
    int a = 5;
    cout << "Macro result: " << SQUARE(a) << endl;  // 使用宏
    cout << "Function result: " << square(a) << endl;  // 使用函数
    return 0;
}
```

宏是简单的文本替换，不会进行类型检查，可能导致意想不到的结果。

宏定义存在着诸多缺点：

- 无类型检查，可能导致错误
- 全局作用域，容易冲突
- 展开后代码难以调试

### 预处理指令

C++ 中的预处理指令（Preprocessor Directives）是以 # 开头的特殊指令，主要用于在代码被编译之前进行预处理。

`#include` 用于包含头文件，分为两种形式：

- `#include <file>`：用于标准库或系统头文件。
- `#include "file"`：用于用户定义的头文件。

```cpp
#include <iostream> // 包含标准库头文件
#include "my_header.h" // 包含用户头文件

int main() {
    std::cout << "This is a demonstration of #include!" << std::endl;
    return 0;
}
```

`#define` 和 `#undef` 用于处理宏定义。

```cpp
#define PI 3.14 // 定义一个常量宏
#define SQUARE(x) ((x) * (x)) // 定义一个带参数的宏

int main() {
    std::cout << "PI: " << PI << std::endl;
    std::cout << "Square of 5: " << SQUARE(5) << std::endl;

    #undef PI // 取消宏定义
    // std::cout << "PI: " << PI << std::endl; // 编译错误，PI 未定义

    return 0;
}
```

`#ifdef` 和 `#ifndef` 用于条件编译：

- `#ifdef`：当宏已定义时，编译其后的代码。
- `#ifndef`：当宏未定义时，编译其后的代码。

```cpp
#define DEBUG // 定义 DEBUG 宏

int main() {
    // 如果 DEBUG 被定义
    #ifdef DEBUG
        std::cout << "Debugging is enabled." << std::endl;
    #endif

    // 如果 RELEASE 没被定义
    #ifndef RELEASE
        std::cout << "Release mode is not enabled." << std::endl;
    #endif

    return 0;
}
```

```
Debugging is enabled.
Release mode is not enabled.
```

`#if`、`#elif`、`#else` 和 `#endif` 用于更复杂的条件判断，可以结合常量表达式和宏。

```cpp
#define VERSION 2

int main() {
    #if VERSION == 1
        std::cout << "Version 1" << std::endl;
    #elif VERSION == 2
        std::cout << "Version 2" << std::endl;
    #else
        std::cout << "Unknown version" << std::endl;
    #endif

    return 0;
}
```

`#pragma` 是编译器特定的指令，用于启用或禁用某些功能。

`#pragma once` 避免头文件重复包含。

```cpp
// 在头文件中
#pragma once
void myFunction();
```

`#pragma message` 在编译时生成消息。

```cpp
#pragma message("Compiling this file...")

int main() {
    return 0;
}
```

```
### Compilation Period Output ###

Compiling this file...
```

`#error` 在编译时生成错误并终止编译。

`#warning` 生成编译警告（某些编译器支持）。

### constexpr

constexpr 是 C++11 引入的一种关键字，用于表示一个表达式或函数的值可以在编译时计算，它可以用来定义常量、函数或构造函数，使程序更加高效，同时提供编译时的类型检查。

#### 编译期常量

```cpp
constexpr double PI = 3.14159;  // 定义一个常量

int main() {
    constexpr int radius = 5;  // 定义编译期常量
    constexpr double area = PI * radius * radius;  // 编译时计算

    cout << "Area: " << area << endl;
    return 0;
}
```

- PI 是一个 constexpr 常量，它的值在编译期已确定。
- 编译器会直接将 area 的值计算为 78.5398，提高了运行时效率。

#### 编译期函数

```cpp
// 定义一个 constexpr 函数
constexpr int square(int x) {
    return x * x;
}

int main() {
    constexpr int value = 10;
    constexpr int result = square(value);  // 编译时计算

    cout << "Square of " << value << ": " << result << endl;

    int runtimeValue;
    cout << "Enter a number: ";
    cin >> runtimeValue;

    // 运行时调用
    cout << "Square of " << runtimeValue << ": " << square(runtimeValue) << endl;
    return 0;
}
```

- square 是一个 constexpr 函数，可以在编译时计算常量值。

constexpr 函数在编译期求值时，所有输入必须是常量，如果输入的是运行时数据，则会在运行时计算。

```cpp
constexpr int square(int x) {
    return x * x;
}

int runtimeValue = 5;
constexpr int result = square(10);  // 编译期计算
int runtimeResult = square(runtimeValue);  // 运行时计算
```

#### 编译期对象

```cpp
class Circle {
    double radius;
public:
    constexpr Circle(double r) : radius(r) {}  // constexpr 构造函数

    constexpr double getArea() const {  // constexpr 成员函数
        return 3.14159 * radius * radius;
    }
};

int main() {
    constexpr Circle c(10.0);  // 编译期创建对象
    constexpr double area = c.getArea();  // 编译期计算面积

    cout << "Area: " << area << endl;

    Circle runtimeCircle(5.0);  // 运行时创建对象
    cout << "Area: " << runtimeCircle.getArea() << endl;  // 运行时计算面积

    return 0;
}
```

- Circle 类的构造函数和 getArea 成员函数都是 constexpr。
- 当 Circle 对象在编译时创建时，相关计算也会在编译期完成。
- 同一个 constexpr 函数在运行时仍然可以使用。

#### 编译器优化

constexpr 提供编译期计算能力，但编译器可能对非 constexpr 的代码也进行类似的优化。即使不用 constexpr，只要程序中出现常量表达式，编译器也可能在编译时优化。

### inline

inline 用于建议编译器将函数的调用替换为函数体的代码，它的作用是减少函数调用的开销，特别是在频繁调用的小函数中。

```cpp
inline int add(int a, int b) {
    return a + b;
}

int main() {
    int x = 5, y = 10;
    cout << "Sum: " << add(x, y) << endl;  // 调用内联函数，编译器可能将这一行替换为 cout << "Sum: " << (x + y) << endl;
    return 0;
}
```

inline 是一个建议，编译器可能会忽略内联请求：

- 如果函数过于复杂，编译器可能选择不内联。
- 现代编译器（如 GCC、Clang）会根据函数的具体情况自动决定是否内联，无需明确标记。
- 递归函数一般不会被内联（因为递归次数在编译期不确定）。
- 代码较大的函数可能不会被内联（内联会导致可执行文件体积增加）。

inline 内联函数的定义需要出现在调用点之前，否则会导致链接错误，通常内联函数的实现放在头文件中。

### 头文件函数

```cpp
// main.cpp

#include <iostream>
#include "common.h"

int main() {
    sayHello("harvey");
    return 0;
}
```

```cpp
// common.h

#ifndef COMMON_H
#define COMMON_H

#include <iostream>
#include <string>

void sayHello(std::string name);

#endif
```

```cpp
// common.cpp

#include <iostream>
#include <string>
#include "common.h"

void sayHello(std::string name) {
    std::cout << "hello " << name << std::endl;
}
```

### 头文件保护

在声明头文件时，一般都会采用 `#ifndef` 和 `#define` 的组合，确保头文件的内容只会被编译一次。

```cpp
// common.h

#ifndef COMMON_H
#define COMMON_H

void sayHello();

#endif
```

假设没有采用头文件保护，并且结构是下面这样的，那么就会在编译时发生错误。

```
"a.cpp" include "common.h"
"b.cpp" include "common.h"
"main.cpp" include "a.cpp", "b.cpp" // main.cpp 重复导入了 common.h，报错提示 multiple definition of `sayHello`
```

### 内存分区

C++ 的内存分区是指程序运行时内存的组织方式，通常分为以下几个主要区域：

- 代码区（Text Segment）
- 全局区（Global Segment 或 Data Segment）
- 栈区（Stack Segment）
- 堆区（Heap Segment）

内存分区示意图：

```
+--------------------+
|   栈区（Stack）      |  <--- 高地址
+--------------------+
|       空间          |  动态变化
+--------------------+
|   堆区（Heap）       |
+--------------------+
|  全局/静态区（Global）|
|  - 已初始化数据段     |
|  - 未初始化数据段     |
|  - 常量区           |
+--------------------+
|   代码区（Code）     |  <--- 低地址
+--------------------+
```

#### 代码区

代码区是程序运行时内存的一部分，用于存储程序编译后的可执行机器指令。它是只读的，主要为了：

- 存储程序的指令：包括函数、方法和其他可执行的代码。
- 防止指令被修改：代码区通常是只读的，防止程序运行期间因误操作或恶意修改导致指令被改变。
- 共享性：对于多线程或多进程程序，代码区可以被多个进程共享，以节省内存资源。

以下是关于代码区的详细示例，结合 C++ 的运行情况进行说明：

```cpp
#include <iostream>

void sayHello() {
    std::cout << "Hello, world!" << std::endl;
}

void sayGoodbye() {
    std::cout << "Goodbye, world!" << std::endl;
}

int main() {
    sayHello();
    sayGoodbye();
    return 0;
}
```

- sayHello 函数的机器指令存储在代码区。
- sayGoodbye 函数的机器指令也存储在代码区。

通过打印函数的地址可以验证它们在代码区中的位置：

```cpp
#include <iostream>

void sayHello() {
    std::cout << "Hello, world!" << std::endl;
}

void sayGoodbye() {
    std::cout << "Goodbye, world!" << std::endl;
}

int main() {
    std::cout << "Address of sayHello: " << (void*)sayHello << std::endl;
    std::cout << "Address of sayGoodbye: " << (void*)sayGoodbye << std::endl;

    sayHello();
    sayGoodbye();
    return 0;
}
```

```
Address of sayHello: 0x105b0f5e0
Address of sayGoodbye: 0x105b0f620
Hello, world!
Goodbye, world!
```

- sayHello 和 sayGoodbye 的地址是它们在代码区的起始地址。
- 不同的函数会分配到代码区的不同位置。

尝试修改代码区内容会引发错误。以下示例说明这种情况：

```cpp
#include <iostream>

void sayHello() {
    std::cout << "Hello, world!" << std::endl;
}

int main() {
    void* funcPtr = (void*)sayHello;
    std::cout << "Address of sayHello: " << funcPtr << std::endl;

    // 尝试直接修改代码区内容（可能导致崩溃或错误）
    char* code = (char*)funcPtr;
    code[0] = 0x90; // 尝试修改代码段

    sayHello();
    return 0;
}
```

```
Segmentation fault (core dumped)
```

- sayHello 函数存储在代码区，代码区是只读的，试图修改会触发访问权限错误。

通过 fork() 创建子进程，可以观察到父进程和子进程共享同一代码区：

```cpp
#include <iostream>
#include <unistd.h>

void sayHello() {
    std::cout << "Hello from process " << getpid() << std::endl;
}

int main() {
    pid_t pid = fork();

    if (pid == 0) {
        // 子进程
        sayHello();
    } else if (pid > 0) {
        // 父进程
        sayHello();
    }

    return 0;

```

```
Hello from process 12345
Hello from process 12346
```

- 父进程和子进程共享 sayHello 的代码指令，代码区不会被复制。

线程在调用函数时，函数的代码始终存储在代码区（Text Segment），不会移动到栈中。栈用于存储函数调用的相关信息（例如：函数的返回地址，局部变量，函数的参数等）。

函数的机器指令会始终留在代码区中。调用函数时，程序通过跳转指令（例如 call 或 jmp）去执行代码区中对应的机器指令。

#### 全局区

全局区是内存分区中的一部分，用于存储全局变量、静态变量和常量等数据。它贯穿程序的整个运行周期，由操作系统在程序启动时分配，并在程序结束时释放。

全局区又可以细分为以下几个子区域：

- 已初始化数据区（.data segment）：存储已初始化的全局变量和静态变量。
- 未初始化数据区（.bss segment）：存储未初始化的全局变量和静态变量，默认为零。
- 常量区：存储程序中的常量，包括字符串字面值和用 const 修饰的全局变量。

```cpp
int globalVar = 10; // 全局变量，已初始化，存储在已初始化数据区（.data）
int uninitializedVar; // 全局变量，未初始化，存储在未初始化数据区（.bss）
const int globalConst = 100; // 全局常量，已初始化，存储在常量区（可能与 .rodata 合并）

void displayAddresses() {
    static int staticVar = 20;  // 静态变量
    std::cout << "Address of globalVar: " << &globalVar << std::endl;
    std::cout << "Address of uninitializedVar: " << &uninitializedVar << std::endl;
    std::cout << "Address of staticVar: " << &staticVar << std::endl;
    std::cout << "Address of globalConst: " << &globalConst << std::endl;
}
```

```
Address of globalVar: 0x601040
Address of uninitializedVar: 0x601044
Address of staticVar: 0x601048
Address of globalConst: 0x60104C
```

- 全局变量、静态变量和常量的地址通常在全局区内连续分布。

全局区的特点：

- 数据生命周期：全局区中的数据从程序启动时分配，直到程序退出才被释放，生命周期贯穿整个程序运行。
- 全局可访问性：全局变量和静态变量在所有函数中都可访问（但作用域受限于声明位置）。
- 默认值：未初始化的全局和静态变量默认初始化为零。
- 线程安全：全局变量通常不是线程安全的，需注意多线程程序中的数据访问问题。

#### 堆区

堆区是 C++ 中用来存储动态分配内存的区域，程序运行时由程序员显式分配和释放内存（如 new 和 delete）。堆区内存的大小和生命周期由程序员控制，适用于需要灵活管理内存的数据结构，如动态数组、链表和对象。

堆区的特点：

- 动态分配内存：使用 new 或 malloc 显式分配内存，使用 delete 或 free 释放内存。
- 存储位置：堆区位于内存的高地址部分，与栈区分开。地址通常由操作系统或运行时库分配。
- 生命周期：堆区内存在显式释放前一直存在，与变量作用域无关，忘记释放会导致 内存泄漏，多次释放会导致 未定义行为。
- 灵活性：堆区适合存储大小不确定或需要动态调整的结构（如动态数组）。

```cpp
void heapExample() {
    int* heapVar = new int(42); // 动态分配一个整型变量
    std::cout << "Value of heapVar: " << *heapVar << std::endl;
    std::cout << "Address of heapVar: " << heapVar << std::endl;
    
    delete heapVar; // 释放动态分配的内存
}
```

```cpp
void heapExample() {
    int size = 5;
    int* heapArray = new int[size]; // 动态分配一个数组
    
    // 初始化数组
    for (int i = 0; i < size; i++) {
        heapArray[i] = i * 10;
    }
    
    // 输出数组内容
    for (int i = 0; i < size; i++) {
        std::cout << "heapArray[" << i << "] = " << heapArray[i] << std::endl;
    }
    
    delete[] heapArray; // 释放动态数组内存
}
```

```cpp
void heapExample() {
    Person* person = new Person("Alice", 25); // 动态分配对象
    person->display();
    
    delete person; // 释放对象内存
}
```

#### 栈区

栈区是程序运行时用于存储临时数据的一部分内存区域。它由编译器自动管理，主要用于存储局部变量、函数参数、返回地址以及部分中间计算结果。

栈区的特点：

- 自动分配与释放：栈区内存由编译器自动分配和回收，开发者无需手动管理。
- 高效性：栈区基于栈指针的增减操作，分配和释放速度非常快。
- 存储内容：局部变量、函数参数、返回地址。
- 存储限制：栈的大小通常有限（例如几 MB），递归过深或过大局部变量可能导致栈溢出。
- 生命周期：数据生命周期与作用域一致，超出作用域即释放内存。
- 增长方向：在大多数系统中，栈区内存从高地址向低地址增长（具体依赖于架构）。

```cpp
void stackExample() {
    int localVar = 42;    // 局部变量，存储在栈区
    int anotherVar = 84;  // 另一个局部变量，存储在栈区
    std::cout << "Address of localVar: " << &localVar << std::endl;
    std::cout << "Address of anotherVar: " << &anotherVar << std::endl;
}
```

栈区数据在函数返回后会被销毁，如果返回指向栈区数据的指针，会导致指针失效。

```cpp
int* invalidPointer() {
    int localVar = 42; // 局部变量，存储在栈区
    return &localVar;  // 返回栈区变量地址
}

int main() {
    int* ptr = invalidPointer();
    std::cout << "Dereferenced value: " << *ptr << std::endl; // 未定义行为
    return 0;
}
```

- 输出值可能是随机值或程序崩溃。
- 应该使用堆区分配内存返回数据，或返回值而非指针。

### 静态变量

局部静态变量 和 全局静态变量 都是用 static 关键字修饰的，但它们在存储位置、作用域和使用场景上有所不同。

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202412041327573.png)

静态变量的初始化问题：

```cpp
void incrementCounter() {
    static int counter = 0; // 局部静态变量
    counter++;
    std::cout << "Counter: " << counter << std::endl;
}

int main() {
    incrementCounter(); // 第一次调用，初始化 counter 为 0
    incrementCounter(); // 第二次调用，counter 的值为 1
    incrementCounter(); // 第三次调用，counter 的值为 2
    return 0;
}
```

- counter 是局部静态变量，存储在全局区。
- 仅在第一次调用 incrementCounter 时初始化为 0，后续调用保留上次的值。

```cpp
static int globalCounter = 0;

void incrementGlobalCounter() {
    globalCounter++;
    std::cout << "Global Counter: " << globalCounter << std::endl;
}

int main() {
    incrementGlobalCounter(); // 全局变量加 1
    incrementGlobalCounter(); // 全局变量加 1
    return 0;
}
```

- globalCounter 是全局静态变量，存储在全局区，生命周期贯穿整个程序。
- 它的作用域仅限于当前文件（不可在其他文件中访问）。

### 函数调用过程

1. 准备调用

- 将函数参数压入栈（或通过寄存器传递，具体取决于调用约定）。
- 保存调用现场，可能包括当前栈指针（ESP 或 RSP）和其他寄存器状态。

2. 跳转到代码区执行函数

- CPU 根据跳转指令（如 call）将控制权转移到代码区中对应的函数入口地址。

3. 在栈中创建函数调用帧

- 分配栈空间，用于存储局部变量、返回地址和其他调用信息。

4. 函数执行

- 在代码区中逐条执行函数的机器指令。
- 操作数（例如局部变量）会使用栈中的空间。

5. 函数结束

- 清理栈帧，恢复调用者的状态。
- 跳转到调用者的下一条指令（返回地址存储在栈中）。

### 地址

低地址：靠近内存的起始地址，通常用于存储代码和全局变量。

高地址：靠近内存的结束地址，通常用于存储局部变量（栈区）。

堆区与栈区的增长方向：

- 堆区：从低地址向高地址增长。
- 栈区：从高地址向低地址增长。

### 内存数据残留问题

内存数据残留是指，当程序释放或覆盖内存区域时，内存中原有的数据仍可能存在，直到被其他数据覆盖。这种问题可能导致安全隐患（如数据泄露）或意外行为（如使用未初始化变量或未正确清空的内存）。

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202412041404954.png)

通过初始化变量、合理管理内存和使用工具检测，可以有效减少内存数据残留问题的风险。

#### 未初始化变量

未初始化变量，栈区或堆区分配的变量在初始化前可能包含随机数据。

```cpp
void uninitializedVariable() {
    int a; // a 是栈区变量，未被初始化时，其内容是栈中遗留的数据。
    std::cout << "Value of uninitialized a: " << a << std::endl;
}
```

#### 悬垂指针

释放后访问的内存（悬垂指针），动态分配的内存被释放后，原内存内容未被清理，可能被意外访问。

```cpp
void danglingPointer() {
    int* p = new int(42); // 动态分配内存
    delete p;             // 释放内存
    std::cout << "Value at dangling pointer: " << *p << std::endl;
}
```

- 动态分配的内存被释放后，指针 p 仍指向原地址。
- 如果此内存未被其他程序覆盖，则仍能访问残留数据。

在释放内存后将指针置为 nullptr，可解决该问题：

```cpp
delete p;
p = nullptr;
```

#### 数组越界

数组或缓冲区越界访问，在数组或缓冲区范围外读取内存，可能获取到残留数据。

```cpp
void arrayOutOfBounds() {
    int arr[3] = {1, 2, 3};
    std::cout << "Accessing out-of-bounds memory: " << arr[5] << std::endl;
}
```

- 数组 arr 分配的空间仅有 3 个整数，但越界访问可能读取到栈中的残留数据。
- 数据值可能为上一次函数调用或栈帧中遗留的内容。

可以使用带边界检查的容器（例如 std::vector）解决该问题：

```cpp
std::vector<int> vec = {1, 2, 3};
std::cout << vec.at(5) << std::endl; // 抛出异常
```

#### 未清理敏感数据

未清理的敏感数据，如密码或密钥在使用后未清理，可能被恶意程序利用。

```cpp
char password[16]; // 模拟存储密码
std::strcpy(password, "mypassword1234");
std::cout << "Password: " << password << std::endl;

// 假装密码用完了
std::cout << "Data after use: " << password << std::endl;
```

- password 使用后未清理，敏感数据仍留在内存中，可能被恶意程序读取。

可以使用 std::memset 清理敏感数据：

```cpp
std::memset(password, 0, sizeof(password));
```

#### 数据恢复技术

数据恢复技术与内存数据残留密切相关。数据恢复的基本原理之一就是利用存储介质（内存、磁盘等）中数据未被完全清除的特点，从中提取原本认为已经被删除或覆盖的内容。

在内存中，分配的空间被释放后，数据仍可能保留，直到被新数据覆盖。数据恢复工具可以直接读取这些未被覆盖的内存数据，从而恢复丢失的内容。

磁盘、固态硬盘等存储设备在删除文件时，通常只是标记数据区域为空闲，并未立即清除实际数据。恢复工具通过扫描这些标记为空的数据区域，可以提取残留的内容。

### 指针

指针是一个变量，它存储另一个变量的内存地址，允许开发者直接操作内存，提供强大的灵活性和高效性。

```cpp
int a = 10;        // 定义一个变量
int* ptr = &a;     // 定义一个指针并存储 a 的地址

std::cout << "Value of a: " << a << std::endl;
std::cout << "Address of a: " << &a << std::endl;
std::cout << "Value of ptr: " << ptr << std::endl;
std::cout << "Value pointed by ptr: " << *ptr << std::endl;
```

数组的名称本质上是一个指针，指向数组的首地址。

```cpp
int arr[3] = {1, 2, 3};
int* ptr = arr; // 指针指向数组首元素

std::cout << "First element: " << *ptr << std::endl;
std::cout << "Second element: " << *(ptr + 1) << std::endl;
std::cout << "Third element: " << *(ptr + 2) << std::endl;
```

使用 new 动态分配内存，并用指针管理它。

```cpp
int* ptr = new int(42); // 动态分配一个整型内存

std::cout << "Value: " << *ptr << std::endl;

delete ptr; // 释放动态分配的内存
ptr = nullptr; // 避免悬垂指针
```

空指针是一个指向无效地址的指针，用于初始化未指向有效地址的指针。

```cpp
int* ptr = nullptr; // 初始化为空指针

if (ptr == nullptr) {
    std::cout << "Pointer is null." << std::endl;
}
```

未初始化的指针可能指向任意地址。

```cpp
int* ptr;
std::cout << *ptr << std::endl; // 未定义行为
```

### 空指针

nullptr 和 NULL 都用于表示空指针，但它们之间存在显著区别，特别是在现代 C++（C++11 及更高版本）中。以下是两者的详细对比：

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202412041420406.png)

类型安全性，nullptr 只能用于指针，而 NULL 可以隐式转换为整数 0，可能导致不明确的行为。

```cpp
void func(int) {
    std::cout << "Called func(int)." << std::endl;
}

void func(int*) {
    std::cout << "Called func(int*)." << std::endl;
}

int main() {
    func(NULL);    // 调用 func(int)（因为 NULL 被解释为 0）
    func(nullptr); // 调用 func(int*)
    return 0;
}
```

### 野指针

野指针是指没有被初始化或指向无效内存区域的指针。使用野指针会导致未定义行为，如程序崩溃或意外输出。野指针是 C++ 编程中常见的错误之一，尤其在指针操作频繁的场景。

```cpp
void uninitializedPointer() {
    int* ptr; // 未初始化的指针
    std::cout << "Value of uninitialized pointer: " << ptr << std::endl;
    // 解引用未初始化的指针
    std::cout << "Dereferenced value: " << *ptr << std::endl; // 未定义行为
}
```

- ptr 未初始化，其值是内存中的随机地址。
- 解引用未初始化的指针访问了无效地址，可能导致程序崩溃。

```cpp
void danglingPointer() {
    int* ptr = new int(42); // 动态分配内存
    delete ptr;             // 释放内存
    std::cout << "Value after delete: " << *ptr << std::endl; // 未定义行为
}
```

- ptr 指向已释放的内存区域，但仍被访问。
- 此内存可能被系统回收或分配给其他程序，导致未定义行为。

### 常量指针

常量指针是指针指向的数据是常量，但指针本身可以改变，即指针可以指向不同的地址。

```cpp
const type* ptr; // 或 type const* ptr;
```

- type 是指针指向的数据类型。
- const 修饰 type，表示指针指向的数据是常量，不能通过指针修改

```cpp
int a = 10;
int b = 20;
const int* ptr = &a; // 常量指针，指向 a

std::cout << "Value pointed by ptr: " << *ptr << std::endl;

// *ptr = 15; // 错误，不能通过 ptr 修改 a 的值

ptr = &b; // 可以改变指针指向的地址
std::cout << "Value pointed by ptr: " << *ptr << std::endl;
```

- `const int* ptr` 表示 `*ptr` 是只读的，不能通过指针修改值。
- `ptr = &b` 是合法的，指针本身可以指向不同的地址。

### 指针常量

指针常量是指针本身是常量，不能改变指针指向的地址，但可以通过指针修改指向的数据。

```cpp
type* const ptr = address;
```

- type 是指针指向的数据类型。
- const 修饰指针本身，表示指针是常量，不能改变它的指向。

```cpp
int a = 10;
int b = 20;
int* const ptr = &a; // 指针常量，指向 a

std::cout << "Value pointed by ptr: " << *ptr << std::endl;

*ptr = 15; // 可以通过指针修改 a 的值
std::cout << "Updated value of a: " << a << std::endl;

// ptr = &b; // 错误，不能改变 ptr 的指向
```

- `int* const ptr` 表示 ptr 是常量，不能指向其他地址。
- `*ptr = 15` 是合法的，可以通过指针修改指向的数据。

### 常量指针常量

常量指针常量是一个指针既是常量指针又是指针常量，则既不能通过指针修改指向的数据，也不能改变指针本身的指向。

```cpp
const type* const ptr = address;
```

```cpp
int a = 10;
const int* const ptr = &a; // 常量指针+指针常量

std::cout << "Value pointed by ptr: " << *ptr << std::endl;

// *ptr = 15; // 错误，不能通过 ptr 修改值
// ptr = &b;  // 错误，不能修改 ptr 的指向
```

### 数组指针

数组指针是一个指针，它指向整个数组的首地址，而不是单个元素的地址。

```cpp
type (*pointer_name)[size];
```

```cpp
int arr[3] = {1, 2, 3};
int (*arrPtr)[3] = &arr; // 定义一个数组指针，指向 arr

// 使用数组指针访问数组
std::cout << "First element: " << (*arrPtr)[0] << std::endl;
std::cout << "Second element: " << (*arrPtr)[1] << std::endl;
```

- arrPtr 是一个数组指针，指向整个 arr 数组的首地址。
- 使用 `(*arrPtr)[i]` 访问数组元素。

虽然 数组指针 和 普通指针 看起来相似，但它们在功能和应用场景上是不同的。数组指针的复杂性是为了解决特定的问题，尤其是在处理多维数组、函数参数和复杂数据结构时，它提供了更精确的类型信息。

数组指针的主要目的是：

- 区分单个元素指针和整个数组指针：普通指针操作的是单个元素的地址，数组指针指向的是整个数组的首地址。
- 简化多维数组的操作：在多维数组的场景中，数组指针可以表示特定维度的子数组。
- 函数参数传递数组：数组指针明确传递的是数组的结构和维度，而不仅仅是一个指向首元素的普通指针。

普通指针无法表达数组的结构信息，仅仅是一个地址。如下例：

```cpp
void printArray(int* ptr) { // 接收普通指针
    for (int i = 0; i < 5; i++) {
        std::cout << ptr[i] << " ";
    }
    std::cout << std::endl;
}

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    printArray(arr); // 传递数组的首地址
    return 0;
}
```

- 函数 printArray 只知道 ptr 是一个指针，但不知道指针指向的数组长度。
- 如果数组维度或大小不匹配，程序可能出现问题。

数组指针可以传递数组的结构信息，让函数明确知道它接收的参数是一个特定大小的数组。

- 函数签名明确说明接收的是一个 5 个整数的数组。
- 减少了普通指针导致的数组信息丢失问题。

```cpp
void printArray(int (*arrPtr)[5]) { // 接收数组指针
    for (int i = 0; i < 5; i++) {
        std::cout << (*arrPtr)[i] << " ";
    }
    std::cout << std::endl;
}

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    printArray(&arr); // 传递数组指针
    return 0;
}
```

### 指针数组

指针数组是一个数组，其中每个元素都是一个指针，指向某种数据类型。

```cpp
type* array_name[size];
```

```cpp
int a = 10, b = 20, c = 30;
int* ptrArray[3] = {&a, &b, &c}; // 定义一个指针数组

// 通过指针数组访问变量
for (int i = 0; i < 3; i++) {
    std::cout << "Value pointed by ptrArray[" << i << "]: " << *ptrArray[i] << std::endl;
}
```

字符串指针数组

```cpp
const char* fruits[] = {"Apple", "Banana", "Cherry"}; // 字符串指针数组

// 通过指针数组访问字符串
for (int i = 0; i < 3; i++) {
    std::cout << "Fruit " << i + 1 << ": " << fruits[i] << std::endl;
}
```

- fruits 是一个指针数组，每个元素指向一个字符串常量。
- 使用 fruits[i] 获取字符串地址。

### 引用

引用（Reference）是一个变量的别名，提供了对已有变量的直接访问，简化了指针操作，提高了代码的可读性和安全性。

引用的特点：

- 必须初始化：引用在声明时必须初始化，不能像指针那样单独声明。
- 不可改变绑定：一旦引用绑定到某个变量，就无法重新绑定到另一个变量。
- 简化语法：引用的语法比指针更简洁，不需要显式解引用操作。
- 与指针的区别：引用是别名，操作引用就像操作原变量本身。指针是内存地址的变量，可以指向不同的对象。

```cpp
int a = 10;
int& ref = a; // 声明引用 ref，绑定到变量 a

std::cout << "Value of a: " << a << std::endl; // 10
std::cout << "Value of ref: " << ref << std::endl; // 10

ref = 20; // 修改引用，实际上修改了 a 的值
std::cout << "Updated value of a: " << a << std::endl; // 20
```

- ref 是变量 a 的引用，任何对 ref 的操作都会作用在 a 上。
- 通过 ref 修改值实际上修改了 a。

按值传递会拷贝数据，效率低，可采用引用传递直接操作原始数据，更高效。

```cpp
void increment(int& num) { // 引用作为参数
    num++;
}

int main() {
    int a = 10;
    increment(a); // 通过引用传递 a
    std::cout << "Value after increment: " << a << std::endl; // 11

    return 0;
}
```

- 使用引用，函数直接操作原变量 a，避免了值拷贝，提高了效率。

引用可以作为函数返回值，但需要保证返回的引用指向合法的内存。

```cpp
int& getValue(int& x) {
    return x; // 返回引用
}

int main() {
    int a = 10;
    int& ref = getValue(a); // 引用接收返回值
    ref = 20; // 修改返回的引用

    std::cout << "Value of a: " << a << std::endl; // 20

    return 0;
}
```

- 函数返回一个引用，调用者可以直接操作返回值，改变原变量的值。

不要返回局部变量的引用，原因和指针相同。

```cpp
int& invalid() {
    int x = 10;
    return x; // 错误：返回局部变量引用
}
```

### 常量引用

常量引用用于保护原数据，防止通过引用修改内容，常用于函数参数，传递大对象时既高效又安全。

```cpp
void printMessage(const std::string& msg) { // 常量引用
    std::cout << "Message: " << msg << std::endl;
}

int main() {
    std::string message = "Hello, world!";
    printMessage(message); // 传递常量引用
    return 0;
}
```

### 数组引用

数组引用是指对一个数组的引用，和数组指针相同，就是将指针更换为了引用。

```cpp
void modifyWithPointer(int (*arr)[3]) {
    (*arr)[0] = 100;  // 修改第一个元素
}

void modifyWithReference(int (&arr)[3]) {
    arr[1] = 200;  // 修改第二个元素
}

int main() {
    int arr[3] = {1, 2, 3};

    modifyWithPointer(&arr);  // 传入数组指针
    modifyWithReference(arr); // 传入数组引用

    for (int i : arr) {
        cout << i << " ";
    }
    return 0;
}
```

### 范围循环引用

引用可以避免在范围循环中拷贝数据，提高效率。

```cpp
std::vector<int> nums = {1, 2, 3, 4, 5};

for (int& num : nums) { // 使用引用避免拷贝
    num *= 2; // 修改原数组
}

for (const int& num : nums) { // 常量引用，避免修改
    std::cout << num << " ";
}
std::cout << std::endl;
```

### 引用的本质

引用是通过指针实现的一个语法糖，本质上就是一个指针常量的封装，不能改变指针指向的地址，但可以通过指针修改指向的数据。引用在底层会直接与被引用对象的地址绑定，引用操作实际上是对指针的简化。编译器会将对引用的操作转换为对指针的解引用。

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202412072106240.png)

- 引用 和 指针常量最大的区别就是，引用不需要额外开辟一个指针的空间，和原变量共享地址。

在底层，编译器会将引用转换为指针操作：

```cpp
int a = 10;  // 原变量
int& ref = a; // 引用 ref 绑定到 a
ref = 20;    // 修改引用，实际上修改了 a
```

```cpp
int a = 10;
int* const ref = &a; // 引用实际上是一个常量指针
*ref = 20;           // 通过指针修改值
```

引用不占用额外内存的核心原因：

- 编译器直接将引用映射到原变量：
  - 引用没有独立的存储空间，它是被引用变量的别名。
  - 编译器在生成代码时，将引用的所有操作直接映射为对原变量的操作。
  - 引用的地址和被引用变量的地址完全相同。
- 编译器优化：
  - 在语法层面，引用看起来像一个新变量，但编译器会将它优化为对原变量的直接操作。
  - 编译器不会为引用分配新的存储空间，而是通过操作符重载或解引用机制直接操作原变量。

我们可以通过代码和内存地址的观察，验证引用不会占用额外的内存空间。

```cpp
int a = 10;
int& ref = a; // 引用绑定到 a

std::cout << "Address of a: " << &a << std::endl; // 0x7ffee79b0
std::cout << "Address of ref: " << &ref << std::endl; // 0x7ffee79b0
```

汇编代码验证：

```cpp
int a = 10;
int& ref = a; // 引用绑定到 a

ref = 20; // 修改引用，实际上修改了 a
std::cout << a << std::endl;
```

```
mov DWORD PTR [rsp-4], 10   ; 将 10 存储到 a 的内存位置
mov DWORD PTR [rsp-4], 20   ; 通过 ref 修改 a 的值为 20
```

- ref 的绑定仅在语义层面，编译器在实际代码中根本没有单独的 ref 存储。
- 对 ref 的操作直接被替换为对 a 的内存操作。

```cpp
void modify(int& ref) {
    ref = 42; // 修改引用
}

int main() {
    int a = 10;
    modify(a);

    std::cout << a << std::endl;

    return 0;
}
```

```
mov rdi, OFFSET FLAT:a     ; 将 a 的地址传递给函数
mov DWORD PTR [rdi], 42    ; 通过地址直接修改 a 的值
```

- ref 在底层被实现为指针。
- 函数参数传递的是变量 a 的地址，函数内部通过地址修改原变量的值。
- 无需为 ref 分配单独的内存。

引用在绑定数组时，同样不占用额外内存。

```cpp
int arr[3] = {1, 2, 3};
int(&ref)[3] = arr; // 引用绑定整个数组

ref[0] = 10; // 修改引用，实际上修改原数组
std::cout << arr[0] << std::endl;
```

- ref 是数组 arr 的引用。
- 编译器在底层直接将 ref 映射为对 arr 的访问。
- ref[0] 被直接优化为对 arr[0] 的访问。

即使是 const 引用，也不会占用额外的内存。

```cpp
void print(const int& ref) {
    std::cout << ref << std::endl;
}

int main() {
    int a = 10;
    print(a);

    return 0;
}
```

- ref 在函数中不会占用新的内存，编译器会将其实现为 a 的地址传递。
- 常量引用只是对原变量的只读访问权限的语法约束，不涉及额外的存储空间。

为什么引用比指针更高效？

- 引用在语法层面更加接近直接变量操作，避免了指针的解引用和取地址。
- 编译器可以在语法层面将引用优化为直接访问变量，而指针的间接性可能会降低优化效率。
- 引用绑定后无法更改，避免了指针可能为空或指向非法内存的情况。

### 数组长度

#### 原声数组

使用 sizeof 操作符计算长度：

```cpp
int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int length = sizeof(arr) / sizeof(arr[0]);

    std::cout << "Length of the array: " << length << std::endl;

    return 0;
}
```

- 此方法仅适用于在编译时已知大小的数组（如局部定义的静态数组）。
- 不能用于指针或动态分配的数组。

如果 arr 是一个静态数组，那么 sizeof(arr) 计算的是该数组的长度，如果 arr 是一个指针，那么 sizeof(arr) 计算的是该指针的长度，默认为 8 B。

```cpp
int arr[] = {1, 2, 3, 4, 5}; // 静态数组
int length = sizeof(arr) / sizeof(arr[0]); // 20 / 4 = 5，计算长度

int* arr = new int[5]; // 动态分配数组
int length = sizeof(arr) / sizeof(arr[0]); // 8 / 4 = 2，尝试计算长度
```

如果你需要一个通用的解决方案，可以使用模板封装数组长度计算：

```cpp
template <typename T, size_t N>
constexpr size_t arrayLength(T (&)[N]) {
    return N;
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    std::cout << "Length of the array: " << arrayLength(arr) << std::endl;

    return 0;
}
```

- 编译期安全，避免误将指针传递给 sizeof。

#### 标准容器

std::array 是一个固定大小的数组类，可以通过 size() 方法直接获取长度。

```cpp
std::array<int, 5> arr = {1, 2, 3, 4, 5};
std::cout << "Length of std::array: " << arr.size() << std::endl;
```

std::vector 是动态数组类，支持动态分配和自动管理大小。

```cpp
std::vector<int> vec = {1, 2, 3, 4, 5};
std::cout << "Length of std::vector: " << vec.size() << std::endl;
```

### 数组拷贝

```cpp
int nums1[] = {3, 1, 4, 1, 5};

// 浅拷贝，拷贝了 nums1 首元素的地址，通过 nums2 操作数组，依旧操作的是原数组
int* nums2 = nums1;

// 深拷贝，拷贝了 nums1 的所有元素的具体的值
int nums3[5];
for (int i = 0; i < 5; i++) {
    nums3[i] = nums1[i];
}
```

### 二维数组

```cpp
// 完全初始化
int arr1[2][3] = {{1, 2, 3}, {4, 5, 6}};

// 部分初始化，未指定的元素会初始化为 0
int arr2[2][3] = {{1, 2}, {4}};

// 初始化为全 0
int arr3[2][3] = {0};

// 自动推导列数
int arr4[][3] = {{1, 2, 3}, {4, 5, 6}};

std::cout << "arr1[0][1]: " << arr1[0][1] << std::endl;
```

```cpp
int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};

// 使用索引遍历二维数组
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 3; j++) {
        std::cout << arr[i][j] << " ";
    }
    std::cout << std::endl;
}

// 使用指针遍历二维数组
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 3; j++) {
        std::cout << *(*(arr + i) + j) << " ";
    }
    std::cout << std::endl;
}
```

使用指针实现动态分配

```cpp
int rows = 2, cols = 3;

// 动态分配二维数组
int** arr = new int*[rows];
for (int i = 0; i < rows; i++) {
    arr[i] = new int[cols];
}

// 初始化数组
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        arr[i][j] = i * cols + j + 1;
    }
}

// 打印数组
for (int i = 0; i < rows; i++) {
    for (int j = 0; j < cols; j++) {
        std::cout << arr[i][j] << " ";
    }
    std::cout << std::endl;
}

// 释放内存
for (int i = 0; i < rows; i++) {
    delete[] arr[i];
}
delete[] arr;
```

- 动态分配内存时，先为行分配指针数组，再为每行分配列数组。
- 动态分配的二维数组需要手动释放内存。
