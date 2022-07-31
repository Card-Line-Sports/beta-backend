console.log('hello cardline');
import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL =
<<<<<<< HEAD
  'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';
const AxiosInstance = axios.create();

interface PlayerData {
    rank: number; // 1 - 20 rank
    name: string;
    nationality: string;
    goals: number;
  }

AxiosInstance.get(BASE_URL)
  .then( // Once we have data returned ...
    response => {
        const html = response.data; // Get the HTML from the HTTP request
        const $ = cheerio.load(html); // Load the HTML string into cheerio
        const statsTable = $('.statsTableContainer > tr'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
        const topScorers: PlayerData[] = [];
        console.log(statsTable);

        statsTable.each((i, elem) => {
            const rank: number = parseInt($(elem).find('.rank > strong').text()); // Parse the rank
            const name: string = $(elem).find('.playerName > strong').text(); // Parse the name
            const nationality: string = $(elem).find('.playerCountry').text(); // Parse the country
            const goals: number = parseInt($(elem).find('.mainStat').text()); // Parse the number of goals
            topScorers.push({
              rank,
              name,
              nationality,
              goals
            })
          })
    
          console.log(topScorers);
        }
  )
  .catch(console.error); // Error handling
=======
	'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1';
const AxiosInstance = axios.create();

interface PlayerData {
	rank: number; // 1 - 20 rank
	name: string;
	nationality: string;
	goals: number;
}

AxiosInstance.get(BASE_URL)
	.then(
		// Once we have data returned ...
		(response) => {
			const html = response.data; // Get the HTML from the HTTP request
			const $ = cheerio.load(html); // Load the HTML string into cheerio
			const statsTable = $('.statsTableContainer > tr'); // Parse the HTML and extract just whatever code contains .statsTableContainer and has tr inside
			const topScorers: PlayerData[] = [];
			console.log(statsTable);

			statsTable.each((i, elem) => {
				const rank: number = parseInt(
					$(elem).find('.rank > strong').text()
				); // Parse the rank
				const name: string = $(elem)
					.find('.playerName > strong')
					.text(); // Parse the name
				const nationality: string = $(elem)
					.find('.playerCountry')
					.text(); // Parse the country
				const goals: number = parseInt(
					$(elem).find('.mainStat').text()
				); // Parse the number of goals
				topScorers.push({
					rank,
					name,
					nationality,
					goals,
				});
			});

			console.log(topScorers);
		}
	)
	.catch(console.error); // Error handling
>>>>>>> 007430a4c62715446762cc5b165efda2b1187092
