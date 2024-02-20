# Service Avalanche

Service Avalanche 就是 Service 链路中某一个 Service 出现问题, 导致整个链路瘫痪

Service Avalanche 常见的解决方案

- Request Timeout
- Limit Request Traffic
- Thread Isolation
- Semaphore Isolation
- Service Circuit Breaking
- Service Degradation

# operate Sentinel by code

import dependency

```xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-core</artifactId>
</dependency>
```

test

```java
private static final String RESOURCE_MSG = "hello world";

// define flow rule
@PostConstruct
private static void initFlowRule(RESOURCE_MSG) {
    List<FlowRule> ruleList = new ArrayList<>();
    FlowRule rule = new FlowRule();

    // protect RESOURCE_MSG
    rule.setResource(RESOURCE_MSG);

    // set rule
    rule.setGrade(RuleConstant.FLOW_GRADE_QPS);

    // set limit QPS to 20
    rule.setCount(20);

    // load rule
    ruleList.add(rule);
    FlowRuleManager.loadRules(ruleList);
}

// define degrade rule
@PostConstruct
private static void initDegradeRule(RESOURCE_MSG) {
    List<DegradeRule> ruleList = new ArrayList<>();
    DegradeRule rule = new DegradeRule();
    rule.setResource(RESOURCE_MSG);
    
    // circuit breaking by the number of exceptions
    rule.setGrade(RuleConstant.DEGRADE_GRADE_EXCEPTION_COUNT);
    
    // if there are 20 exceptions out of 40 requests in 60 * 1000 ms, then trigger circuit breaking
    rule.setCount(20);
    rule.setMinRequestAmount(40);
    rule.setStatIntervalMs(60 * 1000);
    
    // the next request in 10s will trigger degradation
    // the service will return to normal after 10s, if an exception occurs in the next first request, the service will trigger circuit breaking immediately
    rule.setTimeWindow(10);
    
    ruleList.add(rule);
    DegradeRuleManager.loadRules(ruleList);
}

// define resource
@GetMapping("/test")
public String test() {
    Entry entry = null;
    try {
        // flow control
        entry = SphU.entry(RESOURCE_MSG);
    } catch (BlockException e) {
        return "block";
    } catch (Exception e) {
        // service degradation
        Tracer.traceEntry(e, entry);
    } finally {
        if (entry != null) {
            entry.exit();
        }
    }
    return RESOURCE_MSG;
}
```

# @SentinelResource

set block-handler by @SentinelResource insteal of SphU

import dependency

```xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-annotation-aspectj</artifactId>
</dependency>
```

set SentinelResourceAspect Bean

```java
@Bean
public SentinelResourceAspect sentinelResourceAspect() {
    return new SentinelResourceAspect();
}
```

test

```java
private static final String RESOURCE_MSG = "hello world";

@PostConstruct
private static void initFlowRule() {
    List<FlowRule> ruleList = new ArrayList<>();
    FlowRule rule = new FlowRule();

    // set resource to be protected
    rule.setResource(RESOURCE_MSG);

    // set rule
    rule.setGrade(RuleConstant.FLOW_GRADE_QPS);

    // set limit QPS to 20
    rule.setCount(1);

    // load rule
    ruleList.add(rule);
    FlowRuleManager.loadRules(ruleList);
}

@GetMapping("/test")
@SentinelResource(
        value = RESOURCE_MSG,
        blockHandler = "blockHandlerForTest", // degradation method
        fallback = "fallbackForTest", // fallback method
        exceptionsToIgnore = {IOError.class, ArithmeticException.class} // ignore these exceptions
)
public String test(String id) {
    return RESOURCE_MSG;
}

// the first few args shoud be same as test()
public String blockHandlerForTest(String id, BlockException e) {
    return "block";
}

// the first few args shoud be same as test()
public String fallbackForTest(String id, Throwable e) {
    return "fallback";
}
```

# operate Sentinel by dashboard

install Sentinel dashboard

```shell
curl -OL https://github.com/alibaba/Sentinel/releases/download/1.8.6/sentinel-dashboard-1.8.6.jar
```

startup Sentinel

```shell
java -Dserver.port=8858 \
     -Dcsp.sentinel.dashboard.server=127.0.0.1:8858 \
     -Dsentinel.dashboard.auth.username=sentinel \
     -Dsentinel.dashboard.auth.password=sentinel \
     -jar sentinel-dashboard-1.8.6.jar
```

import dependency

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

connect to Sentinel

```properties
spring.cloud.sentinel.transport.dashboard=127.0.0.1:8858
```

access http://127.0.0.1:8858, 

- username: sentinel
- password: sentinel

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241754290.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241754291.png)

# threshold type

## QPS threshold type

add flow control

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241754292.png)

set block-handler

```java
@GetMapping("/test")
@SentinelResource(value = "test", blockHandler = "flowBlockHandler") // resource name must be the same 
public String test() {
    return "hello world";
}

public String flowBlockHandler(BlockException e) {
    return "flow limiting";
}
```

## thread threshold type

add thread-flow limiting

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241754293.png)

set block-handler

```java
@GetMapping("/test")
@SentinelResource(value = "test", blockHandler = "flowBlockHandler")
public String test() throws InterruptedException {
    // fake thread stuck
    Thread.sleep(10 * 1000);

    return "hello world";
}

public String flowBlockHandler(BlockException e) {
    return "thread-flow limiting";
}
```

# flow control

flow control stratege

- direct
- related
- chain

flow control behavior

- fast reject
- warm up
- queueing

## direct

control flow by direct strategy (def)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241754294.png)

## related

add related strategy, related /user/test1 and /user/test2

over the threshould will trigger the flow control, restrict access to both /user/test1/ and /user/test2

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241754295.png)

## chain

expand resource chain discovery

```properties
spring.cloud.sentinel.web-context-unify=false
```

set resource chain

```java
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/test1")
    public String test1() {
        return userService.test();
    }

    @GetMapping("/test2")
    public String test2() {
        return userService.test();
    }
}
```

```java
@Service
public class UserService {
    @SentinelResource(value = "test", blockHandler = "blockHandlerForTest")
    public String test() {
        return "hello world";
    }

    public String blockHandlerForTest(BlockException e) {
        return "limit flow by entrance";
    }
}
```

check resource chain

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241754296.png)

add chain strategy, set /user/test1 as entrance

over the threshold will trigger the flow control, restrict access to /user/test1, not restrict access to /user/test2

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241754297.png)

# circuit breaking

## slow request ratio

circuit breaking by slow request ratio strategy

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241754298.png)

## error ratio

circuit breaking by error ratio strategy

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241754299.png)

## error count

circuit breaking by error count strategy

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241754300.png)

# system protection

## average RT

over 2000ms average RT will trigger the system protection

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241754301.png)

## CPU utilization

over 20% cpu utilization will trigger the system protection

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241754302.png)

# block handler

```java
@Slf4j
@Component
public class MyBlockExceptionHandler implements BlockExceptionHandler {
    @Override
    public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, BlockException e) throws Exception {
        log.info("block exception handler: {}", e.getRule());

        Result result = null;

        if (e instanceof FlowException) {
            result = Result.failure("flow limiting");
        } else if (e instanceof DegradeException) {
            result = Result.failure("service degradation");
        } else if (e instanceof ParamFlowException) {
            result = Result.failure("param-flow limiting");
        } else if (e instanceof SystemBlockException) {
            result = Result.failure("system block");
        } else if (e instanceof AuthorityException) {
            result = Result.failure("authority error");
        }

        httpServletResponse.setStatus(500);
        httpServletResponse.setCharacterEncoding("utf-8");
        httpServletResponse.setContentType(MediaType.APPLICATION_JSON_VALUE);

        new ObjectMapper().writeValue(httpServletResponse.getWriter(), result);
    }
}
```

# degradation by Feign

import dependency (file: order-service)

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-loadbalancer</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
</dependency>
```

enable Feign for Sentinel (proj: order-service)

```properties
feign.sentinel.enabled=true
```

set feign client component (proj: order-service)

```java
@Component
@FeignClient(value = "user-service", fallback = UserClientFallBack.class)
public interface UserClient {
    @GetMapping("/user/test")
    String test();
}
```

set fallback component (proj: order-service)

```java
@Component
public class UserClientFallBack implements UserClient{
    @Override
    public String test() {
        return "degradation";
    }
}
```

set an exception for test (proj: user-service)

```java
@RestController
public class UserController {
    @GetMapping("/user/test")
    public String test() {
        int i = 1 / 0;
        return "hello world";
    }
}
```

# hotspot argument

set the first arugment of method as hotspot argument

- index 0 represents the first arugment of method

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241754303.png)

set argument detail

- set the threshold of normal arguments to 10
- set the threshold of hotspot arguments to 5

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241754304.png)

# persistence

import dependency

```xml
<dependency>
    <groupId>com.alibaba.csp</groupId>
    <artifactId>sentinel-datasource-nacos</artifactId>
</dependency>
```

set rule (file: nacos/user-service-flow-rule.json)

```json
[
    {
        "resource": "/user/test",
        "controlBehavior": 0,
        "count": 2,
        "grade": 1,
        "limitApp": "default",
        "strategy": 0
    }
]
```

set connection config (file: bootstrap.properties)

```properties
spring.cloud.sentinel.datasource.user-service-flow-rule.nacos.server-addr=127.0.0.1:8848
spring.cloud.sentinel.datasource.user-service-flow-rule.nacos.username=nacos
spring.cloud.sentinel.datasource.user-service-flow-rule.nacos.password=nacos
spring.cloud.sentinel.datasource.user-service-flow-rule.nacos.data-id=user-service-flow-rule.json
spring.cloud.sentinel.datasource.user-service-flow-rule.nacos.rule-type=flow
```














