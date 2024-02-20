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

每一个线程都有一个关联的 ThreadLocal.ThreadLocalMap 用于存储线程局部变量, 每创建一个 ThreadLocal Obj, 就会创建一个 Entry, Key 指向 ThreadLocal Obj, Val 为 ThreadLocal Obj 维护的局部变量的副本, 通过 ThreadLocal Obj 的 get() 和 set() 就会去操作当前线程的 ThreadLocalMap 中存储的副本, 不影响其他线程, 保证了线程安全

JDK7 中, ThreadLocal 维护 ThreadLocal.ThreadLocalMap Obj, 如果 Thread Obj 销毁后, ThreadLocal Obj 没有销毁, 内部的 ThreadLocalMap Obj 就不会销毁, 导致 Memory Leak

JDK8 中, Thread 维护 ThreadLocal.ThreadLocalMap Obj, 当 Thread Obj 销毁后, ThreadLocalMap Obj 也会一块销毁, 避免了 Memory Leak

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

ThreadLocalMap 的 Entry 继承了 WeakReference, 所有的 Key 都是通过 Weak Ref 指向 ThreadLocal Obj

当 Thread Obj 不再引用 ThreadLocal Obj 后, 只有 ThreadLocalMap 中的 Key 通过 Weak Ref 引用 ThreadLocal Obj, 只要发生 GC, 就会断开 Weak Ref, 当 Thread Obj 销毁后, 就会断开 ThreadLocalMap Obj 和 ThreadLocal Obj 的 Strong Ref, 就会一块销毁 ThreadLocalMap Obj 和 Thread Local Obj

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202402021217146.png)

# Thread Pool Memory Leak

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

# Shared Variable

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

# UserContext

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