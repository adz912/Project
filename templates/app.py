from flask import Flask, render_template, jsonify, request, redirect, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
import mysql.connector
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os

app = Flask(__name__, template_folder='')

app.secret_key = 'your_secret_key'


@app.route('/', methods=['GET', 'POST'])
def index():
    if 'user_id' in session:
        # User is already logged in, redirect to the comparison page
        return redirect('/comparison')

    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        # Connect to the database
        mydb = mysql.connector.connect(
            host="127.0.0.1",
            user="Admin",
            password="Adminpw2023",
            database="pc_comparison"
        )

        try:
            # Create a cursor to execute SQL queries
            cursor = mydb.cursor()

            # Check if the user exists in the database
            cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
            user = cursor.fetchone()

            if user is None:
                # User does not exist or incorrect username
                return render_template('index.html', error='Invalid username or password.')

            # Check the password using password hashing
            if not check_password_hash(user[2], password):
                # Incorrect password
                return render_template('index.html', error='Invalid username or password.')

            # Store the user's ID in the session
            session['user_id'] = user[0]

            # Redirect the user to the comparison page
            return redirect('/comparison')

        except mysql.connector.Error as err:
            return f"Database error: {err}"

        finally:
            # Close the database connection
            cursor.close()
            mydb.close()

    return render_template('index.html')




@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        if len(username) < 3:
            return jsonify({'success': False, 'message': 'Username must contain at least 3 characters.'})

        if len(password) < 5:
            return jsonify({'success': False, 'message': 'Password must contain at least 5 characters including letters, numbers, and at least 1 symbol.'})

        # Password pattern: at least one letter, one number, and one symbol
        import re
        password_pattern = r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$'
        if not re.match(password_pattern, password):
            return jsonify({'success': False, 'message': 'Password must contain at least one letter, one number, and one symbol. It should be at least 5 characters long.'})

        # Connect to the database
        mydb = mysql.connector.connect(
            host="127.0.0.1",
            user="Admin",
            password="Adminpw2023",
            database="pc_comparison"
        )

        try:
            # Create a cursor to execute SQL queries
            cursor = mydb.cursor()

            # Check if the username already exists in the database
            cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
            existing_user = cursor.fetchone()

            if existing_user:
                return jsonify({'success': False, 'message': 'Username already exists. Please choose a different username.'})

            # Hash the password
            password_hash = generate_password_hash(password)

            # Insert the new user into the database with the hashed password
            cursor.execute('INSERT INTO users (username, password) VALUES (%s, %s)', (username, password_hash))
            mydb.commit()

            return jsonify({'success': True, 'message': 'Account successfully created.'})

        except mysql.connector.Error as err:
            return jsonify({'success': False, 'message': f"Database error: {err}"})

        finally:
            # Close the database connection
            cursor.close()
            mydb.close()

    return render_template('register.html')





@app.route('/about')
def about():
    return render_template('about.html')


from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        message = request.form['message']

        # Create the email message
        email_message = Mail(
            from_email=email,
            to_emails='adelzaky912@gmail.com',
            subject='New Contact Form Submission',
            plain_text_content=f"Name: {name}\nEmail: {email}\nMessage: {message}"
        )

        try:
            # Send the email
            sg = SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
            response = sg.send(email_message)

            if response.status_code == 202:
                # Email sent successfully
                return jsonify({'success': True, 'message': 'Email has been successfully sent.'})
            else:
                # Error sending email
                return jsonify({'success': False, 'message': 'Error sending email.'})

        except Exception as e:
            print(str(e))
            return jsonify({'success': False, 'message': 'Error sending email.'})

    return render_template('contact.html')

@app.route('/api/toggle-favorite', methods=['POST'])
def toggle_favorite():
    data = request.get_json()
    pc_id = data.get('pc_id')
    is_liked = data.get('is_liked')

    # Get the user_id from the session
    user_id = session.get('user_id')

    # If user_id is None, return an error response
    if user_id is None:
        response = {'error': 'User not logged in'}
        return jsonify(response), 401

    # Connect to the database
    db = mysql.connector.connect(
            host="127.0.0.1",
            user="Admin",
            password="Adminpw2023",
            database="pc_comparison"
    )

    # Create a cursor to execute SQL queries
    cursor = db.cursor()

    try:
        # Check if the user has already liked the product
        query = "SELECT is_liked FROM likes WHERE user_id = %s AND pc_id = %s"
        values = (user_id, pc_id)
        cursor.execute(query, values)
        result = cursor.fetchone()

        # If the record exists, toggle the is_liked value
        if result is not None:
            is_liked = not result[0]

            # Update the existing like record
            query = "UPDATE likes SET is_liked = %s WHERE user_id = %s AND pc_id = %s"
            values = (is_liked, user_id, pc_id)
            cursor.execute(query, values)

        else:
            # Insert a new like record
            query = "INSERT INTO likes (user_id, pc_id, is_liked) VALUES (%s, %s, %s)"
            values = (user_id, pc_id, is_liked)
            cursor.execute(query, values)

        # Commit the transaction
        db.commit()

        # Return a success response
        response = {'message': 'Like toggled successfully'}
        return jsonify(response), 200

    except mysql.connector.Error as error:
        # Rollback the transaction in case of an error
        db.rollback()

        # Return an error response
        response = {'error': str(error)}
        return jsonify(response), 500

    finally:
        # Close the cursor and database connection
        cursor.close()
        db.close()



@app.route('/comparison')
def comparison():
    return render_template('comparison.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/learn-more')
def learn_more():
    return render_template('learn-more.html')


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
    cursor.execute("SELECT pcs.*, IFNULL(likes.is_liked, FALSE) AS is_liked FROM pcs LEFT JOIN likes ON pcs.pc_id = likes.pc_id")
    data = cursor.fetchall()

    # Close the database connection
    mydb.close()

    # Return the data as a list of dictionaries
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

    return 'PC inserted successfully'



@app.route('/logout')
def logout():
    # Remove the user_id from the session
    session.pop('user_id', None)

    # Redirect the user to the index page
    return redirect('/')


if __name__ == '__main__':
    os.environ['SENDGRID_API_KEY'] = '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'
    app.run(debug=True)