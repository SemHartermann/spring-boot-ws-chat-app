import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatMessageDto } from '../models/chatMessageDto';
import { WebSocketService } from '../services/web-socket.service';
import {UserConnectionDto} from "../models/userConnectionDto";
import {LoginFormComponent} from "../login-form/login-form.component";
import {MessageService} from "../services/message.service";


@Component({
  selector: 'cf-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy{

  userConnection: UserConnectionDto;

  constructor(public messageService: MessageService) {
  }

  ngOnInit(): void {
    this.userConnection = new UserConnectionDto(LoginFormComponent.userConnectionDto.user);

    console.log(this.userConnection);
  }

  ngOnDestroy(): void {

  }

  sendMessage(sendForm: NgForm) {
    const chatMessageDto = new ChatMessageDto(this.userConnection.user, sendForm.value.message);
    this.messageService.sendMessage(chatMessageDto);
    // @ts-ignore
    sendForm.controls.message.reset();
  };

}
