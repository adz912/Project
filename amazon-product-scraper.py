from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
import mysql.connector
from mysql.connector import Error

# Specifys the URL of the Amazon page you want to scrape
url = 'https://www.amazon.co.uk/s?k=gpu+graphics+card&crid=27S83A5E856GO&sprefix=gpu%2Caps%2C251&ref=nb_sb_ss_ts-doa-p_2_3'

# Specifys the path to the chromedriver executable (you will need to download this)
driver_path = 'C:/Users/Adel/OneDrive - City, University of London/Documents/Project/chromedriver.exe'

# Configures the service with the executable path
service = webdriver.chrome.service.Service(driver_path)

# Create a new Chrome browser instance
driver = webdriver.Chrome(service=service)

# Navigates to the URL
driver.get(url)

# Wait for the page to load
wait = WebDriverWait(driver, 10)
wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.s-result-item')))

# Finds all the product elements on the page
product_elements = driver.find_elements(By.CSS_SELECTOR, '.s-result-item')

# Sets up the connection to your MySQL database
try:
    connection = mysql.connector.connect(
        host="127.0.0.1",
        user="Admin",
        password="Adminpw2023",
        database="pc_comparison"
    )

    if connection.is_connected():
        print('Connected to MySQL database')
except Error as e:
    print(f'Error while connecting to MySQL: {e}')

# Insert query
insert_query = "INSERT INTO pcs (name, price) VALUES (%s, %s)"

# Loops through the product elements and extract the name and price for each one
for product_element in product_elements:
    try:
        name_element = product_element.find_element(By.TAG_NAME, 'h2')
        name = name_element.text
    except NoSuchElementException:
        name = "N/A"

    try:
        price_element = product_element.find_element(By.CSS_SELECTOR, '.a-price-whole')
        price = price_element.text.replace(',', '')  # Remove the comma from the price value
    except NoSuchElementException:
        price = "N/A"

    # Handles the case where price is 'N/A'
    if price == 'N/A':
        price = 0  # Set a default price value or adjust it according to your needs

    # Prints the name and price to the console
    print(f'{name}: {price}')

    # Insert the data into the database
    data = (name, price)
    cursor = connection.cursor()
    cursor.execute(insert_query, data)
    connection.commit()

# Closes the browser
driver.quit()

# Closes the database connection
if connection.is_connected():
    cursor.close()
    connection.close()
    print('MySQL connection closed')
