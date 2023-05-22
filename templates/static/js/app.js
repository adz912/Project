const express = require('express');
const puppeteer = require('puppeteer');
const cron = require('node-cron');

const app = express();

(async () => {
  // Function to scrape the product details from a given URL
  const scrapeProductDetails = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Extract product details from the page
    const products = await page.$$eval('.s-result-item', (items) =>
      items.map((item) => ({
        title: item.querySelector('h2').innerText,
        price: item.querySelector('.a-price-whole').innerText,
        // Add more fields as needed
      }))
    );

    await browser.close();

    return products;
  };

  // Function to start the crawler
  const startCrawler = async () => {
    const urls = ['https://www.amazon.com/s?k=pc'];
    const products = [];

    for (const url of urls) {
      const result = await scrapeProductDetails(url);
      products.push(...result);
    }

    // Store the extracted data or perform further processing
    console.log(products);
  };

  // Schedule the crawler to run every 30 minutes
  cron.schedule('*/30 * * * *', () => {
    startCrawler();
  });

  // Endpoint for triggering the crawler manually
  app.get('/run-crawler', (req, res) => {
    startCrawler();
    res.send('Crawler has been triggered.');
  });

  // Start the web server
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
})();
