from flask import Flask, render_template, jsonify, request
import mysql.connector
import json

app = Flask(__name__, template_folder='')


@app.route('/')
def index():
    return render_template('index.html')


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


@app.route('/get_pcs', methods=['GET'])
def get_pcs():
    # Connect to the database
    mydb = mysql.connector.connect(
        host="127.0.0.1",
        user="Admin",
        password="Adminpw2023",
        database="pc_comparison"
    )

    # Retrieve data from the database
    cursor = mydb.cursor(dictionary=True)
    cursor.execute("SELECT * FROM pcs")
    data = cursor.fetchall()

    # Close the database connection
    mydb.close()

    # Return the data as JSON response
    return jsonify(data)


@app.route('/insert_pc', methods=['POST'])
def insert_pc():
    data = request.get_json()
    title = data['title']
    price = data['price']
    # Extract other fields from the data

    # Connect to the database
    db = mysql.connector.connect(
        host='localhost',
        user='Admin',
        password='Adminpw2023',
        database='pc_comparison'
    )

    # Create a cursor to execute SQL queries
    cursor = db.cursor()

    # Insert the data into the 'pcs' table
    query = "INSERT INTO pcs (title, price) VALUES (%s, %s)"
    values = (title, price)
    cursor.execute(query, values)

    # Commit the changes and close the database connection
    db.commit()
    db.close()

    return jsonify({'message': 'PC data inserted successfully!'})


if __name__ == '__main__':
    app.run(debug=True)
