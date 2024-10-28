import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  getHello(): string {
    return 'Hello World!';
  }
}
