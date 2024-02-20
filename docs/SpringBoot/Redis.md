# Redis

import Dependency

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
</dependency>
```

set Redis config

```properties
spring.data.redis.host=127.0.0.1
spring.data.redis.port=6379
spring.data.redis.password=111
spring.data.redis.database=0

spring.data.redis.lettuce.pool.enabled=true
spring.data.redis.lettuce.pool.max-active=8
spring.data.redis.lettuce.pool.max-wait=1ms
spring.data.redis.lettuce.pool.max-idle=8
spring.data.redis.lettuce.pool.min-idle=0
```

set RedisTemplate serialization

```java
@Bean
public RedisTemplate redisTemplate(RedisConnectionFactory redisConnectionFactory) {
    RedisTemplate redisTemplate = new RedisTemplate();
    redisTemplate.setConnectionFactory(redisConnectionFactory);
    redisTemplate.setKeySerializer(RedisSerializer.string());
    redisTemplate.setValueSerializer(RedisSerializer.json());
    redisTemplate.setHashKeySerializer(RedisSerializer.string());
    redisTemplate.setHashValueSerializer(RedisSerializer.json());
    redisTemplate.afterPropertiesSet();
    return redisTemplate;
}
```

# Basic Operation

```java
// similar to `keys *Set`
Set keys = redisTemplate.keys("*Set");

// similar to `exists myString`
Boolean isExist = redisTemplate.hasKey("myString");

// similar to `type myString`
DataType type = redisTemplate.type("myString");

// similar to `del myString`
redisTemplate.delete("myString");
```

# String Operation

```java
ValueOperations valueOperations = redisTemplate.opsForValue();

// similar to `set myString "hello world"`
valueOperations.set("myString", "hello world");
// similar to `set myString "hello world" ex 60`
valueOperations.set("myString", "hello world", 60, TimeUnit.SECONDS);
// similar to `set myString "hello world" nx`
valueOperations.setIfAbsent("myString", "hello world");

// similar to `get myString`
String myString = (String) valueOperations.get("myString");

Long size = valueOperations.size("myString");
```

# Hash Operation

```java
HashOperations hashOperations = redisTemplate.opsForHash();

hashOperations.put("myHash", "msg", "hello world");
hashOperations.putIfAbsent("myHash", "msg", "hello world");

hashOperations.delete("myHash", "msg");

String msg = (String) hashOperations.get("myHash", "msg");

// similar to `hkeys myHash`
Set keys = hashOperations.keys("myHash");
// similar to `hvals myHash`
List values = hashOperations.values("myHash");

Long size = hashOperations.size("myHash");
```

# List Operation

```java
ListOperations listOperations = redisTemplate.opsForList();

listOperations.leftPush("myList", "sun");
listOperations.leftPushAll("myList", "sun", "xue", "cheng");

listOperations.leftPop("myList");
listOperations.leftPop("myList", 3);

List myList = listOperations.range("myList", 0, 5);

Long size = listOperations.size("myList");
```

# Set Operation

```java
SetOperations setOperations = redisTemplate.opsForSet();

setOperations.add("mySet", "sun");

setOperations.add("mySet", "sun", "xue", "cheng");

setOperations.remove("mySet", "sun", "xue");

Set mySet = setOperations.members("mySet");

setOperations.add("mySet1", "a", "b", "c");
setOperations.add("mySet2", "b", "c", "d");

// similar to `sinter mySet1 mySet2`
Set intersectSet = setOperations.intersect("mySet1", "mySet2");

// similar to `union mySet1 mySet2`
Set unionSet = setOperations.union("mySet1", "mySet2");

Long size = setOperations.size("mySet");
```

# Sorted Set Operation

```java
ZSetOperations zSetOperations = redisTemplate.opsForZSet();

zSetOperations.add("mySortedSet", "sun", 10);
zSetOperations.add("mySortedSet", "xue", 20);
zSetOperations.add("mySortedSet", "cheng", 30);

zSetOperations.addIfAbsent("mySortedSet", "sun", 10);

zSetOperations.remove("mySortedSet", "sun", "xue", "cheng");

zSetOperations.incrementScore("mySortedSet", "sun", 5);

Set mySortedSet1 = zSetOperations.range("mySortedSet", 0, 5);
Set mySortedSet2 = zSetOperations.reverseRange("mySortedSet", 0, 5);

Set intersectSet = zSetOperations.intersect("mySortedSet1", "mySortedSet2");
Set unionSet = zSetOperations.union("mySortedSet1", "mySortedSet2");
Set differenceSet = zSetOperations.difference("mySortedSet1", "mySortedSet2");
Set intersectSetWithScores = zSetOperations.intersectWithScores("mySortedSet1", "mySortedSet2");

Long size = zSetOperations.size("mySortedSet");
```

# HyperLogLog Operation

```java
HyperLogLogOperations Operations = redisTemplate.opsForHyperLogLog();

String ip1 = "127.0.0.1";
String ip2 = "127.0.0.1";
String ip3 = "127.0.0.2";
String ip4 = "127.0.0.3";
String ip5 = "127.0.0.2";

// Long add(K key, V... values)
operations.add("log", ip1, ip2, ip3, ip4, ip5);

// Long size(K... keys)
Long size = Operations.size("log"); // 3
```

```java
operations.add("log1", "a", "b", "c");
operations.add("log2", "b", "c", "d");
operations.add("log3", "c", "d", "e");

// Long union(K destination, K... sourceKeys)
operations.union("log4", "log1", "log2", "log3");

System.out.println(operations.size("log4")); // 5
```

# Geo Operation

```java
GeoOperations geoOperations = redisTemplate.opsForGeo();

Map<String, Point> map = new HashMap<>();
map.put("YZ", new Point(119.41867702693771, 32.39531860026146));
map.put("SZ", new Point(120.58523937582169, 31.300085037965914));
map.put("NJ", new Point(118.79400974592693, 32.066262449027114));
geoOperations.add("city", map);
```

```java
List<Point> list = geoOperations.position("city", "YZ");
System.out.println(list.get(0)); // Point [x=119.418675, y=32.395319]
```

```java
List<String> hash = geoOperations.hash("city", "YZ");
System.out.println(hash); // [wtubm3qh2v0]
```

```java
Distance distance = geoOperations.distance(
    "city", "YZ", "SZ", 
    RedisGeoCommands.DistanceUnit.KILOMETERS
); // 164.2775 KILOMETERS
```

```java
Circle circle = new Circle(120.56528454075276, 31.305131807469373, Metrics.KILOMETERS.getMultiplier());

RedisGeoCommands.GeoRadiusCommandArgs args = RedisGeoCommands.GeoRadiusCommandArgs
                                                 .newGeoRadiusArgs()
                                                 .includeDistance()
                                                 .includeCoordinates()
                                                 .sortAscending()
                                                 .limit(50);

GeoResults<RedisGeoCommands.GeoLocation<String>> results = geoOperations.radius("city", circle, args);

Distance distance = new Distance(10, Metrics.KILOMETERS);

GeoResults<RedisGeoCommands.GeoLocation<String>> results = geoOperations.radius("city", "YZ", distance, args);
```

# Bitmap Operation

```java
LocalDateTime now = LocalDateTime.now();
DateTimeFormatter formatter = DateTimeFormatter.ofPattern(":yyyy:MM");
String key = USER_SIGN_KEY
                 + UserHolder.getUser().getId()
                 + now.format(formatter);
int dayOfMonth = now.getDayOfMonth();

// SETBIT sign:3:2023:12 25 1
stringRedisTemplate.opsForValue().setBit(key, dayOfMonth - 1, true);


```

# Batch Operation

```java
Map<String, String> map = new HashMap<>();
map.put("name", "harvey");
map.put("age", "18");
map.put("sex", "male");

redisTemplate.opsForValue().multiSet(map);
```

# StringRedisTemplate

use StringRedisTemplate instead of RedisTemplate

```java
stringRedisTemplate.opsForValue().set("k1", "hello world");

String k1 = (String) stringRedisTemplate.opsForValue().get("k1");
```

# Redisson

Redisson 底层通过 Redis 的 SETNX 进行加锁的, A 想要获取锁, 就会尝试通过 SETNX 去修改一个 Key, 如果修改成功, 就认为是成功获取了锁. B 这个时候想要获取锁, 也去尝试修改, 修改不成功就认为是没有获取到锁, B 就会进入自旋, 自旋到一定时间, 就会放弃

Redisson 底层为了防止 A 执行的业务耗时太久, 导致锁的 TTL 到期失效的问题, 就让 Watch Dog 去监听这个锁, 每隔 releaseTime / 3 的时间就去重置 Lock 的过期时间为 releaseTime

Redisson 底层通过 Redis 的 Hash 实现 Reentrant Lock, 存储 Key 为锁名, Field 为线程名, Value 为重入的次数. 重入获取锁时, 就去判断当前线程和锁的拥有者是否为相同, 如果相同, 就让 Value + 1, 释放锁后, 就让 Value - 1, 当 Value 为 0 时, 就认为该线程释放了锁

Redisson 底层所有的操作中, 需要保证原子性的地方, 就会采用 Lua 脚本 (eg: 判断当前线程是否为锁的持有者和释放锁, 这两个操作需要保证原子性, 就会采用 Lua 脚本)

Redisson 底层通过 RedLock 解决 Master-Slave 和 Cluster 环境下, Lock 的一致性问题, 创建分布式锁时, 直接在 n / 2 + 1 个 Redis 实例上创建锁, 即使当前 Redis 实例挂掉了, 也能保证数量的领先, 只会认定数量多的那把锁. 一般不建议采用这种方案, 性能太差, 而且 Redis 遵循的是 AP, 更注重性能, 后续可以通过 MQ 来保证最终一致性, 不在乎这点一致性. 如果非要保证 High Consistency, 就需要结合 Zookeeper 实现 Distributed Lock

Import dependency.

```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson</artifactId>
    <version>3.15.6</version>
</dependency>
```

Set Redisson client.

```java
@Bean
public RedissonClient redissonClient() {
    Config config = new Config();
    config.useSingleServer()
        .setAddress("redis://192.168.10.103:6379")
        .setPassword("111");
    return Redisson.create(config);
}
```

Using Redisson to get a distributed lock.

```java
RLock lock = redissonClient.getLock("lock:order:1");
boolean isLock = lock.tryLock();
if (!isLock) {
    System.out.println("Do not get the lock")
    return;
}
try {
    System.out.println("Get the lock")
} finally {
    lock.unlock();
}
```

Reentrant Lock with Redisson.

```java
RLock lock = redissonClient.getLock("lock:order:1");
if (!lock.tryLock()) {
    return;
}
try {
    if (!lock.tryLock()) {
        return;
    }
    try {
        System.out.println("hello world");
    } finally {
        lock.unlock();
    }
} finally {
    lock.unlock();
}
```

# Sentinel

配置 Profile

```properties
spring.data.redis.sentinel.master=my_master
spring.data.redis.sentinel.nodes[0]=192.168.10.14
spring.data.redis.sentinel.nodes[1]=192.168.10.15
spring.data.redis.sentinel.nodes[2]=192.168.10.16
```

配置 LettuceClientConfigurationBuilderCustomizer Bean

```java
@Bean
public LettuceClientConfigurationBuilderCustomizer configurationBuilderCustomizer() {
    return clientConfigurationBuilder -> clientConfigurationBuilder.readFrom(ReadFrom.REPLICA_PREFERRED);
}
```

# Cluster

set cluster config

```properties
# adaptive refresh cluster topology
spring.data.redis.lettuce.cluster.refresh.adaptive=true
spring.data.redis.lettuce.cluster.refresh.period=2000

# redirect up to 3 times
spring.data.redis.cluster.max-redirects=3

# set node ip
spring.data.redis.cluster.nodes=192.168.10.11:6379, 192.168.10.12:6379, 192.168.10.13:6379, 192.168.10.14:6379, 192.168.10.15:6379, 192.168.10.16:6379
```

Test

```java
redisTemplate.opsForValue().set("k1", "hello world, 你好世界");
String k1 = (String) redisTemplate.opsForValue().get("k1");
```