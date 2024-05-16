from flask import Flask, jsonify, abort, Response, request
from flask_cors import CORS  # type: ignore # Import CORS from flask_cors module
from datetime import datetime
import mysql.connector  # type: ignore
import graphviz  # type: ignore
import textwrap
import html

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


def fetch_major_courses_low(major_id):
    query1 = f"""SELECT 
                    DISTINCT C.course_id, C.course_name_short, C.units 
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
    # the or statement is excessive since it will get a bunch of irrelevant prereqs most likely
    with conn.cursor() as cursor:
        cursor.execute(query1, (major_id,))
        courses = cursor.fetchall()
        course_columns = [column[0] for column in cursor.description]

        cursor.execute(query2, (major_id,))
        relations = cursor.fetchall()
        relations_columns = [column[0] for column in cursor.description]

    return courses, course_columns, relations, relations_columns


def fetch_major_courses_medium(major_id):
    query1 = f"""SELECT 
                    DISTINCT C.course_id, C.course_name, C.department_name, C.units, C.course_description  
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
    # the or statement is excessive since it will get a bunch of irrelevant prereqs most likely
    with conn.cursor() as cursor:
        cursor.execute(query1, (major_id,))
        courses = cursor.fetchall()
        course_columns = [column[0] for column in cursor.description]

        cursor.execute(query2, (major_id,))
        relations = cursor.fetchall()
        relations_columns = [column[0] for column in cursor.description]

    return courses, course_columns, relations, relations_columns


def fetch_major_courses_high(major_id):
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
    # the or statement is excessive since it will get a bunch of irrelevant prereqs most likely
    with conn.cursor() as cursor:
        cursor.execute(query1, (major_id,))
        courses = cursor.fetchall()
        course_columns = [column[0] for column in cursor.description]

        cursor.execute(query2, (major_id,))
        relations = cursor.fetchall()
        relations_columns = [column[0] for column in cursor.description]
    return courses, course_columns, relations, relations_columns


def generate_major_graph(major_id, courses, course_columns, relations, relations_columns, relations_type):
    g = graphviz.Digraph(f'Major_{major_id}')
    g.attr(ranksep='1.75')  # Controls space between rows of nodes
    g.attr(splines='ortho')

    html_template = """<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">{rows}</TABLE>>"""

    # Set to store course IDs that have relations
    courses_with_relations = set()

    for relation in relations:
        courses_with_relations.add(relation[relations_columns.index("course_id")])
        courses_with_relations.add(relation[relations_columns.index("relation_id")])

    # Set to store actual course IDs
    actual_course_ids = {course[0] for course in courses}

    # Filter out the unnecessary course IDs
    courses_with_relations = courses_with_relations.intersection(actual_course_ids)

    course_colors = {}
    
    if relations_type == 'all':
        for course_id in courses_with_relations:
            course = next((course for course in courses if course[0] == course_id), None)

            if course:
                rows_html = ""
                for column_name, column_value in zip(course_columns, course):
                    if isinstance(column_value, str):
                        wrapped_column_value = textwrap.fill(column_value, width=70, replace_whitespace=True,
                                                             break_long_words=False, break_on_hyphens=True)
                        res = [html.escape(el) for el in wrapped_column_value.splitlines()]
                        wrapped_column_value_with_br = "<br/>".join(res)

                        rows_html += f'<TR><TD>{wrapped_column_value_with_br}</TD></TR>'
                    else:
                        rows_html += f'<TR><TD>{column_value}</TD></TR>'
                
                node_color = ('red' if course_id in [116331, 116280, 116416] else
                              'yellow' if course_id in [116287, 116315, 118300, 116322] else
                              'green' if course_id < 116287 or course_id in [116319, 119703, 118265] else
                              'grey')

                course_colors[course_id] = node_color
                
                g.node(f"course_{course_id}",
                       label=html_template.format(rows=rows_html).strip().replace("\n", "\\n"),
                       shape='plaintext',
                       color=node_color)  # Set node color conditionally

        for relation in relations:
            if (relation[relations_columns.index("course_id")] in courses_with_relations and
                    relation[relations_columns.index("relation_id")] in courses_with_relations):
                source_id = relation[relations_columns.index('relation_id')]
                target_id = relation[relations_columns.index('course_id')]
                
                source_color = course_colors.get(source_id, 'black')
                target_color = course_colors.get(target_id, 'black')
                
                if source_color == 'green' and target_color == 'green':
                    edge_color = 'green'
                elif (source_color in ['green', 'black'] and target_color == 'yellow') or \
                     (source_color == 'yellow' and target_color in ['green', 'black']):
                    edge_color = 'yellow'
                elif (source_color in ['green', 'black'] and target_color == 'red') or \
                     (source_color == 'red' and target_color in ['green', 'black']):
                    edge_color = 'red'
                else:
                    edge_color = 'black'
                
                g.edge(f"course_{source_id}",
                       f"course_{target_id}",
                       color=edge_color)  # Set arrow color

    elif relations_type == 'none':
        for course in courses:
            if course[0] not in courses_with_relations:
                rows_html = ""
                for column_name, column_value in zip(course_columns, course):
                    if isinstance(column_value, str):
                        wrapped_column_value = textwrap.fill(column_value, width=70, replace_whitespace=True,
                                                             break_long_words=False, break_on_hyphens=True)
                        res = [html.escape(el) for el in wrapped_column_value.splitlines()]
                        wrapped_column_value_with_br = "<br/>".join(res)

                        rows_html += f'<TR><TD>{wrapped_column_value_with_br}</TD></TR>'
                    else:
                        rows_html += f'<TR><TD>{column_value}</TD></TR>'

                node_color = 'darkgreen' if course[0] < 116320 else 'black'
                g.node(f"course_{course[0]}",
                       label=html_template.format(rows=rows_html).strip().replace("\n", "\\n"),
                       shape='plaintext',
                       color=node_color)  # Set node color conditionally

    return str(g)

# will prof notice?
@app.route('/coffee')
def coffee():
    return Response("I am a teapot", status=419, mimetype="text/plain")


@app.route('/major/<int:major_id>')
def major(major_id):
    detail_level = request.args.get('detaillevel', default='low')

    if detail_level == 'low':
        courses, course_columns, relations, relations_columns = fetch_major_courses_low(major_id)
    elif detail_level == 'medium':
        courses, course_columns, relations, relations_columns = fetch_major_courses_medium(major_id)
    elif detail_level == 'high':
        courses, course_columns, relations, relations_columns = fetch_major_courses_high(major_id)
    else:
        # Handle invalid detail level here (e.g., return an error response)
        return Response("Invalid detail level", status=400, mimetype="text/plain")

    relations_type = request.args.get('relations', default='all')

    return Response(
        generate_major_graph(major_id, courses, course_columns, relations, relations_columns, relations_type),
        mimetype="text/plain") if len(courses) > 0 else Response("404 No Major Found", status=404,
                                                                 mimetype="text/plain")     


def generate_major_graph_transcipt(major_id, courses, course_columns, relations, relations_columns, student_course_ids):
    g = graphviz.Digraph(f'Major_{major_id}')
    g.attr(ranksep='1.75')  # Controls space between rows of nodes
    g.attr(splines='ortho')

    html_template = """<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">{rows}</TABLE>>"""

    # Set to store course IDs that have relations
    courses_with_relations = set()

    for relation in relations:
        courses_with_relations.add(relation[relations_columns.index("course_id")])
        courses_with_relations.add(relation[relations_columns.index("relation_id")])

    # Set to store actual course IDs
    actual_course_ids = {course[0] for course in courses}

    # Filter out the unnecessary course IDs
    courses_with_relations = courses_with_relations.intersection(actual_course_ids)

    course_colors = {}
    
    # assume prereqs met
    non_student_courses = actual_course_ids - set(student_course_ids)
    non_student_dict = {student_id: True for student_id in non_student_courses}
    
    
    for course_id in courses_with_relations:
        course = next((course for course in courses if course[0] == course_id), None)

        if course:
            rows_html = ""
            for column_name, column_value in zip(course_columns, course):
                if isinstance(column_value, str):
                    wrapped_column_value = textwrap.fill(column_value, width=70, replace_whitespace=True,
                                                            break_long_words=False, break_on_hyphens=True)
                    res = [html.escape(el) for el in wrapped_column_value.splitlines()]
                    wrapped_column_value_with_br = "<br/>".join(res)

                    rows_html += f'<TR><TD>{wrapped_column_value_with_br}</TD></TR>'
                else:
                    rows_html += f'<TR><TD>{column_value}</TD></TR>'
                    
            node_color = 'black'
            
            g.node(f"course_{course_id}",
                    label=html_template.format(rows=rows_html).strip().replace("\n", "\\n"),
                    shape='plaintext',
                    color=node_color)  # Set node color conditionally

    for relation in relations:
        if (relation[relations_columns.index("course_id")] in courses_with_relations and
                relation[relations_columns.index("relation_id")] in courses_with_relations):
            source_id = relation[relations_columns.index('relation_id')]
            target_id = relation[relations_columns.index('course_id')]
            
            edge_color = 'green'
            
            # prereqs not met
            if source_id not in set(student_course_ids) and target_id not in set(student_course_ids):
                edge_color = 'red'
                non_student_dict[target_id] = False
            
            g.edge(f"course_{source_id}",
                    f"course_{target_id}",
                    color=edge_color)  # Set arrow color
    for course_id in actual_course_ids:
        if course_id in student_course_ids:
            g.node(name=f"course_{course_id}", color = 'black')
        elif non_student_dict[course_id]:
            g.node(name=f"course_{course_id}", color = 'green')
        else:
            g.node(name=f"course_{course_id}", color = 'red')
    
    
    print(non_student_dict,flush=True)
    return str(g)


# TODO currently this only takes the unofficial transcript with ONLY courses, 
# and not any other fluff, this needs to be fixed.
# Also it does not check for grade satisfaction currently
def parse_unnoficial_transcript(file):
    parsed_data = []
    for line in file:
        line = line.decode('utf-8')
        # print(line, flush=True)
        elements = line.split()
        course_code = elements[0] + " " + elements[1] 
        parsed_data.append(course_code)
            
    return parsed_data

def find_course_ids_from_short_names(parsed_data):
    # Create a cursor object to execute SQL queries

    with conn.cursor() as cursor:
        # Prepare the SQL query
        #TODO softmatching (this works, but has case sensitivity)
        query = query = "SELECT course_id FROM Course WHERE course_name_short IN ({})".format(', '.join(['%s']*len(parsed_data)))
        
        cursor.execute(query, parsed_data)
        results = cursor.fetchall()
        course_ids = [result[0] for result in results]

        return course_ids
    return []

        
@app.route('/major/progress/<int:major_id>', methods =['POST'])
def major_progress(major_id):
    detail_level = request.args.get('detaillevel', default='low')

    if detail_level == 'low':
        courses, course_columns, relations, relations_columns = fetch_major_courses_low(major_id)
    elif detail_level == 'medium':
        courses, course_columns, relations, relations_columns = fetch_major_courses_medium(major_id)
    elif detail_level == 'high':
        courses, course_columns, relations, relations_columns = fetch_major_courses_high(major_id)
    else:
        # Handle invalid detail level here (e.g., return an error response)
        return Response("Invalid detail level", status=400, mimetype="text/plain")
    
    if 'file' not in request.files:
        return Response("400 No File", status = 400, mimetype="text/plain")
    
    file = request.files['file']

    if file.filename == '':
        return Response("400 Empty File", status = 400, mimetype="text/plain")

    if not file:
        return Response("400 Something went wrong with file", status = 400, mimetype="text/plain")
        
    file_content = file.stream.readlines()

    parsed_data = parse_unnoficial_transcript(file_content)

    # for course_code in parsed_data:
    #     print(course_code, flush=True)
    student_course_ids = find_course_ids_from_short_names(parsed_data)
    #print(student_course_ids, flush=True)
    
    result = generate_major_graph_transcipt(major_id,courses, course_columns, relations, relations_columns,student_course_ids)

    return  Response(result, status = 200, mimetype="text/plain")


if __name__ == '__main__':
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()  # maybe dict

        app.run(debug=True, host='0.0.0.0')
    except Exception as e:
        print(e)