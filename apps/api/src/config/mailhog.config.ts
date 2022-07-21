import { join } from 'path';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

export default () => ({
  transport: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
  },
  defaults: {
    from: '"No Reply" <your-beautiful-email-address@gmail.com>'
  },
  template: {
    dir: join(__dirname, 'assets/templates/mail'),
    adapter: new PugAdapter(),
    options: {
      strict: true,
    }
  }
});
