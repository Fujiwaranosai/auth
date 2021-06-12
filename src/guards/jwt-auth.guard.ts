import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private configService: ConfigService, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    const secret = this.configService.get('JWT_SECRET');
    const rpcContext = context.switchToRpc();
    const data = rpcContext.getData();
    try {
      const result = this.jwtService.verify(data.token, { secret });
      data.jwtPayload = result;
      return true;
    } catch (ignore) {
      throw new UnauthorizedException();
    }
  }
}
