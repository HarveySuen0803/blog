### IO

C++ 提供了丰富的文件操作支持，通过标准库中的类完成文件的读写。常用类包括：

- std::ifstream：用于读取文件。
- std::ofstream：用于写入文件。
- std::fstream：同时支持读写文件。

### 文本文件操作

写入文本文件：

```cpp
#include <iostream>
#include <fstream>

int main() {
    // 创建 ofstream 对象，表示输出文件流
    std::ofstream outfile("example.txt");

    // 检查文件是否成功打开
    if (!outfile.is_open()) {
        std::cerr << "Failed to open file for writing." << std::endl;
        return 1;
    }

    // 写入内容
    outfile << "Hello, C++ File Operations!" << std::endl;
    outfile << "This is the second line." << std::endl;

    // 关闭文件
    outfile.close();

    std::cout << "Data written to example.txt" << std::endl;

    return 0;
}
```

读取文本文件：

```cpp
#include <iostream>
#include <fstream>
#include <string>

int main() {
    // 创建 ifstream 对象，表示输入文件流
    std::ifstream infile("example.txt");

    // 检查文件是否成功打开
    if (!infile.is_open()) {
        std::cerr << "Failed to open file for reading." << std::endl;
        return 1;
    }

    // 按行读取文件内容
    std::string line;
    while (std::getline(infile, line)) {
        std::cout << line << std::endl;
    }

    // 关闭文件
    infile.close();

    return 0;
}
```

读写同一个文本文件

```cpp
#include <iostream>
#include <fstream>

int main() {
    // 创建 fstream 对象，表示输入输出文件流
    std::fstream file("example.txt", std::ios::in | std::ios::out);

    // 检查文件是否成功打开
    if (!file.is_open()) {
        std::cerr << "Failed to open file for reading and writing." << std::endl;
        return 1;
    }

    // 读取文件的第一行
    std::string line;
    if (std::getline(file, line)) {
        std::cout << "First line: " << line << std::endl;
    }

    // 在文件末尾追加内容
    file.clear();  // 清除 EOF 标志
    file.seekp(0, std::ios::end); // 移动写指针到文件末尾
    file << "This is an appended line." << std::endl;

    // 关闭文件
    file.close();

    std::cout << "Data appended to example.txt" << std::endl;

    return 0;
}
```

### 二进制文件操作

C++ 支持通过二进制模式操作文件，适合处理非文本数据。

写入二进制文件：

```cpp
#include <iostream>
#include <fstream>

int main() {
    // 创建输出文件流，使用二进制模式
    std::ofstream outfile("data.bin", std::ios::binary);

    // 写入数据
    int number = 42;
    double pi = 3.14159;

    outfile.write(reinterpret_cast<char*>(&number), sizeof(number));
    outfile.write(reinterpret_cast<char*>(&pi), sizeof(pi));

    outfile.close();

    std::cout << "Binary data written to data.bin" << std::endl;

    return 0;
}
```

读取二进制文件：

```cpp
#include <iostream>
#include <fstream>

int main() {
    // 创建输入文件流，使用二进制模式
    std::ifstream infile("data.bin", std::ios::binary);

    // 检查文件是否成功打开
    if (!infile.is_open()) {
        std::cerr << "Failed to open binary file for reading." << std::endl;
        return 1;
    }

    // 读取数据
    int number;
    double pi;

    infile.read(reinterpret_cast<char*>(&number), sizeof(number));
    infile.read(reinterpret_cast<char*>(&pi), sizeof(pi));

    infile.close();

    // 输出读取的内容
    std::cout << "Read number: " << number << std::endl;
    std::cout << "Read pi: " << pi << std::endl;

    return 0;
}
```

### 文件描述符

FD 是一个小的整数，是操作系统级别的抽象，用于表示操作系统打开的文件、套接字或管道。FD 由系统调用（例如，open）生成，从 0 开始，标准输入、输出和错误分别对应 0、1 和 2。

在底层，文件描述符是内核中的索引。每个文件描述符指向一个内核数据结构，称为文件表项，其中存储了文件的元信息，文件表项本身是进程文件表中的一部分，且进一步指向系统全局的文件信息。

- 文件位置指针：标记文件的当前读/写位置。
- 访问模式：只读、只写或读写。
- 引用计数：表明有多少进程共享该描述符。

CPP 标准库中的 fstream 底层依赖 C 标准库（例如，fopen），而 C 标准库底层依赖系统调用（例如，open），所以 CPP 也允许获取文件描述符用于与 C API 交互。

```cpp
int fd = open("example_fd.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
if (fd == -1) {
    perror("Error opening file");
    return 1;
}

const char* message = "Hello, File Descriptor!\n";
write(fd, message, strlen(message)); // 写入数据到文件

close(fd); // 关闭文件描述符
```