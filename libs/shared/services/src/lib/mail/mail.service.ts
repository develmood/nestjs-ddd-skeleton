import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SentMessageInfo } from 'nodemailer';
import { MailOptions } from './mail-options';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async send(message: MailOptions): Promise<SentMessageInfo> {
    return this.mailerService.sendMail(message);
  }
}
