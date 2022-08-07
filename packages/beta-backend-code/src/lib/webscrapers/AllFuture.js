"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var cheerio = require("cheerio");
var SPORT = 'nfl';
var BASE_URL = 'https://sports.yahoo.com/' + SPORT + '/odds/futures/';
var AxiosInstance = axios_1["default"].create();
AxiosInstance.get(BASE_URL)
    .then(// Once we have data returned ...
function (// Once we have data returned ...
response) {
    var html = response.data; // Get the HTML from the HTTP request
    var $ = cheerio.load(html); // Load the HTML string into cheerio
    var oddsTable = $('.prop-bet'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
    var playerOdds = [];
    var description;
    var odds;
    console.log(oddsTable);
    oddsTable.each(function (i, elem) {
        description = $(elem).find('div:first > h3').text(); // Parse the rank  
        var teamOddsTable = $(elem).find('div:nth-child(2) > div');
        odds = new Map();
        teamOddsTable.each(function (i, elem) {
            var team = $(elem).find('span:first').text();
            var odd = $(elem).find('button:first span').text();
            odds.set(team, odd);
        });
        playerOdds.push({
            description: description,
            odds: odds
        });
    });
    console.log(playerOdds);
})["catch"](console.error); // Error handling
