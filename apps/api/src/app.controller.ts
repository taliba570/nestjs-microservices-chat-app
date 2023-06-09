import { Controller, Get, Inject, Post } from '@nestjs/common';
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
    return this.appService.getCurrentUser();
  }

  @Post('auth')
  async postUser() {
    return this.appService.postUser();
  }
}
