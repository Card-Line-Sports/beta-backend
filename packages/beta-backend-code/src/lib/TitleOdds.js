"use strict";
exports.__esModule = true;
console.log('hello cardline');
var axios_1 = require("axios");
var cheerio = require("cheerio");
var BASE_URL = 'https://www.onlinegambling.com/news/2023-nba-championship-odds-durant-trade-request-celtics-suns-clippers-heat/';
var AxiosInstance = axios_1["default"].create();
AxiosInstance.get(BASE_URL)
    .then(// Once we have data returned ...
function (// Once we have data returned ...
response) {
    var html = response.data; // Get the HTML from the HTTP request
    var $ = cheerio.load(html); // Load the HTML string into cheerio
    var oddsTable = $('#post-88358 > div.entry-content > table:nth-child(5) > tbody > tr'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
    var titleOdds = [];
    console.log(oddsTable);
    oddsTable.each(function (i, elem) {
        var team = $(elem).find('td:nth-child(1)').text(); // Parse the rank
        var odds = $(elem).find('td:nth-child(2)').text();
        titleOdds.push({
            team: team,
            odds: odds
        });
    });
    console.log(titleOdds);
})["catch"](console.error); // Error handling
