import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChatMessageDto } from '../models/chatMessageDto';
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

  receiver: UserDto;

  constructor(public messageService: MessageService) {
  }

  ngOnInit(): void {
    this.userConnection = new UserDto(LoginFormComponent.userConnectionDto.name);

    console.log(this.userConnection);
  }

  ngOnDestroy(): void {
    /*console.log("User disconnected" + this.userConnection);

    this.messageService.sendDisconnected(this.userConnection);*/
  }

  sendMessage(sendForm: NgForm) {
    const chatMessageDto = new ChatMessageDto(this.userConnection.name, sendForm.value.message, this.receiver.name);
    this.messageService.sendMessage(chatMessageDto);
    // @ts-ignore
    sendForm.controls.message.reset();
  };

  enterReceiver(user: UserDto){
    this.receiver = user;
    let users: string[] = [];
    users.push(this.userConnection.name);
    users.push(this.receiver.name);
    this.messageService.sendUsersChat(users);
    console.log(this.receiver)
  }

}
