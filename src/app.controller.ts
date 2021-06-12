import { Controller, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { AppService } from './app.service';
import { AuthCommand } from './auth.command';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './models/user';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService) {}

  @MessagePattern(AuthCommand.Login)
  @UseGuards(LocalAuthGuard)
  login(@Payload() user: User) {
    return this.appService.getAccessToken(user);
  }

  @MessagePattern(AuthCommand.Verify.Token)
  @UseGuards(JwtAuthGuard)
  verifyToken(@Payload() data) {
    return data.jwtPayload;
  }
}
