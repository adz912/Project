from flask import Flask, render_template
import mysql.connector

app = Flask(__name__)


@app.route('/')
def index():
    # Connect to the database
    mydb = mysql.connector.connect(
        host="ADELS-PC",
        user="Admin",
        password="Adminpw2023",
        database="pc_comparison"
    )

    # Retrieve data from the database
    cursor = mydb.cursor()
    cursor.execute("SELECT * FROM pcs")
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


if __name__ == '__main__':
    app.run(debug=True)

