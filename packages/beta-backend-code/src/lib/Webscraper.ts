console.log('hello cardline');
import axios from 'axios';
import * as cheerio from 'cheerio';

const BASE_URL =
	'https://olympics.com/tokyo-2020/olympic-games/en/results/all-sports/medal-standings.htm';
const AxiosInstance = axios.create();

enum MedalCountTable {
	RANK,
	NOC,
	GOLD,
	SILVER,
	BRONZE,
	TOTAL,
	RANK_BY_TOTAL,
}

async function main() {
	// Load HTML page
	const response = await AxiosInstance.get(BASE_URL);
	const htmlPage = response.data;
	const $ = cheerio.load(htmlPage);

	// TODO: Determine header indices using table header element

	// Scrape medal count
	const medalTable = $('#medal-standing-table > tbody > tr');
	medalTable.each(function (index, elem) {
		const data = $(elem).find('td').not('.d-none');

		// Get text values
		const rank = $(data[MedalCountTable.RANK]).text().trim();
		const NOC = $(data[MedalCountTable.NOC]).text().trim();
		const gold = $(data[MedalCountTable.GOLD]).text().trim();
		const silver = $(data[MedalCountTable.SILVER]).text().trim();
		const bronze = $(data[MedalCountTable.BRONZE]).text().trim();
		const total = $(data[MedalCountTable.TOTAL]).text().trim();
		const rankByTotal = $(data[MedalCountTable.RANK_BY_TOTAL])
			.text()
			.trim();

		// Normalise data
		const output = {
			rank: parseInt(rank),
			NOC,
			gold: parseInt(gold),
			silver: parseInt(silver),
			bronze: parseInt(bronze),
			total: parseInt(total),
			rankByTotal: parseInt(rankByTotal),
		};
		console.log(output);
	});
}

try {
	main();
	console.log('main executed');
} catch (error) {
	console.error(error);
}
