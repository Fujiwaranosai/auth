import { ExecutionContext } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';

import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { JwtAuthGuard } from './jwt-auth.guard';

import Faker = require('faker');
import Chai = require('chai');
import Sinon = require('sinon');
import SinonChai = require('sinon-chai');

Chai.use(SinonChai);

describe('JwtAuthGuard', () => {
  let app: TestingModule;

  before(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          secret: 'secret',
        }),
      ],
      providers: [AppService, JwtAuthGuard],
    }).compile();
  });

  it('should be defined', () => {
    const guard = app.get(JwtAuthGuard);
    const jwtService = app.get(JwtService);
    const configService = app.get(ConfigService);
    Sinon.stub(configService, 'get').withArgs('JWT_SECRET', Sinon.match.string).returns('secret');

    const payload = { content: Faker.random.words() };
    const data = {
      token: jwtService.sign(payload),
    };
    const context = {
      switchToRpc: () => ({
        getData: () => data,
      }),
    };
    const jwtPayload = jwtService.verify(data.token, { secret: 'secret' });

    expect(guard.canActivate(context as ExecutionContext)).to.be.true;
    expect(jwtPayload).to.contains(payload);
  });
});
