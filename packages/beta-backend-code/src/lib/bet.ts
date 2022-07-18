export class Bet {
  odds: Array<number>;
  id: number;
  amount: number;
  constructor(odds: Array<number>, id: number, amount: number) {
    this.odds = odds;
    this.id = id;
    this.amount = amount;
  }

  getOdds() {
    return this.odds;
  }

  getId() {
    return this.id;
  }

  getAmount() {
    return this.amount;
  }
}
