const https = require('https');
const fetchUrl = url => new Promise((resolve, reject) => {
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; node.js)' } }, res => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => resolve({status: res.statusCode, data}));
  }).on('error', reject);
});
async function runSearch(query) {
  const q = encodeURIComponent(query);
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${q}&srlimit=10`;
  const res = await fetchUrl(url);
  console.log('SEARCH', query, res.status);
  const searchData = JSON.parse(res.data);
  console.log('TITLES', searchData.query.search.map(s => s.title));
}

(async () => {
  try {
    await runSearch('Taj Palace Delhi');
    await runSearch('Taj Palace Hotel New Delhi');
    await runSearch('Taj Palace Hotel, New Delhi');
    await runSearch('Taj Mahal Palace Hotel New Delhi');
  } catch (err) {
    console.error(err);
  }
})();
