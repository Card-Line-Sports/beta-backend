//Overarching League class file (with which the user interacts with in the front end) that contains state variables on players, overall scores, week number, league parameters (budget constraint, duplicate bets, number of weeks etc…), Game objects (for each week)

import { gameState } from './Game';

export class League {
	currWeek: number;
	cumulativeRankingsSum?: Map<number, number>; //map from player ID to their total rankings sum from each week
	currRankings?: Map<number, number>; //map from player ID to their current rank (as calculated from cumulativeRankings)
	gameStates: Map<number, gameState>; //map from week number to gameState object for that week

	//game state initialization
	//weekly budget, array of players

	constructor(totalWeeks: number) {
		this.currWeek = 1;

		this.gameStates = new Map<number, gameState>();
		for (let i = 1; i <= totalWeeks; i++) {
			this.gameStates.set(i, new gameState()); // pass into gamestate some array of players IDs, weekly budget
		}
	}

	/* Start current week's game, called once a week by our internal server. Returns the gameState object upon which the user can
  make function calls
  */
	startCurrWeek(): gameState {
		const currGameState = this.gameStates.get(this.currWeek);
		currGameState.setLineData();
		return currGameState;
	}

	/* Ends the current week's game. Called by internal server at the end of a week. Calls final result compilation functions.
	 */
	endCurrWeek() :  {
		//get bet results
		//update player budgets
		//update final rankings of week
		//update cumulative rankings in league class
		this.currWeek++;

    //if last week, then call 
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
	registerPlayer(name: string) {}
}

export default League;
