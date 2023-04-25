export class ChatMessageDto {
  user: string;
  message: string;
  receiver: string;

  constructor(user: string, message?: string, recipient?: string) {

    this.user = user;

    if (message){
      this.message = message;
    }

    if(recipient){
      this.receiver = recipient;
    }

  }
}
