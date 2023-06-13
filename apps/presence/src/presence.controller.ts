import { Controller } from '@nestjs/common';
import { MessagePattern, Ctx, RmqContext } from '@nestjs/microservices';

import { SharedService, AuthGuard } from '@app/shared';

import { PresenceService } from './presence.service';

@Controller()
export class PresenceController {
  constructor(
    private readonly presenceService: PresenceService,
    private readonly sharedService: SharedService,
    private readonly authGuard: AuthGuard,
  ) {}

  @MessagePattern({ cmd: 'get-presence' })
  async getUser(@Ctx() context: RmqContext) {
    this.sharedService.acknowledgeMessage(context);

    console.log(123, this.authGuard.hasJwt());

    return this.presenceService.getHello();
  }
}
