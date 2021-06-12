import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { SinonSandbox } from 'sinon';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './models/user';

import Chai = require('chai');
import Sinon = require('sinon');
import SinonChai = require('sinon-chai');
import Faker = require('faker');

Chai.use(SinonChai);

describe('AppService', () => {
  let app: TestingModule;
  let sandbox: SinonSandbox;

  before(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          secret: 'secret',
        }),
      ],
      providers: [AppService],
    }).compile();
  });

  beforeEach(() => {
    sandbox = Sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('getAccessToken should work', () => {
    const configService = app.get(ConfigService);
    const jwtService = app.get(JwtService);
    const appService = app.get(AppService);
    const user = new User();
    user.username = Faker.random.word();

    sandbox
      .stub(configService, 'get')
      .withArgs('JWT_EXPIRE_TIME', Sinon.match.string)
      .returns('24h')
      .withArgs('JWT_SECRET', Sinon.match.string)
      .returns('secret');

    const token = jwtService.sign(
      {
        id: 1,
        role: 'agent',
        username: user.username,
      },
      { expiresIn: '24h', secret: 'secret' }
    );
    expect(appService.getAccessToken(user)).to.eq(token);
  });
});
