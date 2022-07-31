export class BetIdentifier {
  odds: Array<number>;
  id: number;
  info: string;
  result: boolean;
  constructor(odds: Array<number>, id: number, info: string) {
    this.odds = odds;
    this.id = id;
    this.info = info;
  }

  setOdds(odds: Array<number>): void {
    this.odds = odds;
  }

  getOdds() {
    return this.odds;
  }

  getInfo() {
    return this.info;
  }

  getId() {
    return this.id;
  }

  setResult(result: boolean): void {
    this.result = result;
  }

  getResults() {
    return this.result;
  }

  /**
   * Returns a new Bet Identifier to be added in the game state
   * NewId is simply the size of the current list containing all BetIdentifiers 
   * MergeInfo will be decided when info format is decided
   * MergeOdds calculated by finding probability both events occur
   */
  mergeBetIdentifier(mergeBet: BetIdentifier, newId: number) {
    let mergeId = newId;
    let mergeInfo = "";
    let otherOdds = mergeBet.getOdds;
    let mergeOdds = [otherOdds[1]*this.odds[1], (otherOdds[1] + otherOdds[0])*(this.odds[0] + this.odds[1]) - otherOdds[1]*this.odds[1]];
    let mergeResult = false;
    return new BetIdentifier(mergeOdds, mergeId, mergeInfo);
  }
}
