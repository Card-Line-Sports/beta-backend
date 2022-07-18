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
}
