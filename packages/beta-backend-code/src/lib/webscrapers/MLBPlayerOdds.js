"use strict";
exports.__esModule = true;
console.log('hello cardline');
var axios_1 = require("axios");
var cheerio = require("cheerio");
var player = 'luis-arraez';
var BASE_URL = 'https://www.bettingpros.com/mlb/odds/player-props/';
var GAMES_URL = 'https://www.oddstrader.com/mlb/';
var AxiosInstance = axios_1["default"].create();
var playerOddsUrl = BASE_URL + player;
AxiosInstance.get(GAMES_URL)
    .then(// Once we have data returned ...
function (// Once we have data returned ...
response) {
    var html = response.data; // Get the HTML from the HTTP request
    var $ = cheerio.load(html); // Load the HTML string into cheerio
    var oddsTable = $('._39f74c9b > table > tbody > tr'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
    var playerOdds = [];
    console.log(oddsTable);
    oddsTable.each(function (i, elem) {
        var status = $(elem).find('> td > div > div.participant > div.TeamContainerstyles__TeamNameAndLogo-sc-9qm24l-5.iiXZTb > div.nameAndRecord > div > span.teamName.blueHover').text(); // Parse the rank
        var odds = $(elem).find('> td > div > div.participant > div.TeamContainerstyles__ScoreLineContainer-sc-9qm24l-2.iDJgHX > div.lines > span').text();
        playerOdds.push({
            status: status,
            odds: odds
        });
    });
    console.log(playerOdds);
})["catch"](console.error); // Error handling
