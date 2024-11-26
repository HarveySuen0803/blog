### VsCode 配置

settings.json

```json
{
  "java.compile.nullAnalysis.mode": "automatic",
  "java.jdt.ls.java.home": "/usr/local/lib/oracle-8/contents/home",
  "java.configuration.maven.userSettings": "/Users/HarveySuen/.m2/meituan/setting.xml",
  "maven.executable.options": "-s /Users/HarveySuen/.m2/meituan/setting.xml"
}
```

launch.json

```json
{
  "configurations": [
    {
      "type": "java",
      "name": "Spring Boot-PolarisServerApplication<polaris-server>",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "mainClass": "com.sankuai.kepler.polaris.PolarisServerApplication",
      "projectName": "polaris-server",
      "args": "",
      "envFile": "${workspaceFolder}/.env"
    }
  ]
}
```

### 禁用指定告警

- [如何禁用指定告警](https://stackoverflow.com/questions/74870169/vscode-java-linting-disable-specific-warnings)
- [告警配置列表](https://github.com/eclipse-jdtls/eclipse.jdt.ls/issues/581#issuecomment-373804678)

### 配置格式化

- [如何自定义 Google Java Formatter 格式化](https://dev.to/marcushellberg/how-to-configure-vs-code-java-formatting-1p10)
