package com.my.wschatapp.dto;

public class ChatMessageDto {

    private String user;

    private String message;

    public ChatMessageDto(String user, String message) {
        this.user = user;
        this.message = message;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "ChatMessageDto{" +
                "user='" + user + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}
