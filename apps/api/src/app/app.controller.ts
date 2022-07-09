import {Controller, Get, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {ConfigService} from "@nestjs/config";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
  ) {}

  @Get()
  async getData() {
    return this.appService.getData();
  }

  @Get('config')
  async getConfig() {
    return {
      "NODE_ENV": process.env.NODE_ENV,
      "APP_STAGE": process.env.APP_STAGE,
    };
  }
}
