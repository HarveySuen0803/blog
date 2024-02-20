# AOP

AOP (Aspect-Oriented Programming) 是面向切面编程, 可以不修改源代码的情况下, 抽取并封装一个可重用的模块, 可以同时作用于多个方法, 减少模块耦合的同时, 扩展业务功能. 可用于记录操作日志, 处理缓存, 事务处理

Spring 底层的 TRX 就是通过 AOP 实现的, 通过 Surround 的方式扩展, 在方法开启前开启事务, 在方法结束后提交事务, 无侵入, 碉堡了 !!!

pom.xml

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

aop/MyAspect.java

```java
@Aspect
@Component
public class MyAspect {
    @Around("execution(* com.harvey.service.*.*(..))")
    public Object recordTime(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        long start = System.currentTimeMillis();
        Object result = proceedingJoinPoint.proceed();
        long end = System.currentTimeMillis();
        System.out.println(end - start);
        return result;
    }
}
```

# Static Proxy

UserServiceStaticProxy.java, 代理 UserService

```java
public class UserServiceStaticProxy implements UserService {
    private UserService userService;

    public UserServiceStaticProxy(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void show() {
        System.out.println("before around");
        userService.show();
        System.out.println("after around");
    }
}
```

Test

```java
UserServiceStaticProxy userServiceStaticProxy = new UserServiceStaticProxy(new UserServiceImpl());
userServiceStaticProxy.show();
```

# Dynamic Proxy

ProxyFactory.java

```java
public class ProxyFactory {
    private Object target;

    public ProxyFactory(Object target) {
        this.target = target;
    }

    public Object getProxy() {
        ClassLoader classLoader = target.getClass().getClassLoader();
        Class<?>[] interfaces = target.getClass().getInterfaces();
        InvocationHandler invocationHandler = new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                System.out.println("before around");
                Object result = method.invoke(target, args);
                System.out.println("after around");
                return result;
            }
        };
        return Proxy.newProxyInstance(classLoader, interfaces, invocationHandler);
    }
}
```

Test

```java
ProxyFactory proxyFactory = new ProxyFactory(new UserServiceImpl());
UserService userService = (UserService) proxyFactory.getProxy();
userService.show();
```

# Advice type

```java
@Aspect
@Component
public class DemoAspect {
    // 手动调用 Target Method
    @Around("execution(* com.harvey.service.impl.*.*(..))")
    public Object around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        System.out.println("before around");
        Object result = proceedingJoinPoint.proceed();
        System.out.println("after around");
        return result;
    }

    // Target Method 执行前调用
    @Before("execution(* com.harvey.service.impl.*.*(..))")
    public void before(JoinPoint joinPoint) {
        System.out.println("before");
    }

    // Target Method 执行后调用
    @After("execution(* com.harvey.service.impl.*.*(..))")
    public void after(JoinPoint joinPoint) {
        System.out.println("after");
    }

    // Target Method 执行成功, 返回 ret 后调用, 所以无法通过 Joint Point 获取 ret, 可以通过 returning 获取 ret
    @AfterReturning(value = "execution(* com.harvey.service.*.*(..))", returning = "result")
    public void afterReturning(JoinPoint JoinPoint, Object result) {
        System.out.println("after returning")
    }

    // Target Method 发生 Exception 后调用, 通过 throwing 获取 Exception Obj
    @AfterThrowing(value = "execution(* com.harvey.service.impl.*.*(..))", throwing = "exception")
    public void afterThrowing(JoinPoint joinPoint, Throwable exception) {
        System.out.println("after throwing");
    }
}
```

```
before around
before
...
after returning
after
after around
```

# Advice order of execution

Aspect 的 Point Cut 优先级相同, 按 Aspect 的 Cls name 的自然排序拦截

- eg. Aspect1 比 Aspect2 的优先级高, 先执行 Aspcet1

通过 Order 修改执行顺序

```java
@Order(1)
@Aspect
@Component
public class DemoAspect1 {
    @Before("execution(* com.harvey.service.impl.DeptServiceImpl.*(..))")
    public void before() {
        System.out.println("DemoAspect1 before()");
    }

    @After("execution(* com.harvey.service.impl.DeptServiceImpl.*(..))")
    public void after() {
        System.out.println("DemoAspect1 after()");
    }
}
```

```java
@Order(2)
@Aspect
@Component
public class DemoAspect2 {
    @Before("execution(* com.harvey.service.impl.DeptServiceImpl.*(..))")
    public void before() {
        System.out.println("DemoAspect2 before()");
    }

    @After("execution(* com.harvey.service.impl.DeptServiceImpl.*(..))")
    public void after() {
        System.out.println("DemoAspect2 after()");
    }
}
```

```java
@Order(3)
@Aspect
@Component
public class DemoAspect3 {
    @Before("execution(* com.harvey.service.impl.DeptServiceImpl.*(..))")
    public void before() {
        System.out.println("DemoAspect3 before()");
    }

    @After("execution(* com.harvey.service.impl.DeptServiceImpl.*(..))")
    public void after() {
        System.out.println("DemoAspect3 after()");
    }
}
```

```
DemoAspect1 before()
DemoAspect2 before()
DemoAspect3 before()
...
DemoAspect3 after()
DemoAspect2 after()
DemoAspect1 after()
```

# Point Cut

```java
@Aspect
@Component
public class DemoAspectA {
    // 声明 deptServiceImplPointCut(), 编写 Point Cut
    @Pointcut("execution(* com.harvey.service.impl.DeptServiceImpl.*(..))")
    public void deptServiceImplPointCut() {}

    // 调用 deptServiceImplPointCut() 的 Point Cut
    @Before("deptServiceImplPointCut()")
    public void before() {}
}
```

```java
@Aspect
@Component
public class DemoAspectB {
    // 其他类调用 deptServiceImplPointCut() 的 Point Cut
    @Before("com.harvey.aop.DemoAspect.deptServiceImplPointCut()")
    public void before() {}
}
```

# @execution

通过 @execution 指向 Point Cut

```java
// 作用于 com.harvey.service.impl.DeptServiceImpl.java 的 public void deleteById(Integer) throws Exception {}
@Pointcut("execution(public void com.harvey.service.impl.DeptServiceImpl.deleteById(Integer)) throws Exception")

// 可以省略 Modifier, Package Name (不推荐), Class Name (不推荐), Exception
@Pointcut("execution(void deleteById(Integer))")
```

wildcard

```java
// "*" 表示单个任意 str
@Pointcut("execution(* com.*.service.*.update*(*)")

// ".." 表示多个任意 str
@Pointcut("execution(* com.harvey..service.*(..)")
```

通过 &&, ||, ! 进行逻辑匹配

```java
@Before("execution(* com..DeptLogService.insert(..)) || execution(* com..DeptLogService.delete(..))")
```

# @annotation

通过 @annotation 指向 Point Cut

```java
// 作用于添加了 @MyAnnotation 的方法
@Before("@annotation(com.harvey.annotation.MyAnnotation)")
```

# Joint Point

通过 Join Point Obj 访问 Join Point

```java
@Before("execution(* com.harvey.service.impl.DeptServiceImpl.*(..))")
public void before(JoinPoint joinPoint) {
    // 返回 Target Obj
    Object target = joinPoint.getTarget();
    
    // 返回 Target Method name
    String methodName = joinPoint.getSignature().getName(); // selectUser

    // 返回 Target Cls name
    String className = joinPoint.getSignature().getDeclaringTypeName(); // com.harvey.service.UserService

    // 返回 Target Method args
    Object[] args = joinPoint.getArgs();
}
```

@Around 的 Joint Point Cls 是 ProceedingJoinPoint

```java
@Around("execution(* com.harvey.service.impl.DeptServiceImpl.*(..))")
public Object around(ProceedingJoinPoint joinPoint) throws Throwable {
    return joinPoint.proceed();
}
```

# Exercise Trim Args

```java
@Around("execution(* com.harvey.service.UserService.*(..))")
public Object trimStr(ProceedingJoinPoint joinPoint) throws Throwable {
    // 处理 args
    Object[] args = joinPoint.getArgs();
    for (Object arg : args) {
        if (arg.getClass().equals(String.class)) {
            arg = arg.toString().trim();
        }
    }
    // 传入 args, 执行 Target Method, 返回 ret
    return joinPoint.proceed(args);
}
```

# Exercise Operation Log

创建 operation_log 表

```sql
create table operation_log(
    id int unsigned primary key auto_increment,
    operate_user int unsigned,
    operate_time datetime,
    class_name varchar(100),
    method_name varchar(100),
    method_params varchar(1000),
    return_value varchar(2000),
    cost_time bigint
);
```

annotation/OperationLog.java

```java
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@Documented
public @interface OperationLog {}
```

标记需要记录的方法

```java
@Service
public class DeptServiceImpl implements DeptService {
    @OperationLog
    @Override
    public void delete(Integer id) {
        // ...
    }

    @OperationLog
    @Override
    public void insert(Dept dept) {
        // ...
    }
}
```

domain/OperationLog.java

```java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OperationLog {
    private Integer id;
    private Integer operationUser;
    private LocalDateTime operationTime;
    private String className;
    private String methodName;
    private String methodParams;
    private String returnValue;
    private Long costTime;
}
```

mapper/OperationLogMapper.java

```java
@Mapper
public interface OperationLogMapper {
    @Insert("insert into operation_log (operation_user, operation_time, class_name, method_name, method_params, return_value, cost_time) " +
            "values (#{operationUser}, #{operationTime}, #{className}, #{methodName}, #{methodParams}, #{returnValue}, #{costTime});")
    public void insert(OperationLog log);
}
```

aop/OperationAspect.java

```java
@Aspect
@Component
public class OperationLogAspect {
    @Autowired
    HttpServletRequest req;
    @Autowired
    OperationLogMapper operationLogMapper;

    @Around("@annotation(com.harvey.annotation.OperationLog)")
    public Object record(ProceedingJoinPoint joinPoint) throws Throwable {
        // operationUser
        String jwt = req.getHeader("token");
        Claims claims = JwtUtils.parseJWT(jwt);
        Integer operationUser = (Integer) claims.get("id");

        // operationTime
        LocalDateTime operationTime = LocalDateTime.now();

        // className
        String className = joinPoint.getTarget().getClass().getName();

        // methodName
        String methodName = joinPoint.getSignature().getName();

        // methodParams
        Object[] args = joinPoint.getArgs();
        String methodParams = Arrays.toString(args);

        Long start = System.currentTimeMillis();

        // proceed
        Object result = joinPoint.proceed();
    
        Long end = System.currentTimeMillis();

        // returnValue
        String returnValue = JSONObject.toJSONString(result);

        // costTime
        Long costTime = end - start;

        OperationLog operationLog = new OperationLog(null, operationUser, operationTime, className, methodName, methodParams, returnValue, costTime);
        operationLogMapper.insert(operationLog);

        return result;
    }
}
```

# Exercise Fill Field

set OperationType Enum

```java
public class OperationType {
    UPDATE, INSERT
}
```

set AutoFill Annotation

```java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AutoFill {
    OperationType value();
}
```

add @AutoFill to Mapper to identify the Method that needs to be operated

```java
@AutoFill(OperationType.INSERT)
void insert(Employee employee);

@AutoFill(OperationType.UPDATE)
void update(Employee employee);
```

set Aspect

```java
@Aspect
@Component
public class AutoFillAspect {
    @Pointcut("execution(* com.harvey.mapper.*.*(..)) && @annotation(com.sky.annotation.AutoFill)")
    public void autoFillPointCut() {}

    @Before("autoFillPointCut()")
    public void autoFill(JoinPoint joinPoint) {
        // get entity and entityClass
        Object[] args = joinPoint.getArgs();
        if (args == null || args.length == 0) {
            return;
        }
        Object entity = args[0];
        Class<?> entityClass = entity.getClass();

        // prepare data
        LocalDateTime currentTime = LocalDateTime.now();

        // get Annotation
        MethodSignature signature = (MethodSignature) joinPoint.getSignature();
        OperationType operationType = signature.getMethod().getAnnotation(AutoFill.class).value();
        
        // set data accroding to Annotation
        if (operationType == OperationType.INSERT) {
            try {
                Method setCreateTime = entityClass.getDeclaredMethod(AutoFillConstant.SET_CREATE_TIME, LocalDateTime.class);
                Method setUpdateTime = entityClass.getDeclaredMethod(AutoFillConstant.SET_UPDATE_TIME, LocalDateTime.class);

                setCreateTime.invoke(entity, currentTime);
                setUpdateTime.invoke(entity, currentTime);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        } else if (operationType == OperationType.UPDATE) {
            try {
                Method setUpdateTime = entityClass.getDeclaredMethod(AutoFillConstant.SET_UPDATE_TIME, LocalDateTime.class);

                setUpdateTime.invoke(entity, currentTime);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }
}
```