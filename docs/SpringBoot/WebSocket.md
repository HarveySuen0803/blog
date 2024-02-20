# WebSocket

import denpendency

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

set WebSocket server

```java
@Component
@ServerEndpoint("/ws/{sid}")
public class WebSocketServer {
    private static Map<String, Session> sessionMap = new HashMap();

    // invoke after session connection
    @OnOpen
    public void onOpen(Session session, @PathParam("sid") String sid) {
        sessionMap.put(sid, session);
    }

    // invoke after client sends message
    @OnMessage
    public void onMessage(String message, @PathParam("sid") String sid) {
    }

    // close session connection
    @OnClose
    public void onClose(@PathParam("sid") String sid) {
        sessionMap.remove(sid);
    }

    // send message to all client
    public void sendToAllClient(String message) {
        Collection<Session> sessions = sessionMap.values();
        for (Session session : sessions) {
            try {
                session.getBasicRemote().sendText(message);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
```

set ServerEndpointExporter Bean

```java
@Bean
public ServerEndpointExporter serverEndpointExporter() {
    return new ServerEndpointExporter();
}
```

set Websocket task

```java
@Component
public class WebSocketTask {
    @Autowired
    WebSocketServer webSocketServer;

    @Scheduled(cron = "0/5 * * * * ?")
    public void sendMessageToClient() {
        webSocketServer.sendToAllClient("hello world");
    }
}
```