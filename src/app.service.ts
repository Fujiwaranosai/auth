import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { User } from './models/user';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService, private configService: ConfigService) {}

  getAccessToken(user: User) {
    const payload = {
      id: 1,
      role: 'agent',
      username: user.username,
    };

    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_EXPIRE_TIME') ?? '24h',
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
