console.log('hello cardline');
import axios from 'axios';
import * as cheerio from 'cheerio';

const player = 'luis-arraez'
const BASE_URL =
  'https://www.bettingpros.com/mlb/odds/player-props/';
const GAMES_URL = 'https://www.oddstrader.com/mlb/'
const AxiosInstance = axios.create();
const playerOddsUrl = BASE_URL + player

interface PlayerPropsData {
    prop: string,
    odds: string
  }

interface GamesData {
    status: string,
    odds: string
}

AxiosInstance.get(GAMES_URL)
  .then( // Once we have data returned ...
    response => {
        const html = response.data; // Get the HTML from the HTTP request
        const $ = cheerio.load(html); // Load the HTML string into cheerio
        const oddsTable = $('._39f74c9b > table > tbody > tr'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
        const playerOdds: GamesData[] = [];
        console.log(oddsTable);
        oddsTable.each((i, elem) => {
            const status: string = $(elem).find('> td > div > div.participant > div.TeamContainerstyles__TeamNameAndLogo-sc-9qm24l-5.iiXZTb > div.nameAndRecord > div > span.teamName.blueHover').text(); // Parse the rank
            const odds: string = $(elem).find('> td > div > div.participant > div.TeamContainerstyles__ScoreLineContainer-sc-9qm24l-2.iDJgHX > div.lines > span').text();
            playerOdds.push({
              status,
              odds
            })
          })
    
          console.log(playerOdds);
        }
  )
  .catch(console.error); // Error handling