const express = require('express');
import path from 'path';
import http from 'http';
import socketIO from 'socket.io';
import League from './public/League';

const port: number = 5500;

class ServerImpl {
	private server: any;
	private port: number;

	private io: socketIO.Server;

	private playerToLeagues: Map<string, League[]>;

	constructor(port: number) {
		this.port = port;

		const app = express();
		app.use(express.static(path.join(__dirname, './public')));

		this.server = new http.Server(app);
		this.io = new socketIO.Server(this.server);

		this.playerToLeagues = new Map();

		this.io.on('connection', (socket: socketIO.Socket) => {
			console.log('a user connected : ' + socket.id);
			this.playerToLeagues.set(socket.id, []); //socket id used as placeholder for player id for now

			socket.on('league-created', (league) => {
				const tempLeagues = this.playerToLeagues.get(socket.id);
				const tempLeague = new League(league.name, league.weeks);
				tempLeagues.push(tempLeague);

				socket.emit(
					'return-leagues',
					this.playerToLeagues.get(socket.id)
				);
			});

			socket.on('request-league-info', (playerID, leagueID) => {
				socket.emit(
					'return-league-info',
					this.playerToLeagues.get(playerID)[leagueID]
				);
			});

			socket.on('request-game-info', (playerID, leagueID, gameID) => {
				socket.emit(
					'return-game-info',
					this.playerToLeagues.get(playerID)[leagueID].gameStates[
						gameID
					]
				);
			});

			socket.on('disconnect', () => {
				console.log('socket disconnected : ' + socket.id);
			});
		});
	}

	public Start() {
		this.server.listen(this.port);
		console.log(`Server started at http://localhost:${this.port}.`);
	}
}

new ServerImpl(port).Start();
