export class Email {

  private recipient!:string;
  private subject!:string;
  private content!:string;

  constructor(recipient: string, subject: string, content: string) {
    this.recipient = recipient;
    this.subject = subject;
    this.content = content;
  }

}
