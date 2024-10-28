import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MailerService } from './mailer.service';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern('createMailer')
  create(@Payload() createMailerDto: CreateMailerDto) {
    return this.mailerService.create(createMailerDto);
  }

  @MessagePattern('findAllMailer')
  findAll() {
    return this.mailerService.findAll();
  }

  @MessagePattern('findOneMailer')
  findOne(@Payload() id: number) {
    return this.mailerService.findOne(id);
  }

  @MessagePattern('updateMailer')
  update(@Payload() updateMailerDto: UpdateMailerDto) {
    return this.mailerService.update(updateMailerDto.id, updateMailerDto);
  }

  @MessagePattern('removeMailer')
  remove(@Payload() id: number) {
    return this.mailerService.remove(id);
  }
}
