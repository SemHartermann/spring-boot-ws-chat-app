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

  public static receiver: UserDto;

  messageService: MessageService;

  toggleUser : String ;

  public static adminChat: string[];

  constructor() {
    this.messageService = LoginFormComponent.messageService;
  }

  ngOnInit(): void {
    this.userConnection = new UserDto(LoginFormComponent.userConnectionDto.name);

    this.toggleUser="_";

    ChatComponent.receiver = new UserDto("_");

    LoginFormComponent.messageService.subscribeMessages();

    console.log(this.userConnection);
  }

  ngOnDestroy(): void {
    /*console.log("User disconnected" + this.userConnection);

    this.messageService.sendDisconnected(this.userConnection);*/
  }

  sendMessage(sendForm: NgForm) {
    const chatMessageDto = new ChatMessageDto(this.userConnection.name, sendForm.value.message, ChatComponent.receiver.name);
    this.messageService.sendMessage(chatMessageDto);
    // @ts-ignore
    sendForm.controls.message.reset();
  };

  enterReceiver(user: UserDto){
    ChatComponent.receiver = user;
    console.log(ChatComponent.receiver.name)
    let users: string[] = [];
    users.push(this.userConnection.name);
    users.push(ChatComponent.receiver.name);
    this.messageService.sendUsersChat(users);
    console.log(ChatComponent.receiver)
  }

  enterUsersChat(user: string, receiver: string){
    let users: string[] = [];
    users.push(user);
    users.push(receiver);
    ChatComponent.adminChat=users;
    this.messageService.sendUsersChatAdmin(users);
    console.log(ChatComponent.receiver)
  }

  enableDisableRule(buf: String) {
    this.toggleUser = buf;
    console.log(this.toggleUser)
  }
}
