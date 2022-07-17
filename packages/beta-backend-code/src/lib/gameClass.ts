/*
Game class that implements behavior for weekly process
Calls webscraper script to pull line data
Keeps track of player budgets
Keeps track of player bets
Keeps track of matchups
Keeps track of current scores
Functions:
- Make bets (assume line data for each bet is given as x:y)
- View matchups
- View line data, etc…
*/

/*
- Game state object, will be declaredfor each league and be updated for respective league

- In a league of n people, each player will have an ID 1,...,n. A players username can be mapped to an integer via hashmap.

- 

*/

class gameState {
  //Will always be correctly sorted by score
  playerScores: Array<[number, number]>;

  playerBudgets: Array<[number, number]>;

  //first entry is the ID for the bet, next entry is the odds ratio
  lineData: Array<[number, [number, number]]>;

  constructor(size: number, lineData: Array<[number, [number, number]]>) {
    //should take: array of Player objects, the budget for this week, lineData,
    //Initial score and budget, 0 and 100 respectively
    for (let i = 0; i < size; i++) {
      this.playerScores.push([i, 0]);
      this.playerBudgets.push([i, 100]);
      this.lineData = lineData;
    }
  }
  sortScores(): void {
    /*
        - Sorts players scores based off of second element in tuple (the score value), and returns the array
        */
  }
  getScores(): Array<[number, number]> {
    return this.playerScores;
  }

  getBudgets(): Array<[number, number]> {
    return this.playerBudgets;
  }

  getLineData(): Array<[number, [number, number]]> {
    return this.lineData;
  }

  makeBet(player1: number, betInd: number, betSize: number): void {
    /*
        - Player makes a bet, bet is pending and should be stored somewhere
        
        */
  }

  updateBet(betInd: number): void {
    /*
        - Updates bets, removes bet from current bets

        - Update player scores

        - Calls sort scores
        */
  }
}
