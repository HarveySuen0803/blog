# 构建流程

C++ 从源代码到机器可执行文件的整个构建流程通常包括以下几个阶段：

- 预处理（Preprocessing）
- 编译（Compilation）
- 汇编（Assembly）
- 链接（Linking）

```
源代码（.cpp） --> 预处理器 --> 编译器 --> 汇编器 --> 链接器 --> 可执行文件
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202412081337654.png)

# 预处理

预处理器处理所有以 # 开头的指令（例如 `#include`, `#define`, `#ifdef`），将所有包含的头文件内容插入到源文件中，处理宏替换和条件编译。预处理的结果是一个“纯粹的 C++ 源代码”（main.i），大致如下：

```shell
g++ -E main.cpp -o main.i
```

```cpp
// 从 <iostream> 和 "Math.h" 中插入的内容（内容被展开）
// 假设 <iostream> 中有很多系统级代码...

class Math {
public:
    static int add(int a, int b);
    static int multiply(int a, int b);
};

int main() {
    int sum = Math::add(3, 4);
    int product = Math::multiply(3, 4);

    std::cout << "Sum: " << sum << std::endl;
    std::cout << "Product: " << product << std::endl;

    return 0;
}
```

# 编译

编译器将预处理后的代码（main.i）翻译为汇编代码。语法检查、类型检查和优化会在此阶段完成。编译后将输出一个汇编代码文件（main.s），大致如下：

```shell
g++ -S main.i -o main.s
```

```cpp
.section .rodata
.LC0:
    .string "Sum: %d\n"
.LC1:
    .string "Product: %d\n"

.text
.globl main
main:
    pushq   %rbp
    movq    %rsp, %rbp
    subq    $16, %rsp
    movl    $3, -4(%rbp)
    movl    $4, -8(%rbp)
    movl    -4(%rbp), %edi
    movl    -8(%rbp), %esi
    call    _ZN4Math3addEii
    movl    %eax, -12(%rbp)
    ...
```

# 汇编

汇编器将汇编代码翻译为机器代码，输出一个目标文件（main.o），包含机器指令，但尚未完成链接。可以采用 objdump 查看，大致内容如下：

```shell
g++ -c main.s -o main.o
```

```cpp
0000000000000000 <main>:
   0:   55                      push   %rbp
   1:   48 89 e5                mov    %rsp,%rbp
   4:   48 83 ec 10             sub    $0x10,%rsp
   ...
```

- 此时，main.o 包含二进制的机器指令，但函数 Math::add 和 Math::multiply 的地址还未解析。

# 链接

链接器解析外部符号，将多个目标文件（main.o 和 Math.o）结合起来，将所有未解析的符号（如 Math::add 和 Math::multiply）的引用解析为实际的内存地址，生成一个最终的可执行文件 main。

```shell
g++ main.o Math.o -o main
```

# 运行

可执行文件运行时，操作系统会将程序加载到内存中，初始化栈、堆和全局变量，调用 main 函数。

# 虚函数表

虚函数表 vtable 是一种由编译器生成的内部数据结构，用于支持虚函数调用和实现动态绑定。虚表是类级别的（而非对象级别），表中存储了该类的所有虚函数的地址，当派生类覆盖基类的虚函数时，派生类的虚表中会替换对应虚函数的地址。

每个包含虚函数的类的对象都会有一个隐藏的成员变量，称为虚表指针（vptr），指向该对象所属类的虚函数表。

当通过基类指针或引用调用虚函数时，编译器会在运行时通过对象的虚表指针找到实际要调用的函数地址，并调用该函数，实现动态绑定。

假设类 Base 和 Derived 的虚函数表如下：

```
VTable_Base:
+-----------------+
| Base::show()    |  <- 地址1
+-----------------+
| Base::print()   |  <- 地址2
+-----------------+

VTable_Derived:
+-----------------+
| Derived::show() |  <- 地址3
+-----------------+
| Derived::print()|  <- 地址4
+-----------------+
```

- 创建 Derived 对象时，其虚表指针 vptr 会指向 VTable_Derived。
- 当调用 base->show() 时，程序通过 vptr 找到 VTable_Derived 的 show() 地址，并调用 Derived::show()。
- 同样，调用 base->print() 时，调用的是 Derived::print()。

# RTTI

RTTI（运行时类型信息）是 C++ 提供的一种机制，用于在运行时获取对象的类型信息。通过 RTTI，可以实现 运行时类型检查（dynamic_cast） 和 类型识别（typeid），主要用于动态多态场景。

RTTI 只能用于 包含虚函数的类，因为 RTTI 的实现依赖 虚函数表（VTable），如果一个类没有虚函数，就不会生成运行时类型信息，也无法使用 dynamic_cast 或 typeid 进行类型操作。

- dynamic_cast 和 typeid 都会去查询虚表中存储的类型信息 type_info。

```cpp
#include <iostream>
#include <typeinfo> // 用于 std::bad_cast

class Base {
public:
    virtual ~Base() = default; // 必须有虚函数，支持 RTTI
};

class Derived : public Base {
public:
    void show() { std::cout << "Derived::show()" << std::endl; }
};

class AnotherDerived : public Base {};

int main() {
    Base* base1 = new Derived();
    Base* base2 = new AnotherDerived();

    // 安全地将 base1 转换为 Derived 类型
    if (Derived* derived = dynamic_cast<Derived*>(base1)) {
        derived->show(); // 输出：Derived::show()
    } else {
        std::cout << "base1 is not a Derived" << std::endl;
    }

    // 尝试将 base2 转换为 Derived 类型
    if (Derived* derived = dynamic_cast<Derived*>(base2)) {
        derived->show();
    } else {
        std::cout << "base2 is not a Derived" << std::endl; // 输出
    }

    delete base1;
    delete base2;

    return 0;
}
```

```
Derived::show()
base2 is not a Derived
```

# RAII

RAII（资源获取即初始化）是 C++ 的核心设计理念之一，用于可靠和自动地管理资源（如内存、文件、网络连接等）。它的核心思想是将 资源的获取和释放 绑定到对象的 生命周期 上，通过对象的 构造函数和析构函数 来管理资源。

- 资源获取：在对象构造时，分配资源（如内存、文件句柄、锁等），通过构造函数进行资源初始化。
- 资源释放：在对象析构时，释放资源，通过析构函数确保资源被正确释放，无需显式调用释放操作。
- 生命周期管理：对象生命周期与资源绑定，确保在对象销毁时自动清理资源，即使发生异常，也能保证资源被释放，避免资源泄漏。

RAII 的典型应用场景：

- 内存管理：如 std::unique_ptr, std::shared_ptr。
- 文件管理：如 std::ifstream, std::ofstream。
- 多线程锁：如 std::lock_guard, std::unique_lock。
- 其他资源：如网络连接、数据库连接。

# RAII 内存管理

不使用 RAII 的内存管理，就需要手动管理内存，容易忘记 delete，如果在 delete 之前发生异常，会导致内存泄漏。

```cpp
void withoutRAII() {
    int* ptr = new int(42); // 动态分配内存
    std::cout << "Value: " << *ptr << std::endl;

    // 如果忘记释放内存，或者函数抛出异常，会导致内存泄漏
    delete ptr;
}
```

使用 RAII 的内存管理，通过封装动态内存的分配和释放到一个类中，确保资源安全。内存的分配和释放由构造函数和析构函数自动管理，即使发生异常，析构函数仍会被调用，确保资源释放。

```cpp
class RAIIInt {
private:
    int* ptr; // 动态分配的内存
public:
    RAIIInt(int value) : ptr(new int(value)) {
        std::cout << "Resource acquired" << std::endl;
    }
    ~RAIIInt() {
        delete ptr; // 自动释放内存
        std::cout << "Resource released" << std::endl;
    }

    int getValue() const { return *ptr; }
};

void withRAII() {
    RAIIInt resource(42);
    std::cout << "Value: " << resource.getValue() << std::endl;

    // 不需要手动释放内存，析构函数会自动调用
}
```

# RAII 文件管理

使用 RAII 的文件管理，通过封装文件操作为类，确保文件在对象销毁时自动关闭。

```cpp
class RAIIFile {
private:
    std::ifstream file;
public:
    RAIIFile(const std::string& filename) : file(filename) {
        if (!file.is_open()) {
            throw std::runtime_error("Failed to open file");
        }
        std::cout << "File opened" << std::endl;
    }

    ~RAIIFile() {
        if (file.is_open()) {
            file.close(); // 自动关闭文件
            std::cout << "File closed" << std::endl;
        }
    }

    void read() {
        std::string line;
        while (std::getline(file, line)) {
            std::cout << line << std::endl;
        }
    }
};

void withRAII() {
    try {
        RAIIFile file("example.txt");
        file.read();
    } catch (const std::exception& e) {
        std::cerr << e.what() << std::endl;
    }
}
```

# RAII 线程锁管理

RAII 也常用于管理多线程中的锁，避免死锁或未释放锁的情况。

不实用 RAII 线程锁管理，如果在 mtx.unlock() 前发生异常，锁会保持未释放状态，导致死锁。

```cpp
std::mutex mtx;

void withoutRAII() {
    mtx.lock(); // 手动加锁
    std::cout << "Critical section" << std::endl;

    // 如果函数提前返回或抛出异常，锁可能无法释放
    mtx.unlock(); // 手动解锁
}
```

使用 RAII 线程锁管理，确保锁的正确释放。不会因异常导致死锁，加锁和解锁逻辑清晰，避免手动管理锁的复杂性。

```cpp
std::mutex mtx;

void withRAII() {
    std::lock_guard<std::mutex> lock(mtx); // 构造时加锁，析构时解锁
    std::cout << "Critical section" << std::endl;

    // 无需手动解锁，离开作用域时自动释放锁
}
```

# RVO

RVO（Return Value Optimization） 是编译器的一种优化技术，用于消除函数返回临时对象时的不必要的拷贝或移动。

```cpp
class Test {
public:
    Test() { std::cout << "Constructor\n"; }
    Test(const Test&) { std::cout << "Copy Constructor\n"; }
    Test(Test&&) noexcept { std::cout << "Move Constructor\n"; }
    ~Test() { std::cout << "Destructor\n"; }
};

Test createTest() {
    Test temp;
    return temp;
}

void demo() {
    std::cout << "in demo()\n";
    Test t = createTest();
    std::cout << "out demo()\n";
}

int main() {
    std::cout << "in main()\n";
    test();
    std::cout << "out main()\n";
    return 0;
}
```

```
### 禁用 RVO 的输出 ###

in main()
in demo()
Constructor
Move Constructor
Destructor
out demo()
Destructor
out main()
```

- 编译器执行 `return Test()` 时，首先会在 `createTest()` 的栈空间创建临时对象，接着再通过移动构造或拷贝构造在 `demo()` 的栈空间创建临时对象。
- 如果有移动构造，则会优先调用移动构造，减少一次拷贝，否则调用拷贝构造。

```
### 启用 RVO 的输出 ###

in main()
in demo()
Constructor
out demo()
Destructor
out main()
```

- 编译器不会在 `createTest()` 的栈空间创建临时变量，而是直接在 `demo()` 的栈空间创建临时变量，只调用一次构造函数，避免了额外的拷贝和移动，性能更优。

# NRVO

如果返回的是具名对象，而不是临时对象，RVO 仍然可能生效，但属于 NRVO（Named Return Value Optimization）。

```cpp
class Test {
public:
    Test() { std::cout << "Constructor\n"; }
    Test(const Test&) { std::cout << "Copy Constructor\n"; }
    Test(Test&&) noexcept { std::cout << "Move Constructor\n"; }
    ~Test() { std::cout << "Destructor\n"; }
};

Test createTest() {
    Test t;  // 具名对象
    return t;  // 可能触发 NRVO
}

int main() {
    std::cout << "Calling createTest()\n";
    Test t = createTest();
    std::cout << "Exiting main()\n";
}
```

```
### 禁用 NRVO 的输出 ###

Calling createTest()
Constructor
Move Constructor
Destructor
Exiting main()
Destructor
```

- 先在 `createTest()` 的栈空间创建具名对象，再移动到 `main()` 的 t 变量处。

```
### 启用 NRVO 的输出 ###

Calling createTest()
Constructor
Exiting main()
Destructor
```

- 直接在 `main()` 的栈空间创建具名对象。

# 符号链接

符号的链接（Symbol Linkage）决定了变量、函数或类在程序的不同翻译单元（translation unit）之间的可见性。

- 外部链接（External Linkage）
- 内部链接（Internal Linkage）
- 无链接（No Linkage）

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202501171116550.png)

---

**外部链接（External Linkage）**

默认情况下，非 static 的全局变量和函数具有外部链接，外部链接的符号可以在多个翻译单元（多个 .cpp 文件）中被访问。

```cpp
// file1.cpp

int globalVar = 42;  // 具有外部链接（默认）
void showMessage() {  // 具有外部链接（默认）
    std::cout << "Hello from file1!" << std::endl;
}
```

```cpp
// file2.cpp

// 使用 extern 关键字声明 file1.cpp 中的变量和函数
extern int globalVar;
extern void showMessage();

int main() {
    std::cout << "globalVar = " << globalVar << std::endl; // 访问 file1.cpp 的变量
    showMessage(); // 调用 file1.cpp 的函数
    return 0;
}
```

---

**内部链接（Internal Linkage）**

使用 static 关键字修饰的全局变量或函数具有内部链接，内部链接的符号只能在定义它的那个翻译单元（.cpp 文件）中使用，不能被其他翻译单元访问，这主要用于避免名称冲突，以及隐藏实现细节。

```cpp
// file1.cpp

static int internalVar = 100;  // 具有内部链接
static void internalFunction() {  // 具有内部链接
    std::cout << "Hello from internal function in file1!" << std::endl;
}

void publicFunction() {
    std::cout << "This is a public function in file1" << std::endl;
}
```

```cpp
// file2.cpp

// extern int internalVar;  // ❌ 错误：internalVar 在 file1.cpp 内部，不可访问
// extern void internalFunction();  // ❌ 错误：internalFunction 在 file1.cpp 内部，不可访问

extern void publicFunction();  // ✅ 这个可以访问，因为它没有 static 修饰

int main() {
    // std::cout << "internalVar = " << internalVar << std::endl;  // ❌ 错误
    // internalFunction();  // ❌ 错误
    publicFunction();  // ✅ 正确
    return 0;
}
```

---

**无链接（No Linkage）**

局部变量（定义在函数内部的变量）和 constexpr 变量具有无链接，无链接的符号只能在它们定义的作用域内使用，不能跨翻译单元使用。

```cpp
void testFunction() {
    int localVar = 10;  // 这是一个局部变量，具有无链接
    static int staticLocalVar = 20;  // 也是无链接
    std::cout << "localVar = " << localVar << std::endl;
    std::cout << "staticLocalVar = " << staticLocalVar << std::endl;
}

int main() {
    testFunction();
    // std::cout << localVar << std::endl;  // ❌ 错误：无法访问局部变量
    return 0;
}
```
