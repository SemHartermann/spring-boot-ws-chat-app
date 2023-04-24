import { Injectable } from '@angular/core';
import {ChatMessageDto} from "../models/chatMessageDto";

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

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8080/chat';
    console.log(serverUrl);
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, (frame: any) => {
      this.stompClient.subscribe('/message', (message: { body: any; }) => {
        if (message.body) {
          this.chatMessages.push(JSON.parse(message.body));
        }
      });
    });
  }

  sendMessage(message : ChatMessageDto) {
    this.stompClient.send('/app/send/message' , {}, JSON.stringify(message));
  }
}
