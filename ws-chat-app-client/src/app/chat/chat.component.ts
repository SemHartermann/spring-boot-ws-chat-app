import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatMessageDto } from '../models/chatMessageDto';
import { WebSocketService } from '../services/web-socket.service';
import {UserDto} from "../models/userDto";
import {LoginFormComponent} from "../login-form/login-form.component";
import {MessageService} from "../services/message.service";


@Component({
  selector: 'cf-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy{

  userConnection: UserDto;

  constructor(public messageService: MessageService) {
  }

  ngOnInit(): void {
    this.userConnection = new UserDto(LoginFormComponent.userConnectionDto.name);

    console.log(this.userConnection);
  }

  ngOnDestroy(): void {

  }

  sendMessage(sendForm: NgForm) {
    const chatMessageDto = new ChatMessageDto(this.userConnection.name, sendForm.value.message);
    this.messageService.sendMessage(chatMessageDto);
    // @ts-ignore
    sendForm.controls.message.reset();
  };


}
