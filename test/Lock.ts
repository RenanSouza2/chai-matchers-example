import { ethers } from 'hardhat';
import { expect } from 'chai';

import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers';
import * as t from '../typechain-types';

describe('Test', function () {
  let sender: HardhatEthersSigner;
  let mock : t.Mock;

  before(async function () {
    [ sender ] = await ethers.getSigners();
    const Mock = await ethers.getContractFactory('Mock');
    mock = await Mock.deploy();
  });

  it('Return value', async function () {
    expect(await mock.value()).to.be.equal(sender);
  });

  it('Event args', async function () {
    const tx = await mock.log();
    await expect(tx).to.emit(mock, 'EventAddress')
      .withArgs(sender);
  });

  it('Revert args', async function () {
    const tx = mock.rev();
    await expect(tx)
      .to.be.revertedWithCustomError(mock, 'ErrorAddress')
      .withArgs(sender);
  })
});
