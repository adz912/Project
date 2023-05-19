from flask import Flask, render_template, jsonify
import mysql.connector

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
    cursor.execute("SELECT name, price FROM pcs")
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
    return render_template('comparison.html')


@app.route('/get-products')
def get_products():
    # Retrieve the data from your MySQL database
    try:
        connection = mysql.connector.connect(
            host="127.0.0.1",
            user="Admin",
            password="Adminpw2023",
            database="pc_comparison"
        )

        if connection.is_connected():
            print('Connected to MySQL database')
    except mysql.connector.Error as e:
        print(f'Error while connecting to MySQL: {e}')

    select_query = "SELECT name, cpu, coreCount, cpuBoostClock, memory, ssdStorage, hddStorage, graphicsCard, avgPerformance, price FROM pcs"
    cursor = connection.cursor()
    cursor.execute(select_query)
    rows = cursor.fetchall()

    # Create a list of dictionaries representing the product data
    products = []
    for row in rows:
        product = {
            "name": row[0],
            "cpu": row[1],
            "coreCount": row[2],
            "cpuBoostClock": row[3],
            "memory": row[4],
            "ssdStorage": row[5],
            "hddStorage": row[6],
            "graphicsCard": row[7],
            "avgPerformance": row[8],
            "price": row[9]
        }
        products.append(product)

    # Close the database connection
    if connection.is_connected():
        cursor.close()
        connection.close()
        print('MySQL connection closed')

    # Return the product data as JSON
    return jsonify(products)


if __name__ == '__main__':
    app.run(debug=True)
