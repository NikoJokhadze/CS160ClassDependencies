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

@app.route('/major')
def major():
    major_id = 7663
    query = f"""SELECT DISTINCT * 
                        FROM Course AS C
                            INNER JOIN GroupCourses as GC
                            ON GC.course_id = C.course_id
                            INNER JOIN ProgramGroups as PG
                            ON GC.group_id = PG.group_id AND PG.program_id = %s
                   """
    cursor.execute(query,(major_id,))
    result = cursor.fetchall()

    return jsonify(result)

@app.route('/database')
def database():
    cursor.execute("SELECT * FROM Course LIMIT 50")
    result = cursor.fetchall()

    return jsonify(result)
    
if __name__ == '__main__':
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()

        app.run(debug=True, host='0.0.0.0')
    except Exception as e:
        print(e)
    