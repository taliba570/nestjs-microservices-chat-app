import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
    @Inject('PRESENCE_SERVICE') private presenceService: ClientProxy,
  ) {}

  async postUser() {
    return this.authService.send(
      {
        cmd: 'post-user',
      },
      {},
    );
  }

  async getPresence() {
    return this.presenceService.send(
      {
        cmd: 'get-presence',
      },
      {},
    );
  }

  async getUser() {
    return this.authService.send(
      {
        cmd: 'get-users',
      },
      {},
    );
  }

  async getCurrentUser() {
    return this.authService.send(
      {
        cmd: 'get-current-user',
      },
      {},
    );
  }
}
