import io from 'socket.io-client';
import $ from 'jquery';
import League from './League';
import gameState from './Game';

const socket = io();
let socketID;

socket.on('connect', function () {
	console.log('Welcome to Cardline');
	socketID = socket.id;
});

socket.on('disconnect', function () {
	location.reload();
});

document.addEventListener('DOMContentLoaded', () => {
	// Landing Page
	if ($('body').data('title') === 'index') {
		const startLeagueButton = document.getElementById('start-league');
		const startLeagueInputName = document.getElementById(
			'start-league-name'
		) as HTMLInputElement;
		const startLeagueInputWeeks = document.getElementById(
			'start-league-weeks'
		) as HTMLInputElement;
		const leagueListDisplay = document.getElementById('league-list');

		startLeagueButton.addEventListener('click', () => {
			const leagueEncoding = {
				name: startLeagueInputName.value,
				weeks: parseInt(startLeagueInputWeeks.value),
			};
			socket.emit('league-created', leagueEncoding);

			socket.once('return-leagues', (leagues) => {
				const league = leagues[leagues.length - 1];
				var tempList = document.createElement('li');
				var tempButton = document.createElement('button');
				tempButton.innerHTML = 'View league';
				tempButton.onclick = function () {
					// link to the html page for that league
					const url = new URL('/league.html', window.location.href);
					url.searchParams.set('playerID', socketID);
					url.searchParams.set(
						'leagueID',
						(leagues.length - 1).toString()
					);
					window.open(url);
				};

				tempList.appendChild(
					document.createTextNode(
						'Name: ' +
							league.name +
							' Current Week: ' +
							league.currWeek
					)
				);

				tempList.appendChild(tempButton);
				console.log(tempList);

				leagueListDisplay.appendChild(tempList);
			});
		});
	}

	// League page
	if ($('body').data('title') === 'league') {
		const leagueHeaderText = document.getElementById('league-header');
		const leagueInfoDisplay = document.getElementById('league-info');
		const gameListDisplay = document.getElementById('game-list');

		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		leagueHeaderText.innerHTML += urlParams.get('leagueID');

		socket.emit(
			'request-league-info',
			urlParams.get('playerID'),
			urlParams.get('leagueID')
		);

		socket.once('return-league-info', (league: League) => {
			console.log(league);
			leagueInfoDisplay.innerHTML += JSON.stringify(league);
			// displaying list of weekly game states
			for (let week = 0; week < league.gameStates.length; week++) {
				var tempList = document.createElement('li');
				var tempButton = document.createElement('button');
				tempButton.innerHTML = 'View week';
				tempButton.onclick = function () {
					// link to the html page for that game
					const url = new URL('/game.html', window.location.href);
					url.searchParams.set('playerID', urlParams.get('playerID'));
					url.searchParams.set('leagueID', urlParams.get('leagueID'));
					url.searchParams.set('gameID', week.toString());
					window.open(url);
				};

				tempList.appendChild(document.createTextNode('Week: ' + week));
				console.log(week);

				tempList.appendChild(tempButton);
				gameListDisplay.appendChild(tempList);
			}
		});
	}

	// Game page
	if ($('body').data('title') === 'game') {
		const gameHeaderText = document.getElementById('game-header');
		const gameInfoDisplay = document.getElementById('game-info');
		const addBetButton = document.getElementById('add-bet');
		const addBetInput1 = document.getElementById(
			'add-bet-param1'
		) as HTMLInputElement;
		const addBetInput2 = document.getElementById(
			'add-bet-param2'
		) as HTMLInputElement;
		const addBetInput3 = document.getElementById(
			'add-bet-param3'
		) as HTMLInputElement;

		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);
		gameHeaderText.innerHTML += urlParams.get('gameID');

		socket.emit(
			'request-game-info',
			urlParams.get('playerID'),
			urlParams.get('leagueID'),
			urlParams.get('gameID')
		);

		socket.once('return-game-info', (game: gameState) => {
			console.log(game);
			gameInfoDisplay.innerHTML += JSON.stringify(game);

			addBetButton.addEventListener('click', () => {
				const numArray = addBetInput1.value
					.split(',')
					.map(function (item) {
						return parseInt(item);
					});
				game.addBet(
					numArray,
					parseInt(addBetInput2.value),
					addBetInput3.value
				);
			});
		});
	}
});
