import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'post-user' })
  async postUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
    return this.authService.postUser();
  }


  @MessagePattern({ cmd: 'get-users' })
  async getUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'get-current-user' })
  async getCurrentUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
    const users = [
      {
        firstName: 'Tony',
        lastName: 'Robbins'
      },
      {
        firstName: 'Jack',
        lastName: 'Maa'
      },
      {
        firstName: 'Jim',
        lastName: 'Rohn'
      }
    ]
    return { user: users[Math.floor(Math.random() * (2 - 0 + 1) + 0)] };
  }
}
