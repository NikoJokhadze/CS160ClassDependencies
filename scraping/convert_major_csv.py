import json
import csv
import re

# Load JSON data
with open('major.json', 'r', encoding='utf-8') as json_file:
    majors = json.load(json_file)

# Define CSV file and fieldnames
csv_file = 'majors.csv'
fieldnames = ['program_id', 'catalogue_id', 'program_name', 'program_description']

# Write data to CSV
with open(csv_file, 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    writer.writeheader()
    i =1
    for major in majors:
        writer.writerow({
            'program_id': major['poid'],
            'catalogue_id': major['catid_major'],
            'program_name':  major['program_name'] ,
            'program_description': re.sub(r'\n\n\n+', '\n\n',major['program_description'] ) if major['program_description']  else ""
        })

print("CSV file created successfully.")