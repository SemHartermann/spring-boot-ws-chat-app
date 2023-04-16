import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {WebSocketService} from "../services/web-socket.service";
import {ChatMessageDto} from "../models/chatMessageDto";

@Component({
  selector: 'cf-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy{
  constructor(public webSocketService: WebSocketService) {
  }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }

  sendConnection(sendForm: NgForm) {
    const chatMessageDto = new ChatMessageDto(sendForm.value.user);
    this.webSocketService.sendMessage(chatMessageDto);
    // @ts-ignore
    sendForm.controls.message.reset();
  }
}
