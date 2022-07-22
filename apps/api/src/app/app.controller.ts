import {Controller, Get} from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  async getData() {
    return 'Welcome to API v1.0';
  }
}
