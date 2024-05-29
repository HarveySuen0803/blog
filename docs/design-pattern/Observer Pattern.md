# Observer Pattern

Publisher 内部维护一个 consumerList, Consumer 来注册, 通过 Pulisher 可以发送集体通知

```java
public class Main {
    public static void main(String[] args) {
        Consumer consumerA = new ConsumerA();
        Consumer consumerB = new ConsumerB();
        
        Publisher publisher = new Publisher();
        publisher.register(consumerA);
        publisher.register(consumerB);
        
        publisher.fanout("hello world");
    }
}

class Publisher {
    private List<Consumer> consumerList = new ArrayList<>();
    
    public void register(Consumer consumer) {
        consumerList.add(consumer);
    }
    
    public void fanout(String msg) {
        for (Consumer consumer : consumerList) {
            consumer.consume(msg);
        }
    }
}

interface Consumer {
    void consume(String msg);
}

class ConsumerA implements Consumer {
    @Override
    public void consume(String msg) {
        System.out.println(msg);
    }
}

class ConsumerB implements Consumer {
    @Override
    public void consume(String msg) {
        System.out.println(msg);
    }
}
```