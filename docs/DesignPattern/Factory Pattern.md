# Factory Pattern

通过 new 获取 object, 存在 high coupling, 修改 class, 就需要修改每个 new 的地方, 违背了 Open-Closed Principle

通过 Factory Pattern 获取 object, client 只需要访问 factory, 修改 class 后, 只需要修改 factory 即可, 实现 decoupling

# Simple Factory Pattern

```java
class CoffeeFactory {
    public Coffee createCoffee(String type) {
        if (type.equals("american")) {
            return new AmericanCoffee();
        } else if (type.equals("italy")) {
            return new ItalyCoffee();
        }
        return null;
    }
}
```

# Factory Method Pattern

```java
interface CoffeeFactory {
    Coffee createCoffee();
}

class ItalyCoffeeFactory implements CoffeeFactory {
    public Coffee createCoffee() {
        return new ItalyCoffee();
    }
}

class AmericanCoffeeFactory implements CoffeeFactory {
    public Coffee createCoffee() {
        return new AmericanCoffee();
    }
}
```

# Abstract Factory Pattern

```java
interface DessertFactory {
    Coffee createCoffee();
    Mousse createMousse();
}

class AmericanDessertFactory implements DessertFactory {
    @Override
    public Coffee createCoffee() {
        return new AmericanCoffee();
    }
    
    @Override
    public Mousse createMousse() {
        return new AmericanMousse();
    }
}

class ItalyDessertFactory implements DessertFactory {
    @Override
    public Coffee createCoffee() {
        return new ItalyCoffee();
    }
    
    @Override
    public Mousse createMousse() {
        return new ItalyMousse();
    }
}
```

# Load Properties

```properties
america=com.harvey.AmericanCoffee
italy=com.harvey.ItalyCoffee
```

```java
class CoffeeFactory {
    private static Map<String, Coffee> map = new HashMap<>();
    
    static {
        Properties properties = new Properties();
        try {
            properties.load(CoffeeFactory.class.getClassLoader().getResourceAsStream("application.properties"));
            
            for (Map.Entry<Object, Object> property : properties.entrySet()) {
                String className = (String) property.getKey();
                Coffee coffee = (Coffee) Class.forName((String) property.getValue()).getDeclaredConstructor().newInstance();
                map.put(className, coffee);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    
    public static Coffee createCoffee(String type) {
        return map.get(type);
    }
}
```