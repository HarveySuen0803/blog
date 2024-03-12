# JDK

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

# JVM

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
  - Active Loading 会 Initialization, Passive Loading 不会出发 Initialization
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

## Dynamic Linking

Dynamic Linking 会发生在两个阶段. 如果能在 Class Loading 期间确定的 Reference, 则会在 Resolve 这一步将 Symbolic Reference 转成 Direct Reference. 由于 Dynamic Binding 的存在, 很多引用需要在 Runtime 时确定, 将 Symbolic Reference 转成 Direct Reference

Symbolic Reference 是一个标识, 用于描述所引用的目标的各种符号信息, 包括类和接口的全限定名, 字段的名称和描述符, 方法的名称和描述符等, 存储在 class file 的 Class Constant Pool

Direct Reference 指向 Heap 中的 instance 的地址, 存储在 class file 的 Runtime Constant Pool

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

## Object Reference

JVM 进行对象定位时, 有句柄引用 和 直接引用 (def) 两种方式

直接引用 是 引用 -> 对象

句柄引用 是 引用 -> 句柄 -> 对象, 在堆中维护一个句柄池, 想要定位对象, 就得先定位到句柄池里的某一个句柄, 再通过该句柄定位到具体的对象. 在 GC SweepCompact 时, 需要频繁改变对象的位置, 就只需要调整句柄的引用即可, 不需要去调整栈帧的引用

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202402292305667.png)

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

## ThreadLocalMap

每一个线程都有一个关联的 ThreadLocal.ThreadLocalMap 用于存储线程局部变量, 每创建一个 ThreadLocal Obj, 就会创建一个 Entry, Key 指向 ThreadLocal Obj, Val 为 ThreadLocal Obj 维护的局部变量的副本, 通过 ThreadLocal Obj 的 get() 和 set() 就会去操作当前线程的 ThreadLocalMap 中存储的副本, 不影响其他线程, 保证了线程安全

JDK7 中, ThreadLocal 维护 ThreadLocal.ThreadLocalMap Obj, 如果 Thread Obj 销毁后, ThreadLocal Obj 没有销毁, 内部的 ThreadLocalMap Obj 就不会销毁, 导致 Memory Leak

JDK8 中, Thread 维护 ThreadLocal.ThreadLocalMap Obj, 当 Thread Obj 销毁后, ThreadLocalMap Obj 也会一块销毁, 避免了 Memory Leak

ThreadLocalMap 的 Entry 继承了 WeakReference, 所有的 Key 都是通过 Weak Ref 指向 ThreadLocal Obj

当 Thread Obj 不再引用 ThreadLocal Obj 后, 只有 ThreadLocalMap 中的 Key 通过 Weak Ref 引用 ThreadLocal Obj, 只要发生 GC, 就会断开 Weak Ref, 当 Thread Obj 销毁后, 就会断开 ThreadLocalMap Obj 和 ThreadLocal Obj 的 Strong Ref, 就会一块销毁 ThreadLocalMap Obj 和 Thread Local Obj

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202402021217146.png)

## Thread Pool Memory Leak

Thread Obj 执行完方法, 就会断开对 ThreadLocal Obj 对 Strong Ref, Key 的 Weak Ref 断开后, ThreadLocal Obj 就会被销毁, 而 Entry 中的 Val 此时并没有被清空

Thread Pool 中, Thread Obj 会被重复利用, 不会销毁, 那么 Thread Obj 对 ThreadLocalMap Obj 的 Strong Ref 就一直存在, 所以 Entry 的 Val 中存储的 ThreadLocal Obj 的副本, 就会一直存在, 导致 Memory Leak

ThreadLocal 的 set(), get(), remove() 底层都会调用 expungeStaleEntry() 销毁 key 为 null 的 Stale Entry

```java
private int expungeStaleEntry(int staleSlot) {
    // ...
    if (k == null) {
        e.value = null;
        tab[i] = null;
        size--;
    }
    // ...
}
```

为了避免这个 Memory Leak, 使用 ThreadLocal 时, 一定要调用 remove() 销毁 Stale Entry

```java
try {
    System.out.println(threadLocal.get());
} finally {
    threadLocal.remove();
}
```

ThreadLocal 能实现 Data Isolation, 重点在于 ThreadLocalMap, 所以 ThreadLocal 可以通过 statci 修饰, 只分配一块空间即可

```java
static ThreadLocal<Integer> threadLocal = ThreadLocal.withInitial(() -> 0);;
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

T1 通过 CAS 修改 Lock 的 MarkWord 的 Lock Identify 为 00, 修改 Lock 的 Markword 的 ptr_to_lock_record 指向 T1 的 LocalRecord Object, 复制 Lock 的 MarkWord 到 LockRecord Object 中, 并且 T1 的 LockRecord Object 也会存储了一个 Pointer 指向 Lock

T2 通过 CAS 尝试修改 ptr_to_lock_record 指向 T2 的 LockRecord Object. 如果修改成功, 则表示 T2 抢到了 Lock. 如果 T2 尝试了多次 Spining 后, 还是没修改成功, 则会升级 Light Lock 为 Heavy Lock

T1 释放 Lock 时, 会将 Displaced MarkWord 复制到 MarkWord 中. 如果复制成功, 则本次 Sync 结束. 如果复制失败, 则说明 Light Lock 升级为 Heavy Lock 了, 此时 T1 会释放 Lock, 唤醒其他 Blocing Thread, 一起竞争 Heavy Lock

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

JMM (Java Memory Model) 是一个 standard, 规定所有的 variable 都存储在 memory 中, 并且规定了 variable 的访问方式, 保证了 multithreaded program 在不同 CPU, 不同 OS 下, 访问 memory 时达到一致的访问效果, 实现 Atomicity, Visibility, Orderliness

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

- T1 进行 Object Creation 时, JVM 将 Reference Points to Memory 重排序到了 Object Initialization 之前
- T2 又来访问, 发现 Reference 不为 null, 就会直接拿走, 但是此时 T1 还没有执行 Object Initialization, T2 直接访问就会导致 NullPointException

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

## LongAdder

LongAdder 专用于高并发场景下, 原子累加一个长整型变量, 与 AtomicLong 相比, AtomicLong 操作 CAS, 每次只有一个 thread 修改成功, 其他的 thread 一直在 Spining, 导致 CPU 消耗过多

在 Low Concurrency 下, LongAdder 只操作 base, 效果和 AtomicLong 没有区别

在 High Concurrency 下, LongAdder 通过 add() 判断是否需要调用 longAcumulate(), 将单个的变量分解成多个独立的单元 Cell, 每个单元都独自维护一个独立的计数值, 首次会新建 2 个 Cell, 效果和 base 相同, 帮助 base 分散压力, 通过 Hash Algo 保证分布均匀, 当 Cell 不够用时, 会每扩容 2 个 Cell, 全部计算完后调用 sum() 叠加 base 和 Cell 得到结果

LongAdder 不保证 Strong Consistency, 有可能在得到 sum 后, 又有 thread 修改了 Cell 导致 Inconsistency

LongAdder, LongAccumulator, DoubleAdder, DoubleAccumulator 低层原理一致, 使用了一种类似于分段锁的机制

# MySQL

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

## Redis Shard

Shard Cluster, 多个 Master, 每个 Master 可以挂载多个 Slave, 每个 Master 负责管理部分 Slot 的数据, Master 之间会不断的通过 PING 去检测彼此健康状态, Client 连接任意一个结点, 请求就会被转发到正确的位置

Redis 共有 16384 个 Slot, 通过 Slot 存储数据, 添加结点, 删除结点, 只需要移动 Slot, 而且移动 Slot 是不需要停止服务的. 存储数据时, 会通过 CRC16 Algo 将 Key 转换成一个 Hash, 再对 16384 取模确定具体存储到哪个 Slot 中. 数据跟 Slot 绑定, 而不跟 Node 绑定, 这样即使 Node 宕机了, 也可以转移 Slot 来恢复数据

如果 Key 有 {} 包裹的部分, 就会根据 {} 里的内容计算 Hash. 如果 Key 没有 {}, 就会直接根据 Key 计算 Hash. 所以想要同一批数据存储在同一个 Slot 中, 就可以通过 {} 赋予共同的前缀

Slot 越少, 压缩比率就越高, 请求头就越小, 占用的带宽就越少, 一般不建议 Redis Cluster 超过 1000 个结点, 所以 16384 个 Slot 绝对够用

Client 发送写请求后, 如果 Master 停机, Slave 还来不及进行 Replication, 就会造成数据丢失

CRC16 Algo 的 source code 在 cluster.c 的 keyHashSlot()

Hashing Algo, hash 按照结点的数量取余, 根据结果存储到对应的结点中, 如果结点数量发生变化, 影响数据的存储

Consistent Hashing Alog, 通过 hash() 控制 Hash 范围, 头尾相连, 构成 Hash Circle, 通过 hash() 计算结点和数据的 Hash, 分布在 Hash Circle 上, 数据沿着顺时针向前寻找到最近的结点, 存储在该结点上. 结点数量发生变化, 只影响一段数据的存储, 但是如果分布不均匀, 数据倾斜, 部分结点的压力会很大

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

Redis 进行 RDB Persistence 时, 会调用 fork() 创建一个子进程, 这个子进程不需要执行 exec(), 而是会直接复制一份父进程的 Page Directory 和 Page Table, 主线程执行完 fork() 就可以继续去处理请求了, 两者相不干扰. 如果主线程想要修改数据, 就会采用 Copy-On-Write 的方式, 给内存中的原始数据加上 ReadOnly Lock, 然后复制一份出来进行修改, 修改完再去修改 Page Table 的指向

- Page Table 中记录了虚拟地址和物理地址的映射, 子进程就可以通过这个 Page Table 去读取数据进行持久化操作了

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

Redis 将写入操作追加到 AOF Buffer 中, 再自动将数据写入到 OS 的 Page Cache 中, 接着执行 fsync() 将 Page Cache 中的数据立刻刷入 (flush) 到 Disk

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

开启 Auto Rewriting 后, 子线程会去读取 Old AOF File, 然后分析命令, 压缩命令, 写入到一个临时文件中. 主线程一直累积命令在缓存中, 正常写入命令到 Old AOF File 中, 保证 Old AOF File 的可用性. 当子线程完成 Rewriting 后, 会发送一个信号给主线程, 主线程再将缓存中的累积的命令追加写入到 New AOF File 中, 再通过 New AOF File 代替 Old AOF File

- 子线程读取 Old AOF File 后, 会将文件内容加载到内存中进行处理, 所以主线程后续修改 Old AOF File 不会对子线程的读取造成影响
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

主线程执行完命令, 将命令写入 AOF Buffer 中, 每隔 1s 就从 AOF Buffer 中读取命令, 进行刷盘, 即 fsync. 主线程写入完后, 会去判断上一次 fsync 耗时, 如果超过 2s, 主线程就会进入堵塞, 等待 fsync 结束, 因为刷盘出了问题, 必须要保证数据的安全

在 Log Rewriting 期间, 进行 AOF, 就有可能因为 AOF 导致主线程堵塞, 可以禁止在 Log Rewriting 期间进行 AOF

```shell
no-appendfsync-on-rewrite yes
```

建议, 设置一个合理的 Log Rewriting 阈值, 避免频繁的 Log Rewriting, 太占用资源了

建议, 预留足够的空间处理 Fork 和 Log Rewring

## Redisson

Redisson 底层通过 Redis 的 SETNX 进行加锁的, A 想要获取锁, 就会尝试通过 SETNX 去修改一个 Key, 如果修改成功, 就认为是成功获取了锁. B 这个时候想要获取锁, 也去尝试修改, 修改不成功就认为是没有获取到锁, B 就会进入自旋, 自旋到一定时间, 就会放弃

Redisson 底层为了防止 A 执行的业务耗时太久, 导致锁的 TTL 到期失效的问题, 就让 Watch Dog 去监听这个锁, 每隔 releaseTime / 3 的时间就去重置 Lock 的过期时间为 releaseTime

Redisson 底层通过 Redis 的 Hash 实现 Reentrant Lock, 存储 Key 为锁名, Field 为线程名, Value 为重入的次数. 重入获取锁时, 就去判断当前线程和锁的拥有者是否为相同, 如果相同, 就让 Value + 1, 释放锁后, 就让 Value - 1, 当 Value 为 0 时, 就认为该线程释放了锁

Redisson 底层所有的操作中, 需要保证原子性的地方, 就会采用 Lua 脚本 (eg: 判断当前线程是否为锁的持有者和释放锁, 这两个操作需要保证原子性, 就会采用 Lua 脚本)

Redisson 底层通过 RedLock 解决 Master-Slave 和 Cluster 环境下, Lock 的一致性问题, 创建分布式锁时, 直接在 n / 2 + 1 个 Redis 实例上创建锁, 即使当前 Redis 实例挂掉了, 也能保证数量的领先, 只会认定数量多的那把锁. 一般不建议采用这种方案, 性能太差, 而且 Redis 遵循的是 AP, 更注重性能, 后续可以通过 MQ 来保证最终一致性, 不在乎这点一致性. 如果非要保证 High Consistency, 就需要结合 Zookeeper 实现 Distributed Lock

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

# MyBatis

## MyBatis Lazy Loading

MyBatis 通过 CGLIB 创建 Proxy Obj, 在需要时去加载关联数据, 提高查询性能, 当调用 getOrderList() 时, 会被 Proxy Obj 的 invoke() 拦截, 判断 orderList 是否为空, 如果为空才去执行 SQL 查询数据, 填充到 orderList, 再去调用 getOrderList() 执行后续逻辑, 实现 Lazy Loading

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401221740212.png)
## MyBatis Cache

Local Cache 基于 PerpetualCache, 本质是一个 HashMap

Lv1 Cache 基于 PerpetualCache, 作用于 Session, 执行 close() 和 flush() 后, 就会清空 Cache (def: enable)

Lv2 Cache 作用于 Namespace 和 Mapper, 不依赖 Session (def: disable)

这里 userMapper1 和 userMapper2 的操作在同一个 Session 下, 所以 userMapper1 执行了 SQL 后, 缓存数据到 Cache 中, userMapper2 再次执行 selectById(1) 就是查询的 Cache 中的数据

```java
SqlSession sqlSession = sqlSessionFactory.openSession();

UserMapper userMapper1 = sqlSession.getMapper(UserMapper.class);
User user = userMapper1.selectById(1);

UserMapper userMapper2 = sqlSession.getMapper(UserMapper.class);
User user = userMapper2.selectById(1);
```

这里 userMapper1 和 userMapper2 的操作在不同的 Session 下, 所以无法共享 Cache

```java
SqlSession sqlSession1 = sqlSessionFactory.openSession();
UserMapper userMapper1 = sqlSession1.getMapper(UserMapper.class);
User user = userMapper1.selectById(1);

SqlSession sqlSession2 = sqlSessionFactory.openSession();
UserMapper userMapper2 = sqlSession2.getMapper(UserMapper.class);
User user = userMapper2.selectById(1);
```

# Spring

## Spring Lifecycle

Starting: 通过 BootstrapContext 启动 Application, 发布 ﻿ApplicationStartingEvent

Environment Prepared: 准备 ﻿Environment Obj, 会发布 ﻿ApplicationEnvironmentPreparedEvent

Context Prepared: 准备 SpringApplication Obj, 加载 Source, 创建 ApplicationContext Obj, 发布 ApplicationContextInitializedEvent

Context Loaded: 刷新 ApplicationContext, 初始化 Bean 的依赖关系, 发布 ApplicationPreparedEvent

Started: 在启动 CommandLineRunner 和 ApplicationRunner 之前, 此时 ApplicationContext 已经被刷新并且所有的 ﻿Spring Bean 都已经被创建, 发布 ApplicationStartedEvent

Ready: 在启动 CommandLineRunner 和 ApplicationRunner 之后, 已经完全启动并准备好接受 HTTP 请求, 发布 ApplicationReadyEvent

Shutdown: 关闭 Application, 完成一些清理工作或者关闭应用所用的资源, 发布 ﻿ContextClosedEvent

Failed: 启动过程中出现错误或异常, 就会发布 ApplicationFailedEvent 表示启动失败

## Bean Lifecycle

Spring 创建 Bean 的过程

- 调用 loadBeanDefinitions() 扫描 XML 或 Annotation 声明的 Bean, 封装成 BeanDefinition Obj 放入 beanDefinitionMap 中, 再遍历 beanDefinitionMap, 通过 createBean() 创建 Bean
- 调用 createBeanInstance() 构建 Bean Instance, 去获取 Constructor, 先准备 Constructor 需要的 Parameter, 再执行 Constructor
- 调用 populateBean() 填充 Bean, 通过 Three-Level Cache 去注入当前 Bean 所依赖的 Bean (通过 @Autowired 注入的 Bean)

Spring 初始化 Bean 的过程

- 调用 initializeBean() 初始化 Bean
- 调用 invokeAwareMethods() 去填充 Bean 实现的 Aware 信息, Bean 有可能实现了 BeanNameAware, BeanFactoryAware 或 ApplicationContextAware 去扩展 Bean (类似于 Neddle, 可以感知到 Bean Lifecycle 中的信息)
- 调用 applyBeanProcessorsBeforeInitialization() 去处理 Bean 实现的 BeanPostProcessor 的 postProcessBeforeInitialization()
- 调用 Bean 中添加了 @PostConstruct 的 Init Method
- 调用 Bean 实现的 InitializingBean 的 afterPropertiesSet()
- 调用 Bean 中添加了 @Bean(initMethod = "initMethod") 的 Init Method
- 调用 applyBeanProcessorsAfterInitialization() 去处理 Bean 实现的 BeanPostProcessor 的 postProcessAfterInitialization(), AOP 动态代理就是由该 Processor 实现的
- 调用 registerDisposableBean() 注册实现了 Disposable 的 Bean, 这样销毁时, 就会自动执行 destroy()
- 调用 addSingleton() 将 Bean 放入 singletonObjects 中, 后续使用 Bean 都是从 singletonObjects 中获取

jSpring 销毁 Bean 的过程

- 调用 Bean 中添加了 @PreDestroy 的 Destroy Method
- 调用 destroyBeans() 遍历 singletonObjects, 逐一销毁所有的 Bean, 这个过程会依次执行 Bean 的 destroy()
- 调用 Bean 中添加了 @Bean(destroyMethod = "destroyMethod") 的 Destroy Method

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401081756800.png)

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

## IOC

IOC (Inversion of Control) 一种设计原则, 用于减小计算机程序中各模块之间的依赖关系. 我们只需要定义一个 Bean 的创建过程, 而真正的创建, 初始化, 装配, 生命周期都由 Container (eg: ApplicationContext, BeanFactory) 管理. 通过 DI 注入对象, 只需要关注自己的核心逻辑, 而不需要关注如何获取其他对象.

IOC 最佳实践了 Singleton 和 Fast Fail, 不仅可以节省大量不必要的对象创建, 防止 GC, 还在项目启动时, 就实例化所有的 Bean, 可以将 Bean 的创建由运行期提前至启动期, 在启动时期就可以检测出问题, 而不是在运行时遇到问题停机. Singleton 是不可变状态, 可以保证线程安全.

IOC 最佳实践了 DIP (Dependence Inversion Principle), 高层模块不直接依赖低层模块, 而是依赖低层模块的抽象, 低层模块去实现抽象 (eg: Controller 通过 Service 访问 ServcieImpl), 实现 Decoupling, 同时接口的引入便于后续扩展, 便于引入 Design Pattern (JDK's Dynamic Proxy).

## Spring AOP

AOP (Aspect-Oriented Programming) 是面向切面编程, 可以不修改源代码的情况下, 抽取并封装一个可重用的模块, 可以同时作用于多个方法, 减少模块耦合的同时, 扩展业务功能. 可用于记录操作日志, 处理缓存, 事务处理

OOP 可以解决 Class 级别的代码冗余问题, AOP 可以解决 Method 级别的代码冗余问题.

Bean Lifecycle 的 postProcessAfterInitialization 阶段, 会调用 BeanPostProcessor 的实现类 AbstractAutoProxyCreator 的 postProcessAfterInitialization(), 先判断 Bean 是否需要实现 Dynamic Proxy, 如果需要则会去根据当前 Bean 是否有 Interface 选择是采用 JDK 还是 CGLib 实现 Dynamic Proxy.

Spring 底层的 TRX 就是通过 AOP 实现的, 通过 Surround 的方式扩展, 在方法开启前开启事务, 在方法结束后提交事务, 无侵入, 碉堡了 !!!

## AspectJ AOP

Aspecjt AOP 通过 Weaver (AspectJ Aop 自己的 Compiler), 将 @Before, @After, @Around 的代码编译成字节码织入到目标方法的字节码文件中, 即 AspectJ AOP 在编译器期间就完成了增强, 而 Spring AOP 是通过 Dynamic Proxy 实现了目标方法的增强.

AspectJ AOP 支持在方法调用, 方法内调, 构造器调用, 字段设置, 获取等级别的织入, 更加灵活强大.

AspejcJ AOP 不需要借助 Dynamic Proxy, 而是直接编译成字节码, 所以性能也要好很多.

## Auto Configuration

导入 Dependency 的 starter pkg 后, 会自动导入该 Dependency 的 autoconfigure pkg (eg. 导入 spring-boot-stater 后, 会自动导入 spring-boot-autoconfigure)

App.java 的 @EnableAutoConfiguration 底层包含 @Import({AutoConfigurationImportSelector.class}), 根据 SPI 访问 META-INF/spring/%s.imports (eg. META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports), 动态加载 Component

%s.imports 包含该 Dependency 提供的所有 Configuration (eg. xxx.AutoConfiguration.imports 包含 xxx.aop.AopAutoConfiguration, xxx.amqp.RabbitAutoConfiguration), Configuration 包含 @Import({xxxSelector.class}) 通过 @Condition 按条件导入 Bean, 实现 Auto Configuration

通过 Auto Configuration 导入的 Configuration 用到的 Properties Obj 可以在 application.properties 中配置

## Three-Level Cache

Spring 的 DefaultSingletonBeanRegistry Cls 中声明了 singletonObjects (ConcurrentHashMap), earlySingletonObjects (ConcurrentHashMap) 和 singletonFactories (HashMap) 用于实现 Three-Level Cache

- singletonObjects 是 Lv1 Cache, 存放经历了完整 Life Cycle 的 Bean Obj
  - singletonObjects 的 Key 为 Bean Name, Val 为 Bean Obj
  - 通过 applicationContext.getBean() 获取 Bean 就是访问 singletonObjects 这个 Map
- earlySingletonObjects 是 Lv2 Cache, 存放未经历完整 Life Cycle 的 Bean Obj, 解决 Circurlar Reference 的关键
- singletonFactories 是 Lv3 Cache, 存放各种 Bean 的 ObjectFactory, 可以用来创建 Normal Obj 或 Proxy Obj
  - singletonFactories 是 HashMap, 而不是 ConcurrentHashMap, 因为 singletonFactories 通常只在 Bean 的创建过程中使用, 一旦 Bean 创建完成, 即使有多线程对创建好的 Bean 进行访问, 访问的是 singletonObjects, 而不是 singletonFactories, 不存在线程安全问题.

```java
// Lv1 Cache
private final Map<String, Object> singletonObjects = new ConcurrentHashMap(256);
// Lv2 Cache
private final Map<String, Object> earlySingletonObjects = new ConcurrentHashMap(16);
// Lv3 Cache
private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap(16);
```

Spring 的 DefaultSingletonBeanRegistry Cls 中声明了 singletonsCurrentlyInCreation (Collections.newSetFromMap(new ConcurrentHashMap<>(16))) 存储正在创建过程中的 Bean, 用来判断是否存在 Circular Reference.

```java
private final Set<String> singletonsCurrentlyInCreation = 
    Collections.newSetFromMap(new ConcurrentHashMap<>(16));
```

Spring 通过 Three-Level Cache 解决了大部分的 Circular Reference, 需要使用 A 时, 会执行下面的步骤

- 调用 getBean() 获取 A, 依次查询 singletonObjects, earlySingletonObjects 和 singletonFactories, 未查询到 A Cache, 调用 getSingleton() 创建 A

  - 调用 beforeSingletonCreation() 添加 A 到 singletonsCurrentlyInCreation 中, 表示 A 正在创建过程中
  - 调用 singleFactory.getObject() 通过 Reflect 创建 A Obj, 此时 A Obj 的成员都是空的, 即 A 引用的 B 也是空的
  - 生成 A 的 ObjectFactory 存入 singletonFactories, ObjectFactory 本质是一个 Lambda, 可用于动态创建 A 的 Normal Obj 或 Proxy Obj
  - 通过 BeanPostProcessor 发现 A 依赖 B, 需要去创建 B

- 调用 getBean() 获取 B, 依次查询 singletonObjects, earlySingletonObjects 和 singletonFactories, 未查询到 B Cache, 调用 getSingleton() 创建 B

  - 调用 beforeSingletonCreation() 添加 B 到 singletonsCurrentlyInCreation 中
  - 调用 singleFactory.getObject() 通过 Reflect 创建 B Obj, 此时 B Obj 的成员都是空的, 即 B 引用的 A 也是空的
  - 生成 B 的 ObjectFactory 存入 singletonFactories
  - 通过 BeanPostProcessor 发现 B 依赖 A, 并发现 A 也在 singletonsCurrentlyInCreation 中, 说明 A 和 B 存在 Circular Reference, 需要去处理 Circular Reference

- 调用 getBean() 获取 A, 依次查询 singletonObjects, earlySingletonObjects 和 singletonFactories, 从 singletonFactories 中获取到 A 的 OpenFactory, 执行 Lambda 创建 A Obj 放入 earlySingletonObjects, 并移除 singletonFactories 中 A 的 OpenFactory

  - 如果 C 引用了 A, 直接从 earlySingletonObjects 获取 A 即可, 不需要再通过 A 的 OpenFactory 获取 A Obj 了

- 调用 populateBean() 填充 B 依赖的 A, 此时 B 创建完成, 向 singleObjects 添加 B, 从 singletonsCurrentlyInCreation 和 singletonFactories 移除 B

  - 如果再使用 B, 就可以直接从 singleObjects 中获取

- 调用 populateBean() 填充 A 依赖的 B, 此时 A 创建完成, 向 singleObjects 添加 A, 从 singletonsCurrentlyInCreation 和 earlySingletonObjects 移除 A


![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401152302912.png)

Transaction ACID

Atomicity 是指一个 TRX 是一个不可分割的工作单元, 要么全成功提交, 要么全失败回滚, 成王败寇, 没有妥协之说, 通过 Undo Log 保证.

Consistency 是指数据需要从一个合法性状态变化到另一个合法性状态, 这个合法是业务层面的合法 (eg: A 扣钱, 扣成了负数, 则不符合业务层面的要求, 即不合法). 

Isolation 是指一个 TRX 内部使用到的数据对其他 TRX 隔离, 不会受到其他 TRX 的影响, 通过 MVCC 保证.

Durability 是指一个 TRX 一旦被提交, 它对数据库中数据的改变就是永久性的, 通过 Redo Log 保障的, 先将数据库的变化信息记录到 Redo Log 中, 再对数据进行修改, 这样做, 即使数据库崩掉了, 也可以根据 Redo Log 进行恢复.

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

BASE: 对 CAP 的一种解决方案, 结点之间形成分区后, 允许 Partial Availability, 要求 Core Availability, 允许 Temporary Incosistency, 要求 Eventual Consistency

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

## Three Phase Commit

Three Phase Commit (3PC) 对 Two Phase Commit 进行了优化, 引入了 Timeout 和 CanCommit Phase, 以避免阻塞和单点故障问题

- CanCommit Phase: TC 向所有 RM 发送 CanCommit 请求询问是否可以提交事务, RM 返回 Yes / No
- PreCommit Phase: 如果所有 RM 都返回 Yes, TC 向 RM 发送 PreCommit 请求, 接收到请求的 RM 表示接受 TC 的决定, 并回复 ACK
- doCommit Phase: TC 收到 RM 的 ACK 后, 向所有 RM 发送 doCommit 请求, RM 接受到请求后进行真正的事务提交并回复 ACK

Three Phase Commit 的任一阶段, 只要有 RM 回复 No 或者超时未回复, TC 都会向所有 RM 发送 Abort 请求, 所有 RM 在执行完事务的回滚操作后回复 ACK

Three Phase Commit 中的 TC 出现单点故障, 无法通知 RM 进行提交, 则 RM 会在等待一段时间后自动提交事务, 但是这也会导致一些问题. 如果某一个 RM 出现异常, 返回了 No, 刚好此时 TC 单点故障, 则会导致其他 RM 超时后自动提交, 造成不一致

Three Phase Commit 虽然解决了 Two Phase 的一些问题, 但是增加了一次网络往返, 而且在处理网络分区和多数故障的情况下, Three Phase Commit 也无法保证一致性, 当前实际使用中更常见的是使用具有超时和故障恢复机制的 Two Phase Commit (eg: Paxos, Raft)

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

# Computer

## Thread, Process

进程是正在运行程序的实例, 进程包含多个线程, 每个线程执行不同的任务, 不同的进程使用不同的内存空间, 在当前进程下的所有线程可以共享内存空间

线程是进程内一个相对独立的, 最小执行单元, 线程更轻量, 线程上下文切换成本一般上要比进程上下文切换低, 上下文切换指的是从一个线程切换到另一个线程

# Project

## 断点续传

- 前端调用浏览器的 API 对大文件进行分块, 每次上传分块文件前请求后端查询该分块是否已经存在后端, 如果不存在, 则不上传这一块了
- 后端接受到分块后, 保存在 service 本地, 如果出现异常, 就返回该分块的序号给前端, 通知他重新上传
- 前端全部上传完之后, 再发送一个请求给后端, 后端将保存在本地的分块文件进行合并, 再上传完整文件到 MINIO 中
  - 也可以直接将分块上传到 MINIO 中, 合并时就直接调用一个 API 通知 MINIO 进行合并
- 完整文件存储形式 `"/" + fileMd5.charAt(0) + "/" + fileMd5.charAt(1) + "/" + fileMd5 + "/" + fileName`
- 分块文件存储形式 `"/" + fileMd5.charAt(0) + "/" + fileMd5.charAt(1) + "/" + fileMd5 + "/" + chunkNo;`

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
- 通过 INCR, DECR 统计验证码, 1h 过期, 超过 3 次, 就拒绝访问

## 分布式登录状态同步

分布式登录状态同步：通过 Redis + JWT + Hash 解决分布式环境下登录状态同步的问题, 通过 Redis + Hash 存储用户的 Token, 限制 Token 数量, 并通过 Redis 维护了一个黑名单拦截报废的 Token.

- 用户登入后, 会存储到一个 Hash 中, Key 为 `token:login:<userid>`, Field 为 Create Time, Val 为 Token, 每次存储 New Token 前会先判断 Hash 存储的 Token 数量是否达到了存储上限, 如果达到了, 就移除 Oldest Token, 并将该 Oldest Token 加入 BlackList
- 用户登出后, 需要删除 Hash 中的 Token, 并且将 Token 加入 BlackList
- 拦截器拒绝该 BlackList 中 Token 的访问

分布式登录状态同步：通过 Redis + JWT + List 解决分布式环境下登录状态同步的问题

- lpush 添加 token, 执行 ltrim 保留 0 ~ 2 的 token, 删除超出的 token
- 每次请求都查询一次 Redis 都 Token list, 对比 token 是否相同
- 也不需要通过 XXL-JOB 来实现周期性删除 Redis 中过期的 Token

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
