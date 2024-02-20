# Maven

Maven: 专门用于管理和构建 Java 项目的工具, 提供了一套标准化的项目结构, 构建流程 (比如: 编译, 测试, 打包, 发布), 依赖管理机制

安装 Maven

```shell
brew install maven
```

.zshrc, 配置 JAVA_HOME 

```properties
export PATH=/Library/Java/JavaVirtualMachines/zulu-17/Contents/Home/bin:$PATH
```

# IDEA configuration

## Maven environment

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202306022327501.png)

## import Maven project

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202306022327505.png)

## Maven command

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747285.png)

# command

```shell
# 编译 jar, 存储到 target 中
mvn compile

# 删除 target
mvn clean

# 测试
mvn test

# 打包项目, 包含 compile, test, package
mvn package

# 打包项目, 保存到本地仓库
mvn install

# 打包项目, 保存到到私服
mvn deploy
```

# create project

## command create project

### create Java project

```shell
mvn archetype:generate -DgroupId=com.harvey -DartifactId=java-project -DarchetypeArtifactId=maven-archetype-quickstart -Dversion=0.0.1-snapshot -DinteractiveMode=false
```

### create Web project

```shell
mvn archetype:generate -DgroupId=com.harvey -DartifactId=web-project -DarchetypeArtifactId=maven-archetype-webapp -Dversion=0.0.1-snapshot -DinteractiveMode=false
```

## IDEA create project

### create Java project

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202306022327502.png)

### create Web project

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202306022327503.png)

# project structure

```
maven-project
├── pom.xml
└── src
    ├── main
    │   ├── java
    │   └── resources
    └── test
        ├── java
        └── resources
```

# Main Cls

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-jar-plugin</artifactId>
            <version>3.3.0</version>
            <configuration>
                <archive>
                    <manifest>
                        <addClasspath>true</addClasspath>
                        <mainClass>com.harvey.Main</mainClass>
                    </manifest>
                </archive>
            </configuration>
        </plugin>
    </plugins>
</build>
```

# Repository

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747286.png)

仓库的分类

- 本地仓库: 本地计算机中的仓库
- 中央仓库: Maven 团队维护的仓库 (https://repo1.maven.org/maven2)
- 远程仓库: 将中央仓库的包同步到私服里作为远程仓库, 提高使用效率

访问仓库的顺序: 本地仓库 -> 远程仓库 -> 中央仓库

- 访问远程仓库, 下载对应的包, 保存到本地仓库
- 访问中央仓库, 下载对应的包, 保存到中央仓库

## local repository

~/.m2/repository, 默认本地仓库

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747287.png)

conf/settings.xml, 设置本地仓库路径

```xml
<localRepository>/opt/homebrew/opt/mvn/repo</localRepository>
```

## mirror repository

conf/settings.xml

```xml
<mirrors>
    <mirror>  
        <id>alimaven</id>  
        <name>aliyun maven</name>  
        <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
        <mirrorOf>central</mirrorOf>          
    </mirror>
</mirrors>
```

## private repository

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747288.png)

Maven 版本

- release 发行版本, 功能稳定, 停止更新
- snapshot 快照版本, 功能不稳定, 开发阶段

### nexus 

nexus: 私服仓库项目

访问 https://help.sonatype.com/repomanager3/product-information/download, 下载 nexus

bin/nexus.rc, 配置 nexus

```properties
# nexus 需要 jdk8
INSTALL4J_JAVA_HOME_OVERRIDE=$JAVA_8_HOME
```

command

```shell
nexus start
nexus stop
nexus restart
```

访问 `http://localhost:8081`

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747289.png)

- maven-releases, maven-snapshots 是普通仓库
- maven-central 是中央仓库的代理
- maven-public 是仓库组, 包含 maven-releases, maven-snapshots, nuget-hosted

#### create repository

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747290.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747291.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747292.png)

#### join group

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747293.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747294.png)

#### upload package

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747295.png)

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747296.png)

### access private repository

conf/settings.xml, 配置私服账户密码

```xml
<server>
    <!-- releases 的账户密码 -->
    <server>
        <id>harvey-releases</id>
        <username>admin</username>
        <password>111</password>
    </server>
    <!-- snapshots 的账户密码 -->
    <server>
        <id>harvey-snapshots</id>
        <username>admin</username>
        <password>111</password>
    </server>
</servers>
```

conf/settings.xml, 公共仓库配置私服地址

```xml
<mirrors>
    <id>harvey-public</id>
    <mirrorOf>*</mirrorOf>
    <!-- harvey-public 为私服组, 包含 harvey-releases, harvey-snapshots -->
    <url>http://localhost:8081/repository/harvey-public/</url>
</mirrors>
```

conf/settings.xml, 配置访问权限

```xml
<profile>
    <id>allow-snapshots</id>
    <activation>
        <activeByDefault></activeByDefault>
    </activation>
    <repositories>
        <repository>
            <id>harvey-public</id>
            <url>http://localhost:8081/repository/harvey-public/</url>
            <releases>
                <enabled>true</enabled>
            </releases>
            <snapshots>
                <enabled>true</enabled>
            </snapshots>
        </repository>
    </repositories>
</profile>
```

pom.xml 配置版本

```xml
<!-- 指定上传到私服的 snapshots 仓库 -->
<version>1.0-SNAPSHOT</version>
```

pom.xml 项目配置私服地址

```xml
<distributionManagement>
    <!-- releases 地址 -->
    <repository>
        <!-- id 需要和 conf/settings.xml 中配置的私服账户密码的 id 相同 -->
        <id>harvey-releases</id>
        <url>http://localhost:8081/repository/harvey-releases/</url>
    </repository>
    <!-- snapshots 地址 -->
    <snapshotRepository>
        <id>harvey-snapshots</id>
        <url>http://localhost:8081/repository/harvey-snapshots/</url>
    </snapshotRepository>
</distributionManagement>
```

上传项目

```shell
mvn depoly
```

下载项目

```xml
<dependency>
    <groupId>com.harvey</groupId>
    <artifactId>spring-project-utils</artifactId>
    <!-- 指定下载 snapshots 仓库的依赖 -->
    <version>1.0-SNAPSHOT</version>
</dependency>
```

# package

jar: 普通模块打包

war: 普通 web 程序打包

pom: 父工程打包, 聚合工程打包, 仅进行依赖管理

# lifecycle

clean -> default -> site

- clean 清理
    - pre-clean
    - clean
    - post-clean
- default 核心
    - compile
    - test
    - package
    - install
- site 站点
    - pre-site
    - site
    - post-site

同一生命周期内, 执行后边的指令, 就会自动执行前边的所有指令

- 比如: 执行 package, 就会自动执行 compile 和 test

生命周期的每个指令就对应一个插件

- 比如: package 指令 对应 package 插件

# dependency

pom.xml, 配置依赖

```xml
<dependencies>
    <!-- 导入 fastjson -->
    <dependency>
        <!-- 群组名, 一般为域名反写 -->
        <groupId>com.alibaba</groupId>
        <!-- 项目名 -->
        <artifactId>fastjson</artifactId>
        <!-- 项目版本 -->
        <version>2.0.32</version>
        <!-- 依赖作用范围 -->
        <scope>provided</scope>
    </dependency>
</dependencies>
```

## dependency scope

依赖的作用范围 (默认为 compile)

|          | compile environment | test environment | runtime environment |
| -------- | ------------------- | ---------------- | ------------------- |
| compile  | true                | true             | true                |
| test     |                     | true             |                     |
| provided | true                | true             |                     |
| runtime  |                     | true             | true                |
| system   | true                | true             |                     |

- 编译环境: 作用于 main, 只有 main 中可以使用对应的 jar
- 测试环境: 作用于 test, 只有 test 中可以使用对应的 jar
- 运行环境: 作用于运行时 (比如: 动态绑定机制调用对应的 jar 中的程序)

## opentional dependency

> maven-project1

maven-project1 隐藏 fastjson 依赖

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>2.0.32</version>
    <optional>true</optional>
</dependency>
```

> maven-project2

maven-project2 导入 maven-project1, 无法在 maven-project2 看见 maven-project1 的 fastjson

```xml
<dependency>
    <groupId>com.harvey</groupId>
    <artifactId>maven-project01</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

## exclude dependency

```xml
<dependency>
    <groupId>com.harvey</groupId>
    <artifactId>maven-project1</artifactId>
    <version>1.0-SNAPSHOT</version>
    <!-- 如果 maven-project1 有 fastjson, 就排除 fastjson -->
    <exclusions>
        <exclusion>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

## version management

统一管理依赖版本, 不是导入依赖

```xml
<dependencyManagement>
    <dependencies>
        <!-- 规定 lombok 在项目中的版本 -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.26</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```

导入依赖, 不需要编写版本

```xml
<dependencies>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
</dependencies>
```

# properties

## java version

```xml
<properties>
    <maven.compiler.target>20</maven.compiler.target>
    <maven.compiler.source>20</maven.compiler.source>
</properties>
```

## custom properties

配置自定义属性

```xml
<properties>
    <lombok.version>1.18.26</lombok.version>
</properties>
```

调用自定义属性

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>${lombok.version}</version>
</dependency>
```

## setting properties

调用 conf/settings.xml 中的配置属性

```xml
${settings.localRepository}
```

## built-in properties

调用内置属性

```xml
${version}
```

## system properties

查看系统属性

```shell
mvn help:system
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747297.png)

调用系统属性

```xml
${http.proxyHost}
```

## enviroment properties

查看环境属性

```shell
mvn help:system
```

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747298.png)

调用环境属性

```xml
${env.JAVA_HOME}
```

# module dev

project structure

```
spring-project
├── spring-project
├── spring-project-controller
├── spring-project-mapper
├── spring-project-domain
├── spring-project-properties
├── spring-project-service
└── spring-project-utils
```

- spring-project 导入 spring-project-controller, spring-project-service, spring-project-mapper, spring-project-domain ...

> spring-project-domain

将 domain 拆成一个 Maven 模块

```
spring-project-domain
├── pom.xml
└── src
    └── main
        └── java
            └── com
                └── harvey
                    └── domain
                        ├── Dept.java
                        ├── DeptLog.java
                        ├── Emp.java
                        ├── OperationLog.java
                        ├── PageBean.java
                        └── Result.java
```

pom.xml, 配置相关依赖

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.26</version>
</dependency>
```

> spring-project

pom.xml, 导入 domain 的 Maven 模块

```xml
<!-- spring-project-utils -->
<dependency>
    <groupId>com.harvey</groupId>
    <artifactId>spring-project-utils</artifactId>
    <version>1.0-SNAPSHOT</version>
</dependency>
```

## module inheritence

模块之间可以相互继承, 遵循单继承模式, 在父模块中编写公共依赖, 解决重复导入依赖的问题

spring-boot-starter-parent 为 Spring 统一父模块

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747299.png)

> spring-project

父模块

```xml
<!-- 继承 spring-boot-starter-parent -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.1.2</version>
    <relativePath/>
</parent>

<!-- 父模块的打包方式必须是 pom -->
<packaging>pom</packaging>

<!-- 配置公共依赖 -->
<dependencies>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.26</version>
    </dependency>
</dependencies>

<!-- 管理依赖版本 -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.18.26</version>
        </dependency>
    </dependencies>
</dependencyManagement>
```

> spring-project-controller, spring-project-domain, spring-project-mapper, spring-project-service ...

子模块继承父模块

```xml
<!-- 继承 spring-project -->
<parent>
    <groupId>com.harvey</groupId>
    <artifactId>spring-project</artifactId>
    <version>1.0-SNAPSHOT</version>
    <relativePath>../spring-project/pom.xml</relativePath>
</parent>
```

## module resources

pom.xml

```xml
<!-- 配置自定义属性 -->
<properties>
    <jdbc.url>jdbc:mysql://localhost:3306/db</jdbc.url>
</properties>

<build>
    <!-- 配置所有的 main/resources 读取该 pom.xml 中的 properties -->
    <resources>
        <resource>
            <!-- ${project.basedir} 为项目的基础路径 (比如: project/project-controller 和 project/project-service 的基础路径是 project) -->
            <directory>${project.basedir}/src/main/resources</directory>
            <filtering>true</filtering>
        </resource>
    </resources>
    <!-- 配置所有的 test/resources 读取该 pom.xml 中的 properties -->
    <testResources>
        <testResource>
            <directory>${project.basedir}/src/test/resources</directory>
            <filtering>true</filtering>
        </testResource>
    </testResources>
</build>
```

resources/jdbc.properties

```properties
jdbc.url=${jdbc.url}
```

# polymerization

Maven 进行模块化开发, 无法同时操作多个模块

- 比如: install, package

父模块聚合所有子模块, 操作父模块, 就可以操作所有的模块, 解决问题

```xml
<modules>
    <module>../spring-project-domain</module>
    <module>../spring-project-utils</module>
    <module>../spring-project-controller</module>
    <module>../spring-project-service</module>
    <module>../spring-project-mapper</module>
</modules>
```

# multiple enviroment

配置不同的环境

```xml
<profiles>
    <!-- dev env -->
    <profile>
        <id>dev_env</id>
        <properties>
            <jdbc.url>jdbc:mysql://localhost:3306/db01</jdbc.url>
        </properties>
        <activation>
            <!-- 默认开启 -->
            <activeByDefault>true</activeByDefault>
        </activation>
    </profile>
    <!-- pro_env -->
    <profile>
        <id>pro_env</id>
        <properties>
            <jdbc.url>jdbc:mysql://localhost:3306/db02</jdbc.url>
        </properties>
    </profile>
</profiles>
```

指定环境

```shell
mvn package -P dev_env
```

# skip test

## command skip test

```shell
mvn install -D skipTest2
```

## IDEA skip test

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241747300.png)

## configuration skip test

配置插件跳过测试

```xml
<build>
    <pluginManagement>
        <plugins>
            <!-- maven-surefire-plugin 跳过测试 -->
            <plugin>
                <groupId>org.apache.maven</groupId>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.0.0</version>
                <configuration>
                    <skipTests>true</skipTests>
                </configuration>
            </plugin>
        </plugins>
    </pluginManagement>
</build>
```

包含指定类

```xml
<configuration>
    <includes>
        <include>**/UserService.java</include>
    </includes>
</configuration>
```

排除指定类

```xml
<configuration>
    <excludes>
        <exclude>**/UserService.java</exclude>
    </excludes>
</configuration>
```


