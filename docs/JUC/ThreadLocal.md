# ThreadLocal

ThreadLocal 提供了一系列用于访问和操作线程局部变量的方法, 使得每个线程都可以拥有自己的变量副本, 而不需要考虑线程安全性, 不同的方法之间就不需要通过全局变量实现通信了

```java
ThreadLocal<Integer> threadLocal = ThreadLocal.withInitial(() -> 0);;

for (int i = 0; i < 10; i++) {
    new Thread(() -> {
        try {
            for (int j = 0; j < 10; j++) {
                threadLocal.set(threadLocal.get() + 1);
            }
            System.out.println(Thread.currentThread().getName() + " " + threadLocal.get());
        } finally {
            threadLocal.remove();
        }
    }).start();
}
```

# ThreadLocalMap

每一个 Thread 都有一个关联的 ThreadLocal.ThreadLocalMap 用于存储线程局部变量, 第一次调用 ThreadLocal Obj 的 get(), set() 时, 就会去创建一个 ThreadLocal Obj 的副本 Entry 存储到当前 Thread 的 ThreadLocalMap Obj 中, 后续通过 get(), set() 或 remove() 去操作 ThreadLocal Obj 都是在操作 Entry 副本, 不影响其他线程, 保证了线程安全

```java
public class Thread implements Runnable {
    ThreadLocal.ThreadLocalMap threadLocals = null;
}
```

```java
public class ThreadLocal<T> {
    static class ThreadLocalMap {
        static class Entry extends WeakReference<ThreadLocal<?>> {}
    }
}
```

JDK7 中, ThreadLocal 维护 ThreadLocal.ThreadLocalMap Obj, 如果 Thread Obj 销毁后, ThreadLocal Obj 没有销毁, 内部的 ThreadLocalMap Obj 就不会销毁, 导致 Memory Leak

JDK8 中, Thread 维护 ThreadLocal.ThreadLocalMap Obj, 当 Thread Obj 销毁后, 就会断开对 ThreadLocalMap Obj 的引用, 就会自然的回收 ThreadLocalMap Obj, 避免了 Memory Leak

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403141417049.png)

# Memory Leak

ThreadLocalMap 的 Entry 继承了 WeakReference, 所有的 Key 都是通过 Weak Ref 指向 ThreadLocal Obj, 如果发生 GC, Key 就会断开对 Weak Ref, 此时 Key 为 Null, Val 为 ThreadLocal Obj 的副本

ThreadPool 中的线程不会销毁, 所以就不会断开对 ThreadLocalMap Obj 的 Strong Ref, 就无法销毁 ThreadLoacalMap Obj, 所以存储的 Entry 就不会销毁, 这会导致 Entry 的 Val 一直存储着之前 ThreadLocal Obj 的副本, 导致 Memory Leak

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202403141345757.png)

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

# Dirty Read

这里 T1 和 T2 是两个不同的线程, 第一次调用 set(), get() 或 remove() 时, 都会去创建一个 ThreadLocalMap Obj, 然后存储 userId 的副本, 所以相互之间不会有任何影响

```java
private static final ThreadLocal<Integer> userId = ThreadLocal.withInitial(() -> null);

public static void main(String[] args) {
    new Thread(() -> {
        userId.set(1);
        System.out.println(Thread.currentThread().getName() + " get " + userId.get()); // t1 get 1
    }, "t1").start();
    try { TimeUnit.SECONDS.sleep(1); } catch (InterruptedException e) { e.printStackTrace(); }
    new Thread(() -> {
        System.out.println(Thread.currentThread().getName() + " get " + userId.get()); // t2 get null
    }, "t2").start();
}
```

因为 ThreadLocal Obj 没有销毁, 所以 ThreadPool 中的 Thread 的 ThreadLocalMap Obj 的 Entry 的 Key 一直指向该 ThreadLocal Obj, 导致第二次循环时, 同一个 Thread 依旧访问的是同一个 ThreadLocal Obj, 从而导致了脏读

```java
private static final ThreadLocal<Integer> userId = ThreadLocal.withInitial(() -> null);

public static void main(String[] args) {
    ExecutorService threadPool = Executors.newFixedThreadPool(1);
    threadPool.submit(() -> {
        userId.set(1);
        System.out.println(Thread.currentThread().getName() + " get " + userId.get()); // pool-1-thread-1 get 1
    });
    try { TimeUnit.SECONDS.sleep(1); } catch (InterruptedException e) { e.printStackTrace(); }
    threadPool.submit(() -> {
        System.out.println(Thread.currentThread().getName() + " get " + userId.get()); // pool-1-thread-1 get 1
    });
    threadPool.shutdown();
}
```

这里通过 remove() 去清除了 ThreadLocalMap 中该 ThreadLocal Obj 的副本, 第二次执行任务时, 在 ThreadLocalMap 中找不到该 ThreadLocal Obj 的副本, 就会去创建一个 ThreadLocal Obj 的副本, 从而解决了 Dirty Read 问题

```java
private static final ThreadLocal<Integer> userId = ThreadLocal.withInitial(() -> null);

public static void main(String[] args) {
    ExecutorService threadPool = Executors.newFixedThreadPool(1);
    threadPool.submit(() -> {
        userId.set(1);
        System.out.println(Thread.currentThread().getName() + " get " + userId.get()); // pool-1-thread-1 get 1
        userId.remove();
    });
    try { TimeUnit.SECONDS.sleep(1); } catch (InterruptedException e) { e.printStackTrace(); }
    threadPool.submit(() -> {
        System.out.println(Thread.currentThread().getName() + " get " + userId.get()); // pool-1-thread-1 get null
    });
    threadPool.shutdown();
}
```

# InheritableThreadLocal

InheritableThreadLocal 是 ThreadLocal 的一个扩展, 它不仅提供了线程局部变量, 而且还能将父线程的局部变量值传递给子线程, 这意味着当一个线程创建一个新的线程时, InheritableThreadLocal 可以将父线程中的局部变量的值传递给子线程的局部变量

ThreadLocal 仅限于当前线程, 而 InheritableThreadLocal 允许父线程向子线程传递变量

```java
ThreadLocal<Integer> userId = new ThreadLocal<>();
userId.set(1);
new Thread(() -> {
    System.out.println(userId.get()); // null
}).start();
```

```java
InheritableThreadLocal<Integer> userId = new InheritableThreadLocal<>();
userId.set(1);
new Thread(() -> {
    System.out.println(userId.get()); // 1
}).start();
```

使用 InheritableThreadLocal 在父线程和子线程之间共享用户会话信息

```java
private static final InheritableThreadLocal<String> sessionInfo = new InheritableThreadLocal<>();

public static void main(String[] args) {
    sessionInfo.set("UserSessionID: 123456");

    System.out.println("Par Thread: " + sessionInfo.get());

    new Thread(() -> {
        System.out.println("Sub Thread: " + sessionInfo.get());
    }).start();

    sessionInfo.remove();
}
```

Thread 底层维护了一个 `ThreadLocal.ThreadLocalMap inheritableThreadLocals`, Thread 的 init() 中进行线程的初始化时, 会根据 `boolean inheritThreadLocals` 判断是否需要处理 InheritableThreadLocal, 然后根据父线程的 InheritableThreadLocal 进行配置

```java
public class Thread implements Runnable {
    ThreadLocal.ThreadLocalMap threadLocals = null;
    ThreadLocal.ThreadLocalMap inheritableThreadLocals = null;
}
```

```java
private void init(ThreadGroup g, Runnable target, String name,
                  long stackSize, AccessControlContext acc,
                  boolean inheritThreadLocals) {
    // 这里的 currentThread() 是父线程 (当前执行 init() 的线程), this 是子线程 (正在被创建的线程)
    Thread parent = currentThread();
    
    if (inheritThreadLocals && parent.inheritableThreadLocals != null)
        this.inheritableThreadLocals =
            ThreadLocal.createInheritedMap(parent.inheritableThreadLocals);

    // ...
}
```

通过 get(), set(), remove() 操作的 ThreadLocal 时都会去调用 getMap() 获取 ThreadLocalMap, 从而来操作 Entry 副本

InheritableThreadLocal 继承 ThreadLocal, 也重写了 ThreadLocal 的 getMap(), 所以调用的其实是 InheritableThreadLocal 的 getMap(), 返回的是 inheritableThreadLocals 而不是 threadLocals 了

```java
public class ThreadLocal<T> {
    public T get() {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        // Do something with the map
    }
}
```

```java
public class InheritableThreadLocal<T> extends ThreadLocal<T> {
    ThreadLocalMap getMap(Thread t) {
       return t.inheritableThreadLocals;
    }
}
```

# Exercise Shared Variable

这里线程池中的多个线程共享同一个变量, 当一个线程修改了该变量的值时, 其他线程也会受到影响, 导致数据不一致性和竞争条件

```java
private static int sharedCounter = 0;

public static void main(String[] args) {
    ExecutorService executorService = Executors.newFixedThreadPool(5);

    for (int i = 0; i < 5; i++) {
        executorService.submit(() -> {
            for (int j = 0; j < 3; j++) {
                sharedCounter++;
                System.out.println("Thread " + Thread.currentThread().getId() + ": " + sharedCounter);
            }
        });
    }

    executorService.shutdown();
}
```

这里使用 ThreadLocal 可以有效解决共享变量问题, 实现线程局部变量的隔离

```java
private static ThreadLocal<Integer> threadLocalCounter = ThreadLocal.withInitial(() -> 0);

public static void main(String[] args) {
    ExecutorService executorService = Executors.newFixedThreadPool(5);

    for (int i = 0; i < 5; i++) {
        executorService.submit(() -> {
            for (int j = 0; j < 3; j++) {
                int localCounter = threadLocalCounter.get();
                localCounter++;
                threadLocalCounter.set(localCounter);
                System.out.println("Thread " + Thread.currentThread().getId() + ": " + localCounter);
            }
        });
    }

    executorService.shutdown();
}
```

# Exercise UserContext

在多线程的 Web 应用中, 多个请求可能会被同一个线程处理, 如果用户上下文信息直接存储在共享变量中, 不使用 ThreadLocal 进行隔离, 那么不同的请求可能会共享相同的用户上下文信息, 导致状态混乱

通过 ThreadLocal 创建了一个线程局部的 User, 确保每个线程都有独立的用户上下文信息, 这样可以避免共享状态和线程安全问题, 保证了在多线程环境下正确隔离用户上下文信息

```java
public class UserContext {
    private static final ThreadLocal<User> userThreadLocal = new ThreadLocal<>();

    public static void setUser(User user) {
        userThreadLocal.set(user);
    }

    public static User getUser() {
        return userThreadLocal.get();
    }

    public static void removeUser() {
        userThreadLocal.remove();
    }
}
```