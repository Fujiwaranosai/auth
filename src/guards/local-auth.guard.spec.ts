import { expect } from 'chai';

import { LocalAuthGuard } from './local-auth.guard';

import Chai = require('chai');
import SinonChai = require('sinon-chai');

Chai.use(SinonChai);

describe('LocalAuthGuard', () => {
  it('should be defined', () => {
    const guard = new LocalAuthGuard();
    expect(guard.canActivate(null)).to.be.true;
  });
});
