import {Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
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
