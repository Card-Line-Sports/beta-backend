import 'mocha';
import { expect } from 'chai';
import { League } from '../lib/League';

describe('League tests', async () => {
  it('test', async () => {
    const leagueInst = new League(3);
    expect(leagueInst.getPlayerData(0).length).to.be.equal(0);
    // expect(4).to.be.equal(3);
  });
});
