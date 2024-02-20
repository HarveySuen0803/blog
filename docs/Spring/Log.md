# Log

Log Facade: provide Interface, regulate Log Impl (eg. SLF4j, JCL, JBoss-logging)

Log Impl: impl Log Facade (eg. Log4j, Log4j2, Logback, JUL)

set Log by ApplicationListener instead of AutoConfiguration, because Log should started after project

# Log4j2

import Dependency

```xml
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.20.0</version>
</dependency>

<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-slf4j2-impl</artifactId>
    <version>2.20.0</version>
</dependency>
```

set Log4j2 (file. log4j2-spring.xml)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <loggers>
        <!-- log lev: TRACE < DEBUG < INFO < WARN < ERROR < FATAL -->
        <root level="DEBUG">
            <!-- 导入 appenders 中的 ConsoleLog, FileLog, RollingFileLog -->
            <appender-ref ref="ConsoleLog"/>
            <appender-ref ref="FileLog"/>
            <appender-ref ref="RollingFileLog"/>
        </root>
    </loggers>

    <appenders>
        <!-- console log -->
        <console name="ConsoleLog" target="SYSTEM_OUT">
            <!-- log format -->
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss SSS} [%t] %-3level %logger{1024} - %msg%n"/>
        </console>

        <!-- file log -->
        <File name="FileLog" fileName="/Users/HarveySuen/Project/spring-demo/spring-demo1/log/test1.log" append="false">
            <PatternLayout pattern="%d{HH:mm:ss.SSS} %-5level %class{36} %L %M - %msg%xEx%n"/>
        </File>

        <!-- file log config -->
        <RollingFile name="RollingFileLog"
                     fileName="/Users/HarveySuen/Project/spring-demo/spring-demo1/log/test2.log"
                     filePattern="log/$${date:yyyy-MM}/app-%d{MM-dd-yyyy}-%i.log.gz"
        >
            <PatternLayout pattern="%d{yyyy-MM-dd 'at' HH:mm:ss z} %-5level %class{36} %L %M - %msg%xEx%n"/>
            <!-- over 50MB, auto compress -->
            <SizeBasedTriggeringPolicy size="50MB"/>
            <!-- max file num (def. 7) -->
            <DefaultRolloverStrategy max="20"/>
        </RollingFile>
    </appenders>
</configuration>
```

invoke Logger API

```java
// org.slf4j.Logger
private final Logger log = LoggerFactory.getLogger(UserService.class);

public void show() {
    log.info("hello world");
}
```

