# middleware_api.py
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
    # the or statement is excessive since it will get a bunch of irrelivant prereqs most likely
    with conn.cursor() as cursor:
        cursor.execute(query1, (major_id,))
        courses = cursor.fetchall()
        course_columns = [column[0] for column in cursor.description]

        cursor.execute(query2, (major_id,))
        relations = cursor.fetchall()
        relations_columns = [column[0] for column in cursor.description]

    return (courses, course_columns, relations, relations_columns)


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
    # the or statement is excessive since it will get a bunch of irrelivant prereqs most likely
    with conn.cursor() as cursor:
        cursor.execute(query1, (major_id,))
        courses = cursor.fetchall()
        course_columns = [column[0] for column in cursor.description]

        cursor.execute(query2, (major_id,))
        relations = cursor.fetchall()
        relations_columns = [column[0] for column in cursor.description]

    return (courses, course_columns, relations, relations_columns)


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
    # the or statement is excessive since it will get a bunch of irrelivant prereqs most likely
    with conn.cursor() as cursor:
        cursor.execute(query1, (major_id,))
        courses = cursor.fetchall()
        course_columns = [column[0] for column in cursor.description]

        cursor.execute(query2, (major_id,))
        relations = cursor.fetchall()
        relations_columns = [column[0] for column in cursor.description]
    return (courses, course_columns, relations, relations_columns)


def generate_major_graph(major_id, courses, course_columns, relations, relations_columns):
    coid_i = course_columns.index("course_id")
    unique_course_ids = {course[coid_i] for course in courses}

    g = graphviz.Digraph(f'Major_{major_id}')

    # Check for different verbosity levels
    # HTML template for the node
    html_template = """<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">{rows}</TABLE>>"""

    for course in courses:
        rows_html = ""
        for column_name in course_columns:
            column_index = course_columns.index(column_name)
            column_value = course[column_index]

            if (type(column_value) == str):
                wrapped_column_value = textwrap.fill(column_value, width=70, replace_whitespace=True,
                                                     break_long_words=False, break_on_hyphens=True)
                res = [html.escape(el) for el in wrapped_column_value.splitlines()]
                wrapped_column_value_with_br = "<br/>".join(res)

                # commented out rows_html lines are for cells that show both data and names of each part of data
                # If kept without names, remove empty spaces in each cell
                rows_html += f'<TR><TD>{wrapped_column_value_with_br}</TD></TR>'
                # rows_html += f'<TR><TD>{column_name}</TD><TD>{wrapped_column_value_with_br}</TD></TR>'
            else:
                rows_html += f'<TR><TD>{column_value}</TD></TR>'
                # rows_html += f'<TR><TD>{column_name}</TD><TD>{column_value}</TD></TR>'

        g.node(f"course_{course[coid_i]}", label=html_template.format(rows=rows_html).strip().replace("\n", "\\n"),
               shape='plaintext')

    coid_id = relations_columns.index("course_id")
    r_id = relations_columns.index("relation_id")
    rtype_id = relations_columns.index("relation_type")
    greq_id = relations_columns.index("grade_requirement")
    for relation in relations:
        # if they are in the major and not some random unrelated courses
        if relation[coid_id] in unique_course_ids and relation[r_id] in unique_course_ids:
            # TODO add handling of different types of relationships (rtype_id)
            g.edge(f"course_{relation[r_id]}", f"course_{relation[coid_id]}")

    return str(g)


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

    return Response(generate_major_graph(major_id, courses, course_columns, relations, relations_columns),
                    mimetype="text/plain") if len(courses) > 0 else Response("404 No Major Found", status=404,
                                                                             mimetype="text/plain")


if __name__ == '__main__':
    try:
        # Connect to the database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()  # maybe dict

        app.run(debug=True, host='0.0.0.0')
    except Exception as e:
        print(e)