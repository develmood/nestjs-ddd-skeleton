import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {OnboardingApplicationModule} from "@nestjs-ddd-skeleton/onboarding/application";
import {MailerModule} from "@nestjs-modules/mailer";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {ConfigModule, ConfigService} from "@nestjs/config";
import configuration from "../../../../config/configuration";

@Module({
  imports: [
    OnboardingApplicationModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/config/env/.env.${process.env.APP_STAGE}`],
      isGlobal: true,
      cache: false,
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('db'),
        autoLoadEntities: true
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('mail')
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
