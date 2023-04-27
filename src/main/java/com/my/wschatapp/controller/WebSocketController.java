package com.my.wschatapp.controller;

import com.my.wschatapp.dto.ChatMessageDto;
import com.my.wschatapp.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.simp.user.SimpUserRegistry;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.util.*;

@Controller

public class WebSocketController {

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final SimpUserRegistry simpUserRegistry;

    private List<User> users = new ArrayList<>();

    private List<ChatMessageDto> chats = new ArrayList<>();

    @Autowired
    WebSocketController(SimpMessagingTemplate simpMessagingTemplate, SimpUserRegistry simpUserRegistry){
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.simpUserRegistry = simpUserRegistry;
    }

    @MessageMapping("/send/message")
    @SendTo("/topic/message")
    public ChatMessageDto sendMessage(ChatMessageDto message){
        chats.add(message);
        System.out.println(message);
        return message;
    }

    @MessageMapping("/send/chat")
    public void sendChat(List<String> users, StompHeaderAccessor headers){

        System.out.println(users);
        System.out.println(headers);

        List<ChatMessageDto> currentChat = new ArrayList<>();

        for (ChatMessageDto chat : chats) {
            if ((chat.getUser().equals(users.get(0)) && chat.getReceiver().equals(users.get(1)))
                    || (chat.getUser().equals(users.get(1)) && chat.getReceiver().equals(users.get(0)))){

                currentChat.add(chat);
            }
        }
        System.out.println(currentChat);
        Optional<String> user = Optional.ofNullable(headers.getUser())
                .map(Principal::getName);
        System.out.println(user);
        simpMessagingTemplate.convertAndSendToUser(String.valueOf(user),"/topic/chat", currentChat);
    }

    @MessageMapping("/send/user")
    @SendTo("/topic/users")
    public List<User> sendUser(User newUser){
        for (User user : users) {
            if(user.getName().equals(newUser.getName())){
                return users;
            }
        }
        users.add(newUser);
        System.out.println(users);
        return users;
    }
}

