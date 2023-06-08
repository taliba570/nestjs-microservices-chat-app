import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @MessagePattern({ cmd: 'get-user' })
  async getUser(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return { user: 'My Test User' };
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
