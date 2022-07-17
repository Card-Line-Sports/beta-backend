//Overarching League class file (with which the user interacts with in the front end) that contains state variables on players, overall scores, week number, league parameters (budget constraint, duplicate bets, number of weeks etc…), Game objects (for each week)

import './Game';

class League {
  currWeek: number;
  cumulativeRankingsSum?: Map<number, number>; //map from player ID to their total rankings sum from each week
  currRankings?: Map<number, number>; //map from player ID to their current rank (as calculated from cumulativeRankings)
  gameStates: Map<number, gameState>; //map from week number to gameState object for that week

  //game state initialization
  //weekly budget, array of players

  constructor(totalWeeks: number) {
    this.currWeek = 1;

    for (let i = 1; i <= totalWeeks; i++) {
      this.gameStates.set(i, new gameState()); // pass into gamestate some array of players,
    }
  }

  /*
  Getter functions for viewing
  */

  getPlayerData(playerID: number): any[] {
    return [];
  }

  getRankings(): Map<number, number> {
    return this.currRankings;
  }

  /*
  Following functions are only callable by the league admin
  */
  addPlayer(playerID: number) {
    //add player to league
    // create the player object
  }

  removePlayer() {
    //remove player from league
  }
}
