import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { SharedService } from '@app/shared';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sharedService: SharedService,
  ) {}

  @MessagePattern({ cmd: 'post-user' })
  async postUser(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);
    return this.authService.postUser();
  }

  @MessagePattern({ cmd: 'get-users' })
  async getUser(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);

    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'get-current-user' })
  async getCurrentUser(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);

    const users = [
      {
        firstName: 'Tony',
        lastName: 'Robbins',
      },
      {
        firstName: 'Jack',
        lastName: 'Maa',
      },
      {
        firstName: 'Jim',
        lastName: 'Rohn',
      },
    ];
    return { user: users[Math.floor(Math.random() * (2 - 0 + 1) + 0)] };
  }
}
