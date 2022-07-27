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

Player Class

state variables

- array of Bets
- budget
- id

Bet class (represents a specific bet that a specific user has placed)
state variables:

- The odds at the time that the specific user placed the bet
- betId

BetIdentifier 
- Current Odds, odds will be updated
- betId
- Information about the bet like player, conditions, etc.
- boolean to indicate whether condition was met or bet (met -- true, not -- false)
// Updates to gameState class: 
    // Weekly info (timestamp - or maybe we want this in the larger league class) 
    // 
// Player Class: player id, remaining money, email, bets (variables). Methods: 
// Bet Class: current live odds (at the time the player creates a new bet instance), description, status (upcoming, in progress, completed). 
*/

import { Player } from './Player';
import { BetIdentifier } from './BetIdentifier';
export class gameState {
	players: Map<number, Player>; // Maps player id to Player object
	playerRankings: Array<number>;

	currBets: Map<number, BetIdentifier>; // Maps betIdentifier ID to betIdentifier

	constructor() {
		this.players = new Map();
		this.playerRankings = new Array<number>();
		this.currBets = new Map();
	}

	/**
	 * @dev adds a new BetIdentifier in the pool of current bets, sets in currBets mapping
	 * @param odds line data of the BetIdentifier to be added
	 * @param id id number of the BetIdentifier (should probably auto generate this in BetIdentifier instead)
	 * @param info string description of the BetIdentifier
	 * @returns the new BetIdentifier instance
	 */
	addBet(odds: Array<number>, id: number, info: string) {
		let newBetIdentifier = new BetIdentifier(odds, id, info);
		this.currBets.set(id, newBetIdentifier);
		return newBetIdentifier;
	}

	/**
	 * @dev updates the real-time odds of the bet with given id, sets in currBets mapping
	 * @param odds line data of the given bet
	 * @param id id number of the BetIdentifier
	 * @returns the updated bet identifier object
	 */
	updateBetOdds(odds: Array<number>, id: number) {
		let updatedBetIdentifier = this.currBets.get(id);
		updatedBetIdentifier.setOdds(odds);
		this.currBets.set(id, updatedBetIdentifier);
		return updatedBetIdentifier;
	}

	/**
	 * @dev allows player to place a new bet on a BetIdentifier
	 * @param playerId the id of the player making the bet
	 * @param betId the id of the BetIdentifier
	 * @param wager the amount of currency wagered by the player
	 */
	makeBet(playerId: number, betId: number, wager: number) {
		// check player has adequate balance
		// if so, check the current odds of the betIdentifier with betId and create a new
		// bet for the player if it is a new betIdentifier
		// in the case that it is not a new betIdentifier, remove the existing one from their bets array and add the new one
	}

	/**
	 *
	 * @returns
	 */
	updateRankings() {
		console.log('updating rankings');
		let playerIdBalance = new Array<[number, number]>();
		for (let key of this.players.keys()) {
			let tempPlayer = this.players.get(key);
			playerIdBalance.push([key, tempPlayer.getBudget()]);
		}
		/*O(n^2) sorting */
		let sortedArray = playerIdBalance.sort((a, b) => b[1] - a[1]);
		return sortedArray;
	}

	// DELETED setLineData - handling batch odds updating in League class by calling update bet odds on all bets in pool

	//Functions regarding adding, removing, editing players:
	addPlayer(id: number, instance: Player) {
		this.players.set(id, instance);
		return instance;
	}

	removePlayer(id: number) {
		let removed = this.players[id];
		this.players.delete(id);
		return removed;
	}

	editPlayerName(id: number, name: string) {
		let playerOriginal = this.players.get(id);
		playerOriginal.setName(name);
		this.players.set(id, playerOriginal);
		/*returns updated player */
		return playerOriginal;
	}
}
