# Strategy Pattern

```java
public class Main {
    public static void main(String[] args) {
        new SalesMan(new StrategyA()).show();
        new SalesMan(new StrategyB()).show();
    }
}

interface Strategy {
    void show();
}

class StrategyA implements Strategy {
    public void show() {
        System.out.println("hello world");
    }
}

class StrategyB implements Strategy {
    public void show() {
        System.out.println("hello world");
    }
}

class SalesMan {
    private Strategy strategy;
    
    public SalesMan(Strategy strategy) {
        this.strategy = strategy;
    }
    
    public void show() {
        this.strategy.show();
    }
}
```

