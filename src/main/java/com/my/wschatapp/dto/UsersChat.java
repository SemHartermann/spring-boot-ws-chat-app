package com.my.wschatapp.dto;

import java.util.Map;

public class UsersChat {

    private Map<Map<User, User> , String> chat;

    public UsersChat() {
    }

    public UsersChat(Map<Map<User, User>, String> chat) {
        this.chat = chat;
    }

    public Map<Map<User, User>, String> getChat() {
        return chat;
    }

    public void setChat(Map<Map<User, User>, String> chat) {
        this.chat = chat;
    }
}
