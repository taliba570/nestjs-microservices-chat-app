import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private authService: ClientProxy
  ) {}
  
  async getUser() {
    return this.authService.send({
      cmd: 'get-user',
    }, {});
  }
  
  async getCurrentUser() {
    return this.authService.send({
      cmd: 'get-current-user'
    }, {})
  }
}
