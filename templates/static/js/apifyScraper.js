const Apify = require('apify');

Apify.main(async () => {
  // Create a new Puppeteer crawler
  const crawler = new Apify.PuppeteerCrawler({
    requestQueue: await Apify.openRequestQueue(),
    handlePageFunction: async ({ request, page }) => {
      if (request.userData.label === 'SEARCH_RESULTS') {
        // Extract product details from search results page
        const products = await page.$$eval('.s-result-item', (items) =>
          items.map((item) => ({
            title: item.querySelector('h2').innerText,
            price: item.querySelector('.a-price-whole').innerText,
            // Add more fields as needed
          }))
        );

        // Store the extracted data or perform further processing
        console.log(products);''
      }
    },
  });

  // Add a request to start the crawler
  await crawler.addRequest({
    url: 'https://www.amazon.com/s?k=pc',
    userData: {
      label: 'SEARCH_RESULTS',
    },
  });

  // Run the crawler
  await crawler.run();
});
