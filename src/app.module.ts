import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomExceptionFilter } from './filters/custom-exception-filter';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SERVICE'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRE_TIME') ?? '24h' },
      }),
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    AppService,
    LocalStrategy,
  ],
})
export class AppModule {}
