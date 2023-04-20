import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../models/chatMessageDto';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private _webSocket: WebSocket;

  chatMessages: ChatMessageDto[] = [];

  constructor() {
  }

  public openWebSocket(){
    this._webSocket = new WebSocket('ws://localhost:8080/chat');

    this._webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this._webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    };

    this._webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto){
    this._webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this._webSocket.close();
  }
}
