import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL =
  'https://sports.yahoo.com/odds/';
const AxiosInstance = axios.create();


interface OddsData {
    description: string,
    bet: string
    odds: string
    moreInfo: string
}

AxiosInstance.get(BASE_URL)
  .then( // Once we have data returned ...
    response => {
        const html = response.data; // Get the HTML from the HTTP request
        const $ = cheerio.load(html); // Load the HTML string into cheerio
        const oddsTable = $('.bet-packs-wrapper > div'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
        const playerOdds: OddsData[] = [];
        console.log(oddsTable);
        oddsTable.each((i, elem) => {
            const description: string = $(elem).find('div:first > div:first > span').text(); // Parse the rank
            const bet: string = $(elem).find('div:first > div:nth-child(2) > table > thead > tr > th:nth-child(2) > div:first > span').text();
            const team: string = $(elem).find('div:first > div:nth-child(2) > table > tbody > tr > td:first span').text();
            const line: string = $(elem).find('div:first > div:nth-child(2) > table > tbody > tr > td:nth-child(2) > div:first > div:first > button:first span').text();
            const odds = team + ": " + line
            const moreInfo: string = $(elem).find('div:first > div:nth-child(2) > table > thead > tr > th:nth-child(2) > div:first > div:first span').text();
            playerOdds.push({
              description, 
              bet,
              odds,
              moreInfo
            })
          })
    
          console.log(playerOdds);
        }
  )
  .catch(console.error); // Error handling