import json
import csv
import re

def extract_min_units(group_name):
    match = re.search(r'\(\s*(\d+)\s*units\s*\)', group_name, flags=re.IGNORECASE)
    if match:
        return int(match.group(1))
    return 1


# Load JSON data
with open('major.json', 'r', encoding='utf-8') as json_file:
    majors = json.load(json_file)


csv_file = 'majors.csv'
fieldnames = ['program_id', 'catalogue_id', 'program_name', 'program_description']

with open(csv_file, 'w', newline='', encoding='ascii',errors='backslashreplace') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()

    for major in majors:
        writer.writerow({
            'program_id': major['poid'],
            'catalogue_id': major['catid_major'],
            'program_name':  major['program_name'] ,
            'program_description': re.sub(r'\n\n\n+', '\n\n',major['program_description'] ) if major['program_description']  else ""
        })
      
        
group_fieldnames = ['group_name', 'group_description', 'group_id', 'min_units', 'min_courses']
group_csvfile='groups.csv'

with open(group_csvfile, 'w', newline='', encoding='ascii', errors='backslashreplace') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=group_fieldnames)
    writer.writeheader()
    
    for program in majors:
        for group in program['groups']:
            writer.writerow({
                'group_name': group['name'],
                'group_description': group['description'].replace(u'\xa0', u' ') if group['description'] else "",
                'group_id': group['group_id'],
                'min_units': extract_min_units(group['name']),
                'min_courses': 1
            })


group_courses_csv_file = 'group_courses.csv'
fieldnames = ['group_id', 'course_id', 'course_mandate']

with open(group_courses_csv_file, 'w', newline='', encoding='ascii', errors='backslashreplace') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for major in majors:
        for group in major['groups']:
            group_id = group['group_id']
            for course in group['courses']:
                writer.writerow({
                    'group_id': group_id,
                    'course_id': course['coid'],
                    'course_mandate': 0  # 0 as default, needs to be analyzed later for how to do this
                })


program_groups_csv_file = 'program_groups.csv'
fieldnames = ['program_id', 'group_id']

# Write data to CSV
with open(program_groups_csv_file, 'w', newline='', encoding='ascii', errors='backslashreplace') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    for major in majors:
        program_id = major['poid']
        for group in major['groups']:
            group_id = group['group_id']
            writer.writerow({
                'program_id': program_id,
                'group_id': group_id
            })
            
print("CSV file created successfully.")