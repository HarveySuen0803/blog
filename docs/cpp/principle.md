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

链接器将多个目标文件（main.o 和 Math.o）结合起来，将所有未解析的符号（如 Math::add 和 Math::multiply）的引用解析为实际的内存地址，生成一个最终的可执行文件 main。

```shell
g++ main.o Math.o -o main
```

# 运行

可执行文件运行时，操作系统会将程序加载到内存中，初始化栈、堆和全局变量，调用 main 函数。

# RTTI

RTTI 是 C++ 提供的一种机制，用于在运行时获取对象的类型信息。主要应用场景包括：

1. 动态类型转换：使用 dynamic_cast 在运行时检查类型。
2. 类型识别：使用 typeid 识别对象的实际类型。

RTTI 的实现依赖于类的虚函数表（VTable）。如果一个类有虚函数（即使是继承得到的），编译器会为该类生成运行时类型信息。

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

