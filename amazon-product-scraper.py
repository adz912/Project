from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import mysql.connector

# Connect to MySQL database
mydb = mysql.connector.connect(
  host="ADELS-PC",
  user="Admin",
  password="Adminpw2023",
  database="pc_comparison"
)
mycursor = mydb.cursor()



# Set the path to the Chrome webdriver
# Set the path to the Chrome webdriver
# Set the path to the Chrome webdriver
chrome_driver_path = "C:/Users/Adel/Downloads/chromedriver_win32/chromedriver.exe"


# Launch Chrome driver
options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")
driver = webdriver.Chrome(executable_path=chrome_driver_path, options=options)

# Navigate to Amazon UK pre-built PC listings
driver.get("https://www.amazon.co.uk/s?k=pre+built+pc&ref=nb_sb_noss")

# Wait for page to load and accept cookies
WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.ID, "sp-cc-accept"))).click()
WebDriverWait(driver, 10).until_not(EC.presence_of_element_located((By.ID, "sp-cc-accept")))

# Find all PC listings on page
pc_listings = driver.find_elements(By.CSS_SELECTOR, "div[data-component-type='s-search-result']")

# Loop through each listing and extract relevant information
for listing in pc_listings:
    # Extract product title
    title_element = listing.find_element(By.CSS_SELECTOR, "h2 a")
    title = title_element.text
    
    # Extract product price
    try:
        price_element = listing.find_element(By.CSS_SELECTOR, "span.a-price span.a-offscreen")
        price = float(price_element.text.replace('£',''))
    except:
        price = None
    
    # Extract product link
    link_element = listing.find_element(By.CSS_SELECTOR, "h2 a")
    link = link_element.get_attribute("href")
    
    # Save data into MySQL database
    sql = "INSERT INTO pcs (name, price, link) VALUES (%s, %s, %s)"
    val = (title, price, link)
    mycursor.execute(sql, val)
    mydb.commit()

# Close driver and database connection
driver.quit()
mydb.close()
