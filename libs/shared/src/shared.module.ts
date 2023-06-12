import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { DynamicModule, Module } from '@nestjs/common';
import { SharedService } from './shared.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {
  static registerRmq(service: string, queue: string): DynamicModule {
    return {
      module: SharedModule,
      providers: [
        {
          provide: service,
          useFactory: (configService: ConfigService) => {
            const USER = configService.get('RABBITMQ_USER');
            const PASSWORD = configService.get('RABBITMQ_PASS');
            const HOST = configService.get('RABBITMQ_HOST');

            return ClientProxyFactory.create({
              transport: Transport.RMQ,
              options: {
                urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
                queue,
                queueOptions: {
                  durable: true,
                },
              },
            });
          },
          inject: [ConfigService],
        },
      ],
    };
  }
}
