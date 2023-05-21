from flask import Flask, render_template, jsonify
import mysql.connector
import json

app = Flask(__name__, template_folder='')


@app.route('/')
def index():
    # Connect to the database
    mydb = mysql.connector.connect(
        host="localhost",
        user="Admin",
        password="Adminpw2023",
        database="pc_comparison"
    )

    # Retrieve data from the database
    cursor = mydb.cursor()
    cursor.execute("SELECT title, price FROM pcs")
    data = cursor.fetchall()

    # Close the database connection
    mydb.close()

    # Render the data on the web page
    return render_template('index.html', data=data)


@app.route('/about')
def about():
    return render_template('about.html')


@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/pc')
def pc():
    return render_template('pc.html')


@app.route('/register')
def register():
    return render_template('register.html')


@app.route('/comparison')
def comparison():
    # Load the exported JSON data from Apify
    with open('C:\\Users\\Adel\\Downloads\\dataset_Amazon-crawler_2023-05-20_19-00-49-385.json', 'r', encoding='utf-8') as file:
        apify_data = json.load(file)

    # Extract the necessary information from the JSON data
    products = []
    for item in apify_data:
        title = item.get('title', '')
        # Extract other relevant information from the item as needed

        # Create a dictionary with the extracted information
        product = {
            'title': title,
            # Add other relevant information as needed
        }

        products.append(product)

    # Render the 'comparison.html' template with the products data
    return render_template('comparison.html', products=products)





@app.route('/get-products')
def get_products():
    # Load the exported JSON data from Apify
    with open('C:\\Users\\Adel\\Downloads\\dataset_Amazon-crawler_2023-05-20_19-00-49-385.json', 'r', encoding='utf-8') as file:
        apify_data = json.load(file)

    # Extract the necessary information from the JSON data
    products = []
    for item in apify_data:
        title = item.get('title', '')
        list_price = item.get('listPrice')
        price = list_price['value'] if list_price else None
        currency = list_price['currency'] if list_price else None

        # Create a dictionary with the extracted information
        product = {
            'id': item.get('id'),
            'title': title,
            'price': f"{price} {currency}" if price and currency else None
        }

        products.append(product)

    # Return the product data as JSON
    return jsonify(products)




if __name__ == '__main__':
    app.run(debug=True)
