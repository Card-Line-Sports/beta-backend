class Bet {
    odds: Array<number>;
    betIdentifierID: number;
    amount: number;
    constructor (odds: Array<number>, betIdentifierID: number, amount: number) {
        this.odds = odds;
        this.betIdentifierID = betIdentifierID;
        this.amount = amount
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