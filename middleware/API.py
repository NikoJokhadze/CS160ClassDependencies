# middleware_api.py
from flask import Flask, jsonify # type: ignore
from flask_cors import CORS  # type: ignore # Import CORS from flask_cors module
from datetime import datetime
import mysql.connector # type: ignore
# import atexit # TODO
# atexit.register(exit_method_name)

conn = None
cursor = None

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes of your Flask app

# TODO deal with cors stuff for specific routes
app.config['CORS_HEADERS'] = 'Content-Type'

# Database connection configuration
db_config = {
    'host': 'database',  # Using the service name from docker-compose
    'user': 'MYSQL_USER',
    'password': 'MYSQL_PASSWORD',
    'database': 'ClassDependenciesDatabase'
}

@app.route('/hello')
def hello():
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return jsonify({'message': 'Hello from ' + current_time + ''})

@app.route('/database')
def database():
    cursor.execute("SELECT * FROM Course where course_name_short LIKE 'CS%' LIMIT 5")
    result = cursor.fetchall()

    return jsonify({'message': result})
    
if __name__ == '__main__':
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        app.run(debug=True, host='0.0.0.0')
    except Exception as e:
        print(e)
    