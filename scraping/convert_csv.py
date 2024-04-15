import json
import csv
import re

def course_standing(course_name_short):
    if re.match(r'^[A-Za-z]+\s[1-9][0-9]{2}$', course_name_short):
        return "Upper"
    elif re.match(r'^[A-Za-z]+\s[2-9][0-9]{2}[A-Za-z]?$', course_name_short):
        return "Graduate"
    else:
        return "Lower"
    
def extract_department(course_name_short):
    match = re.match(r'^([A-Za-z]+)\s[0-9]', course_name_short)
    if match:
        return match.group(1).upper()  
    else:
        return "UNKNOWN"  # In case of stupid


with open('courses_catid_13.json', 'r', encoding='ascii') as json_file:
    courses = json.load(json_file)

csv_file = 'courses.csv'
fieldnames = ['course_id', 'catalogue_id', 'course_name', 'course_name_short', 'department_name', 
              'course_description', 'units', 'grading_type', 'grade_requirement', 'prerequisites', 
              'corequisites', 'pre_co_requisites', 'misc_lab', 'GE_area', 'course_level', 'course_notes']

# you can open in utf-8 if you are sure the mysql database supports it, in which case remove backslashreplace
with open(csv_file, 'w', newline='', encoding='ascii',errors='backslashreplace') as csvfile: 
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames,quotechar='"')
    writer.writeheader()
    for course in courses:
        writer.writerow({
            'course_id': course['coid'],
            'catalogue_id': course['catid'],
            'course_name': course['name'], # if this is not present then this is going to burn anyways
            'course_name_short': course['name_short'],
            'department_name': extract_department(course['name_short']),  # You can replace this with actual department name
            'course_description': course['description'] if course['description']  else '',
            'units': course['units'] if course['units'] else '3 Unit(s)',
            'grading_type': course['grading'] if course['grading'] else "Letter Graded", # no null cases but just in case
            'grade_requirement': 'C-', # hard coded for now, although there are some ocurses that rerquire C
            'prerequisites': course['prerequisites'] if course['prerequisites'] else '',
            'corequisites': course['corequisites'] if course['corequisites'] else '',
            'pre_co_requisites': course['pre_co_requisites'] if course['pre_co_requisites'] else '',
            'misc_lab': course['misc_lab'] if course['misc_lab'] else '',
            'GE_area': course['satisfies'] if course['satisfies'] else '',
            'course_level': course_standing(course['name_short']),
            'course_notes': course['notes'] if course['notes'] else ''
        })


# Define CSV file for prerequisites
prereq_csv_file = 'prereq.csv'
prereq_fieldnames = ['course_id', 'prereq_id']

# Write data to prereq CSV
with open(prereq_csv_file, 'w', newline='', encoding='utf-8') as prereq_csvfile:
    prereq_writer = csv.writer(prereq_csvfile)
    prereq_writer.writerow(prereq_fieldnames)  # Write header row
    for course in courses:
        course_id = course['coid']
        prerequisites_referenced = course.get('prerequisites_referenced', [])
        for prereq_ref in prerequisites_referenced:
            prereq_id = prereq_ref.get('coid')
            prereq_writer.writerow([course_id, prereq_id])


# Define CSV file for prerequisites
coreq_csv_file = 'coreq.csv'
coreq_fieldnames = ['course_id', 'coreq_id']

# Write data to prereq CSV
with open(coreq_csv_file, 'w', newline='', encoding='utf-8') as coreq_csvfile:
    coreq_writer = csv.writer(coreq_csvfile)
    coreq_writer.writerow(coreq_fieldnames)  # Write header row
    for course in courses:
        course_id = course['coid']
        corequisites_referenced = course.get('corequisites_referenced', [])
        for coreq_ref in corequisites_referenced:
            coreq_id = coreq_ref.get('coid')
            coreq_writer.writerow([course_id, coreq_id])


# Define CSV file for prerequisites
cross_csv_file = 'cross.csv'
cross_fieldnames = ['course_id', 'cross_id']

# Write data to prereq CSV
with open(cross_csv_file, 'w', newline='', encoding='utf-8') as cross_csvfile:
    cross_writer = csv.writer(cross_csvfile)
    cross_writer.writerow(cross_fieldnames)  # Write header row
    for course in courses:
        course_id = course['coid']
        cross_referenced = course.get('crosslist_referenced', [])
        for prereq_ref in cross_referenced:
            cross_id = prereq_ref.get('coid')
            cross_writer.writerow([course_id, cross_id])


# Define CSV file for prerequisites
preco_csv_file = 'precoreq.csv'
precoreq_fieldnames = ['course_id', 'precoreq_id']

# Write data to prereq CSV
with open(preco_csv_file, 'w', newline='', encoding='utf-8') as precoreq_csvfile:
    precoreq_writer = csv.writer(precoreq_csvfile)
    precoreq_writer.writerow(precoreq_fieldnames)  # Write header row
    for course in courses:
        course_id = course['coid']
        precorequisites_referenced = course.get('pre_co_requisites_referenced', [])
        for precoreq_ref in precorequisites_referenced:
            precoreq_id = precoreq_ref.get('coid')
            precoreq_writer.writerow([course_id, precoreq_id])