package com.my.wschatapp.controller;

import com.my.wschatapp.dto.ChatMessageDto;
import com.my.wschatapp.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.WebSocketMessage;

import java.util.ArrayList;
import java.util.List;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate template;

    private List<User> users = new ArrayList<>();

    @Autowired
    WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/send/message")
    @SendTo("/topic/message")
    public ChatMessageDto sendMessage(ChatMessageDto message){
        System.out.println(message);
        return message;
    }

    @MessageMapping("/send/user")
    @SendTo("/topic/users")
    public List<User> sendUser(User user){
        users.add(user);
        System.out.println(users);
        return users;
    }

}
