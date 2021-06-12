import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { SinonSandbox } from 'sinon';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './models/user';

import Chai = require('chai');
import Sinon = require('sinon');

import SinonChai = require('sinon-chai');

Chai.use(SinonChai);

describe('AppController', () => {
  let appController: AppController;
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

    appController = app.get<AppController>(AppController);
  });

  beforeEach(() => {
    sandbox = Sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('login should work', () => {
    const appService = app.get(AppService);
    const stub = sandbox.stub(appService, 'getAccessToken').resolves();
    const user = new User();
    appController.login(user);
    expect(stub).to.be.calledWith(user);
  });

  it('verifyToken should work', () => {
    expect(appController.verifyToken({ jwtPayload: 'payload' })).to.eq('payload');
  });
});
