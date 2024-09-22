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