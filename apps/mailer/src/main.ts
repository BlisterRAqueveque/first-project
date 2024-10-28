import { NestFactory } from '@nestjs/core';
import { MailerModule } from './mailer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MailerModule,
    {
      transport: Transport.TCP,
      options: {
        port: 3001,
        host: 'localhost',
      },
    },
  );
  await app.listen();
}
bootstrap();
