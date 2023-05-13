from selenium import webdriver
import time
import mysql.connector

# Connect to MySQL database
mydb = mysql.connector.connect(
  host="ADELS-PC",
  user="Admin",
  password="Adminpw2023",
  database="pc_comparison"
)
mycursor = mydb.cursor()

# Launch Chrome driver
driver = webdriver.Chrome()

# Navigate to Amazon UK pre-built PC listings
driver.get("https://www.amazon.co.uk/s?k=pre+built+pc&ref=nb_sb_noss")

# Wait for page to load
time.sleep(3)

# Find all PC listings on page
pc_listings = driver.find_elements_by_xpath("//div[@data-component-type='s-search-result']")

# Loop through each listing and extract relevant information
for listing in pc_listings:
    # Extract product title
    title_element = listing.find_element_by_xpath(".//h2/a")
    title = title_element.text
    
    # Extract product price
    price_element = listing.find_element_by_xpath(".//span[@class='a-price']/span[@class='a-offscreen']")
    price = float(price_element.text.replace('£',''))
    
    # Extract product link
    link_element = listing.find_element_by_xpath(".//h2/a")
    link = link_element.get_attribute("href")
    
    # Save data into MySQL database
    sql = "INSERT INTO prebuilt_pcs (title, price, link) VALUES (%s, %s, %s)"
    val = (title, price, link)
    mycursor.execute(sql, val)
    mydb.commit()

# Close driver and database connection
driver.quit()
mydb.close()
