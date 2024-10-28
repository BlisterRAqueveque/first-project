import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [MailerModule],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
