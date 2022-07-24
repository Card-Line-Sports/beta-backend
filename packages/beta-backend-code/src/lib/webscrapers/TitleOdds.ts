import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL =
  'https://www.onlinegambling.com/news/2023-nba-championship-odds-durant-trade-request-celtics-suns-clippers-heat/';
const AxiosInstance = axios.create();

interface TitleOddsData {
    team: string,
    odds: string
  }

AxiosInstance.get(BASE_URL)
  .then( // Once we have data returned ...
    response => {
        const html = response.data; // Get the HTML from the HTTP request
        const $ = cheerio.load(html); // Load the HTML string into cheerio
        const oddsTable = $('#post-88358 > div.entry-content > table:nth-child(5) > tbody > tr'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
        const titleOdds: TitleOddsData[] = [];
        oddsTable.each((i, elem) => {
            const team: string = $(elem).find('td:nth-child(1)').text(); // Parse the rank
            const odds: string = $(elem).find('td:nth-child(2)').text();
            titleOdds.push({
              team,
              odds
            })
          })
    
          console.log(titleOdds);
        }
  )
  .catch(console.error); // Error handling