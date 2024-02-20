# Object

## Object Creation

```java
public class Main {
    public static void main(String[] args) {
        Person p = new Person("xue");
    }
}

class Person {
    public String name = "sun";

    public Person(String name) {
        this.name = name;
    }
}
```

- 方法区中进行类加载
    - 加载 Person 类 信息
- 在堆中分配空间
- 默认初始化
    - name = null
- 指定初始化
    - name = "sun"
- 构造器初始化
    - name = "xue"
- 创建引用, 指向对象
    - p 指向 Person 对象

触发类加载

- 创建对象时
- 创建子类对象时, 先加载父类, 后加载子类
- 访问静态成员时

创建对象时, 类的成员的执行顺序

- 加载父类信息, 父类的静态成员初始化
- 加载子类信息, 子类的静态成员初始化
- 父类普通成员的初始化
- 父类的构造器
- 子类的普通成员初始化
- 子类的构造器

## Object Copy

值拷贝

```java
Person p1 = new Person("sun");

Person p2 = new Person("xue");

p2.name = p1.name;
```

引用拷贝

```java
Person p1 = new Person("sun");

Person p2 = new Person("xue");

p2 = p1;

System.out.println(p1 == p2); // true
```

## Modifier

public 本类, 子类, 其他类 可以访问

protected 本类, 子类 可以访问

private 本类 可以访问

默认, 不写修饰符 本包 可以访问

# Attr

属性的默认值

- int: 0
- short: 0
- byte: 0
- long: 0
- float: 0.0
- double: 0.0
- char: `\u0000`
- boolean: false
- String: null

## Global Variable, Local Variable

全局变量: 属性, 生命周期长, 伴随对象的创建而创建, 伴随对象的销毁而销毁

局部变量: 代码块和方法中的变量, 生命周期短, 代码块和方法执行完就销毁

```java
class Person {
    public int num1 = 10; // 全局变量
    
    {
        int num2 = 20; // 局部变量
        
        System.out.println(num1); // 10
        System.out.println(num2); // 20
    }
    
    public void test() {
        int num3 = 30; // 局部变量

        System.out.println(num1); // 10
        System.out.println(num2); // error; 无法访问其他代码块中的局部变量
        System.out.println(num3); // 30
    }
}
```

全局变量可以不赋值, 直接采用默认值

```java
class Person {
    public int num1;
    
    public void test() {
        System.out.println(num1); // 0
    }
}
```

局部变量没有默认值, 必须赋值后使用

```java
class Person {
    public void test() {
        int num;
        System.out.println(num); // error

        int num = 10;
        System.out.println(num); // 10
    }
}
```

局部变量不可以加访问修饰符

```java
class Person {
    public int num1;
    
    public void test() {
        public int num2; // error
    }
}
```

## Duplicate Name

不同作用域中, 变量可以重名, 就近访问

```java
class Person {
    public String name = "sun";

    public void test() {
        String name = "xue";

        System.out.println(name); // "xue"
    }
}
```

相同作用域中, 变量不可以重名

```java
class Person {
    public void test() {
        String name = "sun";
        String name = "xue"; // error
    }
}
```

# Method

## pass param

### pass value

```java
public class Main {
    public static void main(String[] args) {
        int num1 = 1;
        int num2 = 2;

        Person p = new Person();

        p.test(num1, num2);

        System.out.println("num1 = " + num1 + ", num2 = " + num2); // num1 = 1, num2 = 2
    }
}

class Person {
    public void test(int num1, int num2) {
        num1 = 10;
        num2 = 20;
    }
}
```

### pass reference

```java
public class Main {
    public static void main(String[] args) {
        Person p = new Person();
        
        int[] arr = {1, 2, 3};

        p.test1(arr);
        System.out.println(arr[0]); // 10
        
        p.name = "sun";

        p.test2(p);
        System.out.println(p.name); // "xue"

        p.name = "sun";
        
        p.test3(p);
        System.out.println(p.name); // "sun"
    }
}

class Person {
    public String name;

    public void test1(int[] arr) {
        arr[0] = 10;
    }
    
    public void test2(Person p) {
        p.name = "xue";
    }

    public void test3(Person p) {
        p = null;
    }
}
```

## Overload

参数类型不同, 可以重载

```java
class Person {
    public void test(int num1) {}

    public void test(String num1) {}
}
```

参数个数不同, 可以重载

```java
class Person {
    public void test() {}

    public void test(int num1) {}

    public void test(int num1, int num2) {}
}
```

参数顺序不同, 可以重载

```java
class Person {
    public void test(String num1, int num2) {}
    
    public void test(int num1, String num2) {}
}
```

返回类型不同, 不可以重载

```java
class Person {
    public void test() {}

    public int test() {} // error
}
```

## Var Param

通过可变参数, 将参数数据类型相同, 个数不同的方法, 封装成一个方法

```java
public class Main {
    public static void main(String[] args) {
        Person p = new Person();

        p.test(); // 0

        p.test(1, 2, 3); // 3

        p.test(1, 2, 3, 4, 5); // 5
    }
}

class Person {
    // nums 为一个数组
    public void test(int... nums) {
        System.out.println(nums.length);
    }
}
```

可变参数一定要放在最后

```java
public void test(int num1, int num2, int... nums) {}

public void test(int... nums, int num1) {} // error
```

一个形参列表中只能有一个可变参数

```java
public void test(int... nums1, double... nums2) {} // error
```

# Constructor

构造器: 初始化对象

```java
public class Main {
    public static void main(String[] args) {
        Person p = new Person("sun", 18);

        System.out.println("name = " + p.name + ", age = " + p.age); // name = "sun", age = 18
    }
}

class Person {
    public String name;

    public int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```

构造器可以重载

```java
class Person {
    public Person() {}
    
    public Person(String name) {}
    
    public Person(String name, int age) {}
}
```

如果没有创建构造器, 系统默认会创建一个隐藏的无参构造器

如果创建了构造器, 系统就不会创建无参构造器

# this

this 指向当前对象

```java
public class Main {
    public static void main(String[] args) {
        Person p = new Person();
        System.out.println(p.hashCode()); // 798154996
    }
}

class Person {
    public Person() {
        System.out.println(this.hashCode()); // 798154996
    }
}
```

通过 this 访问全局变量

```java
class Person {
    public String name = "sun";

    public void test() {
        String name = "xue";
        System.out.println(name); // "xue"
        System.out.println(this.name); // "sun"
    }
}
```

访问构造器, 只能在构造器中使用, 只能放在第一句

```java
class Person {
    public String name;
    public int age;
    
    public Person() {
        this("sun", 18);
        System.out.println("hello world");
        this("sun", 18); // error; 只能放在第一句
    }
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void test() {
        this("sun", 18); // error; 只能在构造器中使用
    }
}
```

# Package

Package 命名规则: 数字, 字母, 下划线 "\_", 圆点 "." 构成, 不能以数字开头, 不可以是关键字, 不可以是保留字

一个类只能有一个 package, 必须放在第一行

```java
package com.sun.utils;

public class Test {}
```

import 导入

```java
// 按需导入 (推荐)
import java.util.Scanner;

// 全部导入
import java.util.*;
```

# Encapsulation

封装: 将对象的成员私有化, 通过公共的方法访问私有的成员

```java
public class Main {
    public static void main(String[] args) {
        Person p = new Person();
        p.setName("harvey");
        p.setAge(18);
        System.out.println(p.getName()); // "harvey"
        System.out.println(p.getAge()); // 18
        System.out.println(p); // Person {name = "harvey"}
    }
}

class Person {
    // 私有化 name
    private String name;
    private int age;

    // 通过 get() 获取 name
    public String getName() {
        // 添加相关业务逻辑
        return "Mr." + name;
    }

    // 通过 set() 修改 name
    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        // 添加相关业务逻辑
        if (age < 0 || age > 200) {
            System.out.println("data is not compliant");
        }

        this.age = age;
    }

    @Override
    public String toString() {
        return "Person {" + "name = \"" + name + '\"' + ", age = " + age + '}';
    }
}
```

# Extends

继承: 将相同的属性和方法抽出来作为一个父类, 子类继承父类, 实现代码的复用

所有的类默认继承 Object 类

```java
public class Main {
    public static void main(String[] args) {
        // 访问 父类 Animal 的 构造器
        Cat cat = new Cat("harvey", 1);
        // 访问 父类 Animal 的 show()
        cat.show();
        // 访问 本类 的 eat()
        cat.eat();
        // 访问 父类 Animal 的 getName(), getAge()
        System.out.println(cat.getName());
        System.out.println(cat.getAge());
    }
}

class Animal {
    private String name;
    private int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void show() {
        System.out.println("show()");
    }
}

class Cat extends Animal {
    public Cat(String name, int age) {
        // 访问 父类 的 构造器
        super(name, age);
    }

    public void eat() {
        System.out.println("eat()");
    }
}
```

## super

super 指向父类, 可以通过 super 访问父类的成员

```java
class Animal {
    public String name;
    public void show() {
        System.out.println("show()");
    }
}

class Cat extends Animal {
    public void test() {
        // 访问父类的属性
        System.out.println(super.name);
        // 访问父类的方法
        super.show();
    }
}
```

访问父类的构造器

```java
public class Main {
    public static void main(String[] args) {
        Cat cat1 = new Cat();
        /*
            Animal()
            Cat()
        */ 
        
        Cat cat2 = new Cat("harvey");
        /*
            Animal(name)
            Cat(name)
        */
        
        Cat cat3 = new Cat("harvey", 18);
        /*
            Animal(name, age)
            Cat(name)
        */

        Cat cat4 = new Cat("harvey", 18, 'M');
    }
}

class Animal {
    private String name;
    private int age;

    public Animal() {
        System.out.println("Animal()");
    }
    
    public Animal(String name) {
        System.out.println("Animal(name)");
    }

    public Animal(String name, int age) {
        System.out.println("Animal(name, age)");
    }
}

class Cat extends Animal {
    private char sex;
    
    public Cat() {
        // 访问父类的 Animal()
        super();
        System.out.println("Cat()");
    }
    
    public Cat(String name) {
        // 访问父类的 Animal(name)
        super(name);
        System.out.println("Cat(name)");
    }

    public Cat(String name, int age) {
        // 访问父类的 Animal(name, age)
        super(name, age);
        System.out.println("Cat(name, age)");
    }

    public Cat(String name, int age, char sex) {
        // 访问父类的 Animal(name, age) 初始化父类的属性
        super(name, age);
        // 初始化子类的属性
        this.sex = sex;
    }
}
```

如果没写 super(), 默认调用父类的无参构造器

```java
public class Main {
    public static void main(String[] args) {
        Cat cat = new Cat();
    }
}

class Animal {
    // 没写构造器, 默认创建无参构造器 Animal()
}

class Cat extends Animal {
    // 没写构造器, 默认创建无参构造器 Cat(), 没写 super(), 默认调用父类的无参构造器 Animal()
}
```

```java
public class Main {
    public static void main(String[] args) {
        Cat cat = new Cat();
    }
}

class Animal {}

class Cat extends Animal {
    public Cat(String name) {
        // 没写 super(), 默认调用父类的无参构造器 Animal()
        System.out.println("Cat(name)");
    }
}
```

super() 必须放在第一行

```java
class Cat extends Animal {
    public Cat(String name) {
        super(name);
        System.out.println("Cat(name)");
        super(name); // error
    }
}
```

super() 调用父类构造器, this() 调用本类构造器, 都需要放在第一行, 冲突, 不能共同存在

super() 只能在构造器中调用, this() 可以在本类的任意方法中调用

```java
class Cat extends Animal {
    public Cat(String name) {
        super(name);
        this(); // error
    }
}
```

## Access

默认的访问: 本类, 父类

this 的访问: 本类, 父类

super 的访问: 父类

```java
class Animal {
    public String name = "sun";
    private int age = 18;
}

class Cat extends Animal {
    public String name = "xue";


    public void show() {
        System.out.println(name); // "xue"
        System.out.println(this.name); // "xue"
        System.out.println(super.name); // "sun"
        
        System.out.println(age); // error
        System.out.println(this.age); // error
        System.out.println(super.age); // error
    }
}
```

## Override

重写: 子类和父类的方法名称相同, 返回类型相同, 参数相同

```java
class Animal {
    public void show() {
        System.out.println("Animal show()");
    }
}

class Cat extends Animal {
    @Override
    public void show() {
        System.out.println("Cat show()");
    }

    public void test() {
        show(); // "Cat show()"
        this.show(); // "Cat show()"
        super.show(); // "Animal show()"
    }
}
```

返回类型呈继承关系也可以

```java
class Animal {
    public Object show() {
        return "Animal show()";
    }
}

class Cat extends Animal {
    @Override
    public String  show() {
        return "Cat show()";
    }
}
```

子类的方法的访问权限 ≥ 父类的方法的访问权限

```java
class Animal {
    private void test() {}
    public void show() {}
}

class Cat extends Animal {
    @Override
    public void test() {}
    @Override
    protected void show() {} // error
}
```

# Polymorphism

## Transform Upward

向上转型: 父类的引用指向子类的对象

编译类型: "=" 左边的数据类型, 父类, 编译时, 编译类型决定成员是否可以访问

运行类型: "=" 右边的数据类型, 子类, 运行时, 按照编译类型访问属性, 按照运行类型访问方法

```java
public class Main {
    public static void main(String[] args) {
        // Animal 父类, 编译类型, Cat 子类, 运行类型
        // Animal 的引用 animal1 指向 Cat 的对象
        Animal animal1 = new Cat();
        animal1.eat(); // error; 编译时, 编译类型 Animal 没有 eat(), 不可以访问
        animal1.show(); // "Cat show()"; 编译时, 编译类型 Animal 有 eat(), 运行时, 按照运行类型 Cat 访问方法 show()
        Sysytem.out.println(animal1.name); // "sun"; 编译时, 编译类型 Animal 有 name, 运行时, 按照编译类型 Animal 访问 name
        
        Animal animal2 = new Dog();
        animal2.show(); // "Dog show()"
    }
}

class Animal {
    public String name = "sun";
    
    public void show() {
        System.out.println("Animal show()");
    }
}

class Cat extends Animal {
    public String name = "xue";
    
    @Override
    public void show() {
        System.out.println("Cat show()");
    }
    
    public void eat() {
        System.out.println("Cat eat()");
    }
}

class Dog extends Animal {
    @Override
    public void show() {
        System.out.println("Dog show()");
    }
}
```

## Transform Downward

向下转型: 父类的引用强转成子类的引用

```java
public class Main {
    public static void main(String[] args) {
        Animal animal = new Cat();
        animal.eat(); // error; 编译时, 编译类型 Animal 没有 eat(), 不可以访问

        // Animal 的引用 animal 强转成 Cat 的引用
        Cat cat = (Cat) animal;
        cat.eat(); // "Cat eat()"; 编译时, 编译类型 Cat 有 eat(), 运行时, 按照运行类型 Cat 访问 Cat()

        // 效果一样
        ((Cat) animal).eat(); // "Cat eat()"
    }
}

class Animal {
  public void show() {
        System.out.println("Animal show()");
    }
}

class Cat extends Animal {
    @Override
    public void show() {
        System.out.println("Cat show()");
    }

    public void eat() {
        System.out.println("Cat eat()");
    }
}
```

## Parameter Polymorphism

```java
public class Main {
    public static void main(String[] args) {
        Master master = new Master();
        master.test(new Cat()); // "Cat show()"
        master.test(new Dog()); // "Dog show()"
    }
}

class Animal {
    public void show() {
        System.out.println("Animal show()");
    }
}

class Cat extends Animal {
    @Override
    public void show() {
        System.out.println("Cat show()");
    }
}

class Dog extends Animal {
    @Override
    public void show() {
        System.out.println("Dog show()");
    }
}

class Master {
    public void test(Animal animal) {
        animal.show();
    }
}
```

## Array Polymorphism

```java
public class Main {
    public static void main(String[] args) {
        Object[] objects = new Object[3];
        objects[0] = new Object();
        objects[1] = new Animal("sun", 18);
        objects[2] = new Cat("xue", 20);

        for (int i = 0; i < objects.length; i++) {
            if (objects[i] instanceof Cat) {
                Cat cat = (Cat) objects[i];
                cat.eat();
            }

            if (objects[i] instanceof Animal) {
                Animal animal = (Animal) objects[i];
                animal.show();
            }
        }
        /*
            sun Animal show()
            xue Cat eat()
            xue Animal show()
         */
    }
}

class Animal {
    public String name;
    public int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void show() {
        System.out.println(this.name + " Animal show()");
    }
}

class Cat extends Animal {
    public Cat(String name, int age) {
        super(name, age);
    }

    public void eat() {
        System.out.println(this.name + " Cat eat()");
    }
}
```


# instanceof

判断引用的运行类型是否为 Xxx 类 或 Xxx 类的子类

```java
public class Main {
    public static void main(String[] args) {
        Animal animal = new Animal();

        System.out.println(animal instanceof Cat); // false
        System.out.println(animal instanceof Animal); // true
        System.out.println(animal instanceof Organism); // true
        System.out.println(animal instanceof Object); // true
    }
}

class Organism {}

class Animal extends Organism {}

class Cat extends Animal {}
```

# ==

判断基本类型时, 判断值是否相等

判断引用类型时, 判断引用是否相等

```java
System.out.println(10 == 10); // true

// s1 和 s2 指向 String Object, String Object 的 char value[] 指向 String Constant Pool 中的 "sun"
String s1 = new String("sun");
String s2 = new String("sun");
System.out.println(s1 == s2); // false

// s1 和 s2 指向 String Constant Pool 中的 "sun"
String s1 = "sun";
String s2 = "sun";
System.out.println(s1 == s2); // true
System.out.println("sun" == "sun"); // true
```

有基本类型参与, 判断值是否相等

```java
Integer i1 = new Integer(128);
int i2 = 128;
System.out.println(i1 == i2); // true
```

# equals()

equals() 是 Object 的方法, 判断引用是否相等

很多类 (比如: String, Integer) 重写了 equals(), 可以实现判断值是否相等

```java
Object obj1 = new Object();
Object obj2 = new Object();
Object obj3 = obj1;
System.out.println(obj1.equals(obj2)); // false
System.out.println(obj1.equals(obj3)); // true

String s1 = new String("sun");
String s2 = new String("sun");
System.out.println(s1.equals(s2)); // true

Integer i1 = new Integer(10);
Integer i2 = new Integer(10);
System.out.println(i1.equals(i2)); // true
```

重写 equals()

```java
public class Main {
    public static void main(String[] args) {
        Animal animal1 = new Animal("sun", 18);
        Animal animal2 = new Animal("sun", 18);
        System.out.println(animal1.equals(animal1)); // true
        System.out.println(animal1.equals(animal2)); // true
    }
}

class Animal {
    public String name;
    public int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }

        if (!(obj instanceof Animal)) {
            return false;
        }

        Animal animal = (Animal) obj;
        return animal.name.equals(this.name) && animal.age == this.age;
    }
}
```

# static

静态成员: static 修饰的成员, 可以被同一个类的所有对象共享

```java
public class Main {
    public static void main(String[] args) {
        Animal animal1 = new Animal();
        Animal animal2 = new Animal();
        
        animal1.age = 10;
        
        // 对象.属性
        System.out.println(animal1.age); // 10
        System.out.println(animal2.age); // 10
        // 类.属性 (推荐)
        System.out.println(Animal.age); // 10

        // 对象.方法
        animal1.show(); // "Animal show()"
        // 类.方法 (推荐)
        Animal.show(); // "Animal show()"
    }
}

class Animal {
    public static int age;

    public static void show() {
        System.out.println("Animal show()");
    }
}
```

静态成员在类加载时, 就初始化了, 即使不创建对象, 也可以访问

静态属性存储在堆中, 存储在该类的 Class 对象中 (类似于原型对象)

```java
public class Main {
    public static void main(String[] args) {
        Animal.age = 10;
        System.out.println(Animal.age);
    }
}

class Animal {
    public static int age;
}
```

普通方法可以访问静态方法

静态方法可以访问静态成员, 不可以访问普通成员

```java
class Animal {
    public String name;
    public static int age;

    public void eat() {
        this.cry();
        Animal.cry();
        System.out.println(Animal.age);
        System.out.println(Animal.name);
        System.out.println("eat()");
    }

    public static void cry() {
        Animal.sleep();
        Animal.eat(); // error
        System.out.println(Animal.age);
        System.out.println(Animal.name); // error
        System.out.println("cry()");
    }

    public static void sleep() {
        System.out.println("sleep()");
    }
}
```

工具类中有很多的静态方法 (比如: Math, Arrays, Collections), 将通用方法设计成静态方法, 可以提高开发效率

# main()

JVM 不创建对象, 直接调用 main(), 没有返回值, 所以必须为 public static void

```java
public static void main(String[] args) {}
```

args 接受命令中传递的参数

```shell
java Main.java sun xue cheng
```

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(args[0]); // "sun"
        System.out.println(args[1]); // "xue"
        System.out.println(args[2]); // "cheng"
    }
}
```

# Code Block

普通代码块, 在创建对象时执行, 可以访问静态成员, 普通成员

```java
public class Main {
    public static void main(String[] args) {
        Animal animal = new Animal();
    }
}

class Animal {
    public String name;
    public static int age;
    public static void show() {
        System.out.println(Animal.age);
    }

    {
        name = "sun";
        age = 18;
        show();
    }
}
```

静态代码块, 在类加载时执行, 可以访问静态成员, 不可以访问普通成员

```java
public class Main {
    public static void main(String[] args) {
        Animal animal = new Animal();
    }
}

class Animal {
    public String name;
    public static int age;
    public static void show() {
        System.out.println(Animal.age);
    }

    static {
        name = "sun"; // error
        age = 18;
        show();
    }
}
```

构造方法的执行顺序: super(), 普通代码块, 后续代码

```java
public class Main {
    public static void main(String[] args) {
        Cat cat = new Cat();
        /*
            Animal Code Block
            Animal()
            Cat Code Block
            Cat()
         */
    }
}

class Animal {
    {
        System.out.println("Animal Code Block");
    }

    public Animal() {
        System.out.println("Animal()");
    }
}

class Cat extends Animal {
    {
        System.out.println("Cat Code Block");
    }

    public Cat() {
        System.out.println("Cat()");
    }
}
```

# final

final 可以修饰类, 属性, 方法, 局部变量, 不可以修饰构造器

```java
// 修饰类, 防止被继承
final class Animal {
    // 修饰属性, 防止被修改
    private final int age = 10;

    // 修饰方法, 防止被重写
    public final void show() {
        // 修饰局部变量, 防止被修改
        final int count = 0;
    }
}
```

final 修饰基本类型, 防止被修改值

```java
final int age = 18;
age = 20; // error
```

final 修饰引用类型, 防止被修改引用

```java
final int[] arr = {3, 1, 4, 1, 5};
arr[0] = 1;
arr = {1}; // error
```

final 修饰的属性, 表示常量, 一般大写

```java
public final double PI = 3.1415926;
```

final 修饰的属性, 必须在 定义时初始化 或 构造方法中初始化 或 普通代码块中初始化

```java
class Animal {
    // 定义时赋值
    private final int num1 = 10;

    // 普通代码块中赋值
    private final int num2;
    
    {
        num2 = 10;
    }

    // 构造方法中赋值
    private final int num3;

    public Animal() {
        this.num3 = 10;
    }

    private final int num4; // error; 必须初始化
}
```

final static 修饰的属性, 必须在 定义时初始化 或 静态代码块中初始化

```java
class Animal {
    private final static int num1 = 10;
    
    private final static int num2;
    
    static {
        num2 = 10;
    }
}
```

final static 修饰的属性, 定义时初始化后, 直接访问该属性, 不会触发类加载, 效率高

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(Animal.num1); // 10
    }
}

class Animal {
    public final static int num1 = 10;

    // 访问 Animal.num1, 不会执行静态代码块, 没有触发类加载
   static {
        System.out.println("hello");
    }
}
```

常见的 final 类: Integer, Double, Float, Boolean, String

# abstract

abstract 可以修饰属性, 类

抽象类更多的用于设计, 子类继承抽象类后, 需要实现抽象类中的抽象方法

```java
abstract class Animal {
    // 抽象类中可以有其他的成员
    private String name = "sun";
    public void show() {
        System.out.println(name);
    }

    // 声明抽象方法, 不需要方法体
    public abstract void cry();
    public abstract void eat();
    public abstract void show() {}; // error
}

class Cat extends Animal {
    @Override
    public void cry() {
        System.out.println("cry()");
    }

    @Override
    public void eat() {
        System.out.println("eat()");
    }
}
```

# Interface

接口类似于抽象类, 更多的用于设计, 实现类需要实现接口中所有的抽象方法

```java
interface Interface {
    // 属性必须初始化
    public String name = "sun";
    public int age = 18;
    
    // 抽象方法
    public abstract void test1();

    // 省略 abstract
    public void test2();

    // 省略 public abstract
    void test3();
    
    // 静态方法, 需要方法体
    public static void test4() {
        System.out.println("test4()");
    };

    // 默认方法, 需要方法体
    public default void test5() {
        System.out.println("test5()");
    }
}

// 实现 Interface 接口, 需要实现 Interface 中的所有抽象方法
class Animal implements Interface {
    @Override
    public void test1() {
        System.out.println("nimal test1()");
    }

    @Override
    public void test2() {
        System.out.println("Animal test2()");
    }

    @Override
    public void test3() {
        System.out.println("Animal test3()");
    }
}
```

一个类可以实现多个接口

```java
interface IA {}
interface IB {}
interface IC {}

class A implements IA, IB, IC {}
```

## Interface Polymorphism

```java
public class Main {
    public static void main(String[] args) {
        Usb usb1 = new Phone();
        usb1.show(); // "Phone show()"
        usb1.test(); // "Usb test()"
        
        Usb usb2 = new Camera();
        usb2.show(); // "Camera show()"

        Usb usbs[] = new Usb[3];
        usbs[0] = new Phone();
        usbs[1] = new Camera();
        usbs[2] = new Camera();
    }
}

interface Usb {
    public abstract void show();
    
    public default void test() {
        System.out.println("Usb test()");
    }
}

class Phone implements Usb {
    @Override
    public void show() {
        System.out.println("Phone show()");
    }
}

class Camera implements Usb {
    @Override
    public void show() {
        System.out.println("Camera show()");
    }
}
```

## Interface Inheritance

```java
public class Exercise03 {
    public static void main(String[] args) {
        Interface interface = new Phone();
        Usb usb = new Phone();
    }
}

interface Interface {}

interface Usb extends Interface{}

class Phone implements Usb {} 
```

# Inner Class

内部类: 一个类的内部嵌套了另一个类, 属于类的成员之一

内部类可以直接访问外部类的成员

## Local Inner Class

局部内部类: 地位类似于局部变量, 定义在方法或代码块中, 可以直接访问外部类的成员

```java
public class Main {
    public static void main(String[] args) {
        Outer outer = new Outer();
        outer.show();
    }
}

class Outer {
    private String name = "sun";
    private int age = 18;

    public void show() {
        // 定义在方法中
        class Inner {
            private int age = 20;
            
            public void innerShow() {
                // 内部类访问外部类
                System.out.println(name); // "sun"

                // 访问重名的成员, 遵循就近原则
                System.out.println(age); // 18
                
                // 通过 外部类名.this.成员名 访问外部类的成员, Outer.this 指向了 调用 outer.show() 的 Outer 对象, 
                System.out.println(Outer.this.age); // 20
            }
        }
        
        // 通过局部内部类的对象访问局部内部类的成员
        Inner inner = new Inner();
        inner.innerShow();
    }
}
```

局部内部类可以被继承, 也可以被 final 修饰, 表示该局部内部类不可以被继承

```java
class Outer {
    public void show() {
        class Inner {}

        class Inner02 extends Inner {}
        
        final class Inner03 extends Inner02 {}

        class Inner04 extends Inner03 {} // error
    }
}
```

## Anonymous Innner Class

匿名内部类: 地位类似于局部变量, 定义在方法或代码块中, 可以直接访问外部类的成员

匿名内部类没有类名, 相当于创建一个类只调用一次

```java
interface IA {
    void show();
}

class Outer {
    private String name = "sun"
    public int age = 18;
    
    public void method() {
        // 创建匿名内部类实现 IA, 调用 show()
        IA ia = new IA() {
            public int age = 20;

            @Override
            public void show() {
                // 内部类访问外部类
                System.out.println(name); // "sun"
                System.out.println(age); // 18
                System.out.println(Outer.this.age); // 20
            }
        };
        ia.show();

        // 省略引用, 一次性调用
        new IA() {
            @Override
            public void show() {
                System.out.println("show()");
            }
        }.show();

        // 箭头函数, 基于匿名内部类实现
        IA ia = () -> System.out.println("show()");
        ia.show();
    }
}
```

```java
abstract class A {
    abstract public void show();
}

class Outer {
    public void method() {
        A a = new A() {
            @Override
            public void show() {
                System.out.println("show()");
            }
        };

        a.show();
    }
}
```

匿名内部类作为参数传递

```java
public class Main {
    public static void main(String[] args) {
        A a = new A();
        
        a.method(new IA() {
            @Override
            public void show() {
                System.out.println("show()");
            }
        });
        
        a.method(() -> System.out.println("show()"));
    }
}

interface IA {
    void show();
}

class A {
    public void method(IA ia) {
        ia.show();
    }
}
```

匿名内部类, 在底层个是有类名的, 不过只用一次, 一般为 外部类名$数字, 比如: Outer$1

```java
class Outer {
    public void method() {
        IA ia = new IA() {
            @Override
            ...
        };

        System.out.println(ia.getClass()); // class Outer$1
    }
}
```

本质上, 底层是创建一个 Outer$1 类 实现 IA, 相当于

```java
class Outer {
    public void method() {
        class Outer$1 implements IA {
            @Override
            ...
        }
        
        IA ia = new Outer$1();
        
        System.out.println(ia.getClass()); // class Outer$1
    }
}
```

## Member Inner Class

成员内部类: 地位类似于类的成员, 定义在外部类的成员位置, 可以直接访问外部类的成员, 可以使用访问修饰符

```java
class Outer {
    private String name = "sun";
    private int age = 18;

    public class Inner {
        private int age = 20;

        public void innerShow() {
            // 内部类访问外部类
            System.out.println(name); // "sun"
            System.out.println(age); // 20
            System.out.println(Outer.this.age); // 18
        }
    }

    public void outerShow() {
        // 外部类访问内部类
        Inner inner = new Inner();
        inner.innerShow();
    }
}
```

外部其他类访问内部类

```java
class Outer {
    public class Inner {}
}

class Other {
    public void otherShow() {
        Outer outer = new Outer();
        Outer.Inner inner = outer.new Inner();
        
        Outer.Inner inner = new Outer().new Inner();
    }
}
```

```java
class Outer {
    public class Inner {}

    public Inner getInner() {
        return new Inner();
    }
}

class Other {
    public void otherShow() {
        Outer.Inner inner = outer.getInner();
    }
}
```

## Static Inner Class

静态内部类: 地位类似于类的成员, 定义在外部类的成员位置, 可以直接访问外部类的静态成员, 可以使用访问修饰符

```java
class Outer {
    private static String name = "sun";
    private static int age = 18;
    private char sex = 'M';

    public static class Inner {
        private int age = 20;
        public void innerShow() {
            // 内部类访问外部类
            System.out.println(name); // "sun"
            System.out.println(age); // 20
            System.out.println(Outer.age); // 18
            System.out.println(sex); // error; 不可以访问外部类的非静态成员
        }
    }

    public void outerShow() {
        // 外部类访问内部类
        Inner inner = new Inner();
        inner.innerShow();
    }
}
```

外部其他类访问内部类

```java
class Outer {
    public static class Inner {}
}

class Other {
    public void otherShow() {
        Outer.Inner inner = new Outer.Inner();
    }
}
```

```java
class Outer {
    public static class Inner {}

    public Inner getInner1() {
        return new Inner();
    }
}

class Other {
    public void otherShow() {
        Outer outer = new Outer();
        Outer.Inner inner = outer.getInner();

        Outer.Inner inner = new Outer().getInner();
    }
}
```

# Enum

枚举: 一种特殊的类, 类的内部包含了有限个常量对象

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(Season.SPRING);
        System.out.println(Season.SUMMER);
    }
}

// 枚举类
enum Season {
    // SPRING 调用 Season()
    // SUMMER 调用 Season()
    // AUTUMN 调用 Season(name)
    // WINTER 调用 Season(name, desc)
    SPRING, SUMMER(), AUTUMN("autumn"), WINTER("winter", "cold");

    private String name;
    private String desc;

    // 构造器默认访问修饰符为 private, 不需要手动添加 private, 防止其他类 new Season()
    Season() {}

    Season(String name) {
        this.name = name;
    }

    Season(String name, String desc) {
        this.name = name;
        this.desc = desc;
    }

    // 可以提供 getter(), 不可以提供 setter(), 防止修改
    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "Season{" +
                "name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                '}';
    }
}
```

SPRING("spring") 相当于

```java
public final static Season SPRING = new Season("spring")
```

枚举对象必须在第一行

```java
enum Season {
    private String name;
    
    SPRING, SUMMER(), AUTUMN("autumn"), WINTER("winter", "cold"); // error
}
```

## Method

### name()

```java
Season winter = Season.WINTER;

// 返回对象名
System.out.println(winter.name()); // "WINTER"
```

### ordinal() 

```java
Season winter = Season.WINTER;

// 返回对象的索引
System.out.println(winter.ordinal()); // 3
```

### values() 

```java
// 返回所有的对象
Season[] seasons = Season.values();

for (Season season : seasons) {
    System.out.println(season);
}
```

### valueOf() 

```java
Season autumn = Season.valueOf("AUTUMN");

// 根据对象名, 返回对象
System.out.println(autumn); // "Season{name='autumn', desc='null'}"
```

### compareTo() 

```java
Season winter = Season.WINTER;
Season autumn = Season.AUTUMN;

// 比较索引
System.out.println(winter.compareTo(autumn)); // 1
System.out.println(autumn.compareTo(winter)); // -1
```

## Switch Enum

```java
public class Main {
    public static void main(String[] args) {
        Color green = Color.GREEN;

        switch (green) {
            case GREEN:
                System.out.println("green");
                break;
            case BLUE:
                System.out.println("blue");
                break;
            case RED:
                System.out.println("red");
                break;
            default:
                System.out.println("match failed");
                break;
        }

        // 箭头函数实现
        switch (green) {
            case GREEN -> System.out.println("green");
            case BLUE -> System.out.println("blue");
            case RED -> System.out.println("red");
            default -> System.out.println("match failed");
        }
    }
}

enum Color {
    RED(255, 0, 0), BLUE(0, 0, 255), GREEN(0, 255, 0);
    
    private int redValue;
    private int greenValue;
    private int blueValue;

    private Color(int redValue, int greenValue, int blueValue) {
        this.redValue = redValue;
        this.greenValue = greenValue;
        this.blueValue = blueValue;
    }
}
```

## Extend Class

枚举类是一个 final 类, 不可以被继承, 通过 javap 反编译可以查看到

```java
enum Season {}

class A extends Season {} // error
```

枚举类隐式的继承了 Enum 类, 不可以再继承其他类

```java
class A {}

enum Season extends A {} // error
```

## Implement Interface

枚举类可以实现接口

```java
interface IA {
    void iaShow();
}

interface IB {
    void ibShow();
}

enum Season implements IA, IB {
    SPRING(), SUMMER(), AUTUMN(), WINTER();
    
    @Override
    public void iaShow() {
        System.out.println("iaShow()");
    }

    @Override
    public void ibShow() {
        System.out.println("ibShow()");
    }
}
```

# Annotation

注解: 嵌入在代码中的补充信息, 不影响程序逻辑, 但可以被编译运行, 可以修饰包, 类, 方法

编译器会进行语法的校验, 判断是否符合注解限定

注解本质上是一个类, 编译类型是 @interface, 不是 interface

## @Override

@Override: 表示方法是重写的父类方法

```java
class Animal {
    public void show() {}
}

class Cat extends Animal {
    @Override
    public void show() {}
}
```

@Override 源码

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.SOURCE)
public @interface Override {
    ...
}
```

- @Target(ElementType.METHOD) 表示 @Override 可以修饰方法

## @Deprecated

@Deprecated: 表示元素已经过时, 用于新旧版本的兼容过渡, 可以修饰构造器, 字段, 局部变量, 方法, 包, 模块, 参数, 数据类型

```java
@Deprecated
class A {
    @Deprecated
    public String name;

    @Deprecated
    public void show() {}
}
``

@Deprecated 源码

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(value={CONSTRUCTOR, FIELD, LOCAL_VARIABLE, METHOD, PACKAGE, MODULE, PARAMETER, TYPE})
public @interface Deprecated {
    ...
}
```

## @SuppressWarnings

@SuppressWarnings: 用于抑制警告信息, 可以修饰数据类型, 字段, 方法, 构造器, 局部变量, 模块

```java
@SuppressWarnings({"uncheckd"}) // 抑制 unchecked 警告
public class Main {
    public static void main(String[] args) {
        @SuppressWarnings({"rawtypes"}) // 抑制 rawtypes 警告
        List list = new ArrayList();
        list.add("jack");
        list.add("tom");

        @SuppressWarnings({"unused"}) // 抑制 unused 警告
        int num = 10;
    }

    @SuppressWarnings({"rawtypes", "unchecked", "unused"}) // 抑制 rawtypes, unchecked, unused 警告
    public static void show1() {{}}
    
    @SuppressWarnings({"all"}) // 抑制所有的警告
    public static void show2() {}
}
```

@SuppressWarnings 源码

```java
@Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE, MODULE})
@Retention(RetentionPolicy.SOURCE)
public @interface SuppressWarnings {
    ...
}
```

常见的 @SuppressWarnings

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202206170911365.png)

## Meta Annotation

元注解: 注解的注解, Meta Annotation 修饰 Annotation, 让 Annotation 具有某种含义

```java
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(value={CONSTRUCTOR, FIELD, LOCAL_VARIABLE, METHOD, PACKAGE, PARAMETER, TYPE})
public @interface Deprecated {
    ...
}
```

@Doucument 表示 Annotation 在生成 javadoc 文档 时, 会保留 Annotation

@Rentention 表示 Annotation 的作用范围

- RetentionPolicy.SOURCE 作用于 source file
- RetentionPolicy.CLASS 作用于 class file
- RetentionPolicy.RUNTIME 作用于 runtime

@Target 表示 Annotation 可以修饰的内容

@Inherited 表示 Annotation 修饰的类被继承时, 子类自动继承 Annotation