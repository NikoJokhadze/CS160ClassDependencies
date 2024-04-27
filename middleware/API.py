# middleware_api.py
from flask import Flask, jsonify 
from flask_cors import CORS  # type: ignore # Import CORS from flask_cors module
from datetime import datetime
import mysql.connector  # type: ignore
import graphviz # type: ignore

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

def fetch_major_courses(major_id):
    query1 = f"""SELECT 
                    DISTINCT C.* 
                FROM 
                    Course AS C
                INNER JOIN GroupCourses as GC
                    ON GC.course_id = C.course_id
                INNER JOIN ProgramGroups as PG
                    ON GC.group_id = PG.group_id AND PG.program_id = %s
                   """ 
    query2 = f"""SELECT DISTINCT
                        CR.*
                    FROM
                        CourseRelations AS CR
                    INNER JOIN GroupCourses AS GC
                        ON CR.course_id = GC.course_id -- OR CR.relation_id = GC.course_id
                    INNER JOIN ProgramGroups AS PG
                        ON GC.group_id = PG.group_id AND PG.program_id = %s;
                   """
                   # the or statement is excessive since it will get a bunch of irrelivant prereqs most likely
    cursor.execute(query1,(major_id,))
    courses = cursor.fetchall()
    cursor.execute(query2,(major_id,))
    relations = cursor.fetchall()
    
    return (courses,relations)

@app.route('/hello')
def hello():
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return jsonify({'message': 'Hello from ' + current_time + ''})

@app.get('/major/<int:major_id>')
def major(major_id):
    courses,relations = fetch_major_courses(major_id)
    return jsonify(courses)


@app.route('/database')
def database():
    cursor.execute("SELECT * FROM Course where course_name_short LIKE 'CS%' LIMIT 5")
    result = cursor.fetchall()

    return jsonify({'message': result})


@app.route('/sample')
def sample():
    cursor.execute("SELECT course_name_short, units FROM Course where course_name_short LIKE 'CS%' LIMIT 5")
    results = cursor.fetchall()
    data = [list(row) for row in results]
    dot = "digraph G {\n"

    # Graph info for the Nodes and Edges
    fontname = "Helvetica,Arial,sans-serif"
    style = "filled"
    shape = "rect"
    fillcolor = "#a1f1a1ff"
    penwidth = 5

    dot += f'node [fontname = "{fontname}" style = "{style}" shape = "{shape}" fillcolor = "{fillcolor}"];\n'
    dot += f'edge [penwidth = "{penwidth}"];\n'

    # Iterate over each row in the data to create nodes
    for i in range(len(data)):
        node_label = ", ".join(data[i])
        """
        data[i] looks like:
        ["CS 108","3 unit(s)"]
        """

        dot += f"""
        "{data[i][0]}, {data[i][1]}" [label="{data[i][0]}",shape=plaintext,fontsize=16];
        "{data[i][0]}, {data[i][1]}" [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">
        <TR><TD> {data[i][0]} </TD></TR>
        <TR><TD> {data[i][1]} </TD></TR>
        </TABLE>>];"""

        if i < len(data) - 1:
            next_node_label = ", ".join(data[i + 1])
            dot += f'"{node_label}" -> "{next_node_label}";\n'

    dot += "}"

    return dot


if __name__ == '__main__':
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor() # maybe dict

        app.run(debug=True, host='0.0.0.0')
    except Exception as e:
        print(e)
