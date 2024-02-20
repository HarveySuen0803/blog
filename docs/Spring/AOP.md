# AOP

pom.xml

```xml
<!-- Spring, Spring 内部包含 Spring AOP -->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>6.0.9</version>
</dependency>

<!-- Aspect -->
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.19</version>
</dependency>
```

SpringConfiguration.java, 添加 @EnableAspectJAutoProxy 开启 AOP 功能

```java
@Configuration
@ComponentScan({"com.harvey"})
@EnableAspectJAutoProxy
public class SpringConfiguration {}
```

aop/MyAspect.java, 通过 AOP 统计 Service 执行耗时

```java
@Aspect
@Component
public class MyAspect {
    // Point Cut, 作用于 com/harvey/service/**
    @Around("execution(* com.harvey.service.*.*(..))")
    public Object recordTime(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        
        // 执行 Target Method, 返回 Service 的 ret
        Object result = proceedingJoinPoint.proceed();

        long end = System.currentTimeMillis();

        System.out.println(end - start);
        
        // 返回 Service 的 ret
        return result;
    }
}
```

