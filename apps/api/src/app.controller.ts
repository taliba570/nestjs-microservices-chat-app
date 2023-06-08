import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}

  @Get()
  async getUser() {
    return this.appService.getUser();
  }

  @Get('get-current-user')
  async getCurrentUser() {
    return this.appService.getCurrentUser()
  }
}
