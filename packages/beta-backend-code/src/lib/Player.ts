import { Bet } from './Bet';
import { BetIdentifier } from './BetIdentifier';

export class Player {
    bets: Array<Bet>;
    budget: number;
    playerId: number;
    name: string;
    //Can add variable that contains history of bets to display

    constructor(playerId: number, name: string) {
        this.budget = 100;
        this.playerId = playerId;
        this.name = name;
    }

    addBets(newBet: Bet): void {
        this.bets.push(newBet);
    }

    updateBets(betId: BetIdentifier): void {
        let id = betId.getId();
        let index = 0;
        let count = 0;
        for (let i = 0; i < this.bets.length; i++) {
            if (this.bets[i].getId() == id) {
                index = i;
                count++;
                let oddsRatio = this.bets[i].getOdds;
                if (betId.getResults()) {
                    //Do we want integer budgets only to make it simple?
                    this.budget += Math.ceil(
                        (oddsRatio[0] / oddsRatio[1]) * this.budget
                    );
                } else {
                    this.budget -= Math.ceil(
                        (oddsRatio[0] / oddsRatio[1]) * this.budget
                    );
                }
            }
        }

        //Removing bets with results concluded
        this.bets = this.bets.splice(index - count + 1, count);
    }
    getBudget() {
        return this.budget;
    }
    setName(name: string): void {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}
