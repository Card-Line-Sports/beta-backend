import axios from 'axios';
import * as cheerio from 'cheerio';

const SPORT = 'nfl'
const BASE_URL =
  'https://sports.yahoo.com/' + SPORT + '/odds/futures/';
const AxiosInstance = axios.create();


interface OddsData {
    description: string,
    odds: Map<string, string>
}

AxiosInstance.get(BASE_URL)
  .then( // Once we have data returned ...
    response => {
        const html = response.data; // Get the HTML from the HTTP request
        const $ = cheerio.load(html); // Load the HTML string into cheerio
        const oddsTable = $('.prop-bet'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
        const playerOdds: OddsData[] = [];
        var description: string
        var odds: Map<string, string>;
        console.log(oddsTable);
        oddsTable.each((i, elem) => {
            description = $(elem).find('div:first > h3').text(); // Parse the rank  

            const teamOddsTable = $(elem).find('div:nth-child(2) > div');
            odds = new Map<string, string>();
            teamOddsTable.each((i, elem) => {
                const team: string = $(elem).find('span:first').text();
                const odd: string = $(elem).find('button:first span').text()
                odds.set(team, odd);
            })

            playerOdds.push({
                description, 
                odds,
            })
        })
    
           console.log(playerOdds);
        }
  )
  .catch(console.error); // Error handling