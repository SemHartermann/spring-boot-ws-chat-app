package com.my.wschatapp.controller;

import com.my.wschatapp.dto.ChatMessageDto;
import com.my.wschatapp.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
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
    public void sendMessage(ChatMessageDto message){
        chats.add(message);
        System.out.println(message);
        this.simpMessagingTemplate.convertAndSend("/topic/message-" + message.getUser(), message);
        if (!Objects.equals(message.getUser(), message.getReceiver())){
            this.simpMessagingTemplate.convertAndSend("/topic/message-" + message.getReceiver(), message);
        }
    }

    @MessageMapping("/send/chat")
    public void sendChat(List<String> usersChat){

        System.out.println(usersChat);

        List<ChatMessageDto> currentChat = new ArrayList<>();

        for (ChatMessageDto chat : chats) {
            if ((chat.getUser().equals(usersChat.get(0)) && chat.getReceiver().equals(usersChat.get(1)))
                    || (chat.getUser().equals(usersChat.get(1)) && chat.getReceiver().equals(usersChat.get(0)))){

                currentChat.add(chat);
            }
        }
        System.out.println(currentChat);
        System.out.println("/topic/chat-" + usersChat.get(0));
        this.simpMessagingTemplate.convertAndSend("/topic/chat-" + usersChat.get(0), currentChat);

    }

    @MessageMapping("/send/user")
    @SendTo("/topic/users")
    public List<User>  sendUser(User newUser){
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

