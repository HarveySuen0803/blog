### 缓存预热

从 0 到 1 自主设计与研发了缓存预热系统，支持分析历史日志信息推测未来可能的请求，提前预热接口，覆盖了几乎全场景的预热，极具特色和创新的预热设计，并提供一套监控和扩展方案，为团队改善首屏响应，TP95 等多个性能指标。

仅在一个月内就完成了调研和设计，并开发出 MVP 版本，现已成为团队核心底层性能治理工具。在架构和实现上，参考了非常多开源项目和优秀设计，涉及架构设计，通用性，高并发，大数据，分布式等一些列难题。

- 通用性：构建了一套规则引擎，可以根据配置动态生成不同的算子分析历史日志，推测出未来请求进行预热。用户只需要简单配置，就可以实现对一个接口的预热。
- 扩展性：提供了一套接口，支持在不同的业务场景下，根据需求在缓存预热的关键步骤上进行卡控和处理。还可以扩充算子，实现自定义的分析逻辑，极具扩展性。
- 便捷性：业务方只需要导入一个 jar 包，做些简单的配置即可接入，同时参考 XXL-JOB 和 ServiceMesh 构建了一个内嵌的 Web 服务器，专门用于通信和服务治理，业务方无需关心服务治理的具体细节。
- 跨框架：核心组件的实现不强依赖于 Spring, Lombok, Sl4j 等框架工具，非常的轻量，目前提供了 SpringBoot 的无配置接入方案，除此之外，其他的框架也可以采用原生 Java 的方式接入。
- 跨服务：参考 RPC 框架的泛化调用设计，设计了一套跨系统泛化调用链路，在安全，通用，性能之间做出了平衡。
- 跨业务：参考 XXL-JOB 的设计，设计了 调度中心 和 调度节点 的架构，可以稳定为不同的业务方提供服务。

### 搜索服务

从 0 到 1 自主设计与研发了搜索服务，为团队搭建了一套搜索基建，除了基础的搜索服务之外，还深度整合了平台的业务特色，服务于 BI 系统，机器人推送，公众号等多个场景。

仅在一个月内完成了调研和设计，并开发出了 MVP 版本，以最快的速度和最低的成本完成了这套建设。

- 通用性：构建了一套通用的搜索基础建设，可以服务于多个业务场景，并提供了一套分词，同步，迁移，备份方案。
- 独特性：区别于平台的大搜，深度整合点评的业务特色，例如：维护了一套独有的词典，做相关的联想和分词。

### 专业能力

熟悉 Java, Mybatis, Spring, SpringCloud, SpringSecurity, Redis, RabbitMQ, ElasticSearch 等几乎所有主流的技术栈，并且都有一定的理解和开发经验，通晓常见的八股文。

熟悉 JVM，对内存模型，类加载，GC，执行引擎等都有着深刻的理解，实习期间有过 2 次 FGC 处理经验。

熟悉 JUC，对 ThreadPool，Lock，ThreadLocal 等并发知识点有着深刻的理解，踩过非常多的坑，有着大量的实战经验。手写过一个动态线程池，支持平台化部署，以及线上动态调整线程池参数。https://github.com/HarveySuen0803/threatic

熟悉 Spring 的底层实现，手写过一个简易的 Spring 框架，实现了 IOC 和 AOP 等主要功能。
https://github.com/HarveySuen0803/natto

熟悉 RPC 的底层实现，手写过一个简易的 RPC 框架，实现了泛化调用，内嵌 Web 服务器，TCP 通信等主要功能。
https://github.com/HarveySuen0803/hake

熟悉 Mybatis 的底层实现，手写过一个简易的 Mybatis 框架，实现了 SQL 封装，映射，运行 等主要功能。
https://github.com/HarveySuen0803/mybatic

### 个人能力

本人非常热衷于技术分享，在全网发布了入 “深度解析 ThreadLocal”，“深度解析事件监听” 等六篇文章，获得了 1W+ 的阅读量，同时还在积极维护个人博客。实习期期间也在积极为团队产出优质文章，提高团队整体质量。

本人也很擅长沟通交流，和周围的同学们相处非常融洽，也组织了一个开发小团队，闲暇时间和同学们共同开发独立项目。