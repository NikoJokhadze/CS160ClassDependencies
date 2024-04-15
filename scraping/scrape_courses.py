import requests
import json
from concurrent.futures import ThreadPoolExecutor
from bs4 import BeautifulSoup
import re

# Scuffed manual entry notes
# catid 1, coid 20-5452
# no crosslists present btw on 1
# catid 2, coid 5455-10887
# catid 3, coid ????-?????
# it seems catid 3-9 are skipped
# catid 10, coid 40626-46233
# catid 13, coid 114750-120479


# TODO add sustainability parsing
# another special case: https://catalog.sjsu.edu/ajax/preview_course.php?catoid=10&coid=40626&display_options=&show
# https://catalog.sjsu.edu/ajax/preview_course.php?catoid=13&coid=114750&display_options=&show
# TODO fix this lab entry scraping for tech 60
# https://catalog.sjsu.edu/ajax/preview_course.php?catoid=13&coid=120000&display_options=&show
MIN_CID = 114750
MAX_CID = 120479
CATID = 13
MAX_CONCURRENT_REQUESTS = 16  
MAX_RETRIES = 3 
BASE_URL = "https://catalog.sjsu.edu/ajax/preview_course.php?catoid="+str(CATID)+"&coid={}&display_options=&show"


def fetch_course(coid):
    url = BASE_URL.format(coid)
    retries = 0
    while retries < MAX_RETRIES:
        try:
            response = requests.get(url)
            response.raise_for_status()  # Raise an error for non-200 responses
            return response.text
        except requests.RequestException as e:
            print(f"Error fetching course {coid}: {e}")
            retries += 1
            if retries < MAX_RETRIES:
                print(f"Retrying... ({retries}/{MAX_RETRIES})")
            else:
                print("Max retries exceeded. Skipping course.")
                return None


# Function to extract details from the response
def parse_course(response_text, catid_course, coid_course):

    print(response_text)

    # Extracting Name
    name_match = re.search(r"<h3>(.*?)</h3>", response_text)
    name = name_match.group(1).strip() if name_match else None
    name_short = name.split(' - ')[0].strip()
    
    # Extracting units
    units_match = re.search(r"<em>(\d+(?:-\d+)?)(?:\s*-\s*\d+)?</em>\s*<em>unit", response_text)
    #re.search(r"<em>(\d+(?:-\d+)?)</em>\s*<em>unit\(s\)</em>", response_text)
    units = units_match.group(1) + " unit(s)" if units_match else None

    # Extracting description
    description_match = re.search(r"<br>(.*?)<br>", response_text)
    description = description_match.group(1).strip() if description_match else None

    # Extracting satisfies
    satisfies_match = re.search(r"<em>Satisfies</em>\s*<em>\s*(.*?)</em><br>", response_text)
    satisfies = satisfies_match.group(1).strip() if satisfies_match else None

    # Extracting Misc/Lab
    misc_lab_match = re.search(r"<em>Misc/Lab:\s*(.*?)</em>", response_text)
    misc_lab = misc_lab_match.group(1).strip() if misc_lab_match else None

    # Extracting grading
    grading_match = re.search(r"<strong>Grading:</strong>\s*(.*?)<br>", response_text)
    grading = grading_match.group(1).strip() if grading_match else None

    # Extracting notes
    notes_match = re.search(r"<strong>Note\(s\):</strong>\s*(.*?)<br><br>", response_text)
    notes = notes_match.group(1).strip() if notes_match else None
    notes_referenced = extract_referenced_courses(notes, response_text)

    # Extracting prerequisites
    prerequisites_match = re.search(r"<strong>Prerequisite\(s\):</strong>\s*(.*?)<br>", response_text)
    prerequisites = prerequisites_match.group(1).strip() if prerequisites_match else None
    prerequisites_referenced = extract_referenced_courses(prerequisites, response_text)
    

    # Extracting pre/corequisites
    pre_corequisites_match = re.search(r"<strong>Pre/Corequisite\(s\):</strong>\s*(.*?)<br>", response_text)
    pre_corequisites = pre_corequisites_match.group(1).strip() if pre_corequisites_match else None
    pre_co_requisites_referenced = extract_referenced_courses(pre_corequisites, response_text)

    # Extracting corequisites
    corequisites_match = re.search(r"<strong>Corequisite\(s\):</strong>\s*(.*?)<br>", response_text)
    corequisites = corequisites_match.group(1).strip() if corequisites_match else None
    corequisites_referenced = extract_referenced_courses(corequisites, response_text)

    # Extracting crosslists
    crosslisted_match = re.search(r"<br>\s*(Cross-listed with\s*.*?)<br>", response_text)
    crosslists = crosslisted_match.group(1).strip() if crosslisted_match else None
    crosslists_referenced = extract_referenced_courses(crosslists, response_text)
    

    # Convert to plain text
    if notes:
        notes = BeautifulSoup(notes,features="html.parser").get_text()
    # Convert to plain text
    if prerequisites:
        prerequisites = BeautifulSoup(prerequisites,features="html.parser").get_text()
    # Convert to plain text
    if pre_corequisites:
        pre_corequisites = BeautifulSoup(pre_corequisites,features="html.parser").get_text()
    # Convert to plain text
    if corequisites:
        corequisites = BeautifulSoup(corequisites,features="html.parser").get_text()
    # Convert to plain text
    if crosslists:
        crosslists = BeautifulSoup(crosslists,features="html.parser").get_text()

    return {
        "name": name,
        "name_short": name_short,
        "coid": coid_course,
        "catid": catid_course,
        "units": units,
        "description": description,
        "satisfies": satisfies,
        "misc_lab": misc_lab,
        "grading": grading,
        "notes": notes,
        "prerequisites": prerequisites,
        "pre_co_requisites": pre_corequisites,
        "corequisites": corequisites,
        "crosslist": crosslists,
        "notes_referenced": notes_referenced,
        "prerequisites_referenced": prerequisites_referenced,
        "pre_co_requisites_referenced": pre_co_requisites_referenced,
        "corequisites_referenced": corequisites_referenced,
        "crosslist_referenced": crosslists_referenced
    }

# Function to extract referenced courses
def extract_referenced_courses(text, response_text):
    referenced_courses = []

    if text:
        #print("referenced:  ",text)
        referenced_courses_match = re.findall(r"<a.*?catoid=(\d+).*?coid=(\d+).*?>(.*?)</a>", text)

        for course in referenced_courses_match:
            #print(course)
            catoid = course[0]
            coid = course[1]
            course_name = course[2]

            referenced_courses.append({
                "name_short": course_name,
                "catoid": catoid,
                "coid": coid
            })
    return referenced_courses


# Function to scrape courses
def scrape_courses():
    with ThreadPoolExecutor(max_workers=MAX_CONCURRENT_REQUESTS) as executor:
        responses = executor.map(fetch_course, range(MIN_CID, MAX_CID + 1))

        parsed_courses = [parse_course(html, catid_course=CATID, coid_course=coid) for coid, html in enumerate(responses, start=MIN_CID) if html is not None]
        return parsed_courses


def main():
    courses = scrape_courses()
    with open('scraped_courses.json', 'w') as f:
        json.dump(courses, f,indent=2)


if __name__ == "__main__":
    main()