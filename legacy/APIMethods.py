# middleware_api.py
from flask import Flask, jsonify, abort, Response, request
from flask_cors import CORS  # type: ignore # Import CORS from flask_cors module
from datetime import datetime
import mysql.connector  # type: ignore
import graphviz  # type: ignore
import textwrap
import html

# import atexit
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
    cursor.execute("SELECT * FROM Course WHERE course_name_short LIKE 'CS%' LIMIT 5")
    result = cursor.fetchall()

    return jsonify({'message': result})


@app.route('/sample')
def sample():
    cursor.execute("""
                   SELECT 
                        course_name_short, units, prerequisites 
                   FROM 
                        Course 
                   WHERE 
                        course_name_short LIKE 'CS%' LIMIT 5
                   """)
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

    dot += f'''
        // define the node color meaning
        rankdir=TB; //layout formatç
        // make edges invisible
        Green -> Yellow -> Grey [style=invis];
        Green [label=<<TABLE BORDER="0" CELLBORDER="0">
            <TR><TD><B>Class Taken Already</B></TD></TR>
            </TABLE>>, shape=plaintext, fontsize=9, fillcolor="#a1f1a1ff",pos="-5,1!"];//pos doesn't work
        Yellow [label=<<TABLE BORDER="0" CELLBORDER="0">
            <TR><TD><B>Class In Progress</B></TD></TR>
            </TABLE>>, shape=plaintext, fontsize=9, fillcolor="#f3d40eff"];
        Grey [label=<<TABLE BORDER="0" CELLBORDER="0">
            <TR><TD><B>Class Not Taken Yet</B></TD></TR>
            </TABLE>>, shape=plaintext, fontsize=9, fillcolor="grey"];

    '''

    # Iterate over each row in the data to create nodes
    for i in range(len(data)):
        node_label = ", ".join(data[i][:2])

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
            next_node_label = ", ".join(data[i + 1][:2])
            dot += f'"{node_label}" -> "{next_node_label}";\n'

    dot += "}"

    return dot