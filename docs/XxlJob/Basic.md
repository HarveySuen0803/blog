# install XXLJob with Docker

install XXL-Job source code

```shell
curl -LJO https://github.com/xuxueli/xxl-job/archive/refs/tags/2.4.0.zip
```

set directory

```shell
cp -R xxl-job-2.4.0/xxl-job-admin/Dockerfile xxl-job-admin-build/
cp -R xxl-job-2.4.0/xxl-job-admin/src/main/resources/application.properties xxl-job-admin-build/
cp -R xxl-job-2.4.0/xxl-job-admin/target/xxl-job-admin-2.4.0.jar xxl-job-admin-build/
```

```
xxl-job-admin-build/
|-- application.properties
|-- Dockerfile
`-- xxl-job-admin-2.4.0.jar
```

configure properties (file: application.properties)

```properties
server.port=11200
server.servlet.context-path=/xxl-job-admin

spring.datasource.url=jdbc:mysql://127.0.0.1:3306/xxl_job?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai
spring.datasource.username=root
spring.datasource.password=111
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

create database

```sql
source ./xxl-job-2.4.0/doc/db/tables_xxl_job.sql
```

configure Dockerfile (file: Dockerfile)

```shell
FROM openjdk:8-jre-slim
MAINTAINER xuxueli

ENV PARAMS=""
ENV JAVA_OPTS="-Dspring.config.location=/xxl-job-admin/application.properties"

ENV TimeZone=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TimeZone /etc/localtime && echo $TimeZone > /etc/timezone

COPY ./application.properties /xxl-job-admin/application.properties

ADD ./xxl-job-admin-*.jar /xxl-job-admin/app.jar

ENTRYPOINT ["sh","-c","java -jar $JAVA_OPTS /xxl-job-admin/app.jar $PARAMS"]
```

build image

```shell
sudo docker build -t xxl-job-admin:2.4.0 ./
```

startup image

```shell
sudo docker container run \
    --name xxl-job-admin \
    --restart=always \
    --privileged=true \
    -p 11200:11200 \
    -d xxl-job-admin:2.4.0
```

access http://127.0.0.1:11200/xxl-job-admin

![](https://note-sun.oss-cn-shanghai.aliyuncs.com/image/202312241755438.png)

