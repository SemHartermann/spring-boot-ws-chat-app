package com.my.wschatapp.dto;

import java.util.List;
import java.util.Map;

public class UsersChat {

    private Map<Map<String, String>, List<ChatMessageDto>> chat;

    public UsersChat() {
    }

    public UsersChat(Map<Map<String, String>, List<ChatMessageDto>> chat) {
        this.chat = chat;
    }

    public Map<Map<String, String>, List<ChatMessageDto>> getChat() {
        return chat;
    }

    public void setChat(Map<Map<String, String>, List<ChatMessageDto>> chat) {
        this.chat = chat;
    }

}
