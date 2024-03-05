# IOC

IOC (Inversion of Control) 一种设计原则, 用于减小计算机程序中各模块之间的依赖关系. 我们只需要定义一个 Bean 的创建过程, 而真正的创建, 初始化, 装配, 生命周期都由 Container (eg: ApplicationContext, BeanFactory) 管理. 通过 DI 注入对象, 只需要关注自己的核心逻辑, 而不需要关注如何获取其他对象.

IOC 最佳实践了 Singleton 和 Fast Fail, 不仅可以节省大量不必要的对象创建, 防止 GC, 还在项目启动时, 就实例化所有的 Bean, 可以将 Bean 的创建由运行期提前至启动期, 在启动时期就可以检测出问题, 而不是在运行时遇到问题停机. Singleton 是不可变状态, 可以保证线程安全.

IOC 最佳实践了 DIP (Dependence Inversion Principle), 高层模块不直接依赖低层模块, 而是依赖低层模块的抽象, 低层模块去实现抽象 (eg: Controller 通过 Service 访问 ServcieImpl), 实现 Decoupling, 同时接口的引入便于后续扩展, 便于引入 Design Pattern (JDK's Dynamic Proxy).

# @SpringBootApplication

SpringBootApplication.java

```java
// 声明为 Configuration
@SpringBootConfiguration
// 开启 Auto Configuration
@EnableAutoConfiguration
// 排除 Component
@ComponentScan(excludeFilters = { @Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class),
		@Filter(type = FilterType.CUSTOM, classes = AutoConfigurationExcludeFilter.class) })
public @interface SpringBootApplication {
    SpringApplication.run(SpringBootApplication.class, args);
}
```

EnableAutoConfiguration.java

```java
// 导入 App pkg 的 Configuration
@AutoConfigurationPackage
// 导入 starter pkg 的 Configuration
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {}
```

# BeanFactory

BeanFactory 是 SpringBoot 框架中的一个核心接口, 表示 IOC 的 Container, 负责实例化, 管理和配置应用程序中定义的 Bean.

通过 BeanFactory 获取 Bean.

```java
ClassPathResource resource = new ClassPathResource("beanfactory-example.xml");
BeanFactory factory = new XmlBeanFactory(resource);
ExampleBean exampleBean = (ExampleBean) factory.getBean("exampleBean");
System.out.println(exampleBean.getMessage());
```

# ApplicationContext

ApplicationContext 是 BeanFactory 的扩展, 也表示 IOC 的 Container, 但提供了更多的功能 (eg: i18n, AOP, Publish Event).

通过 ApplicationContext 获取 Bean.

```java
MyBean myBean = applicationContext.getBean(MyBean.class);
```

通过 ApplicationContext 获取 Enviroment.

```java
Environment environment = applicationContext.getEnvironment();
String property = environment.getProperty("my.property");
```

通过 ApplicationContext 发布 Event.

```java
applicationContext.publishEvent(new MyEvent(this, "TestEvent"));
```

BeanFactory 采用延迟加载, 在获取 Bean 时才会进行实例化, 可以减少系统资源的占用, 而 ApplicationContext 在启动时会立即加载所有的 Bean, 导致启动时间较⻓.

BeanFactory 是 Singleton, 整个 App 只有一个 BeanFactory Instance, 而 ApplicationContext 是 Multiton, 并且可以通过父子容器的方式组织起来, 方便模块化开发.

# Profile

配置 project env

```properties
# current profile (def. default)
spring.profiles.active=dev

# include profile, 开启 dev profile, test profile
spring.profiles.include=dev,test

# profile group
spring.profiles.group.profile1=dev,test
spring.profiles.group.profile2=test,prod

# profile arr group
spring.profiles.group.profile[0]=dev,test
spring.profiles.group.profile[1]=test,prod

# use profile
spring.profiles.active=profile[0]
```

# Env Profile

application-env.properties, 配置 env profile

```properties
server.port=8081
```

application-prod.properties, 配置 prod profile

```properties
server.port=8081
```

application.properties, 使用 env profile

- application.properties 和 application-env.properties 都生效, application-env.properties 优先级更高

```properties
spring.profiles.active=dev
```

# @Profile

配置 Bean 的作用 Profile

```java
// 作用于 dev env, test env, prod env (def. default)
@Profile({"dev", "test", "prod"})
@Controller
public class UserController {}
```

# DI

通过 @Autowired 注入 Bean, 先根据 Class 匹配, 再根据 Name 匹配

```java
@Autowired
UserService userservice;
```

通过 @Resource 注入 Bean, 先根据 Name 匹配, 再根据 Class 匹配

```java
@Resource
UserService userService;
```

通过 @Bean 声明的 Bean, 在参数列表中直接声明需要注入的 Bean, 就会自动注入, 相当于 @Autowired

```java
// Container 提供 DeptService Obj, EmpService Obj
@Bean
public SAXReader saxReader(DeptService deptService, EmpService empService) {
    System.out.println(deptService);
    System.out.println(empService);
    return new SAXReader();
}
```

注入 Bean 到 Setter 中

```java
UserService userService;

@Autowired
public void setUserService(UserService userService) {
    this.userService = userService;
}
```

注入 Bean 到 Constructor 中

```java
UserService userService;

@Autowired
public UserController(UserService userService) {
    this.userService = userService;
}
```

# DI Conflict

如果 UserServiceImplA, UserServiceImplB 都实现了 UserService, 那么 Container 创建 UserService Obj 时, 就会冲突

```java
@Service
public class UserServiceImplA implements UserService {}
```

```java
@Service
public class UserServiceImplB implements UserService {}
```

```java
@RestController
public class UserController {
    // 创建 UserService Obj 时, 发生冲突
    @Autowired
    private UserService userService;
}
```

通过 @Primary 解决 DI Conflict

```java
// 创建 UserServiceImplA Obj
@Primary
@Service
public class UserServiceImplA implements UserService {}
```

通过 @Qualifier 解决 DI Conflict

```java
@RestController
public class UserController {
    // 创建 UserServiceImplA Obj
    @Qualifier("userServiceImplA")
    @Autowired
    private UserService userService;
}
```

# @Component

可以通过 @Component 或 @Bean 声明一个类为 Bean, 交给 IOC 管理

```java
@Component
public class UserService {}
```

可以通过 @Component 设置 Bean 的名字, 默认为首字母小写的类名 (eg: UserService 为 userService)

```java
// name 或 value 修改 Bean name
@Component(name = "userController")
```

```java
// 默认为 value 属性, 可省略
@Component("userController")
```

# @Scope

通过 @Scope 设置 Bean 作用域

```java
@Scope("prototype")
@Component
public class UserComponent {}
```

# @Lazy

```java
@Lazy
@Controller
public class DeptController {}
```

# @Configuration

configuration/CommonConfiguration.java, 配置 Bean

```java
@Configuration
public class CommonConfiguration {
    // Container 管理 SAXReader Bean
    @Bean
    public SAXReader saxReader() {
        return new SAXReader();
    }
}
```

获取 Bean

```java
// Container 提供 SAXReader Obj
@Autowired
private SAXReader saxReader;
```

# @ComponentScan

通过 @ComponentScan 扫描 Bean, 被扫描到的 Bean 生效

```java
// 扫描 com.harvey.service 和 com.harvey.dao
@ComponentScan({"com.harvey.service", "com.harvey.dao"})
```

排出 Bean

```java
@ComponentScan(value = "com.harvey", excludeFilters = @ComponentScan.Filter (
        type = FilterType.ANNOTATION,
        classes = {RestController.class, Controller.class}
))
```

# @Import

通过 @Import 代替 @ComponentScan 导入 Bean

```java
@Import({MyComponent.class, MyConfiguration.class, MyImportSelector.class})
@Configuration
public class SpringConfiguration {}
```

导入 Component

```java
@Import({MyComponent.class})
```

导入 Configuration

```java
@Import({MyConfiguration.class})
```

# ImportSelector

封装 ImportSelector Cls, 返回需要导入的 Configuration

```java
public class MyImportSelector implements ImportSelector {
    @Override
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        return new String[] {"com.example.MyConfiguration1", "com.example.MyConfiguration2", "com.example.MyConfiguration3"};
    }
}
```

导入 MyImportSelector.class, 相当于导入了所有的 Configuration

```java
@Import({MyImportSelector.class})
```

封装 Annotation, 导入 ImportSelector Cls

```java
@Import(MyImportSelector.class)
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.TYPE)
public @interface EnableConfiguration {}
```

添加 Annotation 就相当于导入了所有的 Configuration

```java
@EnableConfiguration
@SpringBootApplication
public class SpringProjectApplication {}
```

# Scan External Bean

> spring-demo2

MyComponent.java

```java
@Component
public class MyComponent {}
```

MyConfiguration.java

```java
@Configuration
public class MyConfiguration {
    @Bean
    public Bean1 bean1() {
        return new Bean1();
    }

    @Bean
    public Bean2 bean2() {
        return new Bean2();
    }
}
```

> spring-demo1

spring-demo1 导入 spring-demo2, 配置 spring-demo2 dep

```xml
<dependency>
    <groupId>com.example</groupId>
    <artifactId>spring-demo2</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

扫描 spring-demo2 的 Bean pkg

```java
@ComponentScan({"com.harvey", "com.example"})
@SpringBootApplication
public class SpringProjectApplication {}
```

调用 spring-demo2 的 Bean

```java
@SpringBootTest
class SpringProjectApplicationTests {
    @Autowired
    private ApplicationContext applicationContext;

    @Test
    void test1() {
        System.out.println(applicationContext.getBean(MyComponent.class));
    }

    @Test
    void test2() {
        System.out.println(applicationContext.getBean(Bean1.class));
        System.out.println(applicationContext.getBean(Bean2.class));
    }
}
```

# Bean statement

@Controller 专用于 Controller, 底层包含 @Component

```java
@RestController
public class UserController {}
```

@Service 专用于 Service, 底层包含 @Component

```java
@Service
public class UserServiceImpl implements UserService {}
```

@Reposity 专用于 Dao, @Repository 底层包含 @Component

```java
@Repository
public class UserDaoImpl implements UserDao {}
```

@Mapper 专用于 Mapper, 添加 @Mapper 后, Spring 会自动创建带有 @Component 的 Obj 实现 Mapper 

```java
@Mapper
public interface EmpMapper {}
```

# Bean Lifecycle

Spring 创建 Bean 的过程

- 调用 loadBeanDefinitions() 扫描 XML 或 Annotation 声明的 Bean, 封装成 BeanDefinition Obj 放入 beanDefinitionMap 中, 再遍历 beanDefinitionMap, 通过 createBean() 创建 Bean
- 调用 createBeanInstance() 构建 Bean Instance, 去获取 Constructor, 先准备 Constructor 需要的 Parameter, 再执行 Constructor
- 调用 populateBean() 填充 Bean, 通过 Three-Level Cache 去注入当前 Bean 所依赖的 Bean (通过 @Autowired 注入的 Bean)

Spring 初始化 Bean 的过程

- 调用 initializeBean() 初始化 Bean
- 调用 invokeAwareMethods() 去填充 Bean 实现的 Aware 信息, Bean 有可能实现了 BeanNameAware, BeanFactoryAware 或 ApplicationContextAware 去扩展 Bean (类似于 Neddle, 可以感知到 Bean Lifecycle 中的信息)
- 调用 applyBeanProcessorsBeforeInitialization() 去处理 Bean 实现的 BeanPostProcessor 的 postProcessBeforeInitialization()
- 调用 Bean 中添加了 @PostConstruct 的 Init Method
- 调用 Bean 实现的 InitializingBean 的 afterPropertiesSet()
- 调用 Bean 中添加了 @Bean(initMethod = "initMethod") 的 Init Method
- 调用 applyBeanProcessorsAfterInitialization() 去处理 Bean 实现的 BeanPostProcessor 的 postProcessAfterInitialization(), AOP 动态代理就是由该 Processor 实现的
- 调用 registerDisposableBean() 注册实现了 Disposable 的 Bean, 这样销毁时, 就会自动执行 destroy()
- 调用 addSingleton() 将 Bean 放入 singletonObjects 中, 后续使用 Bean 都是从 singletonObjects 中获取

Spring 销毁 Bean 的过程

- 调用 Bean 中添加了 @PreDestroy 的 Destroy Method
- 调用 destroyBeans() 遍历 singletonObjects, 逐一销毁所有的 Bean, 这个过程会依次执行 Bean 的 destroy()
- 调用 Bean 中添加了 @Bean(destroyMethod = "destroyMethod") 的 Destroy Method

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401081756800.png)

```java
@Component
public class User implements BeanNameAware, BeanFactoryAware, ApplicationContextAware, InitializingBean {
    public User() {
        System.out.println("User()");
    }
    
    @PostConstruct
    public void init() {
        System.out.println("init()");
    }
    
    @PreDestroy
    public void destroy() {
        System.out.println("destroy()");
    }
    
    @Override
    public void setBeanName(String name) {
        System.out.println("setBeanName()");
    }
    
    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        System.out.println("setBeanFactory()");
    }
    
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        System.out.println("setApplicationContext()");
    }
    
    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("afterPropertiesSet()");
    }
}
```

```java
@Component
public class UserProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        if (beanName.equals("user")) {
            System.out.println("postProcessBeforeInitialization()");
        }
        return bean;
    }
    
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        if (beanName.equals("user")) {
            System.out.println("postProcessAfterInitialization()");
        }
        return bean;
    }
}
```

```console
User()
setBeanName()
setBeanFactory()
setApplicationContext()
postProcessBeforeInitialization()
init()
afterPropertiesSet()
postProcessAfterInitialization()
```

# Load Properties

application.properties, 配置 properties

```properties
aliyun.oss.endpoint=https://oss-cn-shanghai.aliyuncs.com
```

访问 properties

```java
@Value("${aliyun.oss.endpoint}")
private String endpoint;
```

# Auto Load Properties

pon.xml

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
</dependency>
```

properties/AliOSSProperties.java, 配置 Properties 读取 application.properties (sug. 先封装 Properties, 后配置 properties)

```java
@Data
@Component
// 公共前缀 aliyun.oss
@ConfigurationProperties(prefix = "aliyun.oss")
public class AliOSSProperties {
    // 自动读取 application.properties 中的 aliyun.oss.endpoint
    private String endpoint;
}
```

application.properties, 配置 properties

```properties
aliyun.oss.endpoint=https://oss-cn-shanghai.aliyuncs.com
```

通过 Properties Obj 访问 properties

```java
@Component
public class AliOSSUtils {
    @Autowired
    private AliOSSProperties aliOSSProperties;

    public String upload(MultipartFile file) throws IOException {
        String endpoint = aliOSSProperties.getEndpoint();
    }
}
```

# CommandLineRunner

CommandLineRunner 用于在 SpringBoot 应用启动后执行一些代码, 这个时候应用上下文已经完全载入, 所有 Bean 都已经创建和初始化完毕, 通常用于在应用启动后执行一些应用外部的, 非关键的或者长时间运行的任务.

```java
@Component
public class MyRunner implements CommandLineRunner {
    @Override
    public void run(String...args) throws Exception {
        System.out.println("Application has been started.");
    }
}
```

通过 CommandLineRunner 在 App 启动后, 开启一个异步任务定期收集和发送统计报告.

```java
@Component
public class DailyReportRunner implements CommandLineRunner {
    @Autowired
    private ReportGenerator reportGenerator;

    @Override
    public void run(String... args) {
        new Thread(() -> reportGenerator.generateDailyReport()).start();
    }
}
```

通过 @Order 规定 Runner 的执行顺序.

```java
@Order(0)
@Component
public class ARunner implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        System.out.println("A Runner is running");
    }
}
```

```java
@Order(1)
@Component
public class BRunner implements CommandLineRunner {
    @Override
    public void run(String... args) throws Exception {
        System.out.println("B Runner is running");
    }
}
```

```txt
A Runner is running
B Runner is running
```

# @PostConstructor

@PostConstruct 用于在依赖注入完成后, 进行一些初始化操作, 这个注解的方法在 Bean 初始化 (构造函数执行之后) 立即执行.

```java
@RestController
public class UserController {
    // invoke before IOC init
    @PostConstruct
    private static void init() {
        System.out.println("...");
    }
}
```

通过 @PostConstruct 在 Bean 初始化时, 就从 DB 中查询数据存储到 Cache 中.

```java
@Component
public class UserCache {
    private List<DataRecord> cache;

    @Autowired
    private DataRecordRepository repository;

    @PostConstruct
    public void init() {
        cache = repository.findAll();
    }
}
```

# @ConditionalOnClass

```java
@Bean
// 如果有 Jwt.class, Container 就添加 Emp Bean
@ConditionalOnClass(Jwts.class)
public Emp emp() {
    return new Emp();
}
```

```java
@ConditionalOnClass(name = "io.jsonwebtoken.Jwts")
```

# @ConditionalOnMissingBean

```java
@Bean
// 如果没有 Emp Bean, Container 就添加 Emp Bean
@ConditionalOnMissingBean
public Emp emp() {
    return new Emp();
}
```

# @ConditionalOnProperty

```java
// 如果 application.properties 有 name = "sun", age = "18", Container 就添加 Bean
@ConditionalOnProperty(name = "sun", age = "18")
```

# My IOC

annotation/MyComponent.java

```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface MyComponent {}
```

annotation/MyAutoWired.java

```java
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MyAutoWired {}
```

MyApplicationContext.java

```java
public interface MyApplicationContext {
    Object getBean(Class cls);
}
```

MyAnnotationApplicationContext.java

```java
public class MyAnnotationApplicationContext implements MyApplicationContext {
    private Map<Class, Object> beanMap = new HashMap<>();

    @Override
    public Object getBean(Class cls) {
        return beanMap.get(cls);
    }

    public MyAnnotationApplicationContext(String pkgUrl) {
        try {
            pkgUrl = pkgUrl.replaceAll("\\.", "/");
            // get absolute urls
            Enumeration<URL> urls = Thread.currentThread().getContextClassLoader().getResources(pkgUrl);
            while (urls.hasMoreElements()) {
                URL url = urls.nextElement();
                String dirPath = URLDecoder.decode(url.getFile(), StandardCharsets.UTF_8); // eg. project/target/classes/com/harvey
                String baseDirPath = dirPath.substring(0, dirPath.length() - pkgUrl.length()); // eg. project/target/classes/
                loadBean(new File(dirPath), baseDirPath);
            }
            loadAutoWired();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // add Class with @MyComponent Annotation to the beanMap
    public void loadBean(File dir, String baseDirPath) throws Exception {
        if (!dir.isDirectory()) {
            return;
        }
        File[] files = dir.listFiles();
        if (files == null) {
            return;
        }
        for (File file : files) {
            if (file.isDirectory()) {
                loadBean(file, baseDirPath);
                continue;
            }
            String filePath = file.getAbsolutePath().substring(baseDirPath.length()); // eg. com/harvey/bean/UserServiceImpl.class
            if (!filePath.contains(".class")) {
                continue;
            }
            String fullClassName = filePath.replaceAll("/", "\\.").replace(".class", ""); // eg. com.harvey.bean.UserServiceImpl.class
            Class<?> cls = Class.forName(fullClassName);
            if (cls.isInterface()) {
                continue;
            }
            if (cls.getAnnotation(MyComponent.class) == null) {
                continue;
            }
            Object obj = cls.getConstructor().newInstance();
            if (cls.getInterfaces().length > 0) {
                // key is Interface, value is  Object
                beanMap.put(cls.getInterfaces()[0], obj);
            } else {
                // key is Class, value is Object
                beanMap.put(cls, obj);
            }
        }
    }

    // inject Object to the Field with @MyAutoWired Annotation
    public void loadAutoWired() throws IllegalAccessException {
        for (Map.Entry<Class, Object> entry : beanMap.entrySet()) {
            Class cls = entry.getKey();
            Object obj = entry.getValue();
            // set cls to obj's Class to get Field
            if (cls.isInterface()) {
                cls = obj.getClass();
            }
            Field[] fields = cls.getDeclaredFields();
            for (Field field : fields) {
                if (field.getAnnotation(MyAutoWired.class) == null) {
                    continue;
                }
                field.setAccessible(true);
                field.set(obj, beanMap.get(field.getType()));
            }
        }
    }
}
```

UserService.java

```java
public interface UserService {
    void show();
}
```

UserServiceImpl.java

```java
@MyComponent
public class UserServiceImpl implements UserService {
    @MyAutoWired
    private UserDao userDao;

    @Override
    public void show() {
        System.out.println(userDao);
    }
}
```

App.java

```java
MyApplicationContext applicationContext = new MyAnnotationApplicationContext("com.harvey");
UserService userService = (UserService) applicationContext.getBean(UserService.class);
userService.show();
```

# Three-Level Cache

Spring 的 DefaultSingletonBeanRegistry Cls 中声明了 singletonObjects (ConcurrentHashMap), earlySingletonObjects (ConcurrentHashMap) 和 singletonFactories (HashMap) 用于实现 Three-Level Cache

- singletonObjects 是 Lv1 Cache, 存放经历了完整 Life Cycle 的 Bean Obj
  - singletonObjects 的 Key 为 Bean Name, Val 为 Bean Obj
  - 通过 applicationContext.getBean() 获取 Bean 就是访问 singletonObjects 这个 Map
- earlySingletonObjects 是 Lv2 Cache, 存放未经历完整 Life Cycle 的 Bean Obj, 解决 Circurlar Reference 的关键
- singletonFactories 是 Lv3 Cache, 存放各种 Bean 的 ObjectFactory, 可以用来创建 Normal Obj 或 Proxy Obj
  - singletonFactories 是 HashMap, 而不是 ConcurrentHashMap, 因为 singletonFactories 通常只在 Bean 的创建过程中使用, 一旦 Bean 创建完成, 即使有多线程对创建好的 Bean 进行访问, 访问的是 singletonObjects, 而不是 singletonFactories, 不存在线程安全问题.

```java
// Lv1 Cache
private final Map<String, Object> singletonObjects = new ConcurrentHashMap(256);
// Lv2 Cache
private final Map<String, Object> earlySingletonObjects = new ConcurrentHashMap(16);
// Lv3 Cache
private final Map<String, ObjectFactory<?>> singletonFactories = new HashMap(16);
```

Spring 的 DefaultSingletonBeanRegistry Cls 中声明了 singletonsCurrentlyInCreation (Collections.newSetFromMap(new ConcurrentHashMap<>(16))) 存储正在创建过程中的 Bean, 用来判断是否存在 Circular Reference.

```java
private final Set<String> singletonsCurrentlyInCreation = 
    Collections.newSetFromMap(new ConcurrentHashMap<>(16));
```

Spring 通过 Three-Level Cache 解决了大部分的 Circular Reference, 需要使用 A 时, 会执行下面的步骤

- 调用 getBean() 获取 A, 依次查询 singletonObjects, earlySingletonObjects 和 singletonFactories, 未查询到 A Cache, 调用 getSingleton() 创建 A

  - 调用 beforeSingletonCreation() 添加 A 到 singletonsCurrentlyInCreation 中, 表示 A 正在创建过程中
  - 调用 singleFactory.getObject() 通过 Reflect 创建 A Obj, 此时 A Obj 的成员都是空的, 即 A 引用的 B 也是空的
  - 生成 A 的 ObjectFactory 存入 singletonFactories, ObjectFactory 本质是一个 Lambda, 可用于动态创建 A 的 Normal Obj 或 Proxy Obj
  - 通过 BeanPostProcessor 发现 A 依赖 B, 需要去创建 B

- 调用 getBean() 获取 B, 依次查询 singletonObjects, earlySingletonObjects 和 singletonFactories, 未查询到 B Cache, 调用 getSingleton() 创建 B

  - 调用 beforeSingletonCreation() 添加 B 到 singletonsCurrentlyInCreation 中
  - 调用 singleFactory.getObject() 通过 Reflect 创建 B Obj, 此时 B Obj 的成员都是空的, 即 B 引用的 A 也是空的
  - 生成 B 的 ObjectFactory 存入 singletonFactories
  - 通过 BeanPostProcessor 发现 B 依赖 A, 并发现 A 也在 singletonsCurrentlyInCreation 中, 说明 A 和 B 存在 Circular Reference, 需要去处理 Circular Reference

- 调用 getBean() 获取 A, 依次查询 singletonObjects, earlySingletonObjects 和 singletonFactories, 从 singletonFactories 中获取到 A 的 OpenFactory, 执行 Lambda 创建 A Obj 放入 earlySingletonObjects, 并移除 singletonFactories 中 A 的 OpenFactory

  - 如果 C 引用了 A, 直接从 earlySingletonObjects 获取 A 即可, 不需要再通过 A 的 OpenFactory 获取 A Obj 了

- 调用 populateBean() 填充 B 依赖的 A, 此时 B 创建完成, 向 singleObjects 添加 B, 从 singletonsCurrentlyInCreation 和 singletonFactories 移除 B

  - 如果再使用 B, 就可以直接从 singleObjects 中获取

- 调用 populateBean() 填充 A 依赖的 B, 此时 A 创建完成, 向 singleObjects 添加 A, 从 singletonsCurrentlyInCreation 和 earlySingletonObjects 移除 A


![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401152302912.png)

# Circular Reference

这里 A Bean 的初始化阶段需要调用 populateBean() 去填充 B Bean, 需要去创建 B Bean, 而 B Bean 的初始化阶段需要调用 populateBean() 去填充 A Bean 产生 Circular Reference

```java
@Component
public class A {
    @Autowired
    private B b;
}
```

```java
@Component
public class B {
    @Autowired
    private A a;
}
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202401151818697.png)

# Circular Reference (Constructor)

Spring 无法解决 Constructor 引起的 Circular Reference.

Bean Lifecycle 的 populateBean() 中通过 Three-Level Cache 解决了 Circular Reference, 而 createBeanInstance() 是早于 populateBean() 的. A 执行 createBeanInstance() 时, 在 Constructor 中需要去获取 B, 此时 Bean 只存储在 beanDefinitionMap 中, Spring 的 createBeanInstance() 并没有去解决 Circular Reference.

```java
@Component
public class A {
    private B b;

    public A(B b) {
        this.b = b;
    }
}
```

```java
@Component
public class B {
    private A a;

    public B(A a) {
        this.a = a;
    }
}
```

通过 @Lazy 延迟加载 A 或 B, 可以解决这个 Circular Reference

```java
@Component
public class A {
    private B b;

    public A(@Lazy B b) {
        this.b = b;
    }
}
```
