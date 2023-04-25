package com.my.wschatapp.controller;

import com.my.wschatapp.dto.ChatMessageDto;
import com.my.wschatapp.dto.User;
import com.my.wschatapp.dto.UsersChat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.WebSocketMessage;

import java.util.*;
import java.util.stream.Collectors;

@Controller
public class WebSocketController {

    private final SimpMessagingTemplate template;

    private List<User> users = new ArrayList<>();

    private List<ChatMessageDto> chats = new ArrayList<>();

    @Autowired
    WebSocketController(SimpMessagingTemplate template){
        this.template = template;
    }

    @MessageMapping("/send/message")
    @SendTo("/topic/message")
    public ChatMessageDto sendMessage(ChatMessageDto message){

        /*boolean exist = false;

        for (UsersChat chat : chats) {
            if (chat.getChat().containsKey(new HashMap<>().put(message.getReceiver(), message.getUser()))){
                chat.getChat().get(new HashMap<>().put(message.getReceiver(), message.getUser()))
                        .add(message.getMessage());
                exist = true;
            } else if (chat.getChat().containsKey(new HashMap<>().put(message.getUser(), message.getReceiver()))) {
                chat.getChat().get(new HashMap<>().put(message.getUser(), message.getReceiver()))
                        .add(message.getMessage());
                exist = true;
            }
        }

            if(exist) {
                UsersChat newChat = new UsersChat();

                newChat.setChat(new HashMap<>());

                Map<String, String> newPair = new HashMap<>();
                newPair.put(message.getUser(), message.getReceiver());

                List<ChatMessageDto> messages = new ArrayList<>();
                messages.add(message.getMessage());

                newChat.getChat().put(newPair, messages);

                chats.add(newChat);
            }*/

        chats.add(message);
        System.out.println(message);
        return message;
    }

    @MessageMapping("/send/chat")
    @SendTo("/topic/chat")
    public List<ChatMessageDto> sendChat(List<String> users){

        System.out.println(users);

        List<ChatMessageDto> currentChat = new ArrayList<>();

        for (ChatMessageDto chat : chats) {
            if ((chat.getUser().equals(users.get(0)) && chat.getReceiver().equals(users.get(1)))
                    || (chat.getUser().equals(users.get(1)) && chat.getReceiver().equals(users.get(0)))){

                currentChat.add(chat);
            }
        }
        System.out.println(currentChat);
        return currentChat;
    }

    @MessageMapping("/send/user")
    @SendTo("/topic/users")
    public List<User> sendUser(User user){
        users.add(user);
        System.out.println(users);
        return users;
    }

}
