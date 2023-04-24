package com.my.wschatapp.dto;

import java.util.HashMap;
import java.util.Map;

public class User {

    private Map<String, ChatMessageDto> user = new HashMap<>();

    public Map<String, ChatMessageDto> getUser() {
        return user;
    }

    public void setUser(Map<String, ChatMessageDto> user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "User{" +
                "user=" + user +
                '}';
    }

}
