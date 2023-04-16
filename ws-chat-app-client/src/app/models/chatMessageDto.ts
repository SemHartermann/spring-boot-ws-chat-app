export class ChatMessageDto {
  user: string;
  message: string;
  recipient: string;


  constructor(user: string, message?: string, recipient?: string) {

    this.user = user;

    if(recipient){
      this.recipient = recipient;
    }

    if (message){
      this.message = message;
    }

  }
}
