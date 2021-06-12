import { HttpStatus } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { expect } from 'chai';
import { SinonSandbox } from 'sinon';

import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { CustomExceptionFilter } from './custom-exception-filter';

import Chai = require('chai');
import Sinon = require('sinon');
import SinonChai = require('sinon-chai');
import { ConfigModule } from '@nestjs/config';

Chai.use(SinonChai);

describe('CustomExceptionFilter', () => {
  let app: TestingModule;
  let sandbox: SinonSandbox;
  let customExceptionFilter;

  before(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      imports: [
        ConfigModule.forRoot(),
        JwtModule.register({
          secret: 'secret',
        }),
      ],
      providers: [AppService, CustomExceptionFilter],
    }).compile();

    customExceptionFilter = app.get(CustomExceptionFilter);
  });

  beforeEach(() => {
    sandbox = Sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('exceptions with response and status should be caught', async () => {
    const exception = { response: 'response', status: 1 };
    try {
      await customExceptionFilter.catch(exception).toPromise();
    } catch (error) {
      expect(error).to.eq(exception);
    }
  });

  it('other exceptions should be caught', async () => {
    try {
      await customExceptionFilter.catch('test').toPromise();
    } catch (error) {
      expect(error).to.deep.eq({ response: 'test', status: HttpStatus.BAD_REQUEST });
    }
  });
});
