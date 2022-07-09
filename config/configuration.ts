import {join} from "path";
import {PugAdapter} from "@nestjs-modules/mailer/dist/adapters/pug.adapter";

export default () => ({
  db: {
    type: process.env.DB_TYPE as any,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: true,
    autoLoadEntities: true,
    logging: ["errors"],
  },
  mail: {
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
  }
})
