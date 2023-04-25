package com.my.wschatapp.dto;

public class ChatMessageDto {

    private String user;

    private String message;

    private String receiver;

    public ChatMessageDto(String user, String message, String receiver) {
        this.user = user;
        this.message = message;
        this.receiver = receiver;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
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
                ", receiver='" + receiver + '\'' +
                '}';
    }
}
