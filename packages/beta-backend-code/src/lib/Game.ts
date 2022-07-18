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
  // maps player id to Player object
  players: Map<number, Player>;

  playerRankings: Array<number>;

  //id to betIdentifier
  currBets: Map<number, BetIdentifier>;

  constructor() {
    this.players = new Map();
    this.playerRankings = new Array<number>();
    this.currBets = new Map();
  }
  //Functions regarding adding a bet
  addBet(odds: Array<number>, id: number, info: string) {
    let newBetIdentifier = new BetIdentifier(odds, id, info);
    this.currBets.set(id, newBetIdentifier);
    return newBetIdentifier;
  }

  updateBet(odds: Array<number>, id: number) {
    let updatedBetIdentifier = this.currBets.get(id);
    updatedBetIdentifier.setOdds(odds);
    this.currBets.set(id, updatedBetIdentifier);
    return updatedBetIdentifier;
  }
  //Functions regarding ranking

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

  //Functions regarding processing odds data
  //line Data will look something like this,
  //lineData: Array<[number, [number, number]]>

  //Note: when setLineData is called it is assumed all necessary bets were
  //instatiated i.e. addBet is called elsewhere so that lineData is only
  //updated bets known to gamestate
  setLineData(lineData: Array<[number, [number, number]]>): void {
    for (let i = 0; i < lineData.length; i++) {
      let id = lineData[i][0];
      let updatedBetIdentifier = this.currBets.get(id);
      updatedBetIdentifier.setOdds(lineData[i][1]);
      this.currBets.set(id, updatedBetIdentifier);
    }
  }

  //Functions regarding adding, removing, editing players:
  addPlayer(name: string) {
    let id = this.players.size;
    let newPlayer = new Player(id, name);
    this.players.set(id, newPlayer);
    return newPlayer;
  }

  removePlayer(id: number): void {
    let removed = this.players[id];
    this.players.delete(id);
    return removed;
  }

  editPlayer(id: number, name: string) {
    let playerOriginal = this.players.get(id);
    playerOriginal.setName(name);
    this.players.set(id, playerOriginal);
    /*returns updated player */
    return playerOriginal;
  }
}
