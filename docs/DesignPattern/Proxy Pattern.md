# Proxy Pattern

通过 proxy object 访问 target object, 可以在 proxy object 中做中间处理, 保护 target object, 增强 target object 的 method, 使 client 和 target object 分离, 做到一定程度的 decoupling

# Static Proxy Pattern

Static Proxy Pattern 的 proxy object 是在 Compile Stage 生成的

```java
class TrainStation {
    void sellTickets() {}
}

class TrainStationProxy {
    TrainStation trainStation = new TrainStation();
    
    public void sellTickets() {
        TrainStation.sellTickets();;
    }
}
```

# Dynamic Proxy Pattern

Dynamic Proxy Pattern 的 proxy object 是在 Runtime Stage 生成的, 当 interface 的 method 过多时, 可以通过 InvocationHandler.invoke() 统一处理, 不需要再去单独配置 method 作 proxy

通过 JDK 实现 Dynamic Proxy Pattern

```java
public class Main {
    public static void main(String[] args) throws Exception {
        new TrainStationProxy().sellTickets("window 1", "harvey"); // window 1 sells a ticket to harvey
    }
}

interface Ticket {
    void sellTickets(String window, String username);
}

class TrainStation implements Ticket {
    public void sellTickets(String window, String username) {
        System.out.println(window + " sells a ticket to " + username);
    }
}

class TrainStationProxy {
    TrainStation trainStation = new TrainStation();
    
    public void sellTickets(String window, String username) {
        // Object newProxyInstance(ClassLoader loader, Class<?>[] interfaces, InvocationHandler h)
        Ticket proxyObject = (Ticket) Proxy.newProxyInstance(TrainStation.getClass().getClassLoader(), TrainStation.getClass().getInterfaces(), (proxy, method, args) -> {
            return method.invoke(trainStation, args);
        });
        
        proxyObject.sellTickets(window, username);
    }
}
```

Proxy.newProxyInstance() 的底层是创建一个 anonymous inner class 继承 Proxy, 实现 interface, 通过 reflect 调用 method

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

