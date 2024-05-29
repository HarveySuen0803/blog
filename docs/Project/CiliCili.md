# 嵌套地狱

通过防卫子句和方法封装可以有效减少代码的嵌套，将不符合条件的内容提前返回，保留一条清晰的主线。

这段没有使用防卫子句和方法封装，代码又臭又长。

```java
public static ServiceMetaRegistryConfig getConfig() {
    if (config == null) {
        synchronized (CONFIG_LOCK) {
            if (config == null) {
                try {
                    config = ConfigUtil.loadConfig(ServiceMetaRegistryConfig.class, CONFIG_PREFIX);
                } catch(Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
    return config;
}
```

这段使用防卫子句和方法封装来减少代码嵌套，清晰，简洁，优雅。

```java
public static ServiceMetaRegistryConfig getConfig() {
    if (config != null) {
        return config;
    }
    
    synchronized (CONFIG_LOCK) {
        if (config != null) {
            return config;
        }
        loadConfig();
    }
    
    return config;
}

private static void loadConfig() {
    try {
        config = ConfigUtil.loadConfig(ServiceMetaRegistryConfig.class, CONFIG_PREFIX);
    } catch(Exception e) {
        e.printStackTrace();
    }
}
```

# 方法的抽取和封装
