from flask import Flask, render_template
import mysql.connector

app = Flask(__name__)

@app.route('/')
def index():
    # Connect to the database
    mydb = mysql.connector.connect(
        host="localhost",
        user="username",
        password="password",
        database="database"
    )

    # Retrieve data from the database
    cursor = mydb.cursor()
    cursor.execute("SELECT * FROM mytable")
    data = cursor.fetchall()

    # Close the database connection
    mydb.close()

    # Render the data on the web page
    return render_template('index.html', data=data)

if __name__ == '__main__':
    app.run(debug=True)
