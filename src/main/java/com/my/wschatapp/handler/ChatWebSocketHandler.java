package com.my.wschatapp.handler;

/*@Component
public class ChatWebSocketHandler extends TextWebSocketHandler{

    private final List<WebSocketSession> webSocketSessions = new ArrayList<>();
    
    private final List<ChatMessageDto> users = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        webSocketSessions.add(session);
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        for (WebSocketSession webSocketSession : webSocketSessions) {
            webSocketSession.sendMessage(message);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        webSocketSessions.remove(session);
    }
}*/
