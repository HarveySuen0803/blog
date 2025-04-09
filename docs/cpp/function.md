# system

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

# std::move

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

# std::copy

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

# memcpy

memcpy 用于复制内存的字节块，源和目标内存区域不能重叠，如果存在重叠，会导致未定义行为。通常比 memmove 更快，因为它不需要额外的重叠检查。

```cpp
char src[] = "Hello, World!";
char dest[20];

// 使用 memcpy 复制
memcpy(dest, src, strlen(src) + 1);

std::cout << "Source: " << src << std::endl;
std::cout << "Destination: " << dest << std::endl;
```

# memmove

memmove 用于复制内存的字节块，支持源和目标内存区域重叠的情况，如果发生重叠，会确保数据的正确性。较 memcpy 稍慢，因为需要处理重叠检查。

```cpp
char str[] = "Overlapping Example";

// 源和目标内存重叠
memmove(str + 5, str, 10);

std::cout << "Result: " << str << std::endl;
```

# std::sort

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

# std::stable_sort

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

# std::find

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

# std::find_if

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

# std::binary_search

检查范围内是否存在某元素（适用于已排序范围）。

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

if (std::binary_search(numbers.begin(), numbers.end(), 3)) {
    std::cout << "Found." << std::endl;
} else {
    std::cout << "Not found." << std::endl;
}
```

# std::lower_bound

在已排序的整型数组中查找：

```cpp
std::vector<int> vec = {1, 3, 3, 5, 7, 9};

// 查找第一个不小于 3 的元素
auto it = std::lower_bound(vec.begin(), vec.end(), 3);
if (it != vec.end()) {
    std::cout << "第一个不小于 3 的元素是: " << *it << std::endl;
} else {
    std::cout << "没有找到满足条件的元素" << std::endl;
}

// 查找第一个不小于 4 的元素（注意 4 不在序列中，但 lower_bound 会返回第一个大于 4 的元素）
auto it2 = std::lower_bound(vec.begin(), vec.end(), 4);
if (it2 != vec.end()) {
    std::cout << "第一个不小于 4 的元素是: " << *it2 << std::endl;
} else {
    std::cout << "没有找到满足条件的元素" << std::endl;
}
```

在自定义类型中使用自定义比较器：

```cpp
struct Person {
    std::string name;
    int age;
};

// 自定义比较函数：比较两个人的年龄
bool cmp(const Person& a, const Person& b) {
    return a.age < b.age;
}

int main() {
    std::vector<Person> persons = {
        {"Alice", 30},
        {"Bob", 25},
        {"Charlie", 35},
        {"David", 28}
    };

    // 由于 lower_bound 要求序列必须有序，所以先按年龄排序
    std::sort(persons.begin(), persons.end(), cmp);

    // 现在 persons 按年龄排序为: Bob (25), David (28), Alice (30), Charlie (35)
    // 查找第一个年龄不小于 30 的人
    Person target{"", 30}; // 只需要设置 age 字段即可
    auto it = std::lower_bound(persons.begin(), persons.end(), target, cmp);

    if (it != persons.end()) {
        std::cout << "第一个年龄不小于 30 的人是: " 
                  << it->name << ", 年龄: " << it->age << std::endl;
    } else {
        std::cout << "没有找到满足条件的人" << std::endl;
    }

    return 0;
}
```

# std::reverse

反转范围内的元素。

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

std::reverse(numbers.begin(), numbers.end());

for (int n : numbers) {
    std::cout << n << " ";
}
std::cout << std::endl;
```

# std::replace

将范围内满足条件的元素替换为新值。

```cpp
std::vector<int> numbers = {1, 2, 3, 2, 5};

std::replace(numbers.begin(), numbers.end(), 2, 99);

for (int n : numbers) {
    std::cout << n << " ";
}
std::cout << std::endl;
```

# std::remove

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

# std::count

统计范围内元素的个数。

```cpp
std::vector<int> numbers = {1, 2, 3, 2, 5};

int count = std::count(numbers.begin(), numbers.end(), 2);

std::cout << "Count of 2: " << count << std::endl;
```

# std::count_if

统计满足条件的元素个数。

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

int count = std::count_if(numbers.begin(), numbers.end(), [](int n) {
    return n > 3;
});

std::cout << "Count of numbers greater than 3: " << count << std::endl;
```

# std::transform

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

# std::accumulate

计算范围内元素的累计值。

```cpp
std::vector<int> numbers = {1, 2, 3, 4, 5};

int sum = std::accumulate(numbers.begin(), numbers.end(), 0);

std::cout << "Sum: " << sum << std::endl;
```

# std::fill

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

# std::set_union

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

# std::set_intersection

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

# std::set_difference

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

# std::set_symmetric_difference

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

# std::includes

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

# std::bind

std::bind 用于创建一个绑定的函数对象，它可以将函数的部分参数固定，生成一个新的可调用对象。这种技术称为“绑定”或“部分应用”。

使用 std::bind 绑定普通函数：

```cpp
void print_sum(int a, int b) {
    std::cout << "Sum: " << a + b << std::endl;
}

int main() {
    // 使用 std::bind 绑定第一个参数为 10，std::placeholders::_1 表示第一个参数
    auto bound_function = std::bind(print_sum, 10, std::placeholders::_1);

    // 调用时只需要提供第二个参数
    bound_function(20); // 输出: Sum: 30

    return 0;
}
```

使用 std::bind 绑定成员函数：

```cpp
class Printer {
public:
    void print_message(const std::string& message) const {
        std::cout << "Message: " << message << std::endl;
    }
};

int main() {
    Printer printer;

    // 绑定成员函数，实例对象作为第一个参数
    auto bound_function = std::bind(&Printer::print_message, &printer, std::placeholders::_1);

    // 调用时传入剩余参数
    bound_function("Hello, World!"); // 输出: Message: Hello, World!

    return 0;
}
```

使用 std::placeholders 改变函数参数顺序：

```cpp
void print_order(int x, int y) {
    std::cout << "x: " << x << ", y: " << y << std::endl;
}

int main() {
    // 交换参数顺序
    auto bound_function = std::bind(print_order, std::placeholders::_2, std::placeholders::_1);

    // 调用时顺序被调整
    bound_function(10, 20); // 输出: x: 20, y: 10

    return 0;
}
```

# std::function

std::function 是一个泛型函数封装器，可以用来存储、传递和调用任意可调用对象（如普通函数、lambda 表达式、函数指针或仿函数）。

使用 std::function 接收普通函数：

```cpp
void greet(const std::string& name) {
    std::cout << "Hello, " << name << "!" << std::endl;
}

int main() {
    // 定义一个 std::function 存储普通函数
    std::function<void(const std::string&)> func = greet;

    // 调用 std::function
    func("World"); // 输出: Hello, World!

    return 0;
}
```

使用 std::function 接收成员函数：

```cpp
class Printer {
public:
    void print(const std::string& message) const {
        std::cout << "Message: " << message << std::endl;
    }
};

int main() {
    Printer printer;

    // 使用 std::bind 将成员函数绑定到 std::function
    std::function<void(const std::string&)> func = std::bind(&Printer::print, &printer, std::placeholders::_1);

    // 调用 std::function
    func("Hello, World!"); // 输出: Message: Hello, World!

    return 0;
}
```

使用 std::function 接收 lambda 表达式：

```cpp
int main() {
    // 定义一个 std::function 存储 lambda 表达式
    std::function<int(int, int)> func = [](int a, int b) {
        return a + b;
    };

    // 调用 std::function
    std::cout << "Result: " << func(10, 20) << std::endl; // 输出: Result: 30

    return 0;
}
```

使用 std::function 接收函数对象：

```cpp
struct Multiply {
    int operator()(int a, int b) const {
        return a * b;
    }
};

int main() {
    // 定义一个 std::function 存储函数对象
    std::function<int(int, int)> func = Multiply();

    // 调用 std::function
    std::cout << "Result: " << func(10, 20) << std::endl; // 输出: Result: 200

    return 0;
}
```

# std::tie 

std::tie 的主要作用是将多个变量绑定到一个 tuple（元组）中，生成一个由这些变量引用构成的 tuple。这样可以方便地进行函数返回值的拆解、多变量赋值以及进行对象之间的比较

示例 1：利用 std::tie 拆解函数返回的 std::pair：

```cpp
std::pair<int, std::string> getPair() {
    return std::make_pair(42, "Hello, world!");
}

int main() {
    int number;
    std::string text;
    std::tie(number, text) = getPair();  // 将 pair 中的值分别赋给 number 和 text

    std::cout << "Number: " << number << "\nText: " << text << std::endl;
    return 0;
}
```

示例 2：使用 std::ignore 忽略不需要的返回值

```cpp
std::tuple<int, double, std::string> getData() {
    return std::make_tuple(1, 3.14, "example");
}

int main() {
    int id;
    std::string info;
    // 忽略第二个返回值（double 类型）
    std::tie(id, std::ignore, info) = getData();

    std::cout << "ID: " << id << "\nInfo: " << info << std::endl;
    return 0;
}
```

示例 3：利用 std::tie 进行多个变量的比较

```cpp
struct Student {
    std::string name;
    int score;
};

// 重载小于运算符，利用 std::tie 进行字典序比较
bool operator<(const Student &a, const Student &b) {
    return std::tie(a.score, a.name) < std::tie(b.score, b.name);
}

int main() {
    Student s1{"Alice", 90};
    Student s2{"Bob", 85};

    if (s1 < s2) {
        std::cout << s1.name << " is ranked lower than " << s2.name << std::endl;
    } else {
        std::cout << s1.name << " is ranked higher than or equal to " << s2.name << std::endl;
    }
    return 0;
}
```

- 在这个例子中，我们通过重载 operator<，使用 std::tie(a.score, a.name) 和 std::tie(b.score, b.name) 将两个学生对象的分数和姓名打包成 tuple。然后直接利用 tuple 的内置比较规则（先比较分数，若相等再比较姓名）来实现学生对象的排序逻辑。

