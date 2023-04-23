from selenium import webdriver
import mysql.connector

# Set up the database connection
db = mysql.connector.connect(
    host="localhost",
    user="yourusername",
    password="yourpassword",
    database="yourdatabase"
)

# Create the products table if it doesn't exist
cursor = db.cursor()
cursor.execute('''CREATE TABLE IF NOT EXISTS products
             (id INT AUTO_INCREMENT PRIMARY KEY,
             title VARCHAR(255),
             price FLOAT,
             rating FLOAT)''')

# Set up the Chrome driver
options = webdriver.ChromeOptions()
options.add_argument('headless')  # run Chrome in headless mode (without GUI)
driver = webdriver.Chrome(options=options)

# Define the search URL
search_url = 'https://www.amazon.com/s?k=pre-built+pcs'

# Navigate to the search URL
driver.get(search_url)

# Find all the product containers on the page
product_containers = driver.find_elements_by_xpath('//div[@data-component-type="s-search-result"]')

# Loop through the product containers and extract the data
for container in product_containers:
    # Extract the product title
    title = container.find_element_by_xpath('.//h2').text
    
    # Extract the product price
    try:
        price = float(container.find_element_by_xpath('.//span[@class="a-offscreen"]')
                      .text.replace('$', '').replace(',', ''))
    except:
        price = None
    
    # Extract the product rating
    try:
        rating = float(container.find_element_by_xpath('.//span[@class="a-icon-alt"]')
                       .get_attribute('innerHTML').split()[0])
    except:
        rating = None
    
    # Insert the data into the database
    sql = "INSERT INTO products (title, price, rating) VALUES (%s, %s, %s)"
    values = (title, price, rating)
    cursor.execute(sql, values)
    db.commit()
    
# Close the database connection and quit the driver
cursor.close()
db.close()
driver.quit()
