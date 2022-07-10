import { Module } from '@nestjs/common';
import { MailService } from './mail/mail.service';

@Module({
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class SharedServicesModule {}
