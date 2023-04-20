export class UserConnectionDto {

  public ip: string;
  public user: string;

  constructor(user: string, ip?: string) {

    this.user = user;

    if (ip){
      this.ip = ip;
    }

  }
}
