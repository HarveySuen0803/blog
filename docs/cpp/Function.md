### system

system() 是一个标准 C 函数，用于在程序中调用操作系统的命令。

```cpp
int result = system("ls");

if (result == 0) {
    std::cout << "Command executed successfully." << std::endl;
} else {
    std::cout << "Command execution failed." << std::endl;
}
```

```cpp
const char* filename = "example.txt";

// 在 Linux 和 macOS 上使用 "open"，在 Windows 上使用 "start"
std::string command = "open ";
command += filename;

int result = system(command.c_str());

if (result == 0) {
    std::cout << "File opened successfully." << std::endl;
} else {
    std::cout << "Failed to open file." << std::endl;
}
```

### std::move

std::move 是“移动语义”的核心工具，它不进行深拷贝，而是将资源的“所有权”从一个对象转移到另一个对象，从而减少额外的拷贝操作。

```cpp
std::string str = "Hello, World!";
std::vector<std::string> vec;

// 使用复制
vec.push_back(str); // 复制了 str 的内容到 vec 的元素
std::cout << "After copy, str: " << str << std::endl;

// 使用移动
vec.push_back(std::move(str)); // 将 str 的内容转移到 vec 的元素
std::cout << "After move, str: " << str << std::endl; // str 的内容被转移

// 打印 vec 的内容
for (const auto& s : vec) {
    std::cout << s << std::endl;
}
```

- vec.push_back(std::move(str) 转移了 str 的资源到 vec，避免了额外的内存分配和数据拷贝。
- 移动语义将 str 的底层内存直接交给了 vec，此时 str 变为空状态（内容未定义，但安全）。

### std::copy

std::copy 是一个高效的复制算法，用于将一段数据从一个范围复制到另一个范围。相比手动循环，它使用了底层优化，特别是对于内存连续存储的容器。

```cpp
std::vector<int> src = {1, 2, 3, 4, 5};
std::vector<int> dest(src.size()); // 确保目标容器有足够的空间

// 使用 std::copy
std::copy(src.begin(), src.end(), dest.begin());

// 打印复制后的目标容器
for (int num : dest) {
    std::cout << num << " ";
}
```

std::copy 的实现利用了 memmove 或 memcpy 来优化性能，尤其是当数据存储在连续内存中的容器中时，避免了逐元素调用赋值操作。

- 如果容器的内存连续（例如，std::vector、native array），元素是简单类型（例如，int、float），则会采用 memcpy 或 memmove 按字节复制。
- 如果容器的内存非连续（例如，std::list），则会逐元素调用赋值操作。
- 如果元素是复杂类型（例如，自定义类），则会逐元素调用拷贝构造函数，因为这些类型无法直接使用 memcpy 或 memmove 进行字节复制。

### memcpy

memcpy 用于复制内存的字节块，源和目标内存区域不能重叠，如果存在重叠，会导致未定义行为。通常比 memmove 更快，因为它不需要额外的重叠检查。

```cpp
char src[] = "Hello, World!";
char dest[20];

// 使用 memcpy 复制
memcpy(dest, src, strlen(src) + 1);

std::cout << "Source: " << src << std::endl;
std::cout << "Destination: " << dest << std::endl;
```

### memmove

memmove 用于复制内存的字节块，支持源和目标内存区域重叠的情况，如果发生重叠，会确保数据的正确性。较 memcpy 稍慢，因为需要处理重叠检查。

```cpp
char str[] = "Overlapping Example";

// 源和目标内存重叠
memmove(str + 5, str, 10);

std::cout << "Result: " << str << std::endl;
```

### std::sort

对范围内的元素按升序排序（默认）。可以提供自定义比较函数或仿函数。

```cpp
std::vector<int> numbers = {5, 2, 8, 1, 3};

// 默认升序排序
std::sort(numbers.begin(), numbers.end());

// 自定义降序排序
std::sort(numbers.begin(), numbers.end(), std::greater<int>());

for (int n : numbers) {
    std::cout << n << " ";
}
std::cout << std::endl;
```

### std::stable_sort

稳定排序，相同值的元素相对位置不变。

```cpp
struct Person {
    std::string name;
    int age;
};

int main() {
    std::vector<Person> people = {{"Alice", 30}, {"Bob", 20}, {"Charlie", 30}};

    // 按年龄排序，保持相同年龄元素的相对位置
    std::stable_sort(people.begin(), people.end(), [](const Person& a, const Person& b) {
        return a.age < b.age;
    });

    for (const auto& person : people) {
        std::cout << person.name << " (" << person.age << ")" << std::endl;
    }

    return 0;
}
```

### std::find

在范围中查找第一个匹配的元素。

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

auto it = std::find(numbers.begin(), numbers.end(), 3);

if (it != numbers.end()) {
    std::cout << "Found: " << *it << std::endl;
} else {
    std::cout << "Not found." << std::endl;
}
```

### std::find_if

查找第一个满足条件的元素。

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

auto it = std::find_if(numbers.begin(), numbers.end(), [](int n) {
    return n > 3;
});

if (it != numbers.end()) {
    std::cout << "Found: " << *it << std::endl;
} else {
    std::cout << "Not found." << std::endl;
}
```

### std::binary_search

检查范围内是否存在某元素（适用于已排序范围）。

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

if (std::binary_search(numbers.begin(), numbers.end(), 3)) {
    std::cout << "Found." << std::endl;
} else {
    std::cout << "Not found." << std::endl;
}
```

### std::reverse

反转范围内的元素。

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

std::reverse(numbers.begin(), numbers.end());

for (int n : numbers) {
    std::cout << n << " ";
}
std::cout << std::endl;
```

### std::replace

将范围内满足条件的元素替换为新值。

```cpp
std::vector<int> numbers = {1, 2, 3, 2, 5};

std::replace(numbers.begin(), numbers.end(), 2, 99);

for (int n : numbers) {
    std::cout << n << " ";
}
std::cout << std::endl;
```

### std::remove

移除范围内的元素（逻辑删除）。

```cpp
std::vector<int> numbers = {1, 2, 3, 2, 5};

auto it = std::remove(numbers.begin(), numbers.end(), 2);
numbers.erase(it, numbers.end());

for (int n : numbers) {
    std::cout << n << " ";
}
std::cout << std::endl;
```

### std::count

统计范围内元素的个数。

```cpp
std::vector<int> numbers = {1, 2, 3, 2, 5};

int count = std::count(numbers.begin(), numbers.end(), 2);

std::cout << "Count of 2: " << count << std::endl;
```

### std::count_if

统计满足条件的元素个数。

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

int count = std::count_if(numbers.begin(), numbers.end(), [](int n) {
    return n > 3;
});

std::cout << "Count of numbers greater than 3: " << count << std::endl;
```

### std::transform

对范围内的每个元素应用操作，并将结果存储到另一范围。

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};
std::vector<int> results(numbers.size());

std::transform(numbers.begin(), numbers.end(), results.begin(), [](int n) {
    return n * n;
});

for (int n : results) {
    std::cout << n << " ";
}
std::cout << std::endl;
```

### std::accumulate

计算范围内元素的累计值。

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

int sum = std::accumulate(numbers.begin(), numbers.end(), 0);

std::cout << "Sum: " << sum << std::endl;
```

### std::fill

将一个范围内的所有元素赋值为指定的值。

```cpp
std::vector<int> numbers(10);

// 将所有元素填充为 42
std::fill(numbers.begin(), numbers.end(), 42);

for (int n : numbers) {
    std::cout << n << " ";
}
std::cout << std::endl;
```

### std::set_union

计算两个集合的并集，将结果存储在目标范围中，要求输入集合必须是有序的。

```cpp
std::vector<int> set1 = {1, 2, 3, 4};
std::vector<int> set2 = {3, 4, 5, 6};
std::vector<int> result;

// 结果容器需要足够大，最多为两集合大小之和
result.resize(set1.size() + set2.size());

// 计算并集
auto it = std::set_union(set1.begin(), set1.end(),
                         set2.begin(), set2.end(),
                         result.begin());

// 调整结果容器大小
result.resize(it - result.begin());

// 输出结果
std::cout << "Union: ";
for (int n : result) {
    std::cout << n << " ";
}
std::cout << std::endl;
```

### std::set_intersection

计算两个集合的交集，将结果存储在目标范围中，要求输入集合必须是有序的。

```cpp
std::vector<int> set1 = {1, 2, 3, 4};
std::vector<int> set2 = {3, 4, 5, 6};
std::vector<int> result;

// 结果容器需要足够大，最多为较小集合的大小
result.resize(std::min(set1.size(), set2.size()));

// 计算交集
auto it = std::set_intersection(set1.begin(), set1.end(),
                                set2.begin(), set2.end(),
                                result.begin());

// 调整结果容器大小
result.resize(it - result.begin());

// 输出结果
std::cout << "Intersection: ";
for (int n : result) {
    std::cout << n << " ";
}
std::cout << std::endl;
```

### std::set_difference

计算第一个集合中不属于第二个集合的元素（差集），将结果存储在目标范围中，要求输入集合必须是有序的。

```cpp
std::vector<int> set1 = {1, 2, 3, 4};
std::vector<int> set2 = {3, 4, 5, 6};
std::vector<int> result;

// 结果容器需要足够大，最多为第一个集合的大小
result.resize(set1.size());

// 计算差集 (set1 - set2)
auto it = std::set_difference(set1.begin(), set1.end(),
                              set2.begin(), set2.end(),
                              result.begin());

// 调整结果容器大小
result.resize(it - result.begin());

// 输出结果
std::cout << "Difference (set1 - set2): ";
for (int n : result) {
    std::cout << n << " ";
}
std::cout << std::endl;
```

### std::set_symmetric_difference

计算两个集合中非公共元素的集合（对称差集），将结果存储在目标范围中，要求输入集合必须是有序的。

```cpp
std::vector<int> set1 = {1, 2, 3, 4};
std::vector<int> set2 = {3, 4, 5, 6};
std::vector<int> result;

// 结果容器需要足够大，最多为两集合大小之和
result.resize(set1.size() + set2.size());

// 计算对称差集
auto it = std::set_symmetric_difference(set1.begin(), set1.end(),
                                        set2.begin(), set2.end(),
                                        result.begin());

// 调整结果容器大小
result.resize(it - result.begin());

// 输出结果
std::cout << "Symmetric Difference: ";
for (int n : result) {
    std::cout << n << " ";
}
std::cout << std::endl;
```

```
Symmetric Difference: 1 2 5 6
```

### std::includes

检查一个集合是否是另一个集合的子集，要求输入集合必须是有序的。

```cpp
std::vector<int> set1 = {1, 2, 3, 4};
std::vector<int> set2 = {2, 3};

// 检查 set2 是否是 set1 的子集
bool is_subset = std::includes(set1.begin(), set1.end(),
                                set2.begin(), set2.end());

if (is_subset) {
    std::cout << "set2 is a subset of set1." << std::endl;
} else {
    std::cout << "set2 is not a subset of set1." << std::endl;
}
```