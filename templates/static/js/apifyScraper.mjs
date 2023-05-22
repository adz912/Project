import Apify from 'apify';
import { createConnection } from 'mysql';

// MySQL configuration
const mysqlConfig = {
  host: "127.0.0.1",
  user: "Admin",
  password: "Adminpw2023",
  database: "pc_comparison"
};

// Define the async function to handle the crawling and data insertion
const handleCrawling = async () => {
  // Create a new request queue
  const requestQueue = await Apify.openRequestQueue();

  // Add a request to the queue
  await requestQueue.addRequest({
    url: 'https://www.amazon.com/s?k=pc',
    userData: {
      label: 'SEARCH_RESULTS',
    },
  });

  // Create a new Puppeteer crawler
  const crawler = new Apify.PuppeteerCrawler({
    requestQueue,
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

        // Store the extracted data in MySQL
        const connection = createConnection(mysqlConfig);
        connection.connect();
        connection.query('TRUNCATE TABLE pcs', (error) => {
          if (error) throw error;
          const values = products.map(({ title, price }) => [title, price]);
          connection.query('INSERT INTO pcs (title, price) VALUES ?', [values], (error) => {
            if (error) throw error;
            console.log('Data inserted successfully');
            connection.end();
          });
        });

        // Enqueue links for further crawling
        await Apify.utils.enqueueLinks({
          page,
          requestQueue,
          selector: '.a-link-normal',
          userData: {
            label: 'PRODUCT_DETAILS',
          },
        });
      } else if (request.userData.label === 'PRODUCT_DETAILS') {
        // Handle product details pages
        // You can add the code to extract and store the details here
      }
    },
  });

  // Run the crawler
  await crawler.run();
};

// Call the handleCrawling function to start the crawling and data insertion process
handleCrawling()
  .then(() => console.log('Crawling and data insertion completed successfully.'))
  .catch((error) => console.error('An error occurred during crawling and data insertion:', error));
