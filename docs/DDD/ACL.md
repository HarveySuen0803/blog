# ACL

防腐层 (Anti-Corruption Layer, ACL) 是领域驱动设计（DDD）中的一个重要概念，用于保护系统的领域模型不受外部系统的影响。防腐层通过适配器模式将外部系统的数据和行为转换为领域模型内的表示和操作，从而确保领域模型的纯洁性。

- 防止领域模型被侵蚀：通过防腐层，可以避免外部系统对领域模型的直接依赖和影响。
- 适配器模式：防腐层通常使用适配器模式，将外部系统的接口和数据格式转换为领域模型的接口和数据格式。
- 缓存与兜底策略：为了提高性能和可靠性，防腐层可以使用缓存以减少对外部系统的调用，并在外部系统不可用时提供兜底策略。

假设我们有一个电商系统，需要与一个外部库存管理系统集成。我们将使用防腐层来处理外部库存系统的集成，并使用适配器模式、缓存和兜底策略进行优化。

# Encap External Service

首先定义一个领域接口，用于领域模型与外部系统的交互。

```java
public interface InventoryService {
    int getAvailableStock(String productId);
}
```

假设我们有一个外部系统的库存服务接口和一个模拟实现：

```java
public interface ExternalInventorySystem {
    int fetchStock(String externalProductId);
}

public class ExternalInventorySystemImpl implements ExternalInventorySystem {
    @Override
    public int fetchStock(String externalProductId) {
        // 模拟调用外部系统获取库存信息
        return 100; // 假设每个产品都有100个库存
    }
}
```

定义一个适配器，将外部库存系统的接口转换为领域接口：

```java
public class ExternalInventoryAdapter implements InventoryService {
    private final ExternalInventorySystem externalInventorySystem;

    public ExternalInventoryAdapter(ExternalInventorySystem externalInventorySystem) {
        this.externalInventorySystem = externalInventorySystem;
    }

    @Override
    public int getAvailableStock(String productId) {
        // 转换内部产品ID到外部系统的产品ID
        String externalProductId = convertToExternalProductId(productId);
        return externalInventorySystem.fetchStock(externalProductId);
    }

    private String convertToExternalProductId(String productId) {
        // 模拟转换逻辑
        return "EXT-" + productId;
    }
}
```

为了优化性能，我们实现一个带缓存和兜底策略的防腐层。

```java
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class CachingInventoryService implements InventoryService {
    private final InventoryService delegate;
    private final Map<String, Integer> cache = new ConcurrentHashMap<>();

    public CachingInventoryService(InventoryService delegate) {
        this.delegate = delegate;
    }

    @Override
    public int getAvailableStock(String productId) {
        return cache.computeIfAbsent(productId, key -> {
            try {
                return delegate.getAvailableStock(productId);
            } catch (Exception e) {
                // 兜底策略：在外部系统调用失败时返回一个默认值
                return 0;
            }
        });
    }
}
```

将防腐层集成到领域服务中，并在客户端代码中使用：

```java
public class OrderService {
    private final InventoryService inventoryService;

    public OrderService(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    public void placeOrder(String productId, int quantity) {
        int availableStock = inventoryService.getAvailableStock(productId);
        if (availableStock >= quantity) {
            System.out.println("Order placed for product " + productId + " with quantity " + quantity);
        } else {
            System.out.println("Insufficient stock for product " + productId);
        }
    }
}

// 客户端代码
public class Main {
    public static void main(String[] args) {
        // 初始化外部库存系统和适配器
        ExternalInventorySystem externalInventorySystem = new ExternalInventorySystemImpl();
        InventoryService inventoryService = new ExternalInventoryAdapter(externalInventorySystem);

        // 包装为带缓存的库存服务
        InventoryService cachingInventoryService = new CachingInventoryService(inventoryService);

        // 使用领域服务
        OrderService orderService = new OrderService(cachingInventoryService);

        // 执行订单操作
        orderService.placeOrder("123", 10);
    }
}
```

代码解释：

- 统一领域接口：﻿InventoryService 提供领域内的库存服务接口。
- 外部系统接口：﻿ExternalInventorySystem 提供外部库存系统的接口。
- 防腐层适配器：﻿ExternalInventoryAdapter 实现了 ﻿InventoryService 接口，并将领域内的调用转换为对外部系统的调用。
- 缓存与兜底策略：﻿CachingInventoryService 在调用防腐层适配器时增加了缓存和兜底策略，从而提高性能和可靠性。
- 领域服务：﻿OrderService 使用 ﻿InventoryService 进行库存检查和订单操作。
- 客户端代码：初始化并使用不同的服务和适配器，实现对外部系统的集成而不会影响领域模型。

通过这种架构设计，我们成功将外部系统的接口与领域模型解耦，通过防腐层（ACL）保护领域模型，确保领域逻辑的纯洁性和稳定性，同时使用缓存和兜底策略提高系统性能和可靠性。

# Encap Kafka

在这个案例里，我们通过封装一个抽象的AuditMessageProducer和AuditMessage DP对象，实现对底层kafka实现的隔离：

```java
@Value
@AllArgsConstructor
public class AuditMessage {

    private UserId userId;
    private AccountNumber source;
    private AccountNumber target;
    private Money money;
    private Date date;

    public String serialize() {
        return userId + "," + source + "," + target + "," + money + "," + date;   
    }

    public static AuditMessage deserialize(String value) {
        // todo
        return null;
    }
}

public interface AuditMessageProducer {
    SendResult send(AuditMessage message);
}

public class AuditMessageProducerImpl implements AuditMessageProducer {

    private static final String TOPIC_AUDIT_LOG = "TOPIC_AUDIT_LOG";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Override
    public SendResult send(AuditMessage message) {
        String messageBody = message.serialize();
        kafkaTemplate.send(TOPIC_AUDIT_LOG, messageBody);
        return SendResult.success();
    }
}
```
