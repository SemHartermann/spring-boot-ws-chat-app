import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatMessageDto } from '../models/chatMessageDto';
import { WebSocketService } from '../services/web-socket.service';
import {UserConnectionDto} from "../models/userConnectionDto";
import {LoginFormComponent} from "../login-form/login-form.component";


@Component({
  selector: 'cf-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy{

  userConnection: UserConnectionDto;

  constructor(public webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.userConnection = new UserConnectionDto(LoginFormComponent.userConnectionDto.user);
    this.webSocketService.openWebSocket();
    console.log(this.userConnection);
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  sendMessage(sendForm: NgForm) {
    const chatMessageDto = new ChatMessageDto(this.userConnection.user, sendForm.value.message);
    this.webSocketService.sendMessage(chatMessageDto);
    // @ts-ignore
    sendForm.controls.message.reset();
  };

}
