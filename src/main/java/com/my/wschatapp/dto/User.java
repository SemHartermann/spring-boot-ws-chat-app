package com.my.wschatapp.dto;

import java.util.HashMap;
import java.util.Map;

public class User {

    private Map<String, UserConnectionDto> user = new HashMap<>();

    public Map<String, UserConnectionDto> getUser() {
        return user;
    }

    public void setUser(Map<String, UserConnectionDto> user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "User{" +
                "user=" + user +
                '}';
    }

}
