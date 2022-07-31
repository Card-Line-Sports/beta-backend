"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var cheerio = require("cheerio");
var BASE_URL = 'https://sports.yahoo.com/odds/';
var AxiosInstance = axios_1["default"].create();
AxiosInstance.get(BASE_URL)
    .then(// Once we have data returned ...
function (// Once we have data returned ...
response) {
    var html = response.data; // Get the HTML from the HTTP request
    var $ = cheerio.load(html); // Load the HTML string into cheerio
    var oddsTable = $('.bet-packs-wrapper > div'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
    var playerOdds = [];
    console.log(oddsTable);
    oddsTable.each(function (i, elem) {
        var description = $(elem).find('div:first > div:first > span').text(); // Parse the rank
        var bet = $(elem).find('div:first > div:nth-child(2) > table > thead > tr > th:nth-child(2) > div:first > span').text();
        var team = $(elem).find('div:first > div:nth-child(2) > table > tbody > tr > td:first span').text();
        var line = $(elem).find('div:first > div:nth-child(2) > table > tbody > tr > td:nth-child(2) > div:first > div:first > button:first span').text();
        var odds = team + ": " + line;
        var moreInfo = $(elem).find('div:first > div:nth-child(2) > table > thead > tr > th:nth-child(2) > div:first > div:first span').text();
        playerOdds.push({
            description: description,
            bet: bet,
            odds: odds,
            moreInfo: moreInfo
        });
    });
    console.log(playerOdds);
})["catch"](console.error); // Error handling
