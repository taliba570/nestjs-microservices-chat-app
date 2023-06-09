import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private authService: ClientProxy
  ) {}
  
  async postUser() {
    return this.authService.send({
      cmd: 'post-user',
    }, {});
  }
  
  async getUser() {
    return this.authService.send({
      cmd: 'get-users',
    }, {});
  }
  
  async getCurrentUser() {
    return this.authService.send({
      cmd: 'get-current-user'
    }, {})
  }
}
