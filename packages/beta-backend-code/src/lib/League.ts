//Overarching League class file (with which the user interacts with in the front end) that contains state variables on players, overall scores, week number, league parameters (budget constraint, duplicate bets, number of weeks etc…), Game objects (for each week)

import { gameState } from './Game';

export class League {
	currWeek: number;
	currGameState: gameState;
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

	/**
	 * @dev starts the current week's game, called once a week by internal server.
	 */
	startCurrWeek() {
		this.currGameState = this.gameStates.get(this.currWeek);
		this.updateWeekOdds();
	}

	/**
	 * @dev iterates through the week's pool of bets, updating them to match the most recent real time lines
	 */
	updateWeekOdds() {}

	/* Ends the current week's game. Called by internal server at the end of a week. Calls final result compilation functions.
	 */
	endCurrWeek() {
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
	addPlayer(playerID: number) {
		//add player to league
		// create the player object
	}

	removePlayer() {
		//remove player from league
	}

	editPlayer(playerID: number) {}
}

export default League;
