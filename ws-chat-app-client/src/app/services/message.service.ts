import { Injectable } from '@angular/core';
import {ChatMessageDto} from "../models/chatMessageDto";
import {UserDto} from "../models/userDto";

declare var SockJS: any

declare var Stomp: any;

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {
    this.initializeWebSocketConnection();
  }
  // @ts-ignore
  stompClient;

  chatMessages : ChatMessageDto[] = [];

  users: UserDto[] = [];

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/chat';
    console.log(serverUrl);
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe('/topic/message', (message: { body: any; }) => {
        if (message.body) {
          this.chatMessages.push(JSON.parse(message.body));
        }
      });

      this.stompClient.subscribe('/topic/users', (user: { body: any; }) => {
        if (user.body) {
          this.users = (JSON.parse(user.body));
          console.log(this.users);
        }
      });

    });
  }

  sendMessage(message : ChatMessageDto) {
    this.stompClient.send('/app/send/message' , {}, JSON.stringify(message));
  }

  sendUser(user : UserDto) {
    this.stompClient.send('/app/send/user' , {}, JSON.stringify(user));
  }
}
