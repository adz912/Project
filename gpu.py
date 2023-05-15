from selenium import webdriver
from selenium.webdriver.common.by import By


# specify the URL of the Amazon page you want to scrape
url = 'https://www.amazon.co.uk/s?k=gpu&crid=W1GIKO3P3BWX&sprefix=gpu%2Caps%2C93&ref=nb_sb_noss_1'

# specify the path to the chromedriver executable (you will need to download this)
driver_path = 'path/to/chromedriver'

# create a new Chrome browser instance
driver = webdriver.Chrome()

# navigate to the URL
driver.get(url)

# wait for the page to load
driver.implicitly_wait(10)

# find all the product elements on the page
product_elements = driver.find_elements(By.CSS_SELECTOR, '.s-result-item')

# loop through the product elements and extract the title and price for each one
for product_element in product_elements:
    title_element = product_element.find_element(By.CSS_SELECTOR,'h2')
    title = title_element.text
    
    # price_element = product_element.find_element_by_css_selector('.a-price-whole')
   # price = price_element.text
    
    # print the title and price to the console
    print(f'{title}:')
    
# close the browser
driver.quit()
