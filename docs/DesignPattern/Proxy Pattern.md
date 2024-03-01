# Proxy Pattern

通过 proxy object 访问 target object, 可以在 proxy object 中做中间处理, 保护 target object, 增强 target object 的 method, 使 client 和 target object 分离, 做到一定程度的 decoupling

# Static Proxy Pattern

Static Proxy Pattern 的 Proxy Object 是在 Compile Stage 生成的, 

```java
public class Main {
    public static void main(String[] args) {
        new TrainStationProxy(new TrainStation()).sellTickets();
    }
}

interface Ticket {
    void sellTickets();
}

class TrainStation implements Ticket {
    @Override
    public void sellTickets() {
        System.out.println("sell tickets");
    }
}

class TrainStationProxy implements Ticket {
    private TrainStation trainStation;
    
    public TrainStationProxy(TrainStation trainStation) {
        this.trainStation = trainStation;
    }
    
    @Override
    public void sellTickets() {
        System.out.println("Before static proxy");
        trainStation.sellTickets();
        System.out.println("After static proxy");
    }
}
```

# Dynamic Proxy Pattern

Dynamic Proxy Pattern 的 Proxy Object 是在 Runtime Stage 生成的, 当 Interface 的 Method 过多时, 可以通过 InvocationHandler.invoke() 统一处理, 不需要再去单独配置 Method 作 Proxy

通过 JDK 实现 Dynamic Proxy Pattern

```java
public class Main {
    public static void main(String[] args) {
        Ticket trainStation = new TrainStation();
        Ticket trainStationProxy = (Ticket) Proxy.newProxyInstance(
            trainStation.getClass().getClassLoader(),
            trainStation.getClass().getInterfaces(),
            new InvocationHandler() {
                @Override
                public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                    System.out.println("Before method invoked");
                    Object result = method.invoke(trainStation, args);
                    System.out.println("After method invoked");
                    return result;
                }
            }
        );
        trainStationProxy.sellTickets();
    }
}

interface Ticket {
    void sellTickets();
}

class TrainStation implements Ticket {
    @Override
    public void sellTickets() {
        System.out.println("sell tickets");
    }
}
```

Proxy.newProxyInstance() 的底层是创建一个 Anonymous Inner class 继承 Proxy, 实现 Interface, 通过 Reflect 调用 Method

```java
public class Proxy {
    protected InvocationHandler h;

    protected Proxy(InvocationHandler h) {
        this.h = h;
    }
}

public class $Proxy0 extends Proxy implements Ticket {
    private static Method m;
    
    static {
        m = Class.forName("com.harvey.Ticket").getMethod("sellTickets", new Class[0]);
    }

    public $Proxy0 (InvocationHandler invocationHandler) {
        super(invocationHandler);
    }

    public final void sellTickets() {
        this.h.invoke(this, m, null);
    }
}
```
