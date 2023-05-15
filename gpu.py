from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException

# Specify the URL of the Amazon page you want to scrape
url = 'https://www.amazon.co.uk/s?k=gpu+graphics+card&crid=27S83A5E856GO&sprefix=gpu%2Caps%2C251&ref=nb_sb_ss_ts-doa-p_2_3'

# Specify the path to the chromedriver executable (you will need to download this)
driver_path = 'C:/Users/Adel/OneDrive - City, University of London/Documents/Project/chromedriver.exe'

# Configure the service with the executable path
service = webdriver.chrome.service.Service(driver_path)

# Create a new Chrome browser instance
driver = webdriver.Chrome(service=service)

# Navigate to the URL
driver.get(url)

# Wait for the page to load
wait = WebDriverWait(driver, 10)
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.s-result-item')))

# Find all the product elements on the page
product_elements = driver.find_elements(By.CSS_SELECTOR, '.s-result-item')

# Loop through the product elements and extract the title and price for each one
for product_element in product_elements:
    try:
        title_element = product_element.find_element(By.TAG_NAME, 'h2')
        title = title_element.text
    except NoSuchElementException:
        title = "N/A"
    
    try:
        price_element = product_element.find_element(By.CSS_SELECTOR, '.a-price-whole')
        price = price_element.text
    except NoSuchElementException:
        price = "N/A"
    
    # Print the title and price to the console
    print(f'{title}: {price}')
    
# Close the browser
driver.quit()
