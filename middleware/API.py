# middleware_api.py
from flask import Flask, jsonify # type: ignore
from flask_cors import CORS  # type: ignore # Import CORS from flask_cors module
from datetime import datetime
import mysql.connector # type: ignore

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes of your Flask app

# TODO deal with cors stuff for specific routes
app.config['CORS_HEADERS'] = 'Content-Type'

# Database connection configuration
db_config = {
    'host': 'database',  # Using the service name from docker-compose
    'user': 'MYSQL_USER',
    'password': 'MYSQL_PASSWORD',
    'database': 'MYSQL_DATABASE'
}

@app.route('/hello')
def hello():
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return jsonify({'message': 'Hello from ' + current_time + ''})

@app.route('/database')
def database():
    try:
        # Connect to the database
        # TODO move this outwards so new connection is not formed each time
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        # should return syntax error
        cursor.execute("SELECT VERSION() AS version, DATABASE() AS database, USER() AS user")
        result = cursor.fetchone()

        # Format the result
        server_info = {
            'version': result[0],
            'database': result[1],
            'user': result[2]
        }

        return jsonify(server_info)
    except Exception as e:
        return jsonify({'error': str(e)})
    finally:
        # Close the connection
        if 'conn' in locals() and conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')