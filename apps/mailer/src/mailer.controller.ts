import { Controller, Get } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @EventPattern('send-mail')
  getHello(@Payload() payload: any): string {
    console.log(payload);
    return this.mailerService.getHello();
  }
}
