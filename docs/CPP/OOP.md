### OOP

```cpp
class Animal {
private:
    std::string name;
    int age;

public:
    Animal(const std::string& name, int age) : name(name), age(age) {
        std::cout << "Animal constructor called." << std::endl;
    }

    virtual ~Animal() {
        std::cout << "Animal destructor called." << std::endl;
    }

    virtual void sayHello() {
        std::cout << "Aniaml sayHello" << std::endl;
    }
};

class Dog : public Animal {
private:
    std::string color;
    std::string* hobies;

public:
    Dog(const std::string& name, int age, const std::string& color) 
        : Animal(name, age), color(color) {
        std::cout << "Dog constructor called." << std::endl;
    }

    Dog(const std::string& name, int age)
        : Animal(name, age) {
        std::cout << "Dog constructor called." << std::endl;
    }

    ~Dog() override {
        delete[] hobies;
        std::cout << "Dog destructor called." << std::endl;
    }

    void sayHello() override {
        std::cout << "Dog sayHello" << std::endl;
    }
};

class Cat : public Animal {
private:
    std::string color;
    
public:
    Cat(const std::string& name, int age, const std::string& color)
        : Animal(name, age), color(color) {
        std::cout << "Cat constructor called." << std::endl;
    }

    ~Cat() override {
        std::cout << "Dog destructor called." << std::endl;
    }

    void sayHello() override {
        std::cout << "Cat sayHello" << std::endl;
    }
};

int main() {
    Animal* animal = new Animal("harvey", 18);
    Animal* dog = new Dog("brutus", 20, "yellow");
    Animal* cat = new Cat("jerry", 22, "brown");

    animal->sayHello();
    dog->sayHello();
    cat->sayHello();

    delete animal;
    delete dog;
    delete cat;
    
    return 0;
}
```

### 构造器

采用赋值实现构造器：

```cpp
class Animal {
private:
    std::string name;
    int age;

public:
    Animal(const std::string& name, int age) {
        this->name = name;
        this->age = age;
    }
};
```

采用初始化列表实现构造器：

```cpp
class Animal {
private:
    std::string name;
    int age;

public:
    Animal(const std::string& name, int age) : name(name), age(age) {}
};
```

成员变量直接初始化，避免了默认构造和赋值操作，特别是对于复杂类型（如 std::string）。常量（const）和引用（&）必须使用初始化列表。

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202412041840835.png)

### 析构器

基类的析构函数应该声明为 virtual，确保派生类的资源能被正确释放。如果基类的析构函数没有声明为 virtual，通过基类指针删除派生类对象时，只会调用基类的析构函数，派生类的析构函数不会被调用。导致派生类中定义的资源（如动态分配的内存或其他独特的属性）无法被正确释放，从而引起内存泄漏。

```cpp
class Animal {
private:
    std::string name;
    int age;

public:
    Animal(const std::string& name, int age) : name(name), age(age) {
        std::cout << "Animal constructor called." << std::endl;
    }

    virtual ~Animal() {
        std::cout << "Animal destructor called." << std::endl;
    }
};

class Dog : public Animal {
private:
    std::string color;
    std::string* hobies;

public:
    Dog(const std::string& name, int age, const std::string& color) 
        : Animal(name, age), color(color) {
        std::cout << "Dog constructor called." << std::endl;
    }

    ~Dog() override {
        delete[] hobies;
        std::cout << "Dog destructor called." << std::endl;
    }
};

```

### 继承修饰符

C++ 区别于 Java，可以由子类来控制继承的级别：

- public 继承：基类的 public 和 protected 成员在派生类中保持不变，private 成员仍不可访问。
- protected 继承：基类的 public 成员在派生类中变为 protected，protected 成员保持不变，private 成员仍不可访问。
- private 继承（默认继承方式）：基类的 public 和 protected 成员在派生类中都变为 private，private 成员仍不可访问。

```cpp
class Animal {
public:
    void publicMethod() { std::cout << "Animal public method" << std::endl; }
protected:
    void protectedMethod() { std::cout << "Animal protected method" << std::endl; }
private:
    void privateMethod() { std::cout << "Animal private method" << std::endl; }
};

class Dog : Animal { // 默认 private 继承
public:
    void accessMethods() {
        publicMethod();     // 合法：原 public 成员在 Dog 中变为 private，但派生类内部仍可访问
        protectedMethod();  // 合法：原 protected 成员在 Dog 中变为 private，但派生类内部仍可访问
        // privateMethod(); // 不合法：基类的 private 成员永远不可访问
    }
};

int main() {
    Dog d;
    // d.publicMethod(); // 不合法：原 public 成员在 Dog 中变为 private，对外不可访问
    d.accessMethods();   // 合法
    return 0;
}
```

```
Animal public method
Animal protected method
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202412041826318.png)

### 虚拟函数

子类想要实现重写，就必须要求父类在指定方法上添加 virtual，将该方法标记为虚拟函数，否则无法动态绑定子类的重写方法。

虚拟函数可以有默认实现，如果子类没有实现，就会采用父类的默认实现。

```cpp
class Animal {
private:
    std::string name;
    int age;

public:
    Animal(const std::string& name, int age) : name(name), age(age) {}

    // 必须打上 virtual，不然无法实现多态子类的动态绑定
    virtual void sayHello() {
        std::cout << "Aniaml sayHello" << std::endl;
    }
};

class Dog : public Animal {
private:
    std::string color;

public:
    Dog(const std::string& name, int age, const std::string& color) 
        : Animal(name, age), color(color) {}

    Dog(const std::string& name, int age)
        : Animal(name, age) {}

    // 显示声明 override 表示重写
    void sayHello() override {
        std::cout << "Dog sayHello" << std::endl;
    }
};
```

可以定义纯虚函数，即父类不给出默认实现，必须要求子类重写，否则子类也会变为抽象类，就类似于 Java 的 abstract。

```cpp
class Animal {
private:
    std::string name;
    int age;

public:
    Animal(const std::string& name, int age) : name(name), age(age) {}

    // 定义 sayHello() 为纯虚函数
    virtual void sayHello() = 0;
};

class Dog : public Animal {
private:
    std::string color;

public:
    Dog(const std::string& name, int age, const std::string& color) 
        : Animal(name, age), color(color) {}

    Dog(const std::string& name, int age)
        : Animal(name, age) {}

    // 子类必须要实现，否则 Dog 将变为抽象类，无法实例化
    void sayHello() override {
        std::cout << "Dog sayHello" << std::endl;
    }
};
```

### 静态成员

静态成员在整个程序运行期间只占用一块内存（即类的所有对象共享同一份静态成员数据）。

```cpp
class Logger {
private:
    static string logLevel;  // 静态数据成员
public:
    static void setLogLevel(const string& level) {  // 静态成员函数
        logLevel = level;
    }

    static string getLogLevel() {  // 静态成员函数
        return logLevel;
    }
};

// 在类外初始化静态数据成员
string Logger::logLevel = "INFO";

int main() {
    cout << "Default Log Level: " << Logger::getLogLevel() << endl;

    Logger::setLogLevel("DEBUG");  // 调用静态函数修改静态变量
    cout << "Updated Log Level: " << Logger::getLogLevel() << endl;

    return 0;
}
```

如果静态成员是整型常量（int、short、long、long long、char、bool），并且其值在编译期已知，可以在类内直接初始化。

```cpp
class Example {
public:
    static const int staticConst = 10;  // 类内初始化
};
```

### 栈上创建对象

栈上创建对象是指在栈内存中分配对象的空间，通常是在函数作用域内直接声明对象（非指针），它的生命周期与作用域一致。当离开作用域时，栈上对象会被自动销毁，其析构函数会自动调用。

```cpp
Animal animal = Animal("harvey", 18);
animal.sayHello();
```

采用简写的方式创建对象：

```cpp
// 无参构造器
Animal animal;
// 有参构造器
Animal animal("harvey", 18);
```

采用隐式调用的方式创建对象：

```cpp
Animal animal = {};
Animal animal = {"harvey", 18};
```

### 堆上创建对象

使用 new 创建的对象分配在堆上，指针 animal 保存该对象的地址，通过指针访问对象的成员，需使用箭头操作符 ->。

- 堆上对象的生命周期由程序员控制，必须使用 delete 手动释放内存。
- 如果未释放，也会导致内存泄漏。

```cpp
Animal* animal = new Animal("harvey", 18);
animal->sayHello();
delete animal;
```

使用 new Animal 在堆上分配了一个 Animal 对象，然后通过解引用操作符 * 将堆上对象的值拷贝到栈上的对象 animal，所以这里创建了两个对象。

- 栈上的对象 animal 的生命周期由作用域决定，作用域结束时自动销毁，但是，new 创建的堆上对象没有释放，导致内存泄漏。

```cpp
Animal animal = *new Animal("harvey", 18);
animal.sayHello();
```

使用智能指针管理堆上的对象，在离开作用域时自动释放资源，避免内存泄漏。

```cpp
unique_ptr<Animal> animal = make_unique<Animal>("harvey", 18);
animal->sayHello();
```

### 类型转换操作符

类型转换操作符是一个特殊的成员函数，用于将自定义类型的对象转换为其他类型。这种类型转换通常由开发者显式定义，以支持类之间或与基础类型之间的类型转换。

```cpp

class Fraction {
private:
    int numerator;   // 分子
    int denominator; // 分母
public:
    Fraction(int num, int den) : numerator(num), denominator(den) {}

    // 类型转换操作符，将 Fraction 转换为 int
    operator int() const {
        return numerator / denominator;
    }
};

int main() {
    Fraction frac(7, 2);

    int result = frac; // 自动调用类型转换操作符
    cout << "Result as int: " << result << endl;

    return 0;
}
```

- frac 是一个 Fraction 对象。
- 通过定义 operator int() const，允许将 frac 隐式转换为 int 类型。

将一个类对象转换为另一个类对象：

```cpp
class Person {
private:
    string name;
    int age;
public:
    Person(string n, int a) : name(n), age(a) {}

    string getName() const { return name; }
    int getAge() const { return age; }
};

class Student {
private:
    string name;
    int age;
public:
    Student(const Person& person) : name(person.getName()), age(person.getAge()) {
        cout << "Student created from Person!" << endl;
    }

    void introduce() const {
        cout << "I am " << name << ", " << age << " years old." << endl;
    }
};

int main() {
    Person person("Alice", 20);

    Student student = person; // 自动调用类型转换操作符
    student.introduce();

    return 0;
}
```

### 重载运算符

运算符重载是指为自定义的类赋予特定的运算符行为，使其能够像基础数据类型一样使用运算符。运算符重载通过定义特殊形式的函数实现。

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202412062155968.png)

```cpp
class Complex {
private:
    double real, imag;

public:
    Complex(double r, double i) : real(r), imag(i) {}

    // 重载加法运算符，operator+ 被定义为成员函数。
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imag + other.imag);
    }

    void display() const {
        cout << real << " + " << imag << "i" << endl;
    }
};

int main() {
    Complex c1(1.0, 2.0), c2(3.0, 4.0);

    Complex c3 = c1 + c2;  // 调用重载后的加法运算符
    c3.display();

    return 0;
}
```

重载比较运算符 == 实现对象的比较：

```cpp
class Person {
private:
    string name;
    int age;

public:
    Person(string n, int a) : name(n), age(a) {}

    // 重载比较运算符 ==
    bool operator==(const Person& other) const {
        return name == other.name && age == other.age;
    }
};

int main() {
    Person p1("Alice", 30), p2("Alice", 30), p3("Bob", 25);

    cout << (p1 == p2) << endl;  // 输出 1（true）
    cout << (p1 == p3) << endl;  // 输出 0（false）

    return 0;
}
```

### 隐式转换

如果一个构造函数可以接受单个参数，而没有使用 explicit 修饰，它会被编译器视为隐式类型转换构造函数。这可能导致非预期的隐式类型转换行为，进而引发潜在的错误。

```cpp
class Animal {
public:
    Animal(int age) {  // 单参数构造函数，没有 explicit 修饰
        cout << "Animal created, age: " << age << endl;
    }
};

void printAnimal(const Animal& animal) {
    cout << "Animal is valid!" << endl;
}

int main() {
    Animal animal = 5;  // 隐式调用构造函数，等效于 Animal animal(5);
    printAnimal(10);    // 隐式转换 int -> Animal

    return 0;
}
```

- 隐式转换：Animal animal = 5 和 printAnimal(10) 都触发了隐式类型转换，可能导致误用。
- 代码易出错：调用 printAnimal 时，本意可能是传递一个已有的 Animal 对象，但实际上可以无意间传入整数。

使用 explicit 修饰避免隐式转换：

```cpp
class Animal {
public:
    explicit Animal(int age) {  // 使用 explicit 修饰
        cout << "Animal created, age: " << age << endl;
    }
};

void printAnimal(const Animal& animal) {
    cout << "Animal is valid!" << endl;
}

int main() {
    // Animal animal = 5;  // 错误：隐式类型转换被禁止
    Animal animal(5);       // 正确：显式调用构造函数
    printAnimal(animal);    // 正确

    // printAnimal(10);  // 错误：隐式转换被禁止

    return 0;
}
```

使用 explicit 限制类型转换操作符，避免隐式类型转换。

```cpp
class Fraction {
private:
    int numerator, denominator;

public:
    Fraction(int num, int den) : numerator(num), denominator(den) {}

    explicit operator double() const { // 显式类型转换操作符
        return static_cast<double>(numerator) / denominator;
    }
};

int main() {
    Fraction frac(3, 4);

    // double result = frac;  // 错误：显式转换操作符禁止隐式转换
    double result = static_cast<double>(frac); // 正确：显式调用

    cout << "Result as double: " << result << endl;

    return 0;
}
```

- 使用 explicit 修饰类型转换操作符，禁止隐式类型转换。
- 必须通过 static_cast 或其他显式方式调用类型转换操作符。

### 拷贝构造

拷贝构造函数是一种特殊构造函数，用于创建一个对象，并用同类的另一个对象对其初始化。通常用于对象的拷贝操作。

```cpp
class Animal {
private:
    std::string name;
    int age;

public:
    Animal(const std::string& name, int age) : name(name), age(age) {
        std::cout << "Animal constructor called." << std::endl;
    }

    // 拷贝构造函数
    Animal(const Animal& animal): name(animal.name), age(animal.age) {
        std::cout << "Animal copy constructor called." << std::endl;
    }

    virtual ~Animal() {
        std::cout << "Animal destructor called." << std::endl;
    }

    virtual void sayHello() {
        std::cout << "Aniaml sayHello" << std::endl;
    }
};
```

```cpp
// 在栈上创建一个 animal1 对象
Animal animal1 = Animal("harvey", 18);
// 复制 animal1 对象，注意这里和 Java 的区别，在 Java 中，这里是引用，会指向同一个对象
// 这里是调用了 Animal 的拷贝构造函数
Animal animal2 = animal1;

cout << &animal1 << endl; // 0x16fdfeea0
cout << &animal2 << endl; // 0x16fdfee50
```

如果没有指定拷贝构造函数，则编译器生成了一个默认拷贝构造函数，对对象成员逐字节拷贝（浅拷贝）。

默认拷贝构造函数是由编译器自动生成的构造函数，执行逐成员拷贝（即按字节拷贝对象的成员变量）。如果类中包含指针或动态分配的资源，浅拷贝可能导致多个对象共享同一块内存，从而引发问题，例如双重释放（Double Free）或资源冲突。

```cpp
class Example {
private:
    int* data; // 动态分配的内存

public:
    // 构造函数
    Example(int value) {
        data = new int(value); // 动态分配内存
        cout << "Constructor called. Data: " << *data << endl;
    }

    // 默认拷贝构造函数（由编译器生成）
    // Example(const Example& other);

    // 打印数据
    void print() const {
        cout << "Data: " << *data << endl;
    }

    // 析构函数
    ~Example() {
        cout << "Destructor called. Data: " << *data << endl;
        delete data; // 释放动态分配的内存
    }
};

int main() {
    Example obj1(10);     // 调用构造函数
    Example obj2 = obj1;  // 调用默认拷贝构造函数（浅拷贝）

    obj1.print();
    obj2.print();

    // 由于是浅拷贝，所有 obj1 和 obj2 的 int* data 指向了同一个地址
    // 执行结束后，会分别释放 obj1 和 obj2 的空间，分别调用析构函数
    // 就会执行两次 delete data，导致未定义行为
    return 0; 
}
```

### 访问成员

```cpp
int value = 100; // 全局变量

class Parent {
public:
    int value;

    Parent(int v) : value(v) {}

    void showValue() {
        cout << "Parent value: " << value << endl;
    }
};

class Child : public Parent {
public:
    int value;

    Child(int parentValue, int childValue)
        : Parent(parentValue), value(childValue) {}

    void showValues() {
        int value = 50; // 局部变量

        cout << "Local value: " << value << endl;       // 局部变量
        cout << "Child value: " << this->value << endl; // 当前类成员变量
        cout << "Parent value: " << Parent::value << endl; // 基类成员变量
        cout << "Global value: " << ::value << endl;    // 全局变量
    }
};
```

```cpp
Local value: 50
Child value: 20
Parent value: 10
Global value: 100
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202412062102182.png)

### 常函数

常函数的主要作用是保证函数不会修改调用对象的成员变量，从而提高代码的安全性和可读性。

- 不能修改类的成员变量（除非它们被声明为 mutable）。
- 不能调用类的非常函数（因为非常函数可能修改成员变量）。

```cpp
class Example {
private:
    int value;

public:
    Example(int v) : value(v) {}

    int getValue() const {  // 常函数
        return value;
    }

    void setValue(int v) {  // 非常函数
        value = v;
    }
};

int main() {
    Example obj(10);

    cout << "Value: " << obj.getValue() << endl;  // 调用常函数

    obj.setValue(20);  // 调用非常函数
    cout << "Updated Value: " << obj.getValue() << endl;

    return 0;
}
```

如果一个对象被声明为 const，则只能调用它的常函数，不能调用非常函数。

```cpp

class Example {
private:
    int value;

public:
    Example(int v) : value(v) {}

    int getValue() const {  // 常函数
        return value;
    }

    void setValue(int v) {  // 非常函数
        value = v;
    }
};

int main() {
    const Example obj(10);  // 常对象

    cout << "Value: " << obj.getValue() << endl;  // 调用常函数

    // obj.setValue(20);  // 错误：无法调用非常函数

    return 0;
}
```

常函数和非常函数可以基于 const 进行重载。

```cpp
public:
    Example(int v) : value(v) {}

    void print() {  // 非常函数
        cout << "Non-const print. Value: " << value << endl;
    }

    void print() const {  // 常函数
        cout << "Const print. Value: " << value << endl;
    }
};

int main() {
    Example obj(10);       // 非常对象
    const Example cobj(20); // 常对象

    obj.print();  // 调用非常函数
    cobj.print(); // 调用常函数

    return 0;
}
```

### 可变成员

尽管常函数不能修改对象的成员变量，但如果成员变量被声明为 mutable，则允许修改它。

```cpp

class Example {
private:
    mutable int accessCount;  // 可变成员变量
    int value;

public:
    Example(int v) : value(v), accessCount(0) {}

    int getValue() const {  // 常函数
        accessCount++;      // 修改 mutable 成员
        return value;
    }

    int getAccessCount() const {
        return accessCount;
    }
};

int main() {
    const Example obj(10);  // 常对象

    cout << "Value: " << obj.getValue() << endl;
    cout << "Access Count: " << obj.getAccessCount() << endl;

    cout << "Value: " << obj.getValue() << endl;
    cout << "Access Count: " << obj.getAccessCount() << endl;

    return 0;
}
```

### 友元

通常，类的成员变量是私有的，外部无法直接访问。如果某些外部函数或类需要对这些私有成员进行操作（但并非该类的成员），友元提供了一种安全的方式允许访问，而不需要公开这些成员。

友元是通过关键字 friend 声明的函数或类，允许它们访问某个类的私有（private）和保护（protected）成员。友元关系是单向的，即被声明为友元的函数或类可以访问指定类的私有成员，而反过来不成立。

全局友元函数，允许单个全局函数访问类的私有和保护成员。

```cpp
class Box {
private:
    double length;

public:
    Box(double l) : length(l) {}

    // 声明友元函数
    friend void printLength(const Box& b);
};

// 定义友元函数
void printLength(const Box& b) {
    cout << "Length of box: " << b.length << endl; // 访问私有成员
}

int main() {
    Box box(10.5);
    printLength(box); // 调用友元函数
    return 0;
}
```

成员友元函数，将另一个类的成员函数声明为友元，可以让该函数访问当前类的私有成员，从而实现类之间的协作。这样可以避免破坏封装性，同时保持灵活性。

```cpp
class Engine;  // 前向声明

class Car {
private:
    int speed;

public:
    Car(int s) : speed(s) {}

    // 声明 Engine 的成员函数为友元
    friend void Engine::showCarSpeed(const Car& car);
};

class Engine {
public:
    void showCarSpeed(const Car& car) {
        // 访问 Car 的私有成员 speed
        cout << "Car's speed is: " << car.speed << " km/h" << endl;
    }
};

int main() {
    Car car(120);
    Engine engine;

    engine.showCarSpeed(car);  // 调用 Engine 的友元方法访问 Car 的私有成员

    return 0;
}
```

友元类，允许整个类的所有成员函数访问另一个类的私有和保护成员。

```cpp
class Engine {
private:
    double horsepower;

public:
    Engine(double hp) : horsepower(hp) {}

    // 声明 Car 为友元类
    friend class Car;
};

class Car {
public:
    void displayEnginePower(const Engine& engine) {
        // 访问 Engine 的私有成员
        cout << "Engine horsepower: " << engine.horsepower << endl;
    }
};

int main() {
    Engine engine(300.0);
    Car car;

    car.displayEnginePower(engine); // 通过友元类访问私有成员

    return 0;
}
```

友元函数常用于运算符重载，尤其是当运算符的左操作数不是类类型时，必须将其定义为友元函数。

```cpp
class Complex {
private:
    double real, imag;

public:
    Complex(double r, double i) : real(r), imag(i) {}

    // 声明友元函数，重载 + 运算符
    friend Complex operator+(const Complex& c1, const Complex& c2);

    void display() const {
        cout << real << " + " << imag << "i" << endl;
    }
};

// 定义友元函数
Complex operator+(const Complex& c1, const Complex& c2) {
    return Complex(c1.real + c2.real, c1.imag + c2.imag);
}

int main() {
    Complex c1(1.0, 2.0), c2(3.0, 4.0);
    Complex c3 = c1 + c2; // 调用友元函数，重载后的 + 运算符

    c3.display();
    return 0;
}
```

### 菱形继承

菱形继承（diamond inheritance）是一个经典问题，出现在多重继承中。其核心问题是子类通过多条继承路径访问基类时，可能会导致基类的成员被多次继承或实例化。

在下面这个类的结构关系中，一个基类 A，两个派生类 B 和 C，分别继承自 A，一个最终的派生类 D 同时继承自 B 和 C，出现菱形继承。

```
    A
   / \
  B   C
   \ /
    D
```

```cpp
class A {
public:
    int value;

    A() : value(0) {}
    void show() {
        cout << "Value from A: " << value << endl;
    }
};

class B : public A {}; // B 继承自 A
class C : public A {}; // C 继承自 A

class D : public B, public C {}; // D 同时继承自 B 和 C
```

D 类中可能会包含两份来自 A 类的成员（通过 B 和 C 两条路径），这会导致二义性问题。

```cpp
D obj;
// obj.value = 10;  // 错误：二义性
```

- 如果直接访问 obj.value，编译器会报二义性错误，因为它无法判断访问的是哪一份 A 的 value。

可以明确指定访问的路径，解决二义性问题。

```cpp
D obj;
obj.B::value = 10;   // 通过 B 的路径访问 A
obj.C::value = 20;   // 通过 C 的路径访问 A
obj.B::show();       // 调用 B::A 的 show()
obj.C::show();       // 调用 C::A 的 show()
```

- 可以通过作用域解析符（如 obj.B::value）明确访问哪一份 A 的成员，但这会增加代码复杂性。

### 虚继承

虚继承（virtual inheritance）是一种特殊继承方式，用于解决多重继承（如菱形继承）中基类成员重复的问题。通过虚继承，所有派生类共享基类的唯一实例，避免了冗余拷贝和二义性。

虚继承是一种机制，确保在多重继承时，无论通过多少条继承路径，基类的成员在最终派生类中只存在一份实例。

```cpp
class A {
public:
    int value;

    A(int v) : value(v) {
        cout << "A constructor called with value: " << value << endl;
    }
};

class B : virtual public A {
public:
    B() : A(0) {  // 虚继承时不会调用这里的 A 构造函数
        cout << "B constructor called" << endl;
    }
};

class C : virtual public A {
public:
    C() : A(0) {  // 虚继承时不会调用这里的 A 构造函数
        cout << "C constructor called" << endl;
    }
};

class D : public B, public C {
public:
    D(int v) : A(v) {  // 最底层派生类负责调用 A 的构造函数
        cout << "D constructor called" << endl;
    }
};

int main() {
    D obj(42);

    cout << "Value in A: " << obj.value << endl;

    return 0;
}
```

- 每个派生类中需要维护一个虚基类指针（vptr），增加了存储开销。
- 最底层派生类负责初始化虚基类，增加了构造函数设计的复杂性。

### 模版函数

模板函数（template function）是一种泛型编程工具，允许编写可以适用于多种数据类型的函数，而无需为每种类型重复编写代码。

```cpp
// 模板函数定义
template <typename T>
void swapValues(T& a, T& b) {
    T temp = a;
    a = b;
    b = temp;
}

// 多类型模板函数
template <typename T1, typename T2>
void displayPair(const T1& a, const T2& b) {
    cout << "First: " << a << ", Second: " << b << endl;
}

int main() {
    int x = 10, y = 20;
    swapValues(x, y);  // 调用模板函数
    cout << "Swapped integers: " << x << ", " << y << endl;

    double p = 1.1, q = 2.2;
    swapValues(p, q);  // 调用模板函数
    cout << "Swapped doubles: " << p << ", " << q << endl;

    displayPair(10, 3.14);         // int 和 double
    displayPair("Alice", 25);      // const char* 和 int
    displayPair(42, "Hello");      // int 和 const char*

    return 0;
}
```

模板函数的类型可以由实参自动推导，也可以显式指定。

```cpp
template <typename T>
T add(T a, T b) {
    return a + b;
}

int main() {
    cout << add(3, 4) << endl;       // 自动推导为 int
    cout << add(3.5, 4.2) << endl;   // 自动推导为 double

    // 显式指定类型
    cout << add<int>(3.5, 4.2) << endl;  // 强制为 int，结果为 7

    return 0;
}
```

模板还可以接受非类型参数，例如整数或指针。

```cpp
template <typename T, int size>
void printArray(const T (&arr)[size]) {
    for (int i = 0; i < size; ++i) {
        cout << arr[i] << " ";
    }
    cout << endl;
}

int main() {
    int arr1[] = {1, 2, 3, 4, 5};
    double arr2[] = {1.1, 2.2, 3.3};

    printArray(arr1);  // 自动推导 size 为 5
    printArray(arr2);  // 自动推导 size 为 3

    return 0;
}
```

模板函数的返回值类型也可以使用模板参数定义的类型。

```cpp
template <typename T>
T getMax(T a, T b) {
    return (a > b) ? a : b;  // 返回类型为 T
}

template <typename T>
T* createArray(size_t size) {
    return new T[size];  // 返回动态分配的数组指针
}

int main() {
    cout << getMax(10, 20) << endl;       // 返回 int
    cout << getMax(3.14, 2.71) << endl;  // 返回 double
    
    int* arr = createArray<int>(5);  // 显式指定 T 为 int
    for (int i = 0; i < 5; ++i) {
        arr[i] = i + 1;
        cout << arr[i] << " ";
    }
    delete[] arr;  // 释放动态内存
    
    return 0;
}
```

模板函数的返回值类型可以使用 auto 关键字自动推导。编译器会根据函数体的 return 表达式推导出返回值的类型。

```cpp
template <typename T>
auto square(T value) {
    return value * value;  // 返回值类型由表达式推导
}

int main() {
    cout << square(5) << endl;       // 推导为 int
    cout << square(3.14) << endl;   // 推导为 double

    return 0;
}
```

如果返回值类型需要复杂表达式推导，或者需要明确表达式的类型，可以结合 decltype 使用。

```cpp
template <typename T1, typename T2>
auto multiply(T1 a, T2 b) -> decltype(a * b) {
    return a * b;
}

int main() {
    cout << multiply(2, 3.5) << endl;    // 返回 double
    cout << multiply(4, 3) << endl;      // 返回 int

    return 0;
}
```

- decltype(a * b) 明确返回值类型是 a * b 的类型。
- 这种写法在复杂模板函数中非常有用，尤其是当返回值类型依赖于参数间的操作结果时。

