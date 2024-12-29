# JDK

## OOP

POP 更注重任务执行的顺序和步骤, OOP 更注重任务的参与者, 面对复杂问题时, 先去拆分任务, 将任务对应到每个对象上, 最终由多个对象合作完成任务

POP 更高效, OOP 更易于复用, 易于扩展

OOP 的封装隐藏了内部实现细节, 外部调用封装好的方法, 不需要考虑内部实现细节, 如 ORM 框架, 引入 MyBatis 后, 直接帮我们省去了连接的创建和管理, 如果使用 POP, 就需要去考虑这些细节

OOP 的继承保证了代码的复用问题

OOP 的多态有助于扩充方法的实现效果, 同一个父类引用, 只需要更改子类实现, 即可实现不同的效果, 并且引入接口, 设计模式, 更易于项目的扩展

## HashMap

HashMap 采用 Array + LinkedList + RedBlackTree 的结构, 无法保证线程安全.

HashMap 是懒惰加载, 在创建对象时并没有初始化数组, 在无参的构造函数中, 设置了默认的 Load Factor 为 0.75.

HashMap Infinite Loop, [Explain](https://www.bilibili.com/video/BV1yT411H7YK?p=85&spm_id_from=pageDriver&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

- JDK7 的 HashMap 采用头插法, 扩容后链表顺序会颠倒, 在并发场景下, 数组进行扩容数据迁移时, 有可能导致死循环.
- JDK8 的 HashMap 采用尾插法, 扩容后链表顺序不\会颠倒, 避免了死循环.

JDK8 的 Hash Algo 通过 hash ^ (hash >>> 16) 是在 hash 的基础上增加了高位对低位的影响, 这种混淆和干扰能够更均匀地分布 Hash, 降低碰撞的概率.

HashMap 采用 RedBlackTree 不仅可以提高查询效率, 还可以防止 DDos. 

- RedBlackTree 是一种自平衡的二叉搜索树, 与普通的平衡二叉树相比, 主要区别在于其引入了颜色标记和一些额外的规则, 以保持树的平衡性.
- 颜色标记提供了额外信息, 规则简化了平衡维护, 通过颜色变化和旋转等操作可以相对简单地调整树的结构, 而无需进行复杂的平衡计算, 使得平衡调整可以在常数时间内完成, 而不会导致整个树的结构变化.

当 LinkedList 的元素个数 > 8 && Array 的容量 > 64 时, 就会将 LinkedList 进化成 RedBlackTree. 当 LinkedList 的元素个数 < 6 是, 就会将 RedBlackTree 退化成 LinkedList.

## ConcurrentHashMap

JDK7 采用 Array + LinkedList, 通过 Segment + ReentrantLock 保证线程安全.

- Segment 本质上就是一个独立的 ﻿HashTable, 也就是说 ﻿ConcurrentHashMap 是由多个 ﻿Segment 组成的.
- ﻿Segment 可以独立锁定, 这允许多个线程可以同时访问 ﻿ConcurrentHashMap 的不同部分, 从而实现了比完全锁定整个 ﻿Map 更高级别的并发性.
- Segment 包含一个 ReentrantLock, 当一个线程需要访问某个 Segment 中的元素时, 需要先获得这个 Segment 对应的 ReentrantLock, 实现了对数据的分段加锁, 这种策略是 ﻿ConcurrentHashMap 能提供比 ﻿HashTable 更好的并发性能的关键.

JDK8 采用 Array + LinkedList + RedBlackTree, 通过 CAS + synchronized 保证线程安全, 放弃了 Segment 的臃肿设计, 通过 synchronized 锁定每个索引上的第一个结点, 如果当前索引有结点了, 就需要通过 CAS 去争抢锁添加结点, 如果当前索引没有结点, 就不受 synchronized 影响, 效率还是很高的.

JDK8 引入了多线程并发扩容, 对原始数组进行分片, 每个线程负责一个分片的数据迁移, 从而提升了扩容的效率

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403022009974.png)

ConcurrentHashMap 可以通过 size() 获取元素格式, 这要求在保证 Atomicity 的前提下, 去维护一个整形的递增, 这个效率是非常低的, ConcurrentHashMap 针对此做了特殊优化.

ConcurrentHashMap 通过维护 CounterCell[] 来实现 size(), CounterCell 的 volatile long value 记录了 ConcurrentHashMap 的元素个数, 不同的线程操作不同的 ConcurrentCell, 不存在并发问题. 最终调用 size() 时, 就遍历 CounterCell[] 进行求和, 类似于 LongAdder.

## IO

Java NIO (New IO) 提供了 Channel 和 Selector, 通过他们配置可以实现 Multiplexing IO 的效果.

- Channel 相当于 IO Stream, 但支持非阻塞数据流的读写
- Selector 相当于 OS Level 的 Multiplexer, 可以注册多个 Channel, 并通过轮询方式检查哪个 Channel 的 IO 事件已经就绪, 从而实现高效处理多个连接

## Serialization

Serialization 是将 object 转成 binary byte stream, 存储 data 和 data type

Deserialization 是将 binary byte stream 转成 object, 恢复 data 和 data type

Serilization 会对 class 的所有 member 进行 Serialization, 除了 static member 和 transient member

Serializable 可以被继承, Integer 继承 Number, Number 继承 Serializable, 则 Integer 也可以进行 Serializatioin

Serialization file

```
aced 0005 7715 6400 0000 c801 004d 000b
6865 6c6c 6f20 776f 726c 6473 7200 0141
6090 9788 d5e1 af30 0200 0078 70
```

class 实现 Serializable 表示该 class 的 object 需要进行序列化, 这仅仅是一个标识作用, 明确指定哪些 object 需要进行序列化, 防止不需要进行序列化的 object 也被序列化了

```java
public class User implements Serializable {}
```

serialVersionUID 标识了 class 的 version, 每次修改完 class, 就会自动生成不同的 serialVersionUID, 进行 Deserialization 时, 会去比较 serialVersionUID 是否相同, 如果我们在 Deserialization 之前就修改了 class, 则会报错

手动固定 serialVersionUID 就不会有这样的问题了

```java
public class User implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;
}
```

# JVM

## Class Lifecycle

Class Lifecycle 是指类从被加载到虚拟机中开始, 直到卸载出虚拟机为止的整个过程

- Class Loading: 使用 new 关键字实例化对象, 访问静态字段, 调用静态方法等操作都会触发 Class Loading, 在这个阶段, JVM 会将 class 文件读入内存, 并为之创建一个 java.lang.Class 对象, 不仅是应用程序直接引用到的类需要加载, 被这些类引用的类也会被递归加载
- Class Using: 类的正常使用阶段, 可以创建实例, 调用方法, 在此阶段, 类完全加载完成, 可以自由地被应用程序使用
- Class Unloading: 类卸载的情况比较少见, 只有当该类的 ClassLoader 实例被垃圾回收时, 这个类才会被卸载, 这通常意味着没有任何活跃的引用指向该 ClassLoader 实例和它加载的类

## Class Loading

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241741801.png)

Loading

- 由专门的 Class Loader 通过 Full Class Name 找到 Class File, 获取 Byte Stream, 加载数据到 Memory 中
- 在 Heap 中生成 Class Obj (通过 Reflect 获取的 Class Obj)
- 在 Method Area 中生成 Klass 对象, 本质上是二进制数据, 表示 Class Info

Linking, 分为 Verify, Prepare 和 Resolve 三个步骤

- Verify, 对 File Format, Metadata, Byte Code, Symbolic Ref 进行 Verification
- Prepare, 为 Static Member 和 Constant 分配 Memory, 进行 Default Initialization
    - Basic Type 的 Final Static Field 在 Prepare 进行 Specified Initialization
    - Ref Type 的 Final Static Field 在 Initialization 进行 Specified Initialization
- Resolve, 将 Class Constant Pool 中 Class, Interface, Field, Method 的 Symbolic Ref 转换成 Direct Ref

Initialization

- 执行 clinit(), 对 Static Member 进行 Specified Initialization, 优先初始化 Par Class
  - Compiler 收集 Static Field 的 Assignment Statement 和 Static Code Block 到 clinit()
  - Compiler 会同步 clinit(), 保证 Memory 中只有一个 Class Object
  - JVM 会对 clinit() 加锁, 保证只被一个 Thread 执行一次
  - Active Loading 会 Initialization, Passive Loading 不会触发 Initialization
- 执行 Static Code Block, 优先执行 Par Class 的 Static Code Block

## Program Counter Register

Program Counter Register 用于存储下一条 instruction 在 JVM 中的 adress, 本质上就是 Byte Code 的行号, CPU 会在不同 thread 之间切换, Execute Engine 就需要在 Program Counter Register 中找到下一条 instruction, 如果执行的是 native method, 则找不着

每一个 thread 都有一个 Program Counter Register 记录该 thread 需要执行的 instruction, 防止被其他 thread 覆盖影响

Program Counter Register 占用非常小, 可以忽略不计, 是运行速度最快的存储区域

Program Control (eg: loop, branch) 都是由 Program Counter Register 完成的

Program Counter Register 没有 GC, 也是 JVM 中唯一没有 OutOfMemoryError 的部分

## Virtual Machine Stack

Virtual Machine Stack 结构简单, 没有 GC, 可以快速执行, 速度仅次于 Program Counter Register

Virtual Machine Stack 存储了多个 Stack Frame, 1 个 Stack Frame 对应 1 个 method, 执行 method 对应 Stack Frame 进入 stack, 结束 method 对应 Stack Frame 离开 stack

Virtual Machine Stack 最上层的 Stack Frame 就是 Current Stack Frame 对应 Current Method 和 Current Class

一个 thread 中, 只有 Current Stack Frame 在执行, Current Stack Frame 执行结束, 返回 result 给下一个 Stack Frame, 离开 stack, 由下一个 Stack Frame 成为 Current Stack Frame

Stack Frame 正常执行完和遇到 exception 都会被弹出 stack

other thread 无法访问 current thread 的 Stack Frame, 只有 Stack Frame 执行完毕后, 会通知结果给 other thread

一个 Stack Frame 中存储了 Local Variable Table, Operand Stack, Dynamic Linking, Return Address 和 Additional Info

## Static Linking

Static Linking (Early Binding) 在 Compile Stage 可以确定 Symbolic Reference 对应的 Direct Reference, 不具备 Polymorphism 的 class 就可以进行 Static Linking, 不能被 override 的 method 也可以进行 Static Linking (eg: Static Method, Private Method, Final Method, Constructor) 

Dynamic Linking (Late Binding) 在 Compile Stage 无法确定 Symbolic Reference 对应的 Direct Reference, 需要在 Runtime Stage 的 Class Loading 的 Linking 的 Resolve 中确定

Static Linking 相比 Dynamic Linking 具有更快的启动时间和执行速度, 生成的可执行文件独立于外部环境, 不再依赖于外部的库文件, 但是可重用性较差, 资源占用也较多

## Dynamic Linking

Dynamic Linking 会发生在两个阶段. 如果能在 Class Loading 期间确定的 Reference, 则会在 Resolve 这一步将 Symbolic Reference 转成 Direct Reference. 由于 Dynamic Binding 的存在, 很多引用需要在 Runtime 时确定, 将 Symbolic Reference 转成 Direct Reference

Symbolic Reference 是一个标识, 用于描述所引用的目标的各种符号信息, 包括类和接口的全限定名, 字段的名称和描述符, 方法的名称和描述符等, 存储在 class file 的 Class Constant Pool

Direct Reference 指向 Heap 中的 instance 的地址, 存储在 JVM 的 Runtime Constant Pool

## Class Constant Pool

Class Constant Pool 存储在 Class File 中, 包含 Literal 和 Symbolic Reference, 类似于一个 Table, 每个 Literal 和 Symbolic Reference 都标识了 Index, 可以通过 Index 访问

Literal 包含 Basic Field, String Field 和 Final Field

Symbolic Reference 本质上还是 Literal, 用作标识, Class File 占用小, 就是因为采用了 Symbolic Reference

## Runtime Constant Pool

Class File 经过 Class Loader, 会将 Class Constant Pool 中必要的信息加载到 Runtime Constant Pool 中, 包括 Literal, Dynamic Ref, Symbolic Ref (有部分 Symbolic Ref 在 Class Loading 阶段无法转成 Dynamic Ref)

Runtime Constant Pool 具有 Dynamic, 可以在 Code 中修改 Runtime Constant Pool (eg: String 的 Intern())

## String Constant Pool

SCP (String Constant Pool) 维护了一个 StringTable 通过 HashTable 实现, 存储的 String Object 都是唯一的

- JDK7 时, SCP 存储在 Method Area 中, 只有触发 FGC 才会进行清理, JDK8 后, SCP 移动到 Heap 中, GC 效率稍高了一些
- JDK8 中 StringTable 默认长度为 65536, 可以通过 `-XX:StringTableSize` 设置 HashTable 的长度
- 存储 String Object 过多, 就会导致 Hash Complict, 导致 Linked List 过长, 性能下降

通过 intern() 也可以保证存储唯一的 String Object. 调用 intern() 后会先去 SCP 中寻找该 String Object

- 如果找得到, 就会返回该 String Object 的 Reference
- 如果找不到, 就会创建该 String Object, 然后返回 Reference
- 通过 intern() 创建 String Object, 可以节省 Memory, 并且 GC 也会容易很多

new String("ab") 可以在 Compile Stage 确定, 不仅仅会在 Heap 中创建 "ab", 还会在 SCP 中创建 "ab"

```java
// s1 指向 SCP 的 "ab"
String s1 = "ab";
// s2 指向 Heap 的 "ab"
String s2 = new String("ab");
// SCP 中已经有 "ab" 了, intern() 就直接返回 "ab" 的 Ref, 所以 s3 指向 SCP 的 "ab"
String s3 = s2.intern();
System.out.println(s1 == s2); // false
System.out.println(s1 == s3); // true

// s1 指向 Heap 的 "ab"
String s1 = new String("ab");
// s1.intern() 会去返回 SCP 的 "ab", 发现没有 "ab", 则去创建了一个 "ab"
// s2 指向 SCP 的 "ab"
String s2 = s1.intern();
// s3 指向 SCP 的 "ab"
String s3 = "ab";
System.out.println(s1 == s2); // false
System.out.println(s1 == s3); // false
System.out.println(s2 == s3); // true
```

JVM 为了会进行编译优化, String s = "a" + "b" 经过编译优化, ByteCode 中会是 String s = "ab"

```java
String s1 = "a" + "b";
String s2 = "ab";
System.out.println(s1 == s2); // true
```

String 的拼接, 底层依赖的是 StringBuilder 调用 append() 追加 String Object

```java
String s = new String("a") + new String("b");

// Similar to this
String s = new StringBuilder().append("a").append("b").toString();
```

StringBuilder 拼接的字符串 "ab" 无法在 Compile Stage 确定, 所以就不会在 SCP 中创建

通过 intern() 访问, 则会在 SCP 中存储一个引用指向 Heap 中的 "ab" 中, 所以 SCP 不仅存储 String Object, 还会存储 String Object Ref

```java
// s1 指向 Heap 的 "ab"
String s1 = new StringBuilder().append("a").append("b").toString();
// s1.intern() 处理 StringBuilder 拼接的字符串, 创建一个引用指向 "ab", 非常特别
// s2 指向 Heap 的 "ab"
String s2 = s1.intern();
// s3 指向 Heap 的 "ab"
String s3 = "ab";
System.out.println(s1 == s2); // true
System.out.println(s1 == s3); // true
System.out.println(s2 == s3); // true

// new String("a") + new String("b") 本质上就是通过 StringBuilder 的 append() 拼接的, 所以下面的效果一样
String s1 = new String("a") + new String("b");
// s2 指向 Heap 的 "ab"
String s2 = s1.intern();
// s3 指向 Heap 的 "ab"
String s3 = "ab";
System.out.println(s1 == s2); // true
System.out.println(s1 == s3); // true
System.out.println(s2 == s3); // true
```

## Object Instantiation

Object Instantiation 包括 Class Loading, Memory Allocation 和 Object Initialization

1. Class Loading

- JVM 执行 new 时, 会去 Constant Pool 中寻找对应的 Symbolic Reference 标识的 Class, 如果该 Class 不存在, 则会去通过 Parent Delegation 找到对应的 ClassLoader 进行 Class Loading
- 根据 ClassLoader + Package Name + Class Name 查找到对应的 Class File 进行 Class Loading, 生成 Class, 如果没有找到 Class File, 则抛出 ClassNotFoundException

2. Memory Allocation

- 采用 Bump the Pointer 或 Free List 给 Object 分配内存
- 如果 Memory 规整 (eg: 从左往右, 依次存储使用), JVM 会通过 Bump Pointer 指向了 Memory 中空闲的区域, 插入一个 Object 到 Pointer 指向的地址后, Pointer 再移动到 Object 的后头, 指向下一个空闲的区域
- 如果 Memory 不规整, JVM 会维护一个 Free List, 记录哪些区域为空闲, 后续查询该 List 即可知道 Object 可以分配在哪了

3. Object Initialization

- 调用对象的构造函数进行初始化, 构造函数的执行过程包括初始化字段, 执行构造方法体等, 子类构造函数会调用父类构造函数, 确保所有父类和子类的构造函数都得到执行
- 对象的字段会根据其类型进行默认初始化, 保证不赋值时, 也基本可用
- 构造方法体中的代码将会执行, 完成对象的特定初始化操作
- 构造函数执行完毕后, 将对象的引用返回给调用者, 这样对象就可以在程序中被引用和操作了

Object Instantiation 需要保证线程安全, 防止多个线程并发访问和修改同一个对象的状态

- Class Loading 过程, Class Loader 通常在单线程中执行, 可以保证线程安全
- Memory Allocation 过程, 通常是线程安全的, 每个线程分配的内存地址都是独立的, JVM 通过 CAS 保证了多线程环境下的原子性分配
- Object Initialization 过程, JVM 通过 Initialization Lock 保证多个线程中只有一个线程执行类的初始化过程

## Object Structure

Object Structure 包括 Header, Instance Data 和 Padding

1. Header: 包括 Mark Word, Class Pointer 和 Array Length

- Mark Word: 存储 HashCode, GC Age (4b, 所以 GC Age 最大 15), Lock, Lock State, Thread Id, Thread Stamp
- Class Pointer: 指向 Method Area 中对应 Class 的 Klass Class Info
- Array Length: 如果 Object 是 Array, 则会记录 Array Length

2. Instance Data: 存储了对象的实际数据, 

- 如果是 Normal Obj, 则 Instance Data 包括 Cur Class 和 Par Class 的 Field
  - Par Class 的 Field 会在 Sub Class 的 Field 之前, 如果宽度相同, 则会分配在一块, 如果 CompactFields 为 true, 则 Sub Class 的 Narrow Field 则可能插入 Par 的 Field 的缝隙
- 如果是 Array Obj, 则 Instance Data 包括 Array Length 和 Array Element

3. Padding: JVM 要求 Object 的 Start Address 为 8B 的整数倍, 通过 Padding 向上对齐 (eg: 14B 向上对齐为 16B)

Heap 中是不存储 Class Info 的, 只存储 Instance Data, 通过 ClassPointer 指向当前对象对应的 Klass 查询 Class Info

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202402292302358.png)

## Object Memory Allcation

64 bit OS 中, Mark Word 占 8B, Class Pointer 占 8B, 共占 16B, Pointer Compression 会将 Class Pointer 压缩成 4B, 可以通过 `-XX:-UseCompressedOops` 禁用 Pointer Compression

直接通过 `new Object()` 创建一个空对象, 就是 MarkWord 占 8B, Class Pointer 占 4B, Padding 占 4B, 共 16B

通过 JOL 查看 Memory Allcation

```xml
<dependency>
    <groupId>org.openjdk.jol</groupId>
    <artifactId>jol-core</artifactId>
    <version>0.17</version>
</dependency>
```

```java
public class Main {
    public static void main(String[] args) throws IOException {
        System.out.println(ClassLayout.parseInstance(new MyObject()).toPrintable());
    }
}

class MyObject { // MarkWord 8B, ClassPointer 4B
    int i; // 4B
    long l; // 8B
    boolean b; // 1B
    Object o; // 4B
} // 8 + 4 + 4 + 8 + 1 + 4 + 3 = 32B
```

```
OFF  SZ    TYPE DESCRIPTION
  0   8    (object header: mark)
  8   4    (object header: class)
 12   4    int MyObject.i
 16   8    long MyObject.l
 24   1    boolean MyObject.b
 25   3    (alignment/padding gap)   
 28   4    java.lang.Object MyObject.o
Instance size: 32 bytes
Space losses: 3 bytes internal + 0 bytes external = 3 bytes total
```

## Execution Engine

Class File 包含 Class Instruction, 只有 JVM 能识别 Class Instruction, 需要通过 Execution Engine 将 Class Instruction 编译成对应 CPU 的 Machine Instruction.

Execution Engine 既可以从 PC Register 中获取下一条 Instruction 的 Address, 也可以通过 Local Variable Table 的 Reference 找到 Heap 中的 Object.

Execution Engine 包含 Interpreter 和 JIT 两种 Compiler, 负责将 Class Instruction 转成 Machine Instruction.

Interpreter 是逐行编译 Class Instruction. 现在主流的 Template Interpreter 是一条 Class Instruction 关联一个 Template Function, Template Function 可以直接产出对应的 Machine Instruction, 提供性能. 

HotSpotVM 的 Template Interpreter 包含 Interpreter Template 和 Code Template. Interpreter Template 负责主要核心功能. Code Template 负责管理生成的 Machine Instruction.

JIT (Just In Time Compiler) 是 Dynamic Compile, 会将整个 Function 编译成 Machine Instruction, 保存在 Cache 中, 后续再次执行 Function 只要调用对应的一系列 Machine Instruction, 不需要像 Interpreter 一样去重新编译.

JIT 包含 C1 Compiler (Client Compiler) 和 C2 Compiler (Server Compiler, def).

- C1 适合 Client Program, 编译时的优化较浅, 编译耗时较短, 响应快, 资源占用少. 可以设置 `-client` 开启 C1. C1 主要采用方法内联, 栈上替代, 去虚拟化, 冗余消除进行优化.
- C2 适合 Server Program, 编译时的优化较深, 编译耗时较长, 执行效率更高. 可以设置 `-server` 开启 C2. C2 主要采用方法内联, 标量替换, 栈上分配, 同步消除进行优化.

HotSpotVM 为了实现 Java 的跨平台, 避免采用 Static Compilation, 通过 Interpreter 保留 JVM 的动态性. 可以设置 `-Xint` 只采用 Interpreter, 设置 `-Xcomp` 只采用 JIT, 设置 `-Xmixed` 采用 Interpreter + JIT.

HotSpotVM 刚启动时, 会由 Interpreter 先进行解释, 不需要等待全部编译完. 执行过程中, HotSpot Detection 会统计 Method 的调用次数, 达到一定阈值, 就会触发 OSR (On Stack Replacement), 调用 JIT 对一些常用的 Class Instruction 进行优化, 编译成 Machine Instruction 存储到 Cache 中. Cache 存储在 Method Area 中, 即 Native Memory.

C1 触发 OSR 的阈值默认为 1500 次, C2 触发 OSR 的阈值默认为 10000 次. 可以通过 `-XX:CompileThreashold` 设置阈值.

HotSpot Detection 统计的是一段时间内代码的热度, 减少长时间不活跃的代码的计数值, 有助于保持对热点代码的准确性, 如果超过一定的时间限度还不达不到阈值, 就会触发 Counter Decay, 减半统计的次数, 这个时间限度就是 Counter Half Life Time. 可以通过 `-XX:-UseCounterDecay` 关闭 Counter Decay. 可以通过 `-XX:CounterHalfLifeTime` 设置 Counter Half Life Time.

JDK9 引入了 AOT (Ahead Of Time Compiler), 借助 Graal Compiler, 牺牲了动态性, 在程序执行前, 将 Class Instruction 全部转成 Machine Instruction. 

## Object Reference

JVM 进行对象定位时, 有句柄引用 和 直接引用 (def) 两种方式

直接引用 是 引用 -> 对象

句柄引用 是 引用 -> 句柄 -> 对象, 在堆中维护一个句柄池, 想要定位对象, 就得先定位到句柄池里的某一个句柄, 再通过该句柄定位到具体的对象. 在 GC SweepCompact 时, 需要频繁改变对象的位置, 就只需要调整句柄的引用即可, 不需要去调整栈帧的引用

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202402292305667.png)

## Method Area

Metaspace 是 HotSpot 对 Method Area 的实现, 不存储在 JVM Memory 中, 存储在 Native Memory 中

- JDK7, Method Area 存储在 JVM Memory 的 Heap 中, 非常容易导致 OOM
  - java.lang.OutOfMemoryError: Permspace
- JDK8, Method Area 存储在 Native Memory 中, 不容易导致 OOM
  - java.lang.OutOfMemoryError: Metaspace

Method Area 的初始化大小 MetaspaceSize 为 21MB, 当占用达到 MetaspaceSize 后, 会触发 FGC, 如果清理后还是不够用, 会向上扩容, 直到 MaxMetaspaceSize, 如果清理了很多后, 会降低 MetaspaceSize

逻辑上 Runtime Constant Pool, String Constant Pool, Static Member, Class Info 存储在 Method Area 中

实际上 Hotspot 将 String Constant Pool, Static Member 存储在 Heap 中, Class Info, Runtime Constant Pool 存储在 Method Area 中

- JDK7, Static Obj 存储在 Heap 中, Static Obj Ref 存储在 Method Area 中
- JDK8, Static Obj 和 Static Obj Ref 都存储在 Heap 中
- Local Obj 存储在 Heap 中, Basic Type 和 Local Obj Ref 存储在 Stack 中
- Member Obj 和 Member Obj Ref 都存储在 Heap 中

Method Area 触发 GC 主要清理 Runtime Constant Pool 和 Class Info, 要求非常苛刻, 包括三个条件

- Class 和 Sub Class 都不存在 Instance
- 加载该 Class 的 Class Loader 已经被回收
- 该 Class 的 Class Object 没有被引用

Method Area 通过 Klass 这种数据结构表示 Class Info (Klass 和 Class 发音相同)

配置 Method Area

- `-XX:MetaspaceSize=21m`
- `-XX:MaxMetaspaceSize=100m`

## Class Constant Pool

Class Constant Pool 存储在 Class File 中, 包含 Literal 和 Symbolic Reference, 类似于一个 Table, 每个 Literal 和 Symbolic Reference 都标识了 Index, 可以通过 Index 访问

Literal 包含 Basic Field, String Field 和 Final Field

Symbolic Reference 本质上还是 Literal, 用作标识, Class File 占用小, 就是因为采用了 Symbolic Reference

## Runtime Constant Pool

Class File 经过 Class Loader, 会将 Class Constant Pool 中必要的信息加载到 Runtime Constant Pool 中, 包括 Literal, Dynamic Ref, Symbolic Ref (有部分 Symbolic Ref 在 Class Loading 阶段无法转成 Dynamic Ref)

Runtime Constant Pool 具有 Dynamic, 可以在 Code 中修改 Runtime Constant Pool (eg: String 的 Intern())

## String Constant Pool

SCP (String Constant Pool) 维护了一个 StringTable 通过 HashTable 实现, 存储的 String Object 都是唯一的

- JDK7 时, SCP 存储在 Method Area 中, 只有触发 FGC 才会进行清理, JDK8 后, SCP 移动到 Heap 中, GC 效率稍高了一些
- JDK8 中 StringTable 默认长度为 65536, 可以通过 `-XX:StringTableSize` 设置 HashTable 的长度
- 存储 String Object 过多, 就会导致 Hash Complict, 导致 Linked List 过长, 性能下降

通过 intern() 也可以保证存储唯一的 String Object. 调用 intern() 后会先去 SCP 中寻找该 String Object

- 如果找得到, 就会返回该 String Object 的 Reference
- 如果找不到, 就会创建该 String Object, 然后返回 Reference
- 通过 intern() 创建 String Object, 可以节省 Memory, 并且 GC 也会容易很多

new String("ab") 可以在 Compile Stage 确定, 不仅仅会在 Heap 中创建 "ab", 还会在 SCP 中创建 "ab"

## Direct Memory

Direct Memory 不存储在 JVM Memory 中, 存储在 Native Memory 中, 通过 NIO 直接操作 Native Memory

BIO 时, 需要先访问 User Mode 的 Buffer, 复制数据到 Kernel Mode 的 Buffer 中, 再访问 Kernel Mode 的 Buffer, 才能再操作 Disk, 重复存储了两份数据, 效率低

NIO 时, OS 会直接划分一块 Buffer 供 Java Program 访问, OS 会同步 Buffer 中的数据到 Disk 中, 只存储一份数据, 少了一次复制操作, 适合大文件存储

# JUC

## Lock

尽量使用 object lock, 而不是 class lock

添加了 synchronized 的 method 会添加一个 ACC_SYNCHRONIZED flag

Pessimistic Locking 先锁定资源, 再操作资源, 适合写操作多的场景

Optimistic Locking 先判断资源是否被更新过, 再操作资源, 如果没有被更新, 就直接操作资源, 如果被更新过, 就采取相应策略 (eg: 放弃修改, 重试强锁), 适合读操作的场景, 一般通过 OCC 或 CAS 判断资源是否被操作过

OCC (Optimistic Concurrency Control) 是一种乐观锁的并发控制策略, 它假设事务冲突的概率较低, 因此允许多个事务同时进行, 并在提交时检查版本是否有冲突 (eg: AtomicInteger)

OCC 和 CAS 都是基于乐观锁, 都是比较版本号解决并发冲突, OCC 更侧重软件实现, CAS 更侧重硬件实现

## Dead Lock

一个线程需要持有多把锁时, 并且锁之间存在嵌套关系, 就非常容易导致 Dead Lock, 尽量在设计程序时, 避免一个线程去争抢多把 Lock, 实在没办法, 也要让多把锁的逻辑放在一个层级, 不要去嵌套

死锁的四个必要条件

- 互斥 (Mutual Exclusion): 共享资源 X 和 Y 只能同时被一个线程所持有
- 占有等待 (Hold and Wait): A 持有 X, A 在等待 Y 的过程中不释放 X
- 不可抢占 (No Preemption): A 持有 X, B 持有 Y, A 无法强行抢占 B 的 Y
- 循环等待 (Circular Wait): A 等待 B 释放 Y, B 等待 A 释放 X

只要打破四个必要条件的任意一个即可解决死锁问题

- 互斥: 互斥是实现同步的根本原理, 无法被打破
- 占有等待: A 一次性获取所需的 X 和 Y, 避免等待, 或者引入锁超时机制避免永远等待
- 不可抢占: 使用可中断的锁, A 想要的 Y 被 B 抢走了, A 就主动在程序中释放 B 的 Y, 然后自己再获取 Y
- 循环等待: 指定共享资源的获取顺序, 想要获取 Y 一定要先获取 X

检测程序中是否存在死锁是一个相对复杂的任务, 因为死锁通常发生在运行时, 并且需要在系统中的某个时刻进行检测

- jstack 是 JVM 提供的一个 Command Tool, 可以打印出给定 Java 进程中所有线程的堆栈跟踪, 在一个运行中的 Java 程序中, 可以使用 jstack 来获取线程堆栈信息, 以分析是否存在死锁
- VisualVM 是 JVM 提供的一个管理和分析 Java 应用程序的图形化工具, 可以通过 VisualGC, Thread Dump Analyzer 来分析线程和内存信息, 进而检测死锁
- Deadlock Detector 是一些第三方的死锁检测工具

## Monitor

Monitor 是 JVM 的 Lock, 是实现 synchronized 线程同步的基础, 每个 Object 都会关联一个 Monitor Obj, 所有的 Thread 都是去争抢 Monitor Obj.

Monitor 的 Field

- `_owner` 记录持有当有当前 Mointor Obj 的 Thread Id
- `_count` 标识了 Monitor object 是否被锁, 每次添加 Lock, 就 +1, 每次释放 Lock 就 -1
- `_recursions` 记录 Reentrant 的次数, 每次进入一层, 就 +1, 每次出来一层, 就 -1
- `_EntryList` 存储了 Blocked Thread, 当一个线程尝试去获取一个已经被占有的 Monitor Obj 时, 就会进入 `_EntryList`
- `_WaitSet` 存储了 Waited Thread, 当线程调用了 wait(), 当前线程就会释放锁, 并进入 `_WaitSet`

每个 Mointor 都有 Entry Lock 和 WaitSet Lock

- 当一个线程想要获取 Mointor 时, 就会去尝试获取 Entry Lock
- 当一个线程进入 WaitSet 时, 就会尝试去获取 WaitSet Lock

## ThreadPool

当一个新任务提交给线程池时, 线程池会判断其中的工作线程数量, 如果当前的工作线程数量小于核心线程数, 线程池会创建一个新的工作线程来执行这个任务, 如果大于或等于核心线程数, 线程池则不会立即创建新的线程

如果线程池中的工作线程数目达到了核心线程数, 新的任务就会被存入到任务队列, 等待被执行, 当任务队列已满, 且当前线程数小于最大线程数时, 线程池会创建新的工作线程来执行任务

当任务队列已满, 并且当前线程数达到了最大线程数, 那么线程池会根据其 RejectedExecutionHandler 策略来处理这个任务

工作线程从任务队列中取出任务执行, 执行完毕后, 继续从队列中取出下一个任务执行, 直到队列为空, 如果设置了 allowCoreThreadTimeOut, 那么核心线程在等待时间超过 keepAliveTime 之后也会被回收

## Lock MarkWord

在 HotSpot JVM 中, MarkWord 是用于存储对象元数据的关键部分 (eg: HashCode, GC Age, Lock State, GC Info)

Non Lock's MarkWord

```
| unused:25b | identity_hashcode:31b | unused:1b | age:4b | biase_lock:1b | lock:2b |
```

通过 jol-core 查看 Non Lock 的 Object 的 MarkWord 是如何存储 HashCode 的

```xml
<dependency>
    <groupId>org.openjdk.jol</groupId>
    <artifactId>jol-core</artifactId>
    <version>0.8</version>
</dependency>
```

```java
Object o = new Object();
System.out.println(o.hashCode()); // HashCode will not be stored in MarkWord until the HashCode is accessed
System.out.println(Integer.toHexString(o.hashCode()));
System.out.println(Integer.toBinaryString(o.hashCode()));
System.out.println(ClassLayout.parseInstance(o).toPrintable());
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241746692.png)

Biased Lock's MarkWord

```
| thread:54b | epoch:2b | unused:1b | age:4b | biased_lock:1b | lock:2b |
```

Light Lock's MarkWord

```
| ptr_to_lock_record:62b | lock:2b |
```

Weight Lock's MarkWord

```
| ptr_to_heavyweight_monitor:62b | lock:2b |
```

## Lock Escalation

Lock Escalation 是指 synchronized 实现的 Lock, 随着竞争的情况根据 Non Lock -> Biased Lock -> Light Lock -> Heavy Lock 的顺序逐渐升级, 并且是不可逆的过程

Non Lock -> Biased Lock, 当一个线程第一次访问同步块时, 会在对象头和栈帧中记录偏向的锁的 Thread ID, 之后该线程再次进入和退出同步块时, 不需要进行 CAS 操作来加锁和解锁

Biased Lock -> Light Lock, 当第二个线程尝试访问同步块时, 偏向锁就需要撤销, 撤销过程需要等待全局安全点 (在这个点上没有正在执行的字节码), 撤销后, 偏向锁就升级为轻量级锁

Light Lock -> Heavy Lock, 如果轻量级锁的竞争激烈, 即有多个线程同时申请轻量级锁, 那么轻量级锁就会膨胀为重量级锁

## Biased Lock

Current Thread 持有 Biased Lock 后, 如果后续没有 Other Thread 访问, 则 Current Thread 不会触发 Sync, 不需要再获取 Lock 了, 即一个 Thread 吃到撑, 适合经常单个 Thread 操作的场景, 不需要添加 Lock, 性能非常强

Thread 获取 Lock 后通过 CAS 修改 Lock 的 MarkWord 的 Lock Identify 为 101, 即标识为 Biased Lock, 同时在 Monitor 的 Owner Field 中存储 Cur Thread 的 Id. 下一次有 Thread 访问时, 会先判断 Thread 的 Id 和记录的 Id 相同

如果 Biased Lock 记录了 T1 的 Id, 此时 T1 访问, 就可以不触发 Sync, 也不需要进行 CAS. 如果 T2 访问, 就会发生 Conflict. T2 会通过 CAS 尝试抢 Biased Lock. 如果 T2 抢到 Biased Lock, 则会替换 Owner 为 T2 的 Id. 如果 T2 没有抢到 Biased Lock, 则会撤销 T1 的 Biased Lock, 等待 T1 到 Safe Region 后, 发动 Stop The World !!! 升级为 Light Lock !!! 此时 Thread A, 原先持有的 Biased Lock 会替换为 Light Lock, 继续执行完后, 释放 Light Lock, 两个 Thread 公平竞争 Light Lock

Biased Lock 的 Pointer 和 Epoch 会覆盖 Non Lock 的 HashCode, 所以 Biased Lock 无法与 HashCode 共存

- 如果获取 HashCode 后再开启 Sync, 就会直接忽略 Biased Lock, 直接升级为 Light Lock
- 如果使用 Biased Lock 的过程中, 试图获取 HashCode, 就会撤销 Biased Lock, 直接膨胀为 Heavy Lock

由于 Biased Lock 维护成本太高, JDK15 后逐渐废弃了, 默认禁用了 Biased Lock, 可以通过 `-XX:+UseBiasedLocking` 手动开启

Biased Lock 默认在程序启动后 4s 开启, 可以通过 `-XX:+BiasedLockingStartupDelay=0` 手动调整

Test Biased Lock

```java
Object o = new Object();
new Thread(() -> {
    synchronized (o) {
        System.out.println("hello world");
    }
}).start();
System.out.println(ClassLayout.parseInstance(o).toPrintable());
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241746693.png)

## Light Lock

Light Lock 本质就是 CAS. 多个 Thread 交替抢 Lock, 执行 Sync. 不需要从 User Mode 切换到 Kernel Mode, 也不需要发生 Blocking. Conflict 的处理速度非常快, 适合经常多个 Thread 操作的场景, 不会造成 Thread Blocking, 执行速度也很高

JVM 为每一个 Thread 的 Stack Frame, 都开辟了 LockRecord 的空间, 称为 Displaced MarkWord, 存储 LockRecord Object

T1 通过 CAS 修改 Lock 的 MarkWord 的 Lock Identify 为 00, 修改 Lock 的 Markword 的 ptr_to_lock_record 指向 T1 的 LockRecord Object, 复制 Lock 的 MarkWord 到 LockRecord Object 中, 并且 T1 的 LockRecord Object 也会存储了一个 Pointer 指向 Lock

T2 通过 CAS 尝试修改 ptr_to_lock_record 指向 T2 的 LockRecord Object. 如果修改成功, 则表示 T2 抢到了 Lock. 如果 T2 尝试了多次 Spining 后, 还是没修改成功, 则会升级 Light Lock 为 Heavy Lock

T1 释放 Lock 时, 会将 Displaced MarkWord 复制到 MarkWord 中. 如果复制成功, 则本次 Sync 结束. 如果复制失败, 则说明 Light Lock 升级为 Heavy Lock 了, 此时 T1 会释放 Lock, 唤醒其他 Blocking Thread, 一起竞争 Heavy Lock

如果是 Reentrant Lock 在进行重入时, 每次重入一个锁, 就需要通过 CAS 创建一个 LockRecord Object, 后续创建的 LockRecord Object 不需要再去修改 ptr_to_lock_record 了

JDK6 前, 默认 Spining 10 次, 就会进行 Lock Escalation, 可以通过 `-XX:PreBlockSpin=10` 手动设置

JDK6 后, 采用 Adaptive Spin Lock, 如果 Spinning 成功, 则会提高 PreBlockSpin, 如果 Sprinning 失败, 则会降低 PreBlockSpin

Biased Lock 是一个 Thread 抢 Lock. Light Lock 是多个 Thread 抢 Lock. Biased Lock 是每次执行完, 不会释放 Lock. Light Lock 是每次执行完, 都会释放 Lock

## Heavy Lock

Heavy Lock 通过 Monitor 实现 Sync, 但是 Monitor 依赖 OS 的 Mutex Lock, 需要从 User Mode 切换为 Kernel Mode, 频繁切换, CPU 消耗非常多, 适合 Conflict 激烈的场景, 可以保证绝对的 Thread Safty, 但性能太差, 尽量避免用于同步时间较长的地方, 当 CAS 带来的消耗太多时, 也可以考虑切换为 Heavy Lock

Heavy Lock 的 MarkWord 存储的 Pointer 指向 Heap 的 Monitor object. Monitor 存储了 Non Lock 的 HashCode, GC Age 等信息, 释放 Heavy Lock 时, 也会将这些信息写回到 MarkWord 中

JVM Instruction

- `monitorenter` 表示进入 Monitor object, 开启 Sync
- `monitorleave` 表示离开 Monitor object, 关闭 Sync

Test Heavy Lock

```java
Object o = new Object();
new Thread(() -> {
    synchronized (o) {
        System.out.println("hello world");
    }
}).start();
new Thread(() -> {
    synchronized (o) {
        System.out.println("hello world");
    }
}).start();
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241746694.png)

## Lock Elimination

JIT 进行 Compoile 时, 会对 lock 进行 Escape Analysis, 这里的 obj 未发生 Escape, 所以这个 lock 毫无意义 JIT 会自动帮我们去除 lock, 提升性能, 但是这种编译优化手段依旧会影响一定性能, 应当避免这样的失误

```java
public void test() {
    Object obj = new Object();
    synchronized(obj) {
        System.out.println("hello world");
    }
}
```

## Lock Coarsening

一个 Method 内, 多处将同一个 Object 作为 Lock 没有意义, JIT 会帮我们合并内容, 扩大范围

```java
// Before JIT optimization
Object o = new Object();
new Thread(() -> {
    synchronized (o) {
        System.out.println("hello world");
    }
    synchronized (o) {
        System.out.println("hello world");
    }
    synchronized (o) {
        System.out.println("hello world");
    }
}).start();

// After JIT optimization
Object o = new Object();
new Thread(() -> {
    synchronized (o) {
        System.out.println("hello world");
        System.out.println("hello world");
        System.out.println("hello world");
    }
}).start();
```

## CAS

CAS 由 JDK 提供, 通过 hardware 保证了 NoBlocking, Atomicity, 本质是 cmpxchg instruction, 执行 cmpxchg 时, 由 thread 先给 bus 加 lock, 再去执行 CAS 操作, 相比 synchronized 更高效

JUC 提供了的 AtomicInteger, AtomicLong, AtomicReference, AtomicStampReference 都是基于 CAS 实现的, 通过 compareAndSet() 去调用操作系统级别的 cmpxchg 指令

- AtomicReference 存在 ABA 问题, AtomicStampReference 不存在 ABA 问题

## LongAdder

LongAdder 专用于高并发场景下, 原子累加一个长整型变量, 与 AtomicLong 相比, AtomicLong 操作 CAS, 每次只有一个 thread 修改成功, 其他的 thread 一直在 Spining, 导致 CPU 消耗过多

在 Low Concurrency 下, LongAdder 只操作 base, 效果和 AtomicLong 没有区别

在 High Concurrency 下, LongAdder 通过 add() 判断是否需要调用 longAcumulate(), 将单个的变量分解成多个独立的单元 Cell, 每个单元都独自维护一个独立的计数值, 首次会新建 2 个 Cell, 效果和 base 相同, 帮助 base 分散压力, 通过 Hash Algo 保证分布均匀, 当 Cell 不够用时, 会每扩容 2 个 Cell, 全部计算完后调用 sum() 叠加 base 和 Cell 得到结果

LongAdder 不保证 Strong Consistency, 有可能在得到 sum 后, 又有 thread 修改了 Cell 导致 Inconsistency

LongAdder, LongAccumulator, DoubleAdder, DoubleAccumulator 低层原理一致, 使用了一种类似于分段锁的机制

## Spin Lock

CAS 通过 Spin Lock 实现 Atomicity 不需要 wait, thread 获取 memoryValue, 记录为 exptecedValue, 当 thread 修改完, 需要同步 newValue 到内存时, 先比较 expectedValue 和 memoryValue 是否相同, 如果不同, 则说明在此期间有其他线程修改过了, 本次运算作废, 重新获取 value 进行重试

这种方式避免了线程的阻塞, 减少竞争, 减少了发生死锁的可能性, 减少了上下文切换的开销, 提高了系统的吞吐量

Spin Lock 是通过 infinite loop 实现, 资源耗费较多

## AQS

AQS (AbstractQueuedSynchronizer) 是构建 Lock 和 Synchronizer 的底层框架, 它提供了一种可重入的, 分离式的, 并发控制的机制, 基于 FIFO 队列的的资源获取方式

AQS 是一个 Abstract Class, 本身没有实现, 通过 Template Pattern 规定好模版后, 让 Sub Class 实现 (eg: CountDownLatch, CyclicBarrier, Semaphore, ReentrantLock, BlockingQueue 都是基于 AQS 实现的)

AQS 的 Exclusive Mode 是每个 Thread 独占一个 Lock (eg: ReentrantLock)

AQS 的 Shared Mode 允许多个 Thread 共享一个 Lock (eg: ReentrantReadWriteLock)

AQS 通过 CAS 实现对其内部状态的原子性修改, 以实现锁的获取和释放等操作

## CLH Queue

AQS 通过 State 表示同步状态, State 通过 Volatile 保证 Visibility. 不同的 Sub Class 有不同的实现, 如 ReentrantLock 的 State, 0 表示未占用, 1 表示被占用, 并且被同一个 Thread 重入了 1 次, 3 就表示被重入了 3 次

Thread A 试图获取 Lock 时, 会先检查 State

- 如果 State == 0 表示未占用, Thread A 就会尝试通过 CAS 将 State 改为 1, 表示 Thread A 获取了 Lock
- 如果 State != 0 表示被占用, 那么 AQS 就会将 Thread A 封装成一个 Node 存储进 CLH Queue, 通过 LockSupport 让 Thread A 进入等待状态, 当 Lock 释放后, 先进入 Queue 的 Node 就会被唤醒, 试图去争抢 Lock

CLH Queue 使用 Double LinkedList 的原因

- Double LinkedList 相比 Single LinkedList 可以访问前驱节点, 加入到 CLH Queue 的节点都需要去判断前面的节点是否存在异常, 如果存在异常会无法唤醒后续等待的节点, 如果使用 Single LinkedList 就需要从头开始遍历, 非常低效
- CLH Queue 中堵塞的节点, 下次唤醒时, 应该只有头节点去参与锁竞争, 避免同时唤醒所有的节点去竞争导致的惊群线程, 从而消耗大量资源, CLH Queue 中的节点只需要判断自己的前一个节点是否为头节点即可解决这个问题
- 有些 AQS 的实现类实现了 lockInterruptibly() 表示是可以中断的 Lock (eg: ReentrantLock), 被中断的线程在后续就不应该参与到锁的竞争中了, 通过 Double LinkedList 可以很方便的删除这个节点, 如果使用 Single LinkedList 会导致删除操作和遍历操作的竞争

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241746778.png)

## ReentrantLock

Reentrant Lock 允许 Outer Lock 和 Inner Lock 相同时, 获取 Outer Lock 后, 就可以直接进入 Inner Lock, 不需要释放后在重新获取

synchronized 和 ReentrantLock 都是 Reentrant Lock 的实现

```java
Object o = new Object();

new Thread(() -> {
    synchronized (o) {
        synchronized (o) {
            synchronized (o) {
                System.out.println(Thread.currentThread().getName());
            }
        }
    }
}).start();
```

ReentrantLock 维护了 FairLock 和 UnfairLock, 都采用是 Exclusive Mode.

Fair Lock 是多个 Thread 按照顺序获取 Lock, 分配均匀, 不存在锁饥饿, 但是性能稍差.

Unfair Fock 是多个 Thread 随意争抢 Lock, 容易造成同一个 Thread 抢走所有 Lock 的情况, 造成锁饥饿, 分配不均匀, 但是性能更强.

```java
// true is Fair Lock, false is Unfair Lock (def: false)
private ReentrantLock lock = new ReentrantLock(true);

private void sellTicket() {
    lock.lock();
    try {
        if (poll > 0) {
            System.out.println(Thread.currentThread().getName() + " " + poll--);
            Thread.sleep(100);
        }
    } catch (InterruptedException e) {
        e.printStackTrace();
    } finally {
        lock.unlock();
    }
}
```

ReentrantLock 提供了 Fair Lock 和 Unfair Lock 两种模式, 这两种模式主要的区别在于获取锁的策略不同

Fair Lock 的获取采取先来先得的原则, 也就是说, 先请求锁的线程将先获取到锁, 具体实现上, 系统维护了一个有序队列, 每当有新的线程请求锁时, 都会加入队列的末尾, 只有队列头部的线程能够获得锁, 当线程释放锁时, 它在队列中的节点将被移除, 队列的第二个节点将成为头部节点并获得锁

Unfair Lock 的获取不再遵循先来先得的原则, 当一个线程请求锁时, 如果当前无线程持有锁, 那么这个线程可以直接获取到锁, 无论是否有其他线程正在等待, 这样可能导致一些线程等待时间过长

Unfair Lock 的处理效率比 Fair Lock 要高, 线程的上下文切换和唤醒是需要耗费一定系统资源的, 不如直接让一个处于就绪的线程获取锁来的实在

```java
﻿ReentrantLock unfairLock = new ReentrantLock();
﻿ReentrantLock fairLock = new ReentrantLock(true);
```

## ReentrantReadWriteLock

ReenrantReadWriteLock 相比 ReentrantLock 不仅仅维护了 FairLock 和 UnfariLock, 还维护了一个 ReadLock 和 WriteLock, 这两个 Lock 都采用了 Shared Mode

ReentrantLock 采用 Exclusive Mode, 不适合多线程中, 读多写少的场景, 通过 ReenrantReadWriteLock 可以让多线程之间, 读读不互斥, 读写互斥, 写读互斥, 写写互斥, 可以保证读时的高性能, 和写时的安全

## JMM

JMM (Java Memory Model) 是一个 standard, 规定了 variable 在 memory 中的访问方式, 保证了 multithreaded program 在不同 CPU, 不同 OS 下, 访问 memory 时达到一致的访问效果, 实现 Atomicity, Visibility, Orderliness

thread 从 global memory 中拷贝 shared variable 到 local memory 中操作, 修改完再推送到 global memory 中, 实现修改, 不同 thread 之间, 无法访问对方的 local memory, 必须依靠 global memory 实现交互

Visibility, 一个 thread 修改了一个 variable, 通知其他 thread 有了变化, 如果其他 thread 正在操作这个 vairable, 就会去 global memory 中获取新的 variable, 解决 Dirty Read

Atomicity, 一个 thread 的操作不会被其他 thread 打断

Orderliness, 不同 CPU 和 OS 下, instruction 可以调整执行顺序来提高性能, 但是有些情况下, 不允许,调整顺序, 需要遵守 Happends-Before

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241746185.png)

JMM 为了提高性能, 减少对主内存的频繁访问, 允许修改 Local Memory 中的变量后可以等一会, 不需要立即写回到 Global Memory, 这就可能导致无法保证 Visibility

- T1 在 Local Memory 中修改完变量, 不立即写会到 Global Memory, 此时 T2 读取到的是 Local Memory 中的旧值

Local Memory 中的变量满足下面的条件, 才会写回 Global Memory

- 线程正常结束
- 线程获得锁或释放锁

## Happens-Before

Happens-Before 规范了两个操作的先后关系, 第一个操作的结果对第二个操作可见, 保证 Visibility, 交换两个操作的顺序, 如果不影响结果, 则允许, 如果影响结果, 则不运行, 保证 Orderliness

## Memory Fence

Memory Fence 实现了 Happens-Before, 是 CPU 和 Compiler 对 memory 随机访问中的一个同步点, 该同步点前的所有操作执行完毕后, 才可以执行后续操作, 保证 Visibility, 不允许将 Memory Fence 之后的操作重新排序到 Memory Fence 之前, 保证 Orderliness

LoadLoad Fence 确保在 Load 操作之前的所有 Load 操作都已经完, 确保一个线程读取共享变量的值之前, 它之前的所有读操作都已经完成

StoreStore Fence 确保在 Store 操作之前的所有 Store 操作都已经完成, 确保一个线程修改共享变量的值之前, 它之前的所有写操作都已经完成

LoadStore Fence 确保在 Load 操作之前的所有 Store 操作都已经完成, 确保一个线程读取共享变量的值之前, 其他线程对该变量的写操作已经完成

StoreLoad Fence 确保在 Store 操作之前的所有 Load 操作都已经完成, 确保一个线程修改共享变量的值之前，其他线程对该变量的读操作已经完成

Java 对 Memory Fence 的实现有 volatile, synchronized, final, concurrent ...

## volatile

volatile 是对 JMM 的一种实现, volatile 修饰的变量可以保证 Visibility 和 Orderliness, 但是无法保证 Atomicity

通过 volatile 修饰 variable, 每次修改都会立即写回到 Global Memory 中, 再通过 JMM 清空其他线程中变量的值, 让他们重新来获取最新的值, 保证了 Visibility

通过 volatile 修饰 variable, 执行 write variable 前会先执行 lock, lock 会清空其他 thread 的 local memory 中的 variable, 其他 thread, 就需要重新执行 read variable, 实现 multithreaded interaction, 所以 volatile 适合表示 flag, 适合读的场景

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241746186.png)

```java
public static volatile boolean isLoop = true;

public static void main(String[] args) throws InterruptedException, ExecutionException, TimeoutException {
    new Thread(() -> {
        while (isLoop) {}
    }).start();
    
    try { TimeUnit.MICROSECONDS.sleep(1); } catch (InterruptedException e) { e.printStackTrace(); }
    
    isLoop = false;
}
```

这里不通过 volatile 修饰变量, 修改 Local Memory 中的数据后不会立即进行同步, 这里的 isLoop 就会一直是 Local Memory 中的 false

这里不仅仅是因为无法读取到更改后的数据, 更重要的是 JIT 会自动将 while(isLoop) 优化成 while(true) 避免了一次数据读取, 这也导致了 Infinte Loop, 通过 volatile 修饰变量后, 就会禁用这个 JIT Optimization

```java
public static boolean isLoop = true;

public static void main(String[] args) throws InterruptedException, ExecutionException, TimeoutException {
    new Thread(() -> {
        while (isLoop) {}
    }).start();
    
    try { TimeUnit.MICROSECONDS.sleep(1); } catch (InterruptedException e) { e.printStackTrace(); }
    
    isLoop = false;
}
```

volatile 通过 Memory Fence 保证了 variable 的 Visibility, Orderliness

```java
private volatile int sharedValue;

public void writeSharedValue(int value) {
    // StoreStore Fence
    sharedValue = value;
    // StoreLoad Fence
}

public int readSharedValue() {
    return sharedValue;
    // LoadLoad Fence
    // LoadStore Fence
}
```

volatile read 后面会插入一个 LoadLoad Fence, 防止和后面的 normal read 进行 reorder, 还会再插入一个 LoadStore Fence, 防止和后面的 normal write 进行 reorder, 最终保证了 volatile read 后的 instruction 不会重排到 volatile read 前面

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202402031244938.png)

volatile write 前面插入一个 StoreStore Fence, 防止和前面的 normal read 进行 reorder, 后面插入一个 StoreLoad Fence, 防止和后面的 volatile read, volatile write 进行 reorder, 最终保证了 volatile write 前的 instruction 不会重排到 volatile write 后面

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202402031244590.png)

这里, 如果通过 volatile 修饰 x, 无法避免 x 和 y 重排序, 如果通过 volatile 修饰 y, 可以避免 x 和 y 的重排序

为了避免重排序, 要么全部加上 volatile, 要么就把 volatile read 放在最后, 把 volatile write 放在最前面, 巧妙利用 Memory Fence 避免重排序

```txt
volatile init x # Add volatile to x (not recommanded)
init y
--- Fence for x write --- # This can not prohibit reordering x below and y below
write x = 10
write y = 10
read y
read x
--- Fence for x read --- # This can not prohibit reordering x above and y above

init x
volatile init y # Add volatile to y (recommanded)
write x = 10
--- Fence for y write --- # This can prohibit reordering x above and y below
write y = 10
read y
--- Fence for y read --- # This can prohibit reordering x below and y above
read x
```

volatile 无法保证 Atomicity, 不适合参与需要依赖当前 variable 的运算

这里 count++ 包含 Data Loading, Data Calculation, Data Assignment 三个步骤, 无法保证 Atomicity

一个 thread 修改完 count 后, 将 latest data 写入 global memory 后, 清空其他 thread 的 count, 有些 thread 可能已经执行完 count++, 还没来得及写入 global memory, 就被清空了, 重新读取了 latest data, 导致刚刚的 count++ 丢失

```java
public static volatile int count = 0;

public static void main(String[] args) throws Exception {
    for (int i = 0; i < 10000; i++) {
        new Thread(() -> {
            count++;
        }).start();
    }
    
    try { TimeUnit.SECONDS.sleep(2); } catch (InterruptedException e) { e.printStackTrace(); }
    
    System.out.println(count);
}
```

通过 volatile 保证 Visibility, 最终 Read Consistency

通过 synchronized 保证 Atomicity, 最终 Write Consistency

```java
private volatile int value;

// volatile ensure Visibility
public int getValue() {
    return value;
}

// synchronized ensure Atomicity
public synchronized void setValue(int value) {
    this.value = value;
}
```

## DCL NullPointException

DCL 是一种在单例模式中使用的延迟加载策略, 它尝试通过检查对象是否已经实例化来避免每次获取单例时都需要加锁的开销, 如果不通过 volatile 修饰 instance 会导致 NullPointException

Object Creation 包含 Memory Allocation, Object Initialization, Reference Points to Memory 三个步骤, 在多线程环境下, 由于指令重排序的存在导致了 NullPointException

- 在 Java 中，对象的实例化过程并非原子操作，它可以被分解为以下三个步骤：
  - 为对象分配内存。
  - 调用对象的构造函数，初始化对象。
  - 将对象的引用赋值给变量。
- 由于编译器和 CPU 可能会对指令进行重排序，步骤2和步骤3的执行顺序可能被颠倒。也就是说，可能先执行步骤3，再执行步骤2。这在单线程环境下没有问题，但在多线程环境下可能会导致另一个线程获取到一个未完全初始化的对象。

通过 volatile 修饰 singleton, 禁止重排序, 避免 NullPointException

```java
class DoubleCheckSingleton {
    private static volatile DoubleCheckSingleton instance;
    
    private DoubleCheckSingleton() {}
    
    public static DoubleCheckSingleton getInstance() {
        if (instance == null) {
            synchronized (DoubleCheckSingleton.class) {
                if (instance == null) {
                    instance = new DoubleCheckSingleton();
                }
            }
        }
        return instance;
    }
}
```

# MySQL

## Transaction ACID

Atomicity 是指一个 TRX 是一个不可分割的工作单元, 要么全成功提交, 要么全失败回滚, 成王败寇, 没有妥协之说, 通过 Undo Log 保证.

Consistency 是指数据需要从一个合法性状态变化到另一个合法性状态, 这个合法是业务层面的合法 (eg: A 扣钱, 扣成了负数, 则不符合业务层面的要求, 即不合法). 

Isolation 是指一个 TRX 内部使用到的数据对其他 TRX 隔离, 不会受到其他 TRX 的影响, 通过 MVCC 保证.

Durability 是指一个 TRX 一旦被提交, 它对数据库中数据的改变就是永久性的, 通过 Redo Log 保障的, 先将数据库的变化信息记录到 Redo Log 中, 再对数据进行修改, 这样做, 即使数据库崩掉了, 也可以根据 Redo Log 进行恢复.

## Transaction Status

Active 是指 TRX 正在执行.

Partially Committed 是指 TRX 已经执行了最后一个提交, 操作的都是内存中的数据, 还没有进行刷盘.

Committed 是指 TRX 在 Partially Committed 后, 成功进行了刷盘.

Failed 是指 TRX 在 Active 和 Partially Committed 阶段遇到了某些错误, 而无法继续执行.

Aborted 是指 TRX 在 Failed 阶段后, 进行回滚, 恢复了到 TRX 最初的状态.

## Isolation Level

从严重程度上来讲, Dirty Write > Dirty Read > Non-Repeatable Read > Phantom Read. Dirty Write 是一定不能接受的, 而 Non-Repeatable Read 和 Phantom Read 在一定场景下, 是可以接受的.

MySQL 提供的 Isolation Level 包含 `read-uncommitted`, `read-committed`, `repeatable-read` 和 `serializable` 用于解决一定的并发问题.

- `read-uncommitted` 可以解决 Dirty Write.
- `read-committed` 可以解决 Dirty Write, Dirty Read.
- `repeatable-read` 可以解决 Dirty Write, Dirty Read, Non-Repeatable Read. MySQL 的 `repeatable-read` 可以解决一定的 Phantom Read, 并通过 Row Lock + Gap Lock + Next-Key Lock 解决 Phantom Read.
- `serializable` 可以解决 Dirty Write, Dirty Read, Non-Repeatable Read, Phantom Read.

查看当前的 Isolation Level.

```sql
select @@transaction_isolation;
```

设置 Session 的 Isolation Level 会在当前 Session 中立即生效. 设置 Global 的 Isolation Level 会在下一次 Session 中生效.

```sql
set session transaction_isolation = 'read-uncommitted';
```

## Redo Log

Redo Log 和 Undo Log 都是一种恢复操作, 他们回滚数据是逻辑层面的回滚, 而不是物理层面的回滚. 插入一条记录后, 就会记录一条对应的删除操作. 开辟了一个数据页后回滚, 是无法回滚到开辟数据页之前的, 只是通过操作相反的命令达到数据上的统一. 

```txt
start transaction;

select col; -- ''

-- Record col = '' to Undo Log
-- Record col = 'a' to Redo Log
update col = 'a';

-- Record col = 'a' to Undo Log
-- Record col = 'b' to Redo Log
update col = 'b';

-- Flush Disk
commit;
```

InnoDB 采用 WAL (Write-Ahead Logging), 先写日志, 再写硬盘, 只有日志写成功了, 才算事务提交成功. 发生宕机且数据未刷到磁盘时, 就可以根据 Redo Log 恢复数据, 保证了 ACID 的 D.

如果不采用 Redo Log, 为了保证数据安全性, 每次执行 SQL, 就需要进行 Random IO, 将硬盘的数据读取到内存中, 修改完再进行刷盘, 不仅效率低, 丢失数据的风险更高, 而且为了修改一点数据, 就将 Page 来回折腾, 非常不划算.

Redo Log 可以保障一定的安全性, 所以就没有必要实时进行内存到硬盘的刷盘操作, 可以稍微间隔长一点 (eg: 1s 刷盘一次).

Redo Log 占用非常小, 而且是通过 Sequential IO 存储到硬盘上的, 可以说成本非常低.

Redo Log 是在 Storage Engine 层面产生的, Bin Log 是 DB 层面产生的, 两者有着很大的区别 (eg: 插入 100 的过程中, Redo Log 是不断更新的, 等全部加载完, 再一次性写入到 Bin Log 中).

MySQL Server 启动后, 会立即申请一块 Redo Log Buffer, 用来存储 Redo Log, 这块空间被分成若干个连续的 Redo Log Block, 1 个 Block 占 512B.

执行一个修改操作后, 会生成一条 Redo Log 写入到 Redo Log Buffer 中, 记录的是修改后的数值, 当提交后, 就会将 Redo Log Buffer 中的数据追加写入到 OS 的 Page Cache 中, 再进行刷盘, 追加写入到硬盘的 Log File 中.

通过 `innodb_log_buffer_size` 设置 Redo Log Buffer 的大小 (def: 16M).

通过 `innodb_flush_log_at_trx_commit` 设置不同的刷新策略 (def: 1).

- `0`: 提交后, 不会进行任何操作, 等待 Server 自动进行一秒一次自动同步. 将数据存储在 Buffer 中, 依靠自动同步, 风险最高, 但是性能最强.
- `1`: 提交后, 将数据写入到 Page Cache, 再从 Page Cache 写入到硬盘. 直接写入到硬盘中, 非常安全, 但是性能最差, 默认就是如此.
- `2`: 提交后, 将数据写入到 Page Cache. 将数据写入到 OS 到 Page Cache 中, 一般 OS 宕机的几率是非常低的, 还是蛮安全的, 性能也比较好.

## Undo Log

Undo Log 可用于回滚数据, 可用于 MVCC. 

InnoDB 默认有 2 个提供给 Undo Log 的 Table Space, 共包含 128 个 Rollback Segment, 每个 Rollback Segment 中包含 1024 个 Undo Log Segment.

1 个 Rollback Segment 可能同时服务于 n 个 TRX, 开启 1 个 TRX 后, 就会去制定 1 个 Rollback Segment, 如果 TRX 中的数据被修改了, 原始的数据就会记录到 Rollback Segment 中.

通过 `innodb_undo_directory` 设置 Rollback Segment 的存储位置 (def: ./).

通过 `innodb_undo_tablespaces` 设置 Rollback Segment 的文件数量 (def: 2).

通过 `innodb_rollback_segments` 设置 Rollback Segment 的数量 (def: 128).

InnoDB 的 Record Header 还会有一些隐藏列.

- `DB_TRX_ID`: 每个 TRX 都会自动分配一个 TRX ID.
- `DB_ROLL_PTR`: 指向 Undo Log 的 Pointer.

执行 `insert` 后, 会产生一个 Undo Log, 提交后, 立即删除.

执行 `delete` 和 `update` 后, 会产生一个 Undo Log, 提交后, 放入 Linked List 中, 提供 MVCC 使用, 等待 Purge Thread 删除. Purge Thread 在删除数据时, 只是进行逻辑删除, 将 deletemark 标记为 1, 后续采用覆盖的方式插入数据实现删除.

Undo Log 的存储是离散的, 要回收非常麻烦, 所以 TRX 提交后, 不会立即删除 Undo Log, 而会放入到一个 Linked List 中, 然后判断 Undo Log 所属 Page 的使用空间是否小于 3/4, 如果小于 3/4, 那么它就不会被回收, 其他 TRX 的 Undo Log 会继续使用当前 Page.

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241733175.png)

更新 Priamry Key 时, 会将 Old Record 的 deletemark 标识为 1, 再新建一个 New Record, 递增 Undo Log 的 no, 保证回滚时向前可以找到 Undo log.

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241733176.png)

## Bin Log

在 TRX 提交之前, 会记录 DDL 和 DML 到 Bin Log 中, 以达到重播 SQL 语句的目的, 主要用于数据库回滚、复制、数据恢复.

Bin Log 可以用于数据恢复, 如果 MySQL Server 挂掉了, 可以通过 Bin Log 查询到用户执行了哪些修改操作, 可以根据 Bin Log 来恢复数据.

Bin Log 可以用于主从复制, Log 具有延续性和时效性, 可以根据 Bin Log 同步 Master 和 Slave 之间的数据.

查看 Bin Log 状态.

```sql
show variables like '%log_bin%';

show binary logs;
```

配置 Bin Log. (file: my.cnf)

```
[mysqld]
log-bin=mysql-bin
binlog_expire_logs_seconds=600
max_binlog_size=100M
```

Bin Log 是一对二进制文件, 所以无法直接查看, 这里通过 `mysqlbinlog` 查看 Bin Log

```shell
mysqlbinlog '/var/lib/mysql/mysql-bin.000004'
```

查看 Bin Log Events.

```sql
show binlog events \G

show binlog events in 'msyql-bin.000004';

-- 从 236 行开始向后查 5 条
show binlog events in 'msyql-bin.000004' from 236 limit 5;
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241732538.png)

## MVCC

MVCC (Multi Version Concurrency Control) 可以在不加锁的情况下, 采用非堵塞的方式解决读写冲突.

MVCC 主要有 Undo Log 和 Page View 实现的, 通过 Undo Log 构成一个 Version Linked List, 通过 Page View 选择一个 Version 供访问.

MVCC 在 RC 和 RR 中生效, 不在 RU 中生效, 因为 RU 可以读到未提交的事务, 所以直接读取最新版本即可.

当 TRX 来读取数据时, 会生成一个 Page View, 该 Page View 包含了几个属性.

- `creator_trx_id` 记录了 Cur TRX 的 ID, TRX ID 是会自增的, 所以后面的 TRX ID 一定要大于前面的 TRX ID, 这里 `creator_trx_id = 50`.
- `trx_ids` 记录了所有正在活跃的 TRX, 这里 `trx_ids = 20, 30`.
- `min_trx_id` 记录了 `trx_ids` 中最小的 `trx_id`, 这里 `min_trx_id = 20`.
- `max_trx_id` 记录了 `trx_ids` 中最大的 `trx_Id` + 1, 这里 `max_trx_Id = 31`.

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241733177.png)

依次遍历 Version Linked List, 根据下面这四步查找规则, 找到一个合适的 Version.

- `trx_id == creator_trx_id`, 表示当前的 Version 就是由 Cur TRX 创建的, 可以访问.
- `trx_id < min_trx_id`, 表示当前 Version 已经提交, 可以访问.
- `trx_id > max_trx_id`, 表示当前 Version 是在当前 Page View 生成之后才开启的, 不能访问, 直接退出, 不需要进行后续的遍历判断了.
- `trx_id not in trx_ids`, 表示当前 Version 已经提交了, 可以访问.

InnoDB 的 RC, 每次执行 `select`, 就会创建一个 Page View, 可以解决 Dirty Read.

InnoDB 的 RR, 只有第一次执行 `select`, 才会创建 Page View, 后续执行插入后, 不影响第一次查询的 Page View, 所以不仅可以解决 Dirty Rad, 还可以解决 Non-Repatable 和 Phantom Read.

## MySQL Replication

Replication 可以让读写分离, Master 负责写, Slave 负责读, 分摊了压力. Slave 就是一个天然的数据备份, 实现了高可用.

Master 更新数据后, 将信息写入 Bin Log. Log Dump Thread 会去读取 Bin Log, 将内容发送给 Slave, 这个过程需要加锁, 因为 Master 也在进行写操作. Slave 的 IO Thread 会去进行解读内容, 并写入 Relay Log. Slave 的 SQL Thread 会去读取 Relay Log 执行 SQL 进行数据同步.

Canal 阿里巴巴开源的一种基于数据库增量日志解析的数据同步工具, 主要用于 MySQL 数据库的 Binlog 增量订阅和消费

Canal 会模拟 MySQL Slave 的交互协议, 伪装自己为 MySQL Slave, 向 MySQL Master 发送 dump 协议

## Architecture

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241726446.png)

MySQL 基于 CS Arch, Client (eg: JDBC, ODBC) 发送一段 SQL 给 Server (eg: mysqld), Server 返回处理结果给 Client

Connection Layer 负责管理 Connection, Validation, Authorization. Client 和 Connection Layer 建立 TCP Connection 后, 会对 User 进行 Validation. 如果不通过, 就会返回 Error (Access denied for users). 如果通过, 就会进行 Authorization, 并创建一个 Thread 监听处理 Client Request.

Connection Layer 通过 Connection Pool 实现 Connection, 避免频繁的 Creation 和 Destroy

Service Layer 包含 MySQL 的大多数核心功能 (eg: Query Caching, SQL Parsing, SQL Analysis, SQL Optimizing, Built-in Function), 所有的 Cross Storage Engine 的 Function 都是在这实现的 (eg: Stored Procedure, Trigger, View).

Storage Engine Layer 负责 Data Storage 和 Data Extraction, 支持多种 Storage Engine (eg: InnoDB,MyISAM, Memory).

MySQL 执行 SQL, 需要 Client 和 Connector 建立连接, 接着依次执行 Query Caching, SQL Parsing, SQL Preprocessing, SQL Optimization, SQL Execution.

## Query Caching

Query Caching 可以将一条 SQL 作为 key, 将处理结果作为 value, 缓存起来. 下次查询, 会先查询 Cache 中是否有匹配 key 的, 如果有直接返回 value, 就不需要做接下来的操作了

MySQL 8 删除了 Query Caching. Cache Hit Ratio 太低, 要求 key 完全相同比较困难. 如果修改数据后, 缓存更行不及时, 会导致脏数据

## SQL Parsing

SQL Parsing 是对 SQL 进行 Preprocessing 和 Parsing, 提取 Keyword, 先进行 Lexical Analysis, 再进行 Syntax Analysis, 生成一个 AST, 接着优化 AST, 生成 Physical Planning.

Lexical Analysis 是将 SQL 分成一系列的词元和标记, 识别出每个字符串代表什么.

Syntax Analysis 是将对输入的 SQL 进行语法校验.

## SQL Preprocessing

进行一些基本的检查 (eg: 检查表和字段是否存在, 用户是否有权限访问目标数据), 此阶段可能会对 AST 进行树的改写以进行一些优化

## SQL Optimization

接收到 Physical Planning 进行 LQO 和 PQO, 找到最好的执行计划后.

LQO (Logical Query Optimization) 更改查询方式, 以提高效率, 就是这里更改了 SQL 的执行顺序.

PQO (Physical Query Optimization) 通过 Index 和 Table Join 进行优化.

## SQL Execution

接收到 Physical Planning 后, 进行权限检查, 执行查询, 处理结果集, 如果遇到错误, 需要进行错误处理.

## AST

AST (Abstract Syntax Tree) 是对 SQL 语句的结构化解析表示, AST 将 SQL 语句进行抽象化解析, 将其转换为一个树形结构, 这种结构能够反映出 SQL 语句中各元素 (eg: 关键字、表达式、函数、操作符) 之间的逻辑关系.

MySQL 的源代码中有对 SQL 语句进行解析并生成 AST 的部分, 但对 AST 的直接操作和查看并不像某些语言 (eg: JavaScript) 的 AST 工具那样普遍和容易. 目前可以使用 [sql-ast](https://github.com/aleclarson/sql-ast), 可以将来自 `mysqldump` 的输出解析为 AST.

## Slow Query

一条 Query 执行耗时太久, 就是一条 Slow Query, 一般可以通过 SkyWalking, Promotheus, Arthas 这样的监测工具去监测耗时较久的 API. MySQL 也提供了 Slow Query Log 记录 Slow Query.

一般优化一些高并发场景的 Slow Query, 从 Disk IO, CPU, Network Bandwidth 三个角度来分析问题.

- Disk IO: 是否正确使用了 Index
- CPU: Order By, Distinct, Group By 是否占用太多, 针对性的添加 Index 进行优化
- Network Bandwidth: 提升 Network Bandwidth

Slow Query Log 开启后, 会影响一定性能, 一般需要调优时, 就可以打开辅助调优.

## Split

MySQL 数据库的分库分表主要是为了应对大数据量或者高并发的场景, 分库分表存在分布式事务一致性的问题, 跨结点关联查询, 分页查询, 排序查询的问题, 主键避重的问题

单库无法承受当前的并发量, 请求量极高, 需要大量的计算和 IO 时, 就需要分库

单表数据量过大时 (eg: 单表的数据量达到 1000W 或 20G), 就需要拆分表

分库分表虽然可以拆分业务, 可以降低一定系统间的影响, 但是导致的问题太多, 非常难处理, 数据量没这么大时, 不要分库分表 !!!

## Split Database

水平分库, 将一个库的数据拆分到多个库中, 通过 Id 取模的方式路由到不同的库中

- eg: db_user 拆分成 db_user_0, db_user_1, db_user_2 三个库, 通过 id % 3 的方式选择不同的库进行访问

水平分表, 将一个表的数据拆分到多个表中, 通过 Id 取模的方式路由到不同的表中

- eg: tb_user 拆分成 tb_user_0, tb_user_1, tb_user_2 三个表, 通过 id % 3 的方式选择不同的表进行访问

## Split Table

垂直分库, 将一个库的表拆分到多个库中

- eg: db_service 拆分成 db_user, db_order, db_sku, 不同的业务访问不同的库

垂直分表, 将一个表的字段拆分到多个表中, 根据字段不同的访问频率进行冷热隔离

- eg: user(id, name, desc) 拆分成 user(id, name) 和 user_detail(id, desc)

## SQL Injection

查看 Log 和 DB 确认是否存在 SQL Injection, 立即隔离受影响的系统, 降低风险

PrepareStatement 会对 SQL 进行预处理, 不需要 "+" 拼接字符串, 不存在 SQL Injection, 尽量不要使用字符串拼接

```java
Scanner scanner = new Scanner(System.in);
// name 输入 1' or
String name = scanner.nextLine();
// password 输入 or '1' = '1
String password = scanner.nextLine();
// select * from accounts where name = '1' or' and password = 'or '1' = '1';
String sql = "select * from accounts where name = '" + name + "' and password = '" + password + "';";
```

```sql
select * from accounts where name = '1' or ' and password = ' or '1' = '1';
```

对入参进行校验, 过滤

用户的权限应该控制在最小粒度, 避免权限过高导致的大问题

定期进行安全审计, 设置监控和告警机制

# Redis

## Redis Replication

Replication 可以实现读写分离, 可以用于数据备份, 可以水平扩展, 可以实现高可用, Master 负责写, Slave 负责读, Master 更新数据后, 异步同步数据

Master 可读可写, Slave 只可以读. Slave 默认每 10s 发送一次心跳给 Master. Master 关机后, Slave 不会上位, 等待 Master 开机后, 一切照旧.

Slave 进行同步时, 会携带 Replication Id 和 Offset 请求 Master, Master 会去比较该 Replication Id 是否和自身的相同. 如果不同, 则认为是第一次同步, 会通过 RDB 进行全量同步, 如果相同, 则会进行增量同步

Master 进行全量同步时, 一边通过子线程创建 Snapshotting, 一边累积命令到缓存中. RDB Persistence 结束后, 会发送 Snapshotting 和缓存中的命令给 Slave, 覆盖 Slave 的数据, 实现第一次的全量同步

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312261306562.png)

Offset 会去记录上一次同步的位置, 再次请求时, Master 一看 Replication Id 相同, 就会认为这次是增量同步, 就会将 Replication BackLog 中 Offset 后面的数据同步给 Slave 实现增量同步, 在 Master 宕机恢复后, 这又相当于 Breakpoint Resume

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312261306398.png)

Replication BackLog 本质是一个数组, 也是有空间上限的, 超出上限后, 会去直接覆盖先前的内容. 如果 Slave 断开太久, 导致未备份的数据被覆盖了, 就无法基于 BackLog 进行增量同步, 只能被迫进行低效的全量同步

- 假设，BackLog 数组长度大小为 1000，master 的 offset 为 4000，如果 slave 的 offset 为 3500，那么就是差 500 的偏移量，直接增量同步即可。如果 slave 的 offset 为 2500，那么就差 1500 了，直接超出了 1000 的数组大小，那么就只能全量同步了。

优化全量同步, 减少一个 Master 连接的 Slave 数量, 可以让 Slave 再去连接多个 Slave, 分摊 Master 压力, 减少单节点的内存占用, 减少 RDB 的 IO 次数

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312261457996.png)

## Redis Sentinel

Sentinel 通过 PING PANG 不断监控 Master 和 Slave 是否按预期工作. 如果 Master 故障了, Sentinel 会根据投票数将一个 Slave 转成 Master, 并通知 Client 最新的 Master IP 和 Slave IP 进行转移故障

Subjective Down, 单个 Sentinel 发送心跳给 Master, 一定时间内没有收到合法回复 (def. 30s), 就主观认定 Master 不可用

Objective Down, 超过指定数量的 Sentinel 都主观认为下线时, 就客观认定 master 不可用

Sentinel 认定 Master 为 Objective Down, 所有 Sentinel 根据 Raft Algo 选举一个 Sentinel 成为 Leader, 执行 Failover. Leader 根据 down-after-milliseconds, replica-priority, replication offset, run id 选择一个 Slave 成为 New Master. 等 Old Master 和 Slave 重启后, 会添加配置到 redis.conf 中, 让他们服从 New Master

- down-after-milliseconds 表示该 Slave 和 Master 失联的时长, 超过一定数值后, 直接排除
- replica-priority 越小, 优先级越高
- replication offset 表示复制的完整度, 越大优先级越高
- run id 是一串字符, 根据 ASCII 比较, 越小, 优先级越高

Cleft Brain 是指 Master, Slave 和 Sentinel 失联了, 处于不同的网络分区, Sentinel 无法感知 Master, 就会去从 Slave 中选举一个 New Master, 但是 Old Master 那边还在跟 Client 进行通信, 等网络恢复后, Old Master 会被降级为 Slave, 导致失联那会的数据丢失

解决 Cleft Brain, 设置 Master 最少连接的 Slave 数量, 如果小于该数值, 就认为该 Master 失联了, 就停止和 Client 进行通信

```shell
min-replicas-to-write 1
```

解决 Cleft Brain, 设置 Master 和 Slave 之间 Replication 的延迟, 如果大于该数值, 就认为该 Master 失联了, 就停止和 Client 进行通信

```shell
min-replicas-max-lag 5
```

## Redis Cluster

Shard Cluster, 多个 Master, 每个 Master 可以挂载多个 Slave, 每个 Master 负责管理部分 Slot 的数据, Master 之间会不断的通过 PING 去检测彼此健康状态, Client 连接任意一个结点, 请求就会被转发到正确的位置

Redis 共有 16384 个 Slot, 通过 Slot 存储数据, 添加结点, 删除结点, 只需要移动 Slot, 而且移动 Slot 是不需要停止服务的. 存储数据时, 会通过 CRC16 Algo 将 Key 转换成一个 Hash, 再对 16384 取模确定具体存储到哪个 Slot 中. 数据跟 Slot 绑定, 而不跟 Node 绑定, 这样即使 Node 宕机了, 也可以转移 Slot 来恢复数据

如果 Key 有 {} 包裹的部分, 就会根据 {} 里的内容计算 Hash. 如果 Key 没有 {}, 就会直接根据 Key 计算 Hash. 所以想要同一批数据存储在同一个 Slot 中, 就可以通过 {} 赋予共同的前缀

Slot 越少, 压缩比率就越高, 请求头就越小, 占用的带宽就越少, 一般不建议 Redis Cluster 超过 1000 个结点, 所以 16384 个 Slot 绝对够用

Redis Cluster 中, 节点之间需要同步心跳包, 这个心跳包的大小就取决于 Slot 的数量, 如果数据包太大, 数据之间的心跳同步就会占用很多带宽

Client 发送写请求后, 如果 Master 停机, Slave 还来不及进行 Replication, 就会造成数据丢失

CRC16 Algo 的 source code 在 cluster.c 的 keyHashSlot()

Simple Hashing: hash 按照结点的数量取余, 根据结果存储到对应的结点中, 如果结点数量发生变化, 影响数据的存储

Consistent Hashing: 通过 hash() 控制 Hash 范围, 头尾相连, 构成 Hash Circle, 通过 hash() 计算结点和数据的 Hash, 分布在 Hash Circle 上, 数据沿着顺时针向前寻找到最近的结点, 存储在该结点上. 结点数量发生变化, 只影响一段数据的存储, 但是如果分布不均匀, 数据倾斜, 部分结点的压力会很大

Weighted Consistent Hashing: 在 Consistent Hashing 的基础上添加 Weight 的作用, 根据权重在哈希环上为每台服务器分配不同数量的虚拟节点, 解决了一致性哈希因服务器性能不同而导致的负载不均问题, 但是实现更为复杂, 维护虚拟节点也更复杂

- A, B 和 C 配置权重为 5, 3 和 2, 那么就会给 A 创建 5 个虚拟节点, 给 B 创建 3 个虚拟节点, 给 C 创建 2 个虚拟节点, 然后分部虚拟节点到 Hash Circle 上

## Request Router

在 Redis Cluster 中，数据分布在多个主节点上，客户端通过计算数据的哈希槽来确定数据的存储位置。Redis Cluster 提供了一种智能的请求路由机制，确保客户端能够快速定位到正确的主节点读取数据。

Redis Cluster 的客户端（如 redis-py-cluster、Jedis Cluster、Lettuce 等）会在初次连接时，从集群中获取每个节点负责的哈希槽范围信息，并在客户端缓存这些信息。

- 集群拓扑信息：客户端连接到集群后，会发送 CLUSTER SLOTS 命令，获取每个节点及其对应的哈希槽范围，构建一个哈希槽到节点的映射表。
- 哈希槽查找表：客户端使用这个映射表来直接查找哈希槽对应的节点，从而将请求路由到正确的主节点。
  - 这张表就是采用 Dict 数据结构实现的。

## Moved Redirect

Redis Cluster 的客户端缓存的哈希槽信息可能会过期或不准确（例如，集群发生主从切换或哈希槽重新分配）。为了解决这种问题，Redis Cluster 使用了 MOVED 重定向机制。

- 当客户端发送请求到错误的节点时，该节点会返回一个 MOVED 错误响应，指示客户端正确的节点地址。
- 客户端收到 MOVED 响应后，会更新本地的哈希槽映射表，将请求重定向到正确的主节点。
- 这样，客户端的哈希槽映射表会逐渐趋于最新，以减少路由错误的发生。

## Ack Redirect

在 Redis Cluster 的哈希槽迁移过程中，可能出现临时的数据不一致状态。在这种情况下，Redis Cluster 使用 ASK 重定向机制：

- 当某个哈希槽正在从一个节点迁移到另一个节点时，目标节点会暂时接管该哈希槽的数据请求。
- 如果客户端访问了尚未完成迁移的数据，源节点会返回 ASK 重定向，指示客户端临时访问目标节点。
  - 源节点还认为自己拥有该哈希槽的数据（但正在逐步迁移到目标节点）。
  - 目标节点开始接收这个哈希槽的数据，但还没有完全完成迁移。
- 客户端接收到 ASK 响应后，会向目标节点发送 ASKING 命令，然后再次请求数据。这个过程只在迁移过程中短暂发生，迁移完成后将恢复正常。
- 目标节点接收到 ASKING 命令后，将其标记为临时的、合法的访问请求，并返回数据。客户端成功地访问到数据，避免了因为哈希槽迁移造成的请求失败。
- 如果目标节点发现请求的数据尚未完全迁移到自己，它会充当“代理”的角色，临时向源节点请求该数据，并将数据返回给客户端。
- 由于 ASK 重定向只是临时处理机制，客户端的哈希槽映射表不会因为 ASK 响应而永久更新。完成迁移后，Redis Cluster 会自动触发 MOVED 重定向，让客户端永久更新哈希槽的映射关系。

## TTL

Redis 通过 redisDb 这个结构体表示 DB, 通过 Dict* dict 存储所有的 key-val, 通过 Dict* expires 存储所有 key-ttl

Redis 只需要查询 expires 就可以得到 key-ttl, 就可以判断该 key 是否过期

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401031140695.png)

如果一个 key 到期后要立即删除, 就得给每一个 key 添加一个监视器, 到期后进行删除, 当 key 的数量特别多时, 非常耗费资源

Redis 采用 Lazy Deletion + Cycle Deletion 的方式删除一个 key, 不会在一个 key 过期后, 就立即进行删除. Lazy Deletion 是下一次访问 key 时, 判断该 key 是否已经过期, 如果过期了就进行删除. 如果一个 key 过期后, 一直没有被访问, 就会导致无法删除该 key, 所以还需要结合 Cycle Deletion 周期性的抽样部分过期的 key 进行删除, 这个抽样会逐步遍历所有过期的 key, 不会存在遗漏的情况. Cycle Deletin 有 Slow 和 Fast 两种模式, Slow Mode 是每 100ms 执行一次, 每次执行不超过 25ms, Fast Mode 是执行频率不固定, 但是两次间隔不低于 2ms, 每次执行不超过 1ms

## Eviction Policy

Redis 在执行 processCommand() 时, 就会跟据 Eviction Policy 去挑选部分 key 进行删除. 如果没有明显的冷热数据区分, 优先使用 allkeys-lru. 如果数据的访问频率差别不大, 优先使用 allkeys-random. 如果有需要置顶的数据, 这些置顶数据不会设置 TTL, 这时就优先使用 volatile-lru. 如果业务中有短时间内高频访问的数据, 再考虑 allkyes-lfu 和 volatile-lfu

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401031140696.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401031140697.png)

配置 Eviction Policy

```shell
maxmemory-policy noeviction
```

## RDB

RDB 可以用于 Full Persistence, 定时存储 Snapshotting 到硬盘, 在 Redis 启动时, 加载 RDB 文件, 恢复数据. 还可以用于 Master-Slave Replication, Master 将 RDB 文件发送给 Slave, 用于初次全量复制和快速同步

RDB 会在 Redis Server 服务结束前自动执行, 会在达到了保存条件时自动执行, 执行 `FLUSHALL`, `FLUSHDB`, `SHUTDOWN` 时也会触发 RDB, 还可以通过 `SAVE` 和 `BGSAVE` 手动触发

- `SAVE` 是由主线程执行, `BGSAVE` 是由子线程进行, `SAVE` 一定会造成线程堵塞, 生产环境中不要用

Redis 进行 RDB Persistence 时, 会调用 fork() 创建一个子进程, 这个子进程不需要执行 exec(), 而是会直接复制一份父进程的 Page Directory 和 Page Table, 主线程执行完 fork() 就可以继续去处理请求了, 两者相不干扰

如果主线程想要修改数据, 就会采用 Copy-On-Write 的方式, 给内存中的原始 Page 数据加上 ReadOnly Lock, 然后复制一份出来进行修改, 修改完再去修改 Page Table 的指向，指向最新的副本，这也保证了后续可以读取到最新的数据。

在写时复制（Copy-On-Write, COW）机制中，每次复制的并不是整个数据或整个内存，而是具体的 “页面”（通常是 4KB 的内存块），即只有在被访问或修改的页面发生变化时，才会触发对这个页面的复制操作。

- Page Table 中记录了虚拟地址和物理地址的映射, 子进程就可以通过这个 Page Table 去读取数据进行持久化操作了
- Page Directory 是顶层，包含多个 Page Table 的指针



![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401021948769.png)

RDB 文件占用小, 加载速度快, 主线程不需要进行 IO, 性能极强

RDB 执行间隔耗时较长, 两次 RDB 直接的数据有风险, 并且复制, 压缩, IO 都是比较耗时的

RDB 适合做备份, 适合做灾难恢复, 适合数据完整性和一致性要求不高的场景

开启 RDB 的 Auto Snapshotting

```
# After 3600 seconds (an hour) if at least 1 change was performed
# save 3600 1

# After 300 seconds (5 minutes) if at least 100 changes were performed
# save 300 100

# After 60 seconds if at least 10000 changes were performed
# save 60 10000

# Snapshotting can be completely disabled with a single empty string argumen
save "" 
```

配置 RDB

```
# filename
dbfilename dump.rdb

# save path
dir /data/redis/

stop-writes-on-bgsave-error yes

# Compress string objects using LZF when dump .rdb databases
# rdbcompression yes

rdbchecksum yes 
```

手动触发 RDB

```
# save with blocking
SAVE

# save without blocking (recommand)
BGSAVE

# get the timestamp of the last snappshotting
LASTSAVE
```

通过 RDB 文件修复数据

```shell
redis-check-rdb /home/harvey/data/redis/dump.rdb
```

建议, 使用 RDB 做数据备份, RDB 占用非常小, 可以定期在一台压力比较小的 Slave 上手动执行 RDB 进行备份

## AOF

AOF (Append Only File) 会去追加写入所有的修改命令到 AOF 文件中, 类似于 MySQL 的 Redo Log, 在 Redis 重启时, 可以使用这些命令来重构数据

AOF 丢失数据的风险会小很多, 并且通过追加的方式写入, 不存在 Path-Seeking 问题

- 寻路问题通常是指数据文件在读取时，需要寻找某个特定数据的位置，从而涉及到复杂的索引结构或多次磁盘跳转。传统数据库可能需要索引树或复杂的数据结构来记录数据的存储位置，以便在查询时快速定位数据。
- AOF 则采用简单的日志记录方式，将每个操作按顺序记录下来，读取时也按顺序回放，完全不需要在文件中跳转到特定位置，消除了磁盘寻道的开销。

AOF 记录的命令多, 占用更大, 恢复也需要一条一条的执行, 恢复很慢, 占用的 CPU 资源也相当多

开启 AOF

```shell
appendonly yes
```

配置 AOF

```shell
appendfilename "appendonly.aof"
appenddirname "appendonlydir"
```

Redis 将写入操作追加到 AOF Buffer 中, 再自动将数据写入到 OS 的 Page Cache 中, 接着执行 fsync() 将 Page Cache 中的数据立刻刷入 (flush) 到 Disk。主线程执行完命令，会去判断上一次 fsync() 的耗时，如果超过 2s, 主线程就会进入堵塞, 等待 fsync 结束, 因为刷盘出了问题, 必须要保证数据的安全

配置 AOF 的写入策略

- `everysec` 的策略, 每隔 1s 将 Page Cache 中的数据刷盘到 Disk 中, 最多丢失 1s 内的数据, 性能也适中, 而且 OS 也不太容易崩溃, 所以一般建议使用这个
- `always` 是每次写入操作都会立即刷盘到 Disk 中, 性能差, 安全性强
- `no` 是每次写入操作, 只会将数据写入到 Page Cache 中, 后续 Redis 就不管了, 由 OS 决定何时进行刷盘, 性能强, 安全性差.

```shell
# appendfsync always
# appendfsync no
appendfsync everysec
```

修复 AOF 文件

```shell
redis-check-aof --fix /home/harvey/data/redis/appendonlydir/appendonly.aof.1.incr.aof
```

建议, 关闭 RDB Persitence, 开启 AOF Persistence, 因为 RDB 的刷盘频率太低, 不适合做 Persitence

## Mixed

如果 AOF 存在, 加载 AOF file, 如果 AOF 不存在, 加载 RDB file

```shell
aof-use-rdb-preamble yes
```

## Log Rewriting

追加写入修改命令, 会有很多无用的操作 (eg: `set k1 v1`, `set k1 v2`, `set k1 v3 ` 这几条命令就等价于 `set k1 v3`), 所以很有必要定期对 AOF 文件进行重写, 这就是 Log Rewriting

开启 Auto Rewriting 后, 子线程会去读取 Old AOF File, 然后分析命令, 压缩命令, 写入到 New AOF File 中. 主线程一直累积命令在 AOF Buffer 中. 当子线程完成 Log Rewriting 后, 会发送一个信号给主线程, 主线程再将缓存中的累积的命令追加写入到 New AOF File 中, 再通过 New AOF File 代替 Old AOF File

- 如果替换过程中如果发生了故障, Redis 依然可以通过 Old AOF File 来恢复数据, 这就是为什么在重写过程中 Old AOF File 一直要保持可用状态

开启 Auto Log Rewriting

```shell
# Redis is able to automatically rewrite the log file implicitly calling
# BGREWRITEAOF when the AOF log size grows by the specified percentage
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
```

手动执行 Log Rewriting

```shell
BGREWRITEAOF
```

在 Log Rewriting 期间, 进行 AOF, 就有可能因为 AOF 导致主线程堵塞, 可以禁止在 Log Rewriting 期间进行 AOF

```shell
no-appendfsync-on-rewrite yes
```

建议, 设置一个合理的 Log Rewriting 阈值, 避免频繁的 Log Rewriting, 太占用资源了

建议, 预留足够的空间处理 Fork 和 Log Rewring

## Redisson

Redisson 底层通过 Redis 的 SETNX 进行加锁的, A 想要获取锁, 就会尝试通过 SETNX 去修改一个 Key, 如果修改成功, 就认为是成功获取了锁. B 这个时候想要获取锁, 也去尝试修改, 修改不成功就认为是没有获取到锁, B 就会进入自旋, 自旋到一定时间, 就会放弃

Redisson 底层为了防止 A 执行的业务耗时太久, 导致锁的 TTL 到期失效的问题, 就让 Watchdog 去监听这个锁, 每隔 releaseTime / 3 的时间就去重置 Lock 的过期时间为 releaseTime

Redisson 底层通过 Redis 的 Hash 实现 Reentrant Lock, 存储 Key 为锁名, Field 为线程名, Value 为重入的次数. 重入获取锁时, 就去判断当前线程和锁的拥有者是否为相同, 如果相同, 就让 Value + 1, 释放锁后, 就让 Value - 1, 当 Value 为 0 时, 就认为该线程释放了锁

Redisson 底层所有的操作中, 需要保证原子性的地方, 就会采用 Lua 脚本 (eg: 判断当前线程是否为锁的持有者和释放锁, 这两个操作需要保证原子性, 就会采用 Lua 脚本)

Redisson 底层通过 RedLock 解决 Master-Slave 和 Cluster 环境下, Lock 的一致性问题, 创建分布式锁时, 直接在 n / 2 + 1 个 Redis 实例上创建锁, 即使当前 Redis 实例挂掉了, 也能保证数量的领先, 只会认定数量多的那把锁. 一般不建议采用这种方案, 性能太差, 而且 Redis 遵循的是 AP, 更注重性能, 后续可以通过 MQ 来保证最终一致性, 不在乎这点一致性. 如果非要保证 High Consistency, 就需要结合 Zookeeper 实现 Distributed Lock

## Redisson Watchdog

Redisson 中的 Watchdog（看门狗） 是分布式锁的重要组件，负责监控分布式锁的生命周期，并在锁持有者仍然活跃的情况下自动续期，确保锁不会意外释放。

Watchdog（看门狗） 负责判断是否需要续期锁，并执行续期操作。Watchdog 判断是否续期锁的核心逻辑在于监控持有锁的线程的状态，如果线程仍在正常工作，则认为锁需要续期；如果线程失效，则停止续期，让锁自然过期。

当 Redisson 客户端获取锁时，会通过 tryLock() 方法尝试加锁。如果成功获取到锁，Redisson 会启动一个 Watchdog 定时任务 来监控和续期锁。

```java
public void tryLock(long leaseTime, TimeUnit unit) {
    long threadId = Thread.currentThread().getId();
    // 尝试获取锁
    Boolean acquired = tryAcquireLock(leaseTime, threadId);
    if (acquired) {
        // 如果成功获取到锁，启动 Watchdog 定时任务
        scheduleExpirationRenewal(threadId);
    }
}
```

- tryAcquireLock() 方法通过 Redis 的 SET 命令和过期时间来尝试加锁。
- scheduleExpirationRenewal() 方法用于启动 Watchdog 任务，定期续期锁的过期时间。

scheduleExpirationRenewal 方法在成功获取锁后被调用，启动一个定时任务用于锁的续期。定时任务每隔 10 秒执行一次，将锁的过期时间续期为 30 秒。

```java
private void scheduleExpirationRenewal(final long threadId) {
    ExpirationEntry entry = new ExpirationEntry();
    expirationRenewalMap.putIfAbsent(getEntryName(), entry);
    
    // 创建定时任务，用于续期锁的过期时间
    Timeout task = commandExecutor.getConnectionManager().newTimeout(timeout -> {
        // 检查锁持有者是否仍然活跃
        if (expirationRenewalMap.containsKey(getEntryName())) {
            // 使用 Lua 脚本续期锁
            renewExpiration(threadId);
            scheduleExpirationRenewal(threadId);  // 继续下一次续期
        }
    }, 10, TimeUnit.SECONDS);
    
    entry.setTimeout(task);
}
```

renewExpiration 方法通过 Redis 的 Lua 脚本续期锁的过期时间，确保续期操作的原子性。Lua 脚本的核心逻辑是：判断当前线程是否持有锁，如果是，则更新锁的过期时间。

```java
private void renewExpiration(long threadId) {
    String script = "if redis.call('GET', KEYS[1]) == ARGV[1] then " +
                    "return redis.call('PEXPIRE', KEYS[1], ARGV[2]) " +
                    "else return 0 end";
                    
    commandExecutor.evalWriteAsync(getName(), RedisCommands.EVAL_LONG,
                                   script,
                                   Collections.singletonList(getEntryName()),
                                   getLockName(threadId),
                                   internalLockLeaseTime);
}
```

## DataStructure

- String 的 INCR 实现分布式环境下的自增 ID
- Hash 实现购物车 `hset cart:<user_id> <goods_id> <goods_number>`
- List 的 LPUSH, LRANGE 获取最新的微博消息
- Set 实现抽奖功能 
  - SADD 参加抽奖活动
  - SMEMBERS 查看抽奖人员信息
  - SRANDMEMBER 随机抽奖
  - SPOP 抽一二三等奖, 将抽到奖的用户移除 SET, 防止重复抽奖
- Set 实现朋友圈功能
  - `SADD like:<msg_id> <user_id>` 实现点赞
  - `SREM like:<msg_id> <user_id>` 实现取消点赞
  - `SMEMBERS like<msg_id>` 查看点赞列表
  - `SCARD like<msg_id>` 获取点赞用户数量
- Set 实现微博关系功能
  - `SINTER following:harvey following:bruce` 实现共同关注
  - `SDIFF following:harvey following:brude` 实现可能认识的人
- ZSet 实现微信点赞功能, 以时间戳作为 Priority, 实现热搜排行, 实现新闻排行- 

## Multi Thread

Redis 3.0 不支持多线程, Redis 4.0 仅仅支持多线程删除, Redis 5.0 对代码进行了大量重构, Redis 6.0 全面拥抱多线程 IO.

Redis 当年使用单线程, 开发简单, 维护简单, 通过并发处理 Multiplexing IO + Non Blocking IO, 已经非常快速了, 而且当年性能的主要瓶颈不在于 CPU 是否采用多线程, 而在于 Memory 和 Network Bandwidth.

Redis 的单线程, 想要删除一个 Big Key 非常头疼, 因为单线程是 Atomicity 的, 这边在删除, 另一边就需要进入等待, 所以后来引入了 unlink 和 flushdb async 让 BIO 的 Sub Thread 去进行异步删除.

Redis 的单线程, 是需要 Main Thread 进行 IO, 非常耗时.

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241812949.png)

Redis 的多线程, 将耗时的 IO 交给 Sub Thread 去处理, 同时只通过 Main Thread 进行 Calculate, 执行操作命令, 既使用上了多线程, 也保证了 Atomicity.

Client 发送请求给 Server 后, 会在 Server 的 Socket File 中的写入当前 Client 对应的 File Descriptor, 即注册到 epoll 中. epoll 会去监听多个 Client 是否有 Request 发送过来, 即一个 Sub Thread 可以同时处理多个 Request, 这就保证了 Redis 即使在单线程环境下, 依旧有着相当高的吞吐量.

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241812950.png)

Enable multi-thraed of write. (file: redis.conf)

```
# If you have a 8 cores, try to use 6 threads
io-threads 4
```

Enable multi-thread of read. (file: redis.conf)

```
io-threads-do-reads yes
```

## Dual Write Consistency

先更新 DB, 再更新 Cache, 在多线程场景下容易造成数据覆盖的问题. 如果在停机的情况下, 通过单线程来更新, 完全可以这么玩, 但是多线程环境下就是不行.

先更新 Cache, 再更新 DB, 在多线程场景下也会造成数据覆盖的问题, 而且一般是以 DB 作为底单数据, 所以也不推荐这种设计方式.

先删除 Cache, 再更新 DB, 在多线程场景下也会造成脏读的问题. 这里 A 先删除 Cache, 再去更新 DB, 此时 B 来读取 Cache 时, 发现没有 Cache 了, 就会去 DB 读取数据, 但是此时 A 还没更新完, B 就读取了脏数据, 还把脏数据写回了 Cache, 更是八达鸟啊.

Delayed Dual Deletion 就是用来解决 B 的脏写问题的. A 更新完 DB 后, 会再去删除 B 回写的脏数据, 后续线程来读取数据时, 就会再去 DB 中读取, 然后回写正确的数据到 Cache 中. 这就需要 A 等待 B 回写完脏数据后删除, 需要估算两者的执行效率, 让 A 在 B 的基础上等待一个 100ms 即可, 还可以借助 Watch Dog 监控程序中的脏写, 新起一个异步的线程来执行这个删除脏数据的操作, 至于 B 那的脏读, 就不管他啦.

先更新 DB, 再删除 Cache, 也会造成 B 的脏读, 但是这种破坏性是最小的, 也不需要通过 Delayed Dual Deletion 来防止脏写, 这是我们能容忍的.

为了保证 High Availiability, 可以先更新 DB, 再删除 Cache. 可以更新完 DB 后, 直接通过 MQ 异步的修改 Cache. 可以更新完 DB 后直接不管了, 通过 Canal 监听 MySQL 的 BinLog 的变化, 再去更新 Cache, 这种解决方案没有任何侵入.

为了保证 High Consistency, 可以通过 Lock 解决, 读数据时添加 S Lock, 写数据时添加时 X Lock.

一般业务中是允许出现脏读的, 后续通过 MQ 进行兜底, 保证数据的最终一致性.

## Cache Penetration

Cache Penetration 是指请求的数据, 即不存在 Cache, 也不存在 DB, 请求会重复打到 DB, DB 小身板, 遭不住. 一般可以缓存一个空对象或者采用 Bloom Filter 来处理. 最好在设计数据库时, 就将查询字段的取值格式设计的复杂一点, 在业务过滤时, 就将这些非法的取值过滤处理.

可以缓存一个空对象来解决 Cache Penetration, 这个实现起来非常简单, 但是会造成额外的内存消耗, 也会造成短期的数据不一致 (eg: 请求一个不存在的数据后, 缓存一个空对象, 但是此时又插入了该数据, 如果不更新缓存的话, 就会一直造成脏读), 一般都是结合过期时间, 来降低破坏性.

```java
public Result queryById(Long id) {
    String key = CACHE_SHOP_KEY + id;
    
    // Query data from cache
    String shopJson = stringRedisTemplate.opsForValue().get(key);
    if (StrUtil.isNotBlank(shopJson)) {
        return Result.ok(JSONUtil.toBean(shopJson, Shop.class));
    }
    
    // Handle blank string, block requests to DB
    if (StrUtil.isBlank(shopJson)) {
        return Result.fail("Shop does not exists");
    }
    
    // Query data from DB
    Shop shop = getById(id);
    if (shop == null) {
        // Save a blank string to Redis to avoid cache penetration
        stringRedisTemplate.opsForValue().set(key, "", CACHE_NULL_TTL, TimeUnit.MINUTES);
        return Result.fail("Shop does not exists");
    }
    
    // Save data to cache, set expiration time to avoid dirty writing
    stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(shop), CACHE_SHOP_TTL, TimeUnit.MINUTES);
    
    return Result.ok(shop);
}
```

可以通过 Bloom Filter 来解决 Cache Penetration, Bloom Filter 不真实存储数据, 而是存储 0 和 1 来表示该数据是否存在. 请求打过来时, 就先查询 Bloom Filter, 判断该数据是否存在, 如果不存在就让他滚蛋, 如果存在就放行. Redis 的 Bitmap 实现了 Bloom Filter, 爽死了 !!!

Bloom Filter 会使用多个 Hash Algo 对 key 进行运算, 分别取模得到多个 Index, 设置这些 Index 为 1. 后续查询时, 就判断这几个 Index 是否都为 1, 只要有一个 0, 就说明这个 key 肯定不存在.

想要修改某个 key 的状态, 可以重新分配一套 Hash, 而不是去修改之前 Hash 对应的 Index. 因为多个 Key 可能分配到相同的 Hash, 会导致其他 Key 受影响.

在缓存预热阶段, 预热 Bloom Filter, 准备白名单, 一般采用 Guava 或 Redission 实现 Bloom Filter, 控制误判率在 5% 以内即可

```java
@Component
public class BloomFilterUtils {
    @Autowired
    RedisTemplate redisTemplate;

    // Init whitelist
    @PostConstruct
    public void initUserWhiteList() {
        String key1 = "1";
        String key2 = "2";
        String key3 = "3";
        
        int hash1 = Math.abs(key1.hashCode());
        int hash2 = Math.abs(key2.hashCode());
        int hash3 = Math.abs(key3.hashCode());
        
        long index1 = (long) (hash1 % Math.pow(2, 32));
        long index2 = (long) (hash2 % Math.pow(2, 32));
        long index3 = (long) (hash3 % Math.pow(2, 32));
        
        redisTemplate.opsForValue().setBit("whitelist:user", index1, true);
        redisTemplate.opsForValue().setBit("whitelist:user", index2, true);
        redisTemplate.opsForValue().setBit("whitelist:user", index3, true);
    }
    
    // Check if the key is on the whitelist
    public boolean check(String checkItem, String key) {
        int hash = Math.abs(key.hashCode());
        long index = (long) (hash % Math.pow(2, 32));
        return Boolean.TRUE.equals(redisTemplate.opsForValue().getBit(checkItem, index));
    }
}
```

在查询数据前, 通过 Bloom Filter 校验 User Id 是否存在白名单中

```java
@Autowired
private BloomFilterUtils bloomFilterUtils;

public User queryById(Integer id) {
    // Check with bloom filter before query
    if (!bloomFilterUtils.check("whitelist:user", id)) {
        return null;
    }
    
    User User = (User) redisTemplate.opsForValue().get(CACHE_USER_KEY + id);
    if (User == null) {
        user = getById(id);
        if (user != null) {
            redisTemplate.opsForValue().set(CACHE_USER_KEY + id, user);
        }
    }
    return user;
}
```

通过 Interceptor 拦截请求, 检查 User Id 是否存在白名单中

```java
@Component
public class UserInterceptor implements HandlerInterceptor {
    @Autowired
    private BloomFilterUtils bloomFilterUtils;
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (!bloomFilterUtils.check("whitelist:user", UserHolder.getUser().getId())) {
            response.setStatus(401);
            return false;
        }
        return true;
    }
}
```

```java
@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    @Autowired
    private UserInterceptor userInterceptor
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(userInterceptor)
                .excludePathPatterns(
                    "/user/login",
                    "/user/register"
                )
                .order(1);
    }
}
```

## Cache Invalidation

Cache Invalidation 是指一些热点数据的突然失效, 缓存重建速度又太慢, 导致大量的请求又打到 DB, 啊啊啊受不了啦 !!! 一般都会采用 Mutex 和 Logical Expiration 解决.

在多线程的环境下, 重建热点数据非常容易造成问题, 必须使用 Mutex 串行处理. A 获取到 Mutex 后去查询数据库, 重建缓存. B 查询缓存未命中, 就去尝试获取 Mutex, 获取失败, 就会进入等待, 直到 A 重建缓存完成, 通过 DCL 的方式, 让 B 直接查询到缓存数据.

使用 Mutex 可以保证 High Consistency, 无法保证 High Availability, 还存在 Dead Lock 的风险.

```java
private Shop queryWithMutex(Long id) {
    String key = CACHE_SHOP_KEY + id;
    
    // Query data from cache
    String shopJson = stringRedisTemplate.opsForValue().get(key);
    if (StrUtil.isNotBlank(shopJson)) {
        return JSONUtil.toBean(shopJson, Shop.class);
    }
    
    // Handle blank string
    if (shopJson != null) {
        return null;
    }
    
    Shop shop;
    String lockKey = LOCK_SHOP_KEY + id;
    try {
        // If obtaining the lock is unsuccessful, then retrieve it again
        if (!tryLock(lockKey)) {
            Thread.sleep(50);
            return queryWithMutex(id);
        }
        
        // DCL
        shopJson = stringRedisTemplate.opsForValue().get(key);
        if (StrUtil.isNotBlank(shopJson)) {
            return JSONUtil.toBean(shopJson, Shop.class);
        }
        
        // Query data from DB
        shop = getById(id);
        if (shop == null) {
            stringRedisTemplate.opsForValue().set(key, "", CACHE_NULL_TTL, TimeUnit.MINUTES);
            return null;
        }
        
        // Save data to cache
        stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(shop), CACHE_SHOP_TTL, TimeUnit.MINUTES);
    } catch (InterruptedException e) {
        throw new RuntimeException(e);
    } finally {
        unLock(lockKey);
    }
    
    return shop;
}

private boolean tryLock(String key) {
    Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(key, "1", 10, TimeUnit.SECONDS);
    return BooleanUtil.isTrue(flag);
}

private void unLock(String key) {
    stringRedisTemplate.delete(key);
}
```

Logical Expiration 非常佛系, 在项目预热阶段, 就将这些热点数据永久存储在 Cache 中, 只设置一个逻辑上的过期时间. 当 A 发现 Cache 过期后, 就会去开启一个异步线程去重建 New Cache, 自己先用 Old Cache. B 来访问时, 发现还没有重建完, 就会直接使用 Old Cache, 直到重建成功后, 才能用上 New Cache.

使用 Logical Expiration 可以保证 High Availability, 无法保证 Consistency, 还会造成一定额外内存的开销, 但是性能的显著提升, 让我们已经不在乎这些了 :)

```java
private static final ExecutorService CACHE_REBUILD_EXECUTOR = Executors.newFixedThreadPool(10);

private Shop queryWithLogicalExpiration(Long id) {
    String key = CACHE_SHOP_KEY + id;
    
    // Query data from cache
    String shopJson = stringRedisTemplate.opsForValue().get(key);
    
    // The hot data here must be stored in Redis in advance to avoid cache invalidation
    // If the shopJson does not exist, return null
    if (StrUtil.isBlank(shopJson)) {
        return null;
    }
    
    RedisData redisData = JSONUtil.toBean(shopJson, RedisData.class);
    Shop shop = JSONUtil.toBean((JSONObject) redisData.getData(), Shop.class);
    LocalDateTime expireTime = redisData.getExpireTime();
    
    // If it is not expired, return the result
    if (expireTime.isAfter(LocalDateTime.now())) {
        return shop;
    }
    
    // If it is expired, rebuild cache
    String lockKey = LOCK_SHOP_KEY + id;
    if (tryLock(lockKey)) {
        // DCL
        shopJson = stringRedisTemplate.opsForValue().get(key);
        if (expireTime.isAfter(LocalDateTime.now())) {
            return JSONUtil.toBean(shopJson, Shop.class);
        }
        
        // Open a separate thread to rebuild the cache
        CACHE_REBUILD_EXECUTOR.submit(() -> {
            try {
                saveShopToRedis(id, 10L);
            } catch (Exception e) {
                throw new RuntimeException(e);
            } finally {
                unLock(lockKey);
            }
        });
    }
    
    return shop;
}

private void saveShopToRedis(Long id, Long expireTime) {
    Shop shop = getById(id);
    
    // Set data and logical expiration time
    RedisData redisData = new RedisData();
    redisData.setData(shop);
    redisData.setExpireTime(LocalDateTime.now().plusSeconds(expireTime));
    
    stringRedisTemplate.opsForValue().set(CACHE_SHOP_KEY + id, JSONUtil.toJsonStr(redisData));
}
```

## Cache Avalanche

Cache Avalanche 是指在一段时间内, 大量的 Cache 过期, 或者 Redis 直接挂掉了, 请求又直接打到了 DB, 遭老罪咯 !!!

处理大量 Cache 同时过期的问题, 可以在分配 TTL 时, 尽量随机一些, 让他们的过期时间分散开, 减少同一时段的压力.

处理 Redis 宕机的问题, 可以搭建 Master-Slave 或 Cluster 来解决, 还可以通过 Sentinel 给业务添加限流, 熔断, 降级策略, 还可以通过 Nginx 或 Gateway 进行分流, 通过 Nginx 设置多级缓存, 来保证 High Availability.

# MyBatis

## 懒加载机制

MyBatis 的懒加载机制主要用于优化性能，特别是在处理 一对多 和 多对一 的复杂关联关系时，避免不必要的 SQL 查询。为了更好地理解它的作用，下面通过一个具体的例子来说明。

假设有一个电商系统，其中包括 User 和 Order 两个实体，分别表示用户和订单，关系是一对多，即一个用户可以拥有多个订单。在数据库中，这种关系可能会设计为如下结构：

- User 表：存储用户基本信息，如 id、name。
- Order 表：存储订单信息，如 id、user_id、order_date，其中 user_id 是 User 表的外键。

假设我们有一个业务场景，只需要展示用户的基本信息，而不关心用户的订单信息。此时，如果没有懒加载机制，每次查询 User 时，MyBatis 可能会立即加载与之相关联的 Order 信息，也就是进行一次 额外的 SQL 查询 来获取订单数据。这种加载方式叫做 立即加载（Eager Loading）。

在懒加载开启时，只有在明确需要订单信息的时候，MyBatis 才会查询 Order 表，获取订单数据。这种按需加载的方式可以显著提升性能，因为减少了不必要的数据库查询。

这里定义了 User 对象的查询 SQL，并通过 `<collection>` 标签设置与 Order 的关联

```xml
<mapper namespace="UserMapper">
    <select id="getUserById" resultMap="UserOrderMap">
        SELECT * FROM User WHERE id = #{id}
    </select>

    <resultMap id="UserOrderMap" type="User">
        <id property="id" column="id" />
        <result property="name" column="name" />
        <collection property="orders" ofType="Order" select="getOrdersByUserId" lazy="true" />
    </resultMap>

    <select id="getOrdersByUserId" resultType="Order">
        SELECT * FROM Order WHERE user_id = #{userId}
    </select>
</mapper>
```

我们这里调用 getUserById 获取到 user 对象后，只使用了 name 属性，并未访问 orders 列表。由于懒加载的存在，getOrdersByUserId 方法不会被调用，Order 表的数据不会查询，节省了数据库资源。

```java
User user = mapper.getUserById(1);
System.out.println("User Name: " + user.getName());
```

只有在访问 orders 时，MyBatis 才会调用 getOrdersByUserId 查询 Order 表的数据，将结果填充到 orders 列表中。

```java
List<Order> orders = user.getOrders();
for (Order order : orders) {
    System.out.println("Order Date: " + order.getOrderDate());
}
```

## 懒加载机制的实现原理

MyBatis 的懒加载底层是通过 动态代理模式 和 懒加载触发器 实现的。其核心是在访问关联属性时，通过代理对象延迟查询数据。

MyBatis 懒加载的主要实现组件包括：

- 代理对象：用于延迟加载的属性并不是直接加载，而是通过一个代理对象来控制何时加载。
- LazyLoader：懒加载触发器，负责在访问代理对象属性时触发实际的 SQL 查询。
- ResultLoader：在真正执行 SQL 查询时使用，负责将查询结果映射到目标属性中。

当查询 User 对象时，MyBatis 并不会直接查询并填充 orders 集合，而是创建一个代理对象，通过动态代理的方式来延迟加载 orders 集合。在 MyBatis 中，懒加载的代理对象创建主要通过 CglibProxyFactory 或 JavassistProxyFactory 实现：

```java
public Object createProxy(Target target) {
    // 判断是否启用 CGLIB 或 Javassist
    if (proxyFactory instanceof CglibProxyFactory) {
        return ((CglibProxyFactory) proxyFactory).createProxy(target);
    } else {
        return ((JavassistProxyFactory) proxyFactory).createProxy(target);
    }
}
```

在代理对象被创建的同时，MyBatis 会创建一个 LazyLoader，LazyLoader 中包含了目标对象和需要懒加载的 SQL 语句。当用户访问 orders 属性时，代理对象会检测到这一访问，并调用 LazyLoader 触发懒加载。

```java
public class LazyLoader {
    private final MetaObject metaObject;
    private final ResultLoader resultLoader;
    private boolean loaded;

    public LazyLoader(MetaObject metaObject, ResultLoader resultLoader) {
        this.metaObject = metaObject;
        this.resultLoader = resultLoader;
        this.loaded = false;
    }

    public boolean load() throws SQLException {
        if (!loaded) {
            resultLoader.loadResult();
            loaded = true;
            return true;
        }
        return false;
    }
}
```

LazyLoader 调用 ResultLoader 来执行 SQL 查询并填充目标属性。ResultLoader 的核心逻辑如下：

```java
public Object loadResult() throws SQLException {
    final Statement stmt = configuration.newStatementHandler(...).prepareStatement();
    ResultSet rs = stmt.executeQuery();
    Object result = resultHandler.handleResultSets(rs);
    metaObject.setValue(property, result);
    return result;
}
```

当调用 User 的目标方法（如 getOrders()）之前，代理会首先判断该方法是否是懒加载属性的方法（如 orders 属性的 getOrders()），如果是，则会触发数据库查询操作，将数据加载到该属性中。

```java
public class CglibLazyLoader implements MethodInterceptor {
    private final ResultLoaderMap lazyLoader;
    private final MetaObject metaObject;
    private final String objectFactory;

    @Override
    public Object intercept(Object object, Method method, Object[] args, MethodProxy methodProxy) throws Throwable {
        // 检查当前方法是否为懒加载属性的方法
        if (lazyLoader.size() > 0 && lazyLoader.hasLoader(method.getName())) {
            lazyLoader.load(method.getName());
        }
        return methodProxy.invokeSuper(object, args); // 调用真实的方法
    }
}
```

hasLoader() 是 MyBatis 懒加载机制中用于检查某个属性是否需要加载的一个方法。它在 ResultLoaderMap 类中实现，用于判断懒加载属性是否已经存在相应的 ResultLoader，从而确定是否需要触发 SQL 查询。下面将详细解析 hasLoader() 方法的源码及其作用。

ResultLoaderMap 是 MyBatis 中的一个重要组件，用于管理懒加载的属性。它维护了一个 loaderMap，其中存储了需要懒加载的属性与其对应的 ResultLoader。ResultLoader 包含执行 SQL 查询的全部信息，包括查询语句、参数以及映射规则。

```java
public final class ResultLoaderMap {
    private final Map<String, ResultLoader> loaderMap = new HashMap<>();

    public boolean hasLoader(String property) {
        return loaderMap.containsKey(property);
    }

    public void addLoader(String property, MetaObject metaResultObject, ResultLoader resultLoader) {
        loaderMap.put(property, resultLoader);
    }

    public void load(String property) throws SQLException {
        ResultLoader loader = loaderMap.remove(property);
        if (loader != null) {
            loader.loadResult();
        }
    }
}
```

## 一级缓存

一级缓存是 MyBatis 的本地缓存，作用范围是单个 SqlSession，默认开启。一级缓存的特点是，同一个 SqlSession 对象中执行相同查询时会直接从缓存中获取结果，避免重复查询数据库。

```java
// 开启一个 SqlSession
SqlSession session = sqlSessionFactory.openSession();
UserMapper mapper = session.getMapper(UserMapper.class);

// 第一次查询，发送 SQL 查询数据库
User user1 = mapper.getUserById(1);
System.out.println("第一次查询用户：" + user1);

// 第二次查询相同的 ID，命中一级缓存，不会发送 SQL
User user2 = mapper.getUserById(1);
System.out.println("第二次查询用户：" + user2);

session.close();  // 关闭 SqlSession
```

- 第一次查询 getUserById(1) 时，MyBatis 会执行 SQL 查询数据库并将结果放入一级缓存。
- 第二次查询 getUserById(1) 时，由于 SqlSession 没有关闭，一级缓存生效，所以 MyBatis 不会发送 SQL，而是直接从缓存中读取结果。

在以下情况下，一级缓存会失效，从而再次查询数据库：

- 不同的 SqlSession：一级缓存只在当前 SqlSession 中有效，不同的 SqlSession 无法共享缓存。
- 执行了更新操作：在执行 INSERT、UPDATE 或 DELETE 后，一级缓存会被清空。
- 手动清空缓存：调用 session.clearCache() 可以手动清空一级缓存。

## 二级缓存

二级缓存是 MyBatis 的全局缓存，作用范围是 Mapper 映射文件范围。二级缓存可以在不同的 SqlSession 间共享，但默认是关闭的，需要手动配置开启。

```xml
<configuration>
    <settings>
        <!-- 启用二级缓存 -->
        <setting name="cacheEnabled" value="true"/>
    </settings>
</configuration>
```

```java
// 第一次查询，使用第一个 SqlSession
SqlSession session1 = sqlSessionFactory.openSession();
UserMapper mapper1 = session1.getMapper(UserMapper.class);

// 第一次查询，发送 SQL 查询数据库，并将结果存入二级缓存
User user1 = mapper1.getUserById(1);
System.out.println("第一次查询用户：" + user1);
session1.close();  // 关闭 SqlSession，数据会存入二级缓存

// 第二次查询，使用另一个 SqlSession
SqlSession session2 = sqlSessionFactory.openSession();
UserMapper mapper2 = session2.getMapper(UserMapper.class);

// 第二次查询相同的 ID，此时从二级缓存中读取，不会发送 SQL
User user2 = mapper2.getUserById(1);
System.out.println("第二次查询用户：" + user2);

session2.close();
```

- 第一次查询 getUserById(1) 会发送 SQL 查询数据库，并将结果存入二级缓存。
- session1.close() 关闭时，MyBatis 会将一级缓存的数据提交到二级缓存。
- 第二次查询使用不同的 SqlSession，但是由于二级缓存已启用且有数据，因此 MyBatis 会直接从二级缓存中获取结果，避免了数据库查询。

二级缓存会在以下情况下失效：

- 执行增、删、改操作：当执行 INSERT、UPDATE 或 DELETE 操作时，二级缓存会清空，保证数据一致性。
- 不同 Mapper 之间无法共享缓存：二级缓存的作用范围是 Mapper 文件，每个 Mapper 有独立的二级缓存。
- 手动清空缓存：可以通过 sqlSessionFactory.getConfiguration().getCache("namespace").clear() 手动清空某个 Mapper 的二级缓存。

# Spring

## SpringMVC Process

SpringMVC 处理 JSP 的流程

- Client 请求 Servlet, Servlet 转发请求给 SpringMVC 的 DispatcherServlet
- DispatcherServlet 请求 HandlerMapping 解析请求, 查询 Handler, HandlerMapping 返回 HandlerExecutionChain
    - HandlerMapping 就是一个 Map, Key 为 uri (eg: /user/1), Val 为 Class#Method (eg: com.harvey.controller.UserController#getById())
    - HandlerExecutionChain 包含了 Controller Method 和 Controller 的 Filter
- DispatcherServlet 携带 HandlerExecutionChain 请求 HandlerAdapter
- HandlerAdapter 根据 HandlerExecutionChain 找到对应的 Handler
    - HandlerAdapter 会处理请求参数 (eg: Query Param, Body Param, Path Param), 将处理好的参数交给 Handler
- Handler 执行 Method 后, 返回结果给 HandlerAdapter
    - HandlerAdapter 接受到响应结果后, 封装成 ModelAndView
- HandlerAdapter 返回 ModelAndView 给 DispatcherServlet
- DispatcherServlet 携带 ModelAndView 请求 ViewResolver
- ViewResolver 处理 ModelAndView, 返回 View Obj 给 DispatcherServlet
    - ViewResolver 会将 ModelAndVie 这个逻辑视图转成 JSP 视图或者 Thymeleaf视图
- DispatcherServlet 响应 View 给 Client

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401181550236.png)

SpringMVC 处理 JSON 的流程

- Client 请求 DispatcherServlet
- DispatcherServlet 请求 HandlerMapping 查询 Handler
- HandlerMapping 返回 HandlerExecutionChain
- DispatcherServlet 请求 HandlerAdapter
- HandlerAdapter 请求 Handler
- Handler 执行 Method, 通过 HttpMessageConverter 转换响应数据为 JSON 格式, 返回结果给 HandlerAdapter
- HandlerAdpater 返回结果给 DispatcherServlet
- DispatcherServlet 再返回给 Client

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221740209.png)

当应用启动时，Spring 会加载 DispatcherServlet，并初始化 HandlerMapping、HandlerAdapter、ViewResolver 等必要的组件。

```java
protected void initStrategies(ApplicationContext context) {
    this.initHandlerMappings(context);
    this.initHandlerAdapters(context);
    this.initViewResolvers(context);
    // 初始化其他策略...
}
```

当用户发送请求时，DispatcherServlet 的 doDispatch() 方法被调用。

```java
protected void doDispatch(HttpServletRequest request, HttpServletResponse response) throws Exception {
    // 1. 获取处理器 (Handler)
    HandlerExecutionChain mappedHandler = getHandler(request);
    
    // 2. 获取处理器适配器 (HandlerAdapter)
    HandlerAdapter ha = getHandlerAdapter(mappedHandler.getHandler());

    // 3. 调用处理器 (执行 Controller 方法)
    ModelAndView mv = ha.handle(request, response, mappedHandler.getHandler());

    // 4. 解析视图
    processDispatchResult(request, response, mappedHandler, mv);
}
```

DispatcherServlet 调用 getHandler() 方法，通过 HandlerMapping 匹配请求 URL 和处理器。

```java
protected HandlerExecutionChain getHandler(HttpServletRequest request) throws Exception {
    for (HandlerMapping hm : this.handlerMappings) {
        HandlerExecutionChain handler = hm.getHandler(request);
        if (handler != null) {
            return handler;
        }
    }
    return null;
}
```

DispatcherServlet 根据 HandlerAdapter 调用具体的处理器方法。

```java
ModelAndView mv = ha.handle(request, response, mappedHandler.getHandler());
```

```java
public ModelAndView handle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    HandlerMethod handlerMethod = (HandlerMethod) handler;
    ModelAndView mav = invokeHandlerMethod(request, response, handlerMethod);
    return mav;
}
```

控制器返回 ModelAndView 对象后，DispatcherServlet 调用 ViewResolver 将逻辑视图名转换为具体视图。

```java
protected void render(ModelAndView mv, HttpServletRequest request, HttpServletResponse response) throws Exception {
    View view = resolveViewName(mv.getViewName(), mv.getModel(), locale, request);
    view.render(mv.getModel(), request, response);
}
```

## Auto Configuration

导入 Dependency 的 starter pkg 后, 会自动导入该 Dependency 的 autoconfigure pkg (eg. 导入 spring-boot-stater 后, 会自动导入 spring-boot-autoconfigure)

App.java 的 @EnableAutoConfiguration 底层包含 @Import({AutoConfigurationImportSelector.class}), 根据 SPI 访问 META-INF/spring/%s.imports (eg. META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports), 动态加载 Component

%s.imports 包含该 Dependency 提供的所有 Configuration (eg. xxx.AutoConfiguration.imports 包含 xxx.aop.AopAutoConfiguration, xxx.amqp.RabbitAutoConfiguration), Configuration 包含 @Import({xxxSelector.class}) 通过 @Condition 按条件导入 Bean, 实现 Auto Configuration

通过 Auto Configuration 导入的 Configuration 用到的 Properties Obj 可以在 application.properties 中配置

## Design Pattern

Singleton Pattern: Bean 默认采用 Singleton Pattern, 通过 Container 管理 Bean Lifecycle, 保证每个 Bean 只被创建一次.

Factory Pattern: BeanFactory 和 ApplicationContext 采用 Factory Pattern 创建并管理 Bean.

Proxy Pattern: AOP 采用 Dynamic Proxy Pattern 创建 Aspect, 这里的 Aspect 就是 Proxy Obj.

Observer Pattern: ApplicationEventPublisher 采用 Observer Pattern, 异步处理 Event, 实现 Decoupling.

Template Pattern: JdbcTemplate, RedisTemplate 和 RestTemplate 都是采用的 Template Pattern. 抽象出了公共的操作流程, 将差异化的部分交给子类或者回调函数实现, 极大地提高了代码的复用性并且降低了出错可能性.

Strategy Pattern: MultipartResolver 采用了 Strategy Pattern, 可以选择 StandardServletMultipartResolver 或 CommonsMultipartResolver 对其进行实现, 在不同的环境或配置中选择不同的策略, 可以使得代码更灵活, 扩展性更好.

Chain of Responsibility Pattern: Filter 和 Interceptor 采用了 Chain of Responsibility Pattern, 多个 Filter 和 Interceptor 按照一定顺序执行, 每个 Filter 和 Interceptor 可以拦截请求或者响应并做出相应的处理

# Distributed

## CAP

CAP: Consistency, Availability, Partition 同时只能满足两个, 结点之间形成分区后, 要么拒绝请求, 保证 Consistency, 放弃 Availability, 要么依旧提供服务, 保证 Availability, 放弃 Consistency

BASE: 对 CAP 的一种解决方案, 结点之间形成分区后, 允许 Partial Unavailability, 要求 Core Availability, 允许 Temporary Incosistency, 要求 Eventual Consistency

- AP Mode: Sub Transaction 分别执行 Operation 和 Commit, 允许 Temporary Incosistency, 后续采用 Remedy, 保证 Eventual Consistency (eg: Redis)
- CP mode: Sub Transaction 分别执行 Operation, 相互等待, 放弃 Partial Availability, 保证 Core Availability, 共同执行 Commit (eg: ElasticSearch)

## Two Phase Commit

Two Phase Commit (2PC) 是一种原子提交协议, 是 MySQL 对分布式事务的 XA Mode 的实现, 用于协调参与分布式原子事务的所有进程, 决定提交或回滚, 该协议在许多临时系统失败的情况下依然能实现其目标, 因此得到了广泛的使用. 然而, 两阶段提交协议并不能抵御所有可能的失败配置, 在极少数情况下, 需要人工干预来纠正结果, 为了从失败中恢复 (大部分情况下是自动的), 协议的参与者使用日志记录协议的状态

Two Phase Commit 由两个阶段组成, 如果这两个阶段的数据不一致, 则会进行回滚, 保证数据一致性

- Prepare Phase: TC 通知 RM 去执行修改操作, RM 先记录 Undo Log, 接着执行修改操作, 再记录 Redo Log, RM 通知 TC 是否执行完毕
- Commit Phase: TC 根据 RM 的响应结果进行处理, 如果都是 Ready, 则 TC 通知 RM 进行 Commit, 如果有 Fail, 则 TC 通知 RM 进行 Rollback

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403091222615.png)

Two Phase Commit 缺点

- 同步阻塞问题: 在二阶段提交协议中, 所有参与者在等待协调者的决定阶段都处于阻塞状态, 无法进行其它操作
- 单点故障: 如果在二阶段提交过程中, 协调者出现故障, 会导致所有参与者一直等待, 不能进行其它操作
- 数据不一致: 如果 RM 接收到 Prepare 请求后, 未发送 ACK 确认就宕机, 而在此之后其它 RM 都发送了 ACK 确认, 则此时 TC 将发起 Commit 请求, 导致数据状态不一致

下面这段代码，简单实现了两阶段提交的：

```java
SqlSession session1 = new SqlSession("t_db1");
SqlSession session2 = new SqlSession("t_db2");

try {
    session1.startTransaction();
    boolean prepared1 = session1.execute("update user");
    
    session2.startTransaction();
    boolean prepared2 = session2.execute("update order");

    if (prepared1 && prepared2) {
        session1.commitTransaction();
        session2.commitTransaction();
    } else {
        throw new SqlException();
    }
} catch (Throwable e) {
    session1.rollbackTransaction();
    session2.rollbackTransaction();
}
```

下面这段代码，加入了一些设计和抽象：

```java

interface TransactionParticipant {
    boolean prepare();
    void commit();
    void rollback();
}

class ParticipantA implements TransactionParticipant {
    @Override
    public boolean prepare() {
        System.out.println("Participant A: preparing...");
        return true; // 模拟准备成功
    }

    @Override
    public void commit() {
        System.out.println("Participant A: committed.");
    }

    @Override
    public void rollback() {
        System.out.println("Participant A: rolled back.");
    }
}

class ParticipantB implements TransactionParticipant {
    @Override
    public boolean prepare() {
        System.out.println("Participant B: preparing...");
        return false; // 模拟准备失败
    }

    @Override
    public void commit() {
        System.out.println("Participant B: committed.");
    }

    @Override
    public void rollback() {
        System.out.println("Participant B: rolled back.");
    }
}

class TwoPhaseCommitCoordinator {
    private List<TransactionParticipant> participants = new ArrayList<>();

    public void addParticipant(TransactionParticipant participant) {
        participants.add(participant);
    }

    public void executeTransaction() {
        boolean allPrepared = true;
        // 第一阶段：准备
        for (TransactionParticipant participant : participants) {
            if (!participant.prepare()) {
                allPrepared = false;
                break;
            }
        }

        // 第二阶段：提交或回滚
        if (allPrepared) {
            System.out.println("All participants prepared successfully. Committing...");
            for (TransactionParticipant participant : participants) {
                participant.commit();
            }
        } else {
            System.out.println("One or more participants failed to prepare. Rolling back...");
            for (TransactionParticipant participant : participants) {
                participant.rollback();
            }
        }
    }
}

public class TwoPhaseCommitExample {
    public static void main(String[] args) {
        TwoPhaseCommitCoordinator coordinator = new TwoPhaseCommitCoordinator();
        
        coordinator.addParticipant(new ParticipantA());
        coordinator.addParticipant(new ParticipantB());

        coordinator.executeTransaction();
    }
}
```

## Three Phase Commit

Three Phase Commit (3PC) 对 Two Phase Commit 进行了优化, 引入了 Timeout 和 CanCommit Phase, 以避免阻塞和单点故障问题

- CanCommit Phase: TC 向所有 RM 发送 CanCommit 请求询问是否可以提交事务, RM 返回 Yes / No
- PreCommit Phase: 如果所有 RM 都返回 Yes, TC 向 RM 发送 PreCommit 请求, 接收到请求的 RM 表示接受 TC 的决定, 并回复 ACK
- doCommit Phase: TC 收到 RM 的 ACK 后, 向所有 RM 发送 doCommit 请求, RM 接受到请求后进行真正的事务提交并回复 ACK

CanCommit Phase 的主要作用

- 检查自身是否处于正常状态（如数据库连接、磁盘空间等）
- 判断是否存在可能阻止提交的因素（如资源冲突、限制条件）
- 不执行具体的事务逻辑，而是进行快速的条件验证（如判断事务相关的行是否被锁定，检查库存数量是否足够等）
- 避免不必要的锁定和占用，降低分布式事务的开销。如果大部分事务在此阶段被中止，可以节约后续阶段的处理成本

Three Phase Commit 的任一阶段, 只要有 RM 回复 No 或者超时未回复, TC 都会向所有 RM 发送 Abort 请求, 所有 RM 在执行完事务的回滚操作后回复 ACK

Three Phase Commit 中的 TC 出现单点故障, 无法通知 RM 进行提交, 则 RM 会在等待一段时间后自动提交事务, 但是这也会导致一些问题. 如果某一个 RM 出现异常, 返回了 No, 刚好此时 TC 单点故障, 则会导致其他 RM 超时后自动提交, 造成不一致

Three Phase Commit 虽然解决了 Two Phase 的一些问题, 但是增加了一次网络往返, 而且在处理网络分区和多数故障的情况下, Three Phase Commit 也无法保证一致性, 当前实际使用中更常见的是使用具有超时和故障恢复机制的 Two Phase Commit (eg: Paxos, Raft)

```java
interface TransactionParticipant {
    boolean canCommit() throws InterruptedException;
    boolean preCommit() throws InterruptedException;
    void doCommit();
    void rollback();
}

class Participant implements TransactionParticipant {
    private boolean preCommitted = false;

    @Override
    public boolean canCommit() throws InterruptedException {
        // 模拟网络延迟
        Thread.sleep((long) (Math.random() * 2000));
        System.out.println(Thread.currentThread().getName() + ": Can commit.");
        return true; // 模拟成功
    }

    @Override
    public boolean preCommit() throws InterruptedException {
        // 模拟网络延迟
        Thread.sleep((long) (Math.random() * 2000));
        System.out.println(Thread.currentThread().getName() + ": Pre-committed.");
        preCommitted = true;
        return true; // 模拟成功
    }

    @Override
    public void doCommit() {
        if (preCommitted) {
            System.out.println(Thread.currentThread().getName() + ": Committed.");
        } else {
            System.out.println(Thread.currentThread().getName() + ": Cannot commit without pre-commit!");
        }
    }

    @Override
    public void rollback() {
        System.out.println(Thread.currentThread().getName() + ": Rolled back.");
        preCommitted = false;
    }

    public boolean isPreCommitted() {
        return preCommitted;
    }
}

class ThreePhaseCommitCoordinator {
    private final List<TransactionParticipant> participants = new ArrayList<>();
    private final ExecutorService executor = Executors.newCachedThreadPool();
    private static final int TIMEOUT_MS = 3000; // 每个阶段的超时限制

    public void addParticipant(TransactionParticipant participant) {
        participants.add(participant);
    }

    public void executeTransaction() {
        try {
            // 第一阶段：可以提交阶段
            if (!canCommitPhase()) {
                System.out.println("Coordinator: Can-commit phase failed. Rolling back...");
                rollbackAll();
                return;
            }

            // 第二阶段：预提交阶段
            if (!preCommitPhase()) {
                System.out.println("Coordinator: Pre-commit phase failed. Rolling back...");
                rollbackAll();
                return;
            }

            // 第三阶段：提交阶段
            commitPhase();
        } finally {
            executor.shutdown();
        }
    }

    private boolean canCommitPhase() {
        System.out.println("Coordinator: Starting can-commit phase...");
        return executePhase(TransactionParticipant::canCommit);
    }

    private boolean preCommitPhase() {
        System.out.println("Coordinator: Starting pre-commit phase...");
        return executePhase(TransactionParticipant::preCommit);
    }

    private void commitPhase() {
        System.out.println("Coordinator: Starting commit phase...");
        for (TransactionParticipant participant : participants) {
            participant.doCommit();
        }
    }

    private boolean executePhase(Callable<Boolean> task) {
        List<Future<Boolean>> futures = new ArrayList<>();
        for (TransactionParticipant participant : participants) {
            futures.add(executor.submit(() -> task.call(participant)));
        }

        for (Future<Boolean> future : futures) {
            try {
                if (!future.get(TIMEOUT_MS, TimeUnit.MILLISECONDS)) {
                    return false; // 如果任何一个参与者返回 false，阶段失败
                }
            } catch (TimeoutException e) {
                System.out.println("Coordinator: Timeout detected during phase.");
                return false; // 超时也视为失败
            } catch (Exception e) {
                e.printStackTrace();
                return false; // 其他异常视为失败
            }
        }
        return true; // 所有参与者成功
    }

    private void rollbackAll() {
        System.out.println("Coordinator: Rolling back all participants...");
        for (TransactionParticipant participant : participants) {
            participant.rollback();
        }
    }
}

public class ThreePhaseCommitWithAccurateTimeout {
    public static void main(String[] args) {
        ThreePhaseCommitCoordinator coordinator = new ThreePhaseCommitCoordinator();
        coordinator.addParticipant(new Participant());
        coordinator.addParticipant(new Participant());

        coordinator.executeTransaction();
    }
}
```

## Quorum

Quorum (法定人数机制) 是分布式系统中的重要共识技术, 被设计用来提高分布式系统的可用性和容错能力, 尤其在面对节点故障或网络问题时

Quorum 的核心思想是一个请求在一个多节点分布式系统中被认为有效, 并在多数节点 (法定数量) 上一致同意后才会被执行, 所以在一个包含 N 个节点的系统中, 至少需要 N / 2 + 1 个节点同意, 这个请求才会被看做是已经达成共识

Quorum 中的节点包括 R (Read) 和 W (Write), 只要 R + W > N 就可以保证系统的一致性, 通常设置 R = N / 2 + 1, W = N / 2 + 1 (eg: N = 5, R = 3, W = 3)

- C1 写入数据 X, 会在 3 个节点上写入数据 (W)
- C2 读取数据 X, 会从 3 个节点上读取数据 (R), 所以总能保证至少读取到一条最新的数据, 再通过 Version Id 去区分哪一条是最新数据

Quorum 优点

- 容错能力: 即使系统中一部分节点发生故障或无法达成共识, 只要有超过半数的节点可以正常运行并且能够彼此通信, 系统就能够继续提供服务, 这使得系统能够在网络分区或节点宕机时保持可用性
- 数据一致性: 由于一个请求需要在大多数节点上被接受, 所以可以保证只要有一个最新数据的副本在正常工作的节点集合中, 那么所有的读请求都可以返回最新的数据

Quorum 在许多分布式系统中都有应用 (eg: Zookeeper 的 ZAB, Google's Spanner 的 Paxos), 通过 Quorum 来保证分布式数据一致性和高容错

## WARO

WARO (Write All Read One) 是一种在分布式数据存储系统中常用的数据一致性策略

- Write All: 所有的写操作都必须在所有的副本节点上完成, 在所有的参与节点中同步更新信息, 这保证了在完成写操作后, 所有的副本都持有最新的数据
- Read One: 读操作只需要在任何一个副本上进行就可以了, 由于写操作保证了所有副本的数据一致性, 因此无论从哪个副本读取数据, 读取的数据都是最新的

WARO 同时考虑了系统性能和数据一致性, 尽管需要在所有副本上完成写操作可能会导致性能开销, 但它可以保证数据的强一致性, 另一方面, 只需要在一个节点上完成读操作可以显著提高读操作的性能

WARO 模型的性能会受到系统负载, 网络延时和副本数量等因素的影响 (eg: 如果有大量的写操作, 就需要维护大量的副本, 调整网络延时和副本数量也可能影响系统的性能)

## Paxos

Paxos 是解决分布式系统中的一致性问题的一种算法, 能在一个可靠的系统中, 在任何时候提供一致性的保证, 在面对网络延迟, 分区和节点故障的时候依然可以正确地工作

Paxos 角色

- Proposer: 提案发起者, 可以理解为客户端或者是服务请求者, 负责发起一个提议, Paxos 将程序中的操作抽象成提议 Value (eg: 修改某个变量的值)
- Acceptor: 提案接收者, 主要负责接收 Proposer 的提议, 并对提议给予反馈, 至少 N / 2 + 1的 Acceptor 批准后, 才可以通过提议
- Learner: 观察者, 不参与提议过程, 仅在提议决议确定后, 通过监听 Proposer 和 Acceptor 的交互, 得知决议结果, 这个角色可以实际观察到系统状态的改变, 进行相应的操作, 在实际应用中, Learner 可以是 Acceptor 自身, 也可以是独立的角色
- Leader: Proposer 的一种特殊形式, 主要负责对外部请求的初步处理, 并发起提议, Leader 的选举是通过 Paxos 协议进行的, 通过不断抛出提案, 最终形成一个决议来达成 Leader

Paxos 选举过程

- Proposer 生成全局唯一且递增的 Proposal Id, 向 Paxos 集群的所有机器发送 Prepare 请求, 这里不携带 Value, 只携带 Proposal Id (N)
- Acceptor 接受到 Prepare 后, 判断 Proposal Id 是否比 Max_N 大, Max_N 记录了之前响应的 Proposal Id
  - 如果大, 就记录 Proposal Id 到 Max_N 中, 并返回之前的 Max_N
  - 如果小, 就不回复或者回复 Error
- 进行 P2a, P2b, P2c 三个步骤 (省略)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403091509474.png)

## Raft

Raft 主要用于分布式集群环境下, 从众多从节点中选举一个主节点, 如 RocketMQ, Nacos, Redis Sentinel 都采用了 Raft 来选举主节点

Raft 角色

- Leader: 领导者负责处理所有的客户端请求, 并将日志条目复制到其他的服务器, 在任何时候, 只有一个 Leader, 在更换 Leader 的过程中, 可能会短暂的出现没有 Leader 的情况, Leader 只会在它的日志里增加新的条目, 不会去删除或修改已存在的条目
- Follower: 响应 Leader 的请求, 如果 Leader 挂了, 会参与投票选举新的 Leader
- Candidate: 候选者通过 RPC 请求其他节点给自己投票

Log Entry 日志条目, 是一个基本的数据结构, 通常用于记录系统中发生的操作或事件, 每一次的客户端请求, 或者系统状态的改变, 都会生成一条日志条目, 添加到日志中

Log Entry 组成

- Term: 任期号, 也可以理解为该日志条目创建的时间点, 在 Raft 协议中, 每当有新一轮的领导者选举开始, Term 就会增加
- Command: 命令, 这通常是客户端请求的一部分 (eg: 一个键值对的 PUT 操作)
- Index: 索引, 这是日志条目在日志中的位置
- Command Parameter: 一些命令可能需要附带其它参数 (eg: 一个键值对的 PUT 操作, 需要知道要 PUT 的值)

Raft 选举流程

1. 初始状态

- A, B, C 在初始状态都是 Follower, 此时还没有 Leader, 所以不会接受到 Leader 的 PING, 都会进入超时等待的状态
- 每个节点的超时时间都是随机的, 防止同时有多个 Candicate 去拉票导致平票的情况, 假如这里 A 150ms, B 300ms, C 200ms, 其中 A 最先完成超时等待
- A 从 Follower 切换为 Candidate, 将自身的 Term 从 0 更新为 1
- A 先投自己一票, 然后通过 RPC 向其他节点请求投自己一票, 这里 B, C 最先收到 A 的拉票请求后, 就会立即给他 A 投一票, 并且也跟着修改自己的 Term 为 A 的 Term, 后续如果还有节点想要来拉票, 这里的 B, C 都会直接拒绝
- A 的票数为 3 >= 2 (N / 2 + 1 = 3 / 2 + 1 = 2) 完成选举, 成为 Leader, 开始处理客户端请求

2. Leader 宕机, 选举新的 Leader

- A 宕机或者网络堵塞了, B 和 C 都接受不到 A 的 PING, 进入超时等待的状态, 假如这里 B 150ms, C 300ms, 其中 B 最先完成超时等待
- B 从 Follower 切换为 Candidate, 将自身的 Term 从 1 更新为 2
- B 先投自己一票, 然后通过 RPC 向其他节点请求投自己一票, 这里 C 最先收到 B  的拉票请求后, 就会立即给他 B 投一票, 并且也跟着修改自己的 Term 为 B 的 Term
- B 的票数为 2 >= 2 完成选举, 成为 Leader, 开始处理客户端请求

3. Old Leader 恢复

- A 恢复健康后, 发现自己的 Term 比其他节点的 Term 小, 则自动成为 Follower

## Micro Service

Micro Service 是 Distributed 下的一种架构风格, 将一个大型服务拆分成多个小型服务, 实现服务之间的解耦, 每个服务都运行在自己的进程中, 通过一些轻量的通信协议进行通信 (eg: RPC), 每个服务都可以独立部署, 独立扩展, 独立更新, 可维护性, 可伸缩性大大提升

## Nacos

Nacos Server 是一个 Registration Center 和 Configuration Center

Nacos Client 请求 Nacos Server 实现注册, Nacos Server 会将各种信息 (eg: IP, Port) 存储到一个 Map 中

Nacos Client 会定时 (def: 20s) 向 Nacos Server 拉取最新的 Service List, 从而获取其他 Service 的信息实现通信, 当遇到多个相同服务时, 就通过 Load Balancing 选取一个 Service 进行通信

Nacos Server Cluster 中, Nacos Server 之间需要同步 Service List 保证数据一致性

Nacos Server 会定时检查 Service Health, 发现 Service 死亡后, 会推送变更消息给 Nacos Client

- Nacos Client 定时 (def: 5s) 发送 Heatbeat 给 Nacos Server, 表示健康
- Ephemeral Instance 在一定时间内 (def: 15s) 未发送 Heartbeat, 会被标记为 Unhealthy, 再过一段时间 (def: 30s) 未发送 Heartbeat, 会被剔除 Service List, Service 恢复后, 可以再次进行 Service Registry
- Persistent Instance 在一定时间内未发送 Heartbeat, 会被标记为 Unhealthy, 但是不会被剔除 Service List

Nacos Server 会在 Unhealthy Instance (eg: 5) / All Instance (eg: 10) < Protect Threshold (eg: 0.4) 时, 启动 Unhealthy 的 Persistent Instance 进行 Avalanche Protection

Server Load Balancing: Server 通过 Hardware (eg: F5) 或 Software (eg: Nginx) 拦截请求, 转发请求, 实现 Load Balancing

Client Load Balancing: Client 通过 Software (eg: Ribbon, LoadBalancer) 拦截请求, 转发请求, 实现 Load Balancing

## Load Balancing

Micro Service 同一个模块可能有多个实例, 就需要通过 Load Balancing 选取一个模块进行通信, 最新的 RestTemplate 和 OpenFeign 都可以通过 LoadBalancer 实现 Load Balancing

常见的 Load Balancing Policy

- Random Load Balancing: 随机算法, 适用于服务器性能相近的情况
- Weighted Random Load Balancing: 权重随机算法, 权重可以根据服务器的性能, 负载, 网络带宽等因素来设置
- Round Robin Load Balancing: 轮询算法, 适用于服务器性能相近的情况
- Weighted Round Robin Load Balancing: 权重轮询算法, 在轮询算法的基础上加入了权重的考虑
- Least Connections Load Balancing: 最少连接算法, 将新的请求分配给当前连接数最少的服务器, 适用于处理请求所需时间差异较大的情况
- Source IP Hash Load Balancing: 源地址哈希算法, 根据请求的源地址进行哈希计算, 将请求分配给服务器, 可以保证来自同一源地址的请求总是被分配到同一台服务器

# Network

## Multiplexing IO

Blocking IO 和 Non Blocing IO 都是第一时间调用 recvfrom() 获取数据, 数据不存在时, 要么等待, 要么空转, 都无法很好的利用 CPU, 还会导致其他 Socket 的等待, 非常糟糕

Client 连接 Server 后, 会建立一个关联的 Socket, 这个 Socket 有一个对应的 File Descriptor (FD), FD 是一个从 0 开始递增的 Unsigned Int, 用来关联一个文件, 在 Linux 中一切皆文件, 所以 FD 可以关联一些, 当然就可以用来关联 Socket

Multiplexing IO 中, User 想要读取数据, 会先调用 epoll(), 将所有 Socket 的 FD 传递给 Kernel, Kernel 只需要一个单线程时刻监听这些 FD, 哪个数据就绪了, 就告知 User 去获取数据, 这个时候 User 再调用 recvfrom() 去获取数据, 就不会有堵塞和空转的情况了, 非常好的利用了 CPU

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401031139651.png)

---

select() 和 poll() 是早期用于 Multiplexing IO 的函数, 他们只会通知 User 有 FD 就绪了, 但是不确定是哪个 FD, 需要 User 遍历所有的 FD 来确定. epoll() 则会告知是哪些 FD 就绪了, 不需要 User 查找了, 非常高效

select() 将所有的 FD 存储到 fds_bits 中, 这是一个 1024b 的数组, 调用 select() 后, 需要先将 fds_bits 从 User Space 复制到 Kernel Space, 等 select() 执行完, 还需要将 fds_bits 从 Kernel Space 复制到 User Space. User 无法直接确定是哪个 FD 就绪了, 还需要再遍历 fds_bits 寻找就绪的 FD. fds_bits 的大小固定为了 1024b, 这个数量放在如今已经完全不够用了

poll() 通过一个 LinkedList 存储 FD, 所以可以存储的 FD 就没有上限了, 但是依旧无法避免两次复制和遍历寻找就绪的 FD. 如果存储的 FD 太多, 遍历的时间会变长, 性能就会下降

epoll() 通过一个 RedBlackTree 存储所有的 FD (rbr), 通过一个 LinkedList 存储就绪的 FD (rdlist). Server 启动时, 会调用 epoll_create() 创建一个 epoll 实例, 包含 rbr 和 rdlist. User 想要添加一个 FD 时, 会调用 epoll_ctl() 添加一个 FD 到 rbr 上, 并且绑定一个 ep_poll_callback, 一旦该 FD 就绪, 就会触发该 Callback, 将 FD 添加到 rdlist 中. 后续只需要循环调用 epoll_wait() 检查 rdlist 中是否有 FD, 如果没有, 就进入等待, 如果有, 就复制到 User Space 的 events 中, 实现事件通知, User 就知道哪些 FD 就绪了, 就可以针对性的发送请求进行读写操作了. epoll() 不需要来回的两次复制, 也不需要遍历寻找就绪的 FD, 性能极强, 而且通过 RedBlackTree 存储 FD, 既能存储大量的 FD, 也能保证性能的稳定

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401031139652.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401031139653.png)

---

epoll_wait() 的事件通知有 LevelTriggered (LT, def) 和 EdgeTriggered (ET) 两种模式

LT 进行事件通知后, 会判断该 FD 是否已经全部处理完毕, 如果没有处理完, 就会反复通知, 直到处理完毕, 才会将该 FD 从 rdlist 中移除 (eg: A 需要处理 3KB 的数据, 调用 epoll_wait() 得到数据后, 只处理了 1KB 数据, 此时 LT 模式下, 不会移除该 FD, 而是再次通知 A 去处理数据)

ET 进行事件通知后, 会直接移除该 FD (eg: A 还剩 2KB 数据没有处理, 此时 ET 模式下, 不会管 A 是否处理完的, 直接移除 FD)

通过 LT 处理数据, 需要反复调用 epoll_wait() 进行处理, 这个过程是非常消耗资源的. 如果多个线程都在等待一个 FD, 通知一次给一个线程后, 还会再去通知其他线程, 这就造成了惊群

通过 ET 处理数据, 可以开启一个异步线程, 将 FD 中的所有数据全部循环处理完即可, 不需要反复调用 epoll_wait(), 性能极强, 而且一个线程被通知处理完数据后, 其他线程直接从 User Space 中读取数据即可, 不存在惊群

## TCP

TCP (Transmission Control Protocol) 是互联网协议套件的主要协议之一, 提供了在通过 IP 网络通信的主机上运行的应用程序之间的可靠, 有序和错误检查的字节流传输. TCP 是 TCP/IP 套件的传输层的一部分, SSL/TLS 经常在 TCP 上运行. 诸如万维网, 电子邮件, 远程管理和文件传输等主要的互联网应用都依赖于 TCP.

## 3-Way Handshake

TCP 的三次握手, 是建立 TCP 连接的重要过程, 以保证连接的双向通信

- Client 发送 SYN 给 Server, 表示要建立连接, Client 切换状态为 SYN_SEND
- Server 接受到 SYN 后, 返回 SYN 和 ACK 给 Client, Server 切换状态为 SYN_RCVD
- Client 接受到 SYN 和 ACK 后, 返回 ACK 给 Server, Client 切换状态为 ESTABLISHED. Server 接受到 ACK 后, Server 切换状态为 ESTABLISHED, 完成 TCP 的三次握手, 可以开始传输数据了

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202402151439103.png)

TCP 的三次握手以最少的通信次数确认了双方的接收和发送能力是否正常, 确认了双方的初始序列号以便后续的数据传输

如果只进行两次握手, 就会因为网络延迟导致的 Client 和 Server 的连接状态不一致

- Client 发送 SYN1 给 Server, 但因为网络延迟没有到达 Server, 于是 Client 又发送一个 SYN2 给 Server
- Server 接受到 SYN2 后, 返回 SYN2 和 ACK2 给 Client 建立 Connection2
- 等 SYN1 到达 Server 后, Server 会以为是 Client 想要建立 Connection1, 于是返回一个 ACK1 给 Client, 在 Server 视角会认为已经建立了两个连接
- Client 接受到 SYN1 和 ACK1 后, 会判断该连接失败, 在 Client 视角会认为只建立一个连接

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202402151451792.png)

## 4-Way Wavehand

TCP 的四次挥手是指在 TCP 连接中, Client 和 Server 中任意一方在数据传输结束后, 想要结束连接, 就务器必须要做的四个动作
 
- Client 发送 FIN 给 Server, 表示要关闭连接, Client 切换状态为 FIN_WAIT_1
- Server 接受到 FIN 后, 返回 ACK 给 Client, Server 切换状态为 CLOSE_WAIT, 在这个过程中, Server 还可以发送数据给 Client, Server 发送完数据后, 发送 FIN 给 Client, Server 切换状态为 LAST_ACK
- Client 接受到 FIN 后, 返回 ACK 给 Server, Client 切换状态为 TIME_WAIT, 在这过程中, Client 会进入等待, 防止 Server 没有接受到刚才的 ACK 重新发送 FIN 要求结束, Client 等待两倍的 MSL 的时间后没有重新接受到 FIN, 就会切换状态为 CLOSED
- Server 接受到 ACK 后, 直接切换状态为 CLOSED

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202402151515308.png)

## SYN, FIN, ACK

SYN (Synchronize), FIN (Finish) 和 ACK (Acknowledgment) 是 TCP 用于建立连接和确认数据包成功到达的标志位, 本质上 TCP 的数据包 Segment 在二进制位上做一些标识来标识的

SYN 和 FIN 会在 Sequence Number 中存储一个随机的数字 x, Node1 发送给 Node2 后, Node2 需要返回一个 ACK, ACK 会在 Acknowledgment Number 中存储 x+1, Node1 接受到 Segment 后, 去判断是否返回正确, 从而实现一次握手

- Sequence Number 可以处理乱序问题, Sequence Number 是顺序递增的, 可以确认 Segment 的顺序
- Sequence Number 可以处理丢包问题, 一个数据是被切分成多个数据包的, 如果因为网络问题丢包了, 就可以通过 Sequence Number 确认少的是哪一个包, 重新向对方申请这个包即可

## SYN Flood

SYN Flood 是一种常见的 DoS 攻击, 它通过 Client 大量伪造 IP 发送 SYN 给 Server，Server 需要返回 SYN 和 ACK 给 Client, 而 Client 又不回复 Server, 就会导致 Server 有大量的连接处于 SYN_RCVD 状态, 这些 Half-Open Connection 会一直占用 Half-Open Connection Queue, 当 Queue 满后, 就无法处理正常的请求连接了

## TFO

TFO (TCP Fast Open) 是对 TCP 的一种简化握手流程的拓展, 用于提高两端点间连接的打开速度

- Client 发送 SYN 给 Server, 通过一个标识符表示要开启 Fast Open
- Server 接受到 SYN 后, 不仅返回 SYN 和 ACK, 还会返回一个 Cookie 给 Client
- Client 接受到 SYN 和 ACK 后, 返回 ACK 给 Server 完成三次握手后, 存储 Cookie 到本地, 后续请求都携带这个 Cookie, Server 只需要校验 Cookie 是否正确, 既可以直接进入连接状态, 不需要三次握手了

TFO 在后续的每次请求中都会少一个 RTT, 效率提升很多

TFO 能有效解决 SYN Flood, Server 接受到 SYN 后, 会去检查是否携带 Cookie, 如果没有 Cookie 就不会再进行后续的三次握手了

TFO 存在一定安全风险, TFO 默认不会对结果的 TCP 连接提供任何形式的加密保护, 也不对端点进行身份保证, 如果需要这类防护, 可以与 TLS 或 IPsec 这样的加密协议组合使用

## MSL

MSL (Maximum Segment Life) 指的是网络数据包 (Segment) 在网络中可能存在的最长寿命, MSL 定义了一个数据包从发送到不能再被使用也就是丢弃所需的时间, 这是为了防止网络中的数据包过多导致网络拥塞, 数据包超过 MSL 时限后, 将被自动丢弃

TCP 中, MSL 常常关联到 TIME_WAIT 状态, 当一个 TCP 连接关闭后, 为了保证确保最后的 ACK 确认包能够成功送达, 或是为了避免已经关闭的连接的延迟数据包在新的连接中被错误处理, TCP 会进入一种叫做 TIME_WAIT 的状态, 并等待 2 倍的 MSL 时长, 这样设定的原因是要让网络中该连接两端可能存在的任何数据包都在网络中消失

## OSI

OSI (开放式系统互联参考模型) 的七层模型是一个把网络通信协议分为七个层次的标准模型, 其目的是为了让计算机网络的设计和管理更加灵活和模块化

OSI 的每层都有自己的独立功能和责任, 这种分层的方式使得每个层次都可以独立工作, 同时还能够很好地协调上下

- 应用层: 主要提供各种服务和应用程序 (eg: 电子邮件, 文件传输, 远程登录, Web 浏览), 应用层服务可以 使用不同的协议实现 (eg: HTTP, SMTP, FTP, TELNET)
- 表示层: 主要负责数据格式转换, 加密解密, 压缩解压等服务, 表示层使得应用程序可以使用不同的数据格式和编码, 同时还提供了数据的安全性和完整性保护等服务
- 会话层: 主要负责建立, 管理和终止会话, 提供会话控制和同步等服务, 会话层还负责处理多个应用程序之间的数据交换
- 传输层: 主要负责数据传输的可靠性和流量控制等, 同时还包括分段, 组装, 连接建立和断开等功能
  - 应用: 路由器
  - TCP, UDP
- 网络层: 主要负责数据在网络中的传输, 包括路由选择, 分组转发, 数据报文的封装等, 网络层还处理数据包的寻址和控制流量等
  - 传输的数据单位: IP 数据包
- 数据链路层: 主要负责把数据分成数据帧进行传输, 并对错误进行检测和纠正, 数据链路层还负责物理地址的分配、数据流量控制、错误校验等
  - 应用: 交换机, PPP, HDLC
  - 传输的数据单位: MAC 数据帧
- 物理层: 主要负责通过物理媒介传输比特流，如电缆、光纤、无线电波等。物理层规定了物理连接的规范，包括电缆的类型, 接口的规范
  - 应用: 网卡

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403041351618.png)

## TCP

OSI 七层模型是一种理论模型, 在实际应用中较少使用, 现在比较常用的是 TCP/IP 四层模型

- 应用层
  - 应用: WWW, HTTP, SMTP, POP3, FTP, Telnet, DHCP
- 传输层
  - 应用: TCP, UDP
- 网络互联层
  - 应用: 路由器, IP, ARP, RARP, ICMP
  - 传输的数据单位: IP 数据包
- 网络接口和硬件层
  - 应用: 交换机, 中继器, 集线器, 网卡
  - 传输的数据单位: MAC 数据帧

OSI 和 TCP/IP 的对应关系

- OSI 的 应用层, 表示层, 会话层 对应 TCP/IP 的 应用层
- OSI 的 传输层 对应 TCP/IP 的 传输层
- OSI 的 网络层 对应 TCP/IP 的 网络互联层
- OSI 的 数据链路层, 物理层 对应 TCP/IP 的 网络接口和硬件层

## Symmetric Key Cryptography

对称加密的关键动作：

- 密钥生成：加密和解密使用相同的密钥。发送方和接收方需要事先共享这个密钥。
- 加密：发送方使用密钥和加密算法（如AES、DES）对明文数据进行加密，生成密文。
- 传输：发送方将密文通过网络传输给接收方。
- 解密：接收方收到密文后，使用相同的密钥和解密算法将密文还原为明文。

对称加密的优点：

- 速度快：对称加密算法通常计算量较小，处理速度较快，适合大数据量的加密。
- 实现简单：算法简单，易于实现和部署。

对称加密的缺点：

- 密钥管理困难：需要在通信双方之间安全地共享和管理密钥，尤其在大规模网络中，密钥管理变得复杂。
- 密钥泄露风险高：如果密钥被第三方获取，所有使用该密钥加密的数据都可能被破解。

对称加密的算法都要内置在客户端和服务端，而常见的服务端程序都是开源的，比如 Nignx 就是开源的，所以算法也是公开的，无法保障安全，秘钥需要通过网络传输，非常的不安全。

## Asymmetric Key Cryptography

非对称加密的关键动作：

- 密钥对生成：每个用户生成一对密钥，公钥和私钥。公钥公开，私钥保密。
- 公钥加密：发送方使用接收方的公钥对明文数据进行加密，生成密文。
- 私钥加密：用于数字签名，发送方使用自己的私钥对明文进行加密，生成签名。
- 传输：发送方将密文（和签名）通过网络传输给接收方。
- 私钥解密：接收方使用自己的私钥对密文进行解密，还原明文。
- 公钥解密：接收方使用发送方的公钥验证签名，确保数据的完整性和发送方的身份。
- 生成签名：发送方使用自己的私钥对明文的哈希值进行加密。
- 验证签名：接收方使用发送方的公钥对数字签名进行解密，得到发送方生成的哈希值。接收方将自己生成的哈希值与解密得到的哈希值进行比较。如果两者一致，则验证通过，数据未被篡改且确实来自发送方。

非对称加密的流程：

- A 和 B 互为发送方和接收方，A 和 B 都需要生成一对公钥和私钥，分别是 PubA, PrvA, PubB, PrvB。
- A 准备一条消息 M（例如 "Hello, B!"）。
- A 对 M 进行哈希计算，得到一个固定长度的哈希值 H(M) = 0x1234abcd...
- A 使用自己的私钥 PrvA 对 H(M) 进行加密，生成数字签名 SigA = Encrypt(PrivA, H(M)) = 0x5678efgh...。
- A 将明文消息 M 和数字签名 SigA 打包成一个消息包 {M, SigA}
- A 使用 PubB 对消息包加密，生成密文 Encrypted_Message = Encrypt(PubB, {"Hello, B!", 0x5678efgh...})，并发送给 B。
- B 使用 PrvB 对秘文解密，得到消息包 {M, SigA} = Decrypt(PrvB, Encrypted_Message)
- B 使用 PubA 对 SigA 进行解密，得到 H(M) = Decrypt(PubA, SigA) = 0x1234abcd...
- B 对 M 进行哈希计算，得到 H'(M)，再对比 H'(M) 和 H(M)，验证是否发生篡改。

非对称加密的优点：

- 密钥管理方便：无需共享私钥，公钥可以公开，私钥保密，解决了对称加密的密钥分发问题。
- 安全性高：即使公钥被泄露，私钥仍然是安全的，通信的机密性和完整性能够得到保障。

非对称加密的缺点：

- 速度慢：非对称加密算法计算复杂，处理速度较慢，不适合大数据量的加密。
- 实现复杂：算法复杂，实现和部署难度较大。

非对称加密的问题：

- 攻击端依旧可以伪造服务方，发送假公钥给客户端，让客户端和服务端进行交互，攻击端再去跟服务端进行交互，所以只靠非对称加密无法保证安全，还是需要借助 TLS 来保障安全。

## TLS

HTTPS（HyperText Transfer Protocol Secure）使用 TLS（Transport Layer Security）或其前身 SSL（Secure Sockets Layer）协议来加密HTTP通信。HTTPS的凭证主要是数字证书，通常由受信任的证书颁发机构（CA）签发。

数字证书在 HTTPS 中起到以下几个重要作用：

- 验证服务器身份：确保客户端（浏览器）连接的是合法的服务器，而不是冒充的服务器。
- 加密通信：提供服务器的公钥，用于在 TLS 握手过程中加密会话密钥，从而确保通信的机密性。

数字证书通常包含以下信息：

- 证书持有者信息：包括域名、组织名称等。
- 公钥：用于加密通信的公钥。
- 证书颁发机构信息：签发该证书的CA的信息。
- 有效期：证书的有效期起始和结束日期。
- 数字签名：CA对证书内容的数字签名，确保证书的完整性和真实性。

TLS 通信的流程：

- 服务器生成一对公钥和私钥。公钥用于加密数据，私钥用于解密数据。
- 服务器将公钥和其他信息（如域名、组织信息）包含在证书签名请求（CSR）中，提交给证书颁发机构（CA）。
- CA 使用自己的私钥对服务器的公钥和其他信息进行签名，生成数字证书（Certification）。
- CA 将签名后的数字证书返回给服务器。这个证书包含服务器的公钥、服务器信息和CA的签名。
- 服务器在 TLS 握手过程中将数字证书发送给客户端。
- 客户端使用 CA 的公钥对数字证书进行解码（验证CA的签名），以确保证书的真实性和完整性。如果验证通过，客户端从证书中提取服务器的公钥。
- 客户端使用服务器的公钥加密会话密钥，并发送给服务器。服务器使用自己的私钥解密会话密钥。之后，客户端和服务器使用对称加密（会话密钥）进行安全通信。

TLS 是如何方法攻击端冒充服务器的：

- 假设黑客拦截了服务器发送给客户端的数字证书。黑客可以使用 CA 的公钥解码证书，但无法伪造证书，因为没有 CA 的私钥。黑客也没有服务器的私钥，无法解密客户端加密的会话密钥。
- 如果黑客试图伪造证书并发送给客户端，客户端会使用 CA 的公钥进行验证。由于伪造的证书没有 CA 的签名，验证会失败，客户端拒绝通信。

# OS

### File Descriptor

fd（file descriptor，文件描述符）是一个整数，用于表示进程打开的文件或其他输入/输出资源的引用。它是一种抽象的标识符，用来统一管理文件、设备、套接字等资源，操作系统通过文件描述符来追踪和管理这些资源。

每个进程都有一个文件描述符表（file descriptor table），由操作系统维护。文件描述符是表中的索引值，通常是一个非负整数。文件描述符与内核中的文件对象相关联，文件对象记录了文件的具体状态，如偏移量、权限等。

open() 调用会让操作系统创建或打开文件，返回一个文件描述符 fd。

- 操作系统在内核中为 fd 分配一个文件对象，记录文件名、打开模式、当前偏移量等信息。
- 例如，返回值 fd = 3，它是该进程的文件描述符表中的一个索引。通常，0、1 和 2 分别对应标准输入、标准输出和标准错误，3 是进程打开的第一个文件。

```c
// 打开文件，获取文件描述符
int fd = open("example.txt", O_RDWR | O_CREAT, 0644);
```

write() 使用 fd 来找到文件对象，将 text 中的数据写入到文件。

系统调用流程：

- 用户态传递 fd 和数据到内核态。
- 内核根据 fd 找到对应的文件对象。
- 将数据写入文件的指定位置，并更新文件偏移量。

```c
// 写入内容到文件
const char *text = "Hello, File Descriptor!";
ssize_t bytes_written = write(fd, text, 24);
```

lseek() 会操作内核中的文件对象，将偏移量设置为指定位置。

```c
// 调整文件指针到文件开头，用于后续读取。
lseek(fd, 0, SEEK_SET);
```

read() 使用 fd 来找到文件对象，从当前偏移量读取数据。

系统调用流程类似于 write()，但方向是从文件读取到内存。

```c
ssize_t bytes_read = read(fd, buffer, 24);
```

close() 释放文件描述符在文件描述符表中的位置。

如果这是最后一个引用，内核会释放与文件对象相关的资源。

```c
close(fd);
```

## Thread, Process

进程是正在运行程序的实例, 进程包含多个线程, 每个线程执行不同的任务, 不同的进程使用不同的内存空间, 在当前进程下的所有线程可以共享内存空间

线程是进程内一个相对独立的, 最小执行单元, 线程更轻量, 线程上下文切换成本一般上要比进程上下文切换低, 上下文切换指的是从一个线程切换到另一个线程

# Other

## 对比 AVL, RedBlackTree, B+Tree

平衡二叉树

- 特点
  - 每个节点存储一个平衡因子，表示左子树和右子树高度差。
  - 通过旋转（单旋、双旋）保持树的高度平衡，严格保证 |平衡因子| ≤ 1。
  - 平衡性比红黑树更强。
- 优点：
  - 查找效率高，接近O(log N)，尤其是在读操作较多、写操作较少的场景下。
- 缺点：
  - 插入、删除操作需要频繁旋转以维持平衡，开销较大。
  - 适合静态数据较多的场景。
- 场景：
	•	读多写少的场景，例如静态索引、频繁查询但写入较少的数据库字段。

红黑树

- 特点：
  - 一种近似平衡的二叉查找树。
  - 节点带颜色属性（红或黑），通过定义规则（如路径黑高一致）维持树的相对平衡。
  - 最长路径不超过最短路径的两倍。
- 优点：
  - 插入、删除操作的性能更优，较少的旋转操作。
  - 动态更新性能更优。
- 缺点：
  - 查找效率稍低于AVL树，因为它的平衡性不如AVL严格。
- 场景：
  - 动态场景，如操作系统的调度器、语言运行时的map/set实现，适用于高频插入和删除操作的场景。

B+ 树

- 特点：
  - N叉平衡树，节点存储多个键值。
  - 所有数据存储在叶子节点，叶子节点通过链表连接，便于范围查找。
  - 非叶子节点仅存储索引，树的高度较低。
- 优点：
  - 范围查询效率高，因叶子节点链表可以顺序遍历。
  - 更适合磁盘存储和分页管理，减少磁盘I/O。
  - 树的高度小，查询效率稳定。
- 缺点：
  - 维护成本高，插入或删除时可能涉及拆分或合并节点。
  - 不适合频繁的更新或删除操作。
- 场景：
  - 数据库索引、文件系统等需要大规模范围查找的场景。
  - 适合磁盘I/O密集的环境。

MySQL为什么使用B+树？

- 减少磁盘I/O：B+树非叶子节点仅存储索引，树高更低，访问深度减少。MySQL一次读取磁盘的块较大（如页大小16KB），一个节点可以包含大量索引，降低访问次数。
- 支持范围查询：B+树叶子节点链表支持高效的范围查找（例如BETWEEN查询）。
- 分页管理：数据存储在叶子节点，天然与页管理结合，高效分页。
- 稳定性能：对于大规模数据，树高低，查询时间复杂度趋近O(log N)，性能稳定。

# Project

## 断点续传

- 前端调用浏览器的 API 对大文件进行分块, 每次上传分块文件前请求后端查询该分块是否已经存在后端, 如果不存在, 则不上传这一块了
- 后端接受到分块后, 保存在 service 本地, 如果出现异常, 就返回该分块的序号给前端, 通知他重新上传
- 前端全部上传完之后, 再发送一个请求给后端, 后端将保存在本地的分块文件进行合并, 再上传完整文件到 MINIO 中
  - 也可以直接将分块上传到 MINIO 中, 合并时就直接调用一个 API 通知 MINIO 进行合并
- 完整文件存储形式 `"/" + fileMd5.charAt(0) + "/" + fileMd5.charAt(1) + "/" + fileMd5 + "/" + fileName`
- 分块文件存储形式 `"/" + fileMd5.charAt(0) + "/" + fileMd5.charAt(1) + "/" + fileMd5 + "/" + chunkNo;`
- 服务端记录一个 tmp 文件, 记录当前已经上传的分片序号, 后续合并失败, 就去查看缺少哪个分片序号, 通知前端补发就可以了

## 视频处理

- 上传视频的时候可以指定修改文件编码 (eg: avi -> mp4), 上传之后, 判断是否需要转换编码, 如果要转换, 就存储一个编码消息到 DB 中, 类似于 MQ, 通过 XXL-JOB 代替 MQ 实现相同的效果
- 通过 shardIndex 和 shardTotal 给 XXL-JOB 的服务分配任务 `select * from media_process where id % #{shardTotal} = #{shardIndex} and (status = 1 or status = 3) and fail_count < #{maxFailCount} limit #{maxRecordCount};`
- 通过 ThreadPool + CountDownLatch 处理获取到的 MediaProcessList
- 如果要节省一部分 CPU, 就可以通过增量式的扫表方式, 通过 limit 获取 MediaProcessList

## 短信登录

短信登录：通过 Redis + Aliyun Web Service 实现手机验证码登录功能, 通过 Redis 存储验证码信息.

- Key 2m 过期, 验证的时候如何没有查询到 Key, 就说明验证码过期
- 创建验证码时, 先查询 Redis 中的验证码 Key 是否存在, 如果存在，就说明是频繁申请了
- 校验成功后, 登录成功后, 就删除这个 验证码 Key, 清空验证码统计 Key
- `code:<phone>` 统计一个账户在一段时间内校验的次数, 通过 INCR, DECR 统计验证码, 1h 过期, 超过 3 次, 就拒绝访问

短信登录: 通过 Redis + Web Service + Hash 实现手机验证码登录功能

- Hash 的 key 为 `code:<phone>`, field 为 code, val 为校验次数

## 分布式登录状态同步

分布式登录状态同步：通过 Redis + JWT + Hash 解决分布式环境下登录状态同步的问题.

- 用户登入后, 会存储到一个 Hash 中, Key 为 `token:login:<userid>`, Field 为 Create Time, Val 为 Token, 每次存储 New Token 前会先判断 Hash 存储的 Token 数量是否达到了存储上限, 如果达到了, 就移除 Oldest Token, 并将该 Oldest Token 加入 BlackList
- 用户登出后, 需要删除 Hash 中的 Token, 并且将 Token 加入 BlackList
- 拦截器拒绝该 BlackList 中 Token 的访问

分布式登录状态同步：通过 Redis + JWT + List 解决分布式环境下登录状态同步的问题

- lpush 添加 token, 执行 ltrim 保留 0 ~ 2 的 token, 删除超出的 token
- 每次请求都查询一次 Redis 都 Token list, 对比 token 是否相同
- 也不需要通过 XXL-JOB 来实现周期性删除 Redis 中过期的 Token

分布式登录状态同步: JWT + 黑名单 + 定时调度清理黑名单

- JWT 无法修改过期时间, 所以就无法在用户退出后, 就将移除其登录状态, 所以可以搭配黑名单实现登出

## SSO

SSO: 共享 Cookie 的方式

- 存储 Cookie 时指定存储到相同域名后缀中, 访问多个相同域名后缀的网站时, 都可以携带上这个 Token

SSO: OAuth2 实现

- User 请求 Client A, Client A 发现 User 没有 Token, 就引导 User 携带 Client Id 和 Redirect URL 去请求 Authorization Server, Authorizationi Server 会返回 code 给 User, User 携带 code ...
  - User 登录 Authorization Server 后, 会存储一个 Authorization Server 的 Token 到本地, 方便后续请求 Authorization Server 时, 判断该 User 是否已登陆, 通过 `token:login:auth:<user_agent>:<user_id>` list 进行存储
  - 由于 Authorization Server 的实现很多, 最好是前端请求后端, 后端返回对应 Authorization Server URL
- User 请求 Client B, Client B 发现 User 没有 Token, 就引导 User 携带 Client Id 和 Redirect URL 去请求 Authorization Server, 此时 Authorizationi Server 发现 User 已经登录过了, 就直接返回 code 给 User, 不需要 User 登录, User 携带 ...
- 不同 Client 的权限策略是不同的, 共用同一个 Token, 明显不合适, 所以每次的 code 申请的 Token 都应该不同, 如果一个站点退出了, 就应该清除其他所有的 Token, Token 都使用 Redis 进行存储
- 不同 User Agent 之间的 Token 管理应该相互隔离, 如果一个站点退出了, 也应该退出其他相同 User Agent 的 Token, 而不应该退出其他 User Agent 的 Token, 可以根据 `token:login:<client_id>:<user_agent>:<user_id>` list 进行存储
- 用户修改密码后, 立即清空其他 Token, 或者删除所有 Token, 然后给当前用户再颁发一个新的 Token

## 日活跃统计

日活跃统计: 通过 MQ + Interceptor + Redis 的 HyperLogLog 统计日活跃用户数量

- Interceptor 拦截到请求后, 将 IP 封装成 Msg, 由 MQ 异步处理, 以 `statistic:user:daily:2022:01:01` 的 Key, IP 为 Val 操作 HyperLogLog 统计日活跃用户
- 讲述由 List => Set => BitMap => HyperLogLog 的选择过程

## 缓存击穿处理

缓存击穿处理：通过 Bitmap + Bloom Filter 解决缓存击穿

- Guava -> Hutool -> Redis -> Redisson + Interceptor

## 超时订单

超时订单: 通过 Redis + MQ + Delayed Queue 实现超时订单处理, 通过 XXL-JOB 进行兜底处理.

- 通过 RabbitMQ 的 Delayed Queue 实现超时订单, 分为 10s, 20s, 30s, 40s, 50s, 1m, 5m, 10m 去检查订单状态, 如果支付, 直接退出, 如果超过 10m 也未支付, 则直接恢复库存, 允许其他用户下单
- 通过 XXL-JOB 每隔 10s 进行一次分页查询, 处理一部分超时订单, 总共在 10m 内完成一次全表扫描, 不仅可以兜底, 也可以防止 MQ 消息丢失和 MQ 宕机的问题
- 成本高, 需要额外存储消息, 就需要搭建集群, 如果存储的延迟任务过多, 会导致峰值压力, 适合延时较短的任务

超时订单: 通过 XXL-JOB 实现超时订单

- 单独维护一个超时库, 将所有需要处理超时的任务, 塞入这个库, 通过 XXL-JOB 一次性或者增量式全部捞出来, 然后通过批量修改的方式操作数据库
- 稳定, 成本低, 延时高, 不存在峰值压力, 适合存储延时较长的任务

超时订单: 时间轮算法

- MQ 的延迟消息也有用到时间轮算法

## 在线人数统计

在线人数统计: MySQL 实现

- 登录设置 user tbl 的 is_login 为 1, 登出设置为 0, 统计时直接查询 is_login 为 1 的数量

在线人数统计: Redis 实现

- `sadd uid_login <uid>` 和 `srem uid_login <uid>` 维护一个登录统计缓存, 通过 scard 获取总数量

在线人数统计: BitMap 实现

- `setbit user_login <uid> 1` 和 `setbit user_login <uid> 0` 维护一个位图登录统计, 通过 `bitcount` 统计在线人数
- 通过 `setbit user_ios <uid> 1` 维护一个 ios 用户位图, 通过 `user_ios & user_login` 统计 ios 用户在线人数

在线人数统计: HyperLogLog 实现

## 秒杀商品

秒杀商品: Redis + Lua + Redissson + MQ 实现

[Explain](https://www.bilibili.com/video/BV1Uz4y137UA/?spm_id_from=333.337.search-card.all.click&vd_source=2b0f5d4521fd544614edfc30d4ab38e1)

- 单机锁 -> 分布式锁 (Redis SETNX / Zookeeper)
- 业务执行耗时太久, 就可以适当增加锁的过期时间, 或者开启一个子线程定时检查主线程是否依旧在线处理任务, 如果在就重设过期时间, 续命嘛, watch dog
  - Watch Dog 就是通过时间轮算法实现的, 一般使用 Netty 的 HashedWheelTimer
  - 一般续期都需要先判断是否过期, 然后再去修改过期时间, 是多个操作, 需要保证原子性, 就通过 Lua, 通过递归的方式继续进行续期操作
- Key 设定为当前线程对应的 UUID, 每次删除 key, 只会释放属于自己的锁

秒杀商品: Redis + Lua + Nginx + MQ 实现

- Nginx + Lua + Redis decr 实现订单的预检和订单的扣减, 由于 Redis 执行命令是原子性的, 并且 lua 脚本也是原子性的, 所以非常安全, 在网关层就将无效的请求阻挡了
- 订单扣减完, 通过 lua 发送一条 mq 去异步创建订单, 并且设置 MQ 的 QOS 限制一次处理的请求数量, 这里创建订单是异步创建的, 前端是无法感知的, 所以前端可以每隔一段时间发送一个请求, 检查订单状态, 前端就在那转圈圈就好了, 一般很快就能查询到订单结果
- Redis 扛不住, 就上架构, 主从, 哨兵, 集群来干!!
- 订单取消或者订单超时了, 需要通过 lua 去执行 incr

## Idempotent

Idempotent 要求重复多次调用接口不会改变业务状态, 保证单次调用结果和多次调用结果一致 (eg: 用户重复点击下单, 要求只能有一个订单生效)

- GET 和 DELETE 符合 Idempotent, PUT 和 POST 不符合 Idempotent

通过 Token + Redis 实现 Idempotent, 适合高并发场景, 前端压力大, 性能最强

- 前端生成 Token 连着表单一块传递给后端, 后端通过 SETNX + TTL 处理 Token. 如果操作失败, 就直接报错或者返回空结果. 如果操作成功, 就执行后续业务逻辑
- 这种方法只能防止 RPC 或 MQ 的重试导致的非幂等问题, 而用户重复点击提交, 造成的 Repeated Request 就无法解决了, 一般需要搭配前端的按钮置灰进行处理

```js
import axios from 'axios'; 
import { nanoid } from 'nanoid';

const token = nanoid();
const formData = {};

axios({
    method: 'post',
    url: '/your-endpoint',
    data: formData,
    headers: {
        'X-Token': token,
    },
}).then((response) => {
    console.log(response.data);
}).catch((error) => {
    console.log(error);
});
```

```java
@Aspect
@Component
public class IdempotentAspect {
    @Autowired
    private RedisTemplate redisTemplate;

    @Around("@annotation(Idempotent)")
    public Object around(ProceedingJoinPoint point) throws Throwable {
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = attributes.getRequest();
        String token = request.getHeader("X-Token");
        if (StringUtils.isBlank(token)) {
            throw new RuntimeException("Token does not exists");
        }
        if (!redisTemplate.setIfAbsent(token, "", 60, TimeUnit.SECONDS)) {
            throw new RuntimeException("Repetitive operation");
        }
        Object result = point.proceed();
        return result;
    }
}
```

通过 Token + Redis 实现 Idempotent, 适合高并发场景, 前端压力小, 但是资源耗费多

- 进入表单提交页面时, 就先向后端申请一个 Token, 前端提交表单时携带上 Token, 后端通过 SETNX + TTL 或者 DEL 来处理 Token. 如果操作失败, 就直接报错或者返回空结果. 如果操作成功, 就执行后续业务逻辑
- 这种方法可以解决所有幂等问题, 也不需要担心用户重复点击提交导致的非幂等问题, 因为在进入表单提交页面时, 就确定了 Token

通过 Business 实现 Idempotent, 不适合高并发场景

- 后端执行业务前先查询 Status, 判断是否已经操作过

通过 MessageId + Redis 解决 MQ 的 Idempotent, 专用于保证 MQ 的 Idempotent, 效率高, 性能强

- RabbitMQ 发送的消息默认不会生成 Message Id, 需要配置 MessageConverter 生成 Message Id
- RabbitMQ 的每条 Message 都可以设置 Message Id, 将 Message Id 作为 Token, 通过 SETNX + TTL 处理 Token 实现 Idempotent.

```java
@Bean
public MessageConverter messageConverter() {
    Jackson2JsonMessageConverter jackson2JsonMessageConverter = new Jackson2JsonMessageConverter();
    jackson2JsonMessageConverter.setCreateMessageIds(true);
    return jackson2JsonMessageConverter;
}
```

```java
@Autowired
RedisTemplate redisTemplate;

@RabbitListener(queues = {"direct.queue"})
public void listener(Message message) {
    // Store message into Redis, key is message id, val is message
    Boolean isAbsent = redisTemplate.opsForValue().setIfAbsent(
        message.getMessageProperties().getMessageId(), 
        new String(message.getBody()), 
        60, TimeUnit.SECONDS);

    if (!isAbsent) {
        return;
    }
    
    System.out.println("deal non-idempotent business");
}
```

## Log

使用统计的日志框架记录日志, 而不是使用自定义的接口, 系统日志切换时, 可以很迅速

通过异步的方式记录日志, 基于 Disruptor 高性能队列记录日志

使用占位符记录日志, 性能和使用便捷性上都要优于使用字符串拼接记录日志

- 当使用占位符记录日志时, 只会在实际需要记录该日志级别的消息时发生, 如果日志级别配置得足够高, 使得当前的日志消息不会被记录, 那么消息字符串的构建过程就会被完全跳过, 这种延迟构建的机制可以节省不必要的字符串创建和拼接开销, 尤其是当日志内容包含了复杂的表达式或方法调用时

所有的日志保存 15 天, 敏感数据保存 6 个月 (eg: 金钱的更改, 金钱的提现)

少使用 error, 多使用 warn

日志记录 Class#Method, 方便定位

灵活切换日志级别, 避免无用日志

方法调用前打印日志, 确定入参, 方法调用后打印日志, 确定返回值