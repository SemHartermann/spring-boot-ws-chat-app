import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebSocketService} from "../services/web-socket.service";
import {ChatMessageDto} from "../models/chatMessageDto";
import { UserDto } from '../models/userDto';
import {MessageService} from "../services/message.service";

@Component({
  selector: 'cf-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit{

  public static userConnectionDto: UserDto;

  public static messageService: MessageService;

  constructor() {
    LoginFormComponent.messageService = new MessageService();
  }

  ngOnInit(): void {
  }

  enterName(nameInput: HTMLInputElement){
    console.log('nameInput.value', nameInput.value)
    LoginFormComponent.userConnectionDto = new UserDto(nameInput.value);
    LoginFormComponent.messageService.subscribeUsersChat();
    LoginFormComponent.messageService.sendUser(LoginFormComponent.userConnectionDto)
  }

}
