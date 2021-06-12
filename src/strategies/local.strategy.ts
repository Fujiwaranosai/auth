import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ passReqToCallback: true });
  }

  async validate(request: Request, username: string, password: string) {
    return {
      id: 1,
      role: 'agent',
      username,
    };
  }
}
