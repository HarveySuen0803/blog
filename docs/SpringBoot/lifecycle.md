# Lifecycle

Lifecycle

1. starting
2. environmentPrepared
3. contextPrepared
4. contextLoaded
5. started
6. ready
7. running

listener/MySpringApplicationRunListener.java, 配置 lifecycle

```java
public class MySpringApplicationRunListener implements SpringApplicationRunListener {
    // app 启动过程中调用, 通过 BootstrapContext 启动 app
    @Override
    public void starting(ConfigurableBootstrapContext bootstrapContext) {
        System.out.println("starting()");
    }

    // env 准备好后调用
    @Override
    public void environmentPrepared(ConfigurableBootstrapContext bootstrapContext, ConfigurableEnvironment environment) {
        System.out.println("environmentPrepared()");
    }

    // IOC Container 准备好后调用
    @Override
    public void contextPrepared(ConfigurableApplicationContext context) {
        System.out.println("contextPrepared()");
    }

    // IOC Container 加载后调用, 此前, 导入了 Configuration
    @Override
    public void contextLoaded(ConfigurableApplicationContext context) {
        System.out.println("contextLoaded()");
    }

    // app 启动后调用, 此前, 刷新了 IOC Container, 创建了 Bean
    @Override
    public void started(ConfigurableApplicationContext context, Duration timeTaken) {
        System.out.println("started()");
    }

    // app 准备好后调用, 此前, 调用了 runner 运行 app, 可以接受 req
    @Override
    public void ready(ConfigurableApplicationContext context, Duration timeTaken) {
        System.out.println("ready()");
    }

    // app 启动失败后调用, 作用于 environmentPrepared, contextPrepared, contextLoaded, started, ready, running
    @Override
    public void failed(ConfigurableApplicationContext context, Throwable exception) {
        System.out.println("failed()");
    }
}
```

META-INF/spring.factories, 注册 lifecycle

- Listener 会读取 classpath:/META-INF/spring.factories 配置 SpringBoot

```properties
org.springframework.boot.SpringApplicationRunListener=com.harvey.listener.MyApplicationListener
```

# Listener

- BootstrapRegistryInitializer: 监听 starting stage
- ApplicationContextInitializer: 监听 contextPrepared stage
- ApplicationListener: 监听 event
- SpringApplicationRunListener: 监听 lifecycle
- ApplicationRunner: 监听 ready stage
- CommandLineRunner: 监听 ready stage

# Event

Event + Lifecycle

1. ApplicationStartingEvent
2. starting
3. ApplicationEnvironmentPreparedEvent
4. environmentPrepared
5. ApplicationContextInitializedEvent
6. contextPrepared
7. ApplicationPreparedEvent
8. contextLoaded
9. ApplicationStartedEvent
10. started
11. AvailabilityChangeEvent: 配置 LivenessState.CORRECT 表示 app started
12. ApplicationReadyEvent
13. ready
14. AvailabilityChangeEvent: 配置 ReadinessState.ACCEPTING_TRAFFIC 表示 app ready
16. running

listener/MyApplicationListener.java, 配置 Event

```java
public class MyApplicationListener implements ApplicationListener<ApplicationEvent> {
    @Override
    public void onApplicationEvent(ApplicationEvent event) {
        System.out.println(event);
    }
}
```

# publish Event

event/EventPublisher.java, 配置 Event Publisher

```java
@Service
public class EventPublisher implements ApplicationEventPublisherAware {
    ApplicationEventPublisher applicationEventPublisher;

    public void publishEvent(ApplicationEvent event) {
        applicationEventPublisher.publishEvent(event);
    }

    // IOC 自动 DI applicationEventPublisher
    @Override
    public void setApplicationEventPublisher(@NotNull ApplicationEventPublisher applicationEventPublisher) {
        this.applicationEventPublisher = applicationEventPublisher;
    }
}
```

event/SigninSuccessEvent.java, 配置 Event

```java
public class SigninSuccessEvent extends ApplicationEvent {
    public SigninSuccessEvent(User source) {
        super(source);
    }
}
```

UserController.java, 发布 Event

```java
@GetMapping("/signin")
public void signin() {
    SigninSuccessEvent event = new SigninSuccessEvent(new User(1, "sun", 18, "F"));
    eventPublisher.publishEvent(event);
}
```

UserService.java, 监听 Event, 根据 Event 调用 Method

```java
@Service
public class UserService implements ApplicationListener<SigninSuccessEvent> {
    @Override
    public void onApplicationEvent(SigninSuccessEvent event) {
        show((User) event.getSource());
    }

    public void show(User user) {
        System.out.println("hello world");
    }
}
```

# @EventListener

通过 @EventListener 代替 ApplicationListener 监听 Event

```java
@Service
public class UserService {
    @EventListener
    public void onEvent(SigninSuccessEvent event) {
        show((User) event.getSource());
    }

    public void show(User user) {
        System.out.println("hello world");
    }
}
```