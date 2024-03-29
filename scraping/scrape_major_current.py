import requests
from bs4 import BeautifulSoup
import json
import re
import aiohttp
import asyncio


# Function to extract catid and coid from onclick attribute
def extract_params_from_onclick(onclick_str):
    match = re.search(r"showCourse\('(\d+)', '(\d+)'", onclick_str)
    if match:
        return match.group(1), match.group(2)
    return None, None

# # Function to extract details from the response
# def extract_details(response_text):
#     # Extracting units
#     units_match = re.search(r"<em>(\d+(?:-\d+)?)</em>\s*<em>unit\(s\)</em>", response_text)
#     units = units_match.group(1) + " unit(s)" if units_match else None

#     # Extracting description
#     description_match = re.search(r"<br>(.*?)<br>", response_text)
#     description = description_match.group(1).strip() if description_match else None

#     # Extracting satisfies
#     satisfies_match = re.search(r"<em>Satisfies</em><em>\s*(.*?)</em><br>", response_text)
#     satisfies = satisfies_match.group(1).strip() if satisfies_match else None

#     # Extracting satisfies
#     satisfies_match = re.search(r"<em>Satisfies</em><em>\s*(.*?)</em><br>", response_text)
#     satisfies = satisfies_match.group(1).strip() if satisfies_match else None

#     # Extracting grading
#     grading_match = re.search(r"<strong>Grading:</strong>\s*(.*?)<br>", response_text)
#     grading = grading_match.group(1).strip() if grading_match else None

#     # Extracting notes
#     notes_match = re.search(r"<strong>Note\(s\):</strong>\s*(.*?)<br><br>", response_text)
#     notes = notes_match.group(1).strip() if notes_match else None
#     notes_referenced = extract_referenced_courses(notes, response_text)

#     # Extracting prerequisites
#     prerequisites_match = re.search(r"<strong>Prerequisite\(s\):</strong>\s*(.*?)<br>", response_text)
#     prerequisites = prerequisites_match.group(1).strip() if prerequisites_match else None
#     prerequisites_referenced = extract_referenced_courses(prerequisites, response_text)
    

#     # Extracting pre/corequisites
#     pre_corequisites_match = re.search(r"<strong>Pre/Corequisite\(s\):</strong>\s*(.*?)<br>", response_text)
#     pre_corequisites = pre_corequisites_match.group(1).strip() if pre_corequisites_match else None
#     pre_co_requisites_referenced = extract_referenced_courses(pre_corequisites, response_text)

#     # Extracting corequisites
#     corequisites_match = re.search(r"<strong>Corequisite\(s\):</strong>\s*(.*?)<br>", response_text)
#     corequisites = corequisites_match.group(1).strip() if corequisites_match else None
#     corequisites_referenced = extract_referenced_courses(corequisites, response_text)

#     # Extracting cross-listed courses
#     crosslisted_courses = []
#     crosslisted_match = re.findall(r"<br>\s*Cross-listed with\s*(.*?)<br>", response_text)
#     for match in crosslisted_match:
#         crosslisted_courses.extend(re.findall(r"<a.*?>(.*?)</a>", match))

#     # Extracting catoid and coid for cross-listed courses
#     crosslisted_courses_info = []
#     for course_name in crosslisted_courses:
#         catid_match = re.search(r"catoid=(\d+)", response_text)
#         coid_match = re.search(r"coid=(\d+)", response_text)
#         catoid = catid_match.group(1) if catid_match else None
#         coid = coid_match.group(1) if coid_match else None
#         crosslisted_courses_info.append({
#             "name_short": course_name,
#             "catoid": catoid,
#             "coid": coid
#         })

#     # Convert to plain text
#     if notes:
#         notes = BeautifulSoup(notes,features="html.parser").get_text()
#     # Convert to plain text
#     if prerequisites:
#         prerequisites = BeautifulSoup(prerequisites,features="html.parser").get_text()
#     # Convert to plain text
#     if pre_corequisites:
#         pre_corequisites = BeautifulSoup(pre_corequisites,features="html.parser").get_text()
#     # Convert to plain text
#     if corequisites:
#         corequisites = BeautifulSoup(corequisites,features="html.parser").get_text()

#     return {
#         "units": units,
#         "description": description,
#         "satisfies": satisfies,
#         "grading": grading,
#         "notes": notes,
#         "prerequisites": prerequisites,
#         "pre_co_requisites": pre_corequisites,
#         "corequisites": corequisites,
#         "notes_referenced": notes_referenced,
#         "prerequisites_referenced": prerequisites_referenced,
#         "pre_co_requisites_referenced": pre_co_requisites_referenced,
#         "corequisites_referenced": corequisites_referenced,
#         "crosslist": crosslisted_courses_info
#     }

# # Function to extract referenced courses
# def extract_referenced_courses(text, response_text):
#     referenced_courses = []
#     if text:
#         referenced_courses_match = re.findall(r"<a.*?>(.*?)</a>", text)
#         for course_name in referenced_courses_match:
#             catid_match = re.search(r"catoid=(\d+)", response_text)
#             coid_match = re.search(r"coid=(\d+)", response_text)
#             catoid = catid_match.group(1) if catid_match else None
#             coid = coid_match.group(1) if coid_match else None
#             referenced_courses.append({
#                 "name_short": course_name,
#                 "catoid": catoid,
#                 "coid": coid
#             })
#     return referenced_courses

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


async def send_and_store_request(catid, coid):
    url = f"https://catalog.sjsu.edu/ajax/preview_course.php?catoid={catid}&coid={coid}&display_options=&show"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                response_text = await response.text()
                # Extract details from the response
                details = parse_course(response_text, catid, coid)
                return details
            else:
                return None


async def main():
    print("Starting Scraping")
    #sys.stdout.flush()

    # URL of the webpage to scrape
    url = "https://catalog.sjsu.edu/preview_program.php?catoid=13&poid=7663&returnto=4963"

    # Send a GET request to the webpage
    response = requests.get(url)

    # Parse the HTML content
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find all div elements with class 'acalog-core' that contain a <ul> element directly inside them
    acalog_divs = soup.find_all('div', class_='acalog-core')
    acalog_divs_with_ul = [div for div in acalog_divs if div.ul]

    # Extract Name of Major
    # It's different when scraping vs in browser, js disabled issue
    #name_tag = soup.find(attrs ={id : "acalog-page-title"})
    name_tag = soup.find(id = "acalog-content")

    if name_tag:
        name_major = name_tag.get_text().strip()
    else:
        name_major = None

    # Extract the text within the <div> with class "program_description"
    program_description_tag = soup.find('div', class_='program_description')
    if program_description_tag:
        program_description = program_description_tag.get_text().strip()
    else:
        program_description = None


    # Initialize a list to store extracted contents
    contents = []
    index = 0
    cur_catid = "XXX"
    cur_coid = "XXX"
    # Loop through each acalog-core div
    for div in acalog_divs_with_ul:
        h_elements = div.find_all(['h2', 'h3', 'h4', 'h5'])  # Find all applicable header elements within the current div

        for h in h_elements:
            # Extract the name and id
            name = h.text.strip()  # Extract text content of header
            id_ = h.find_next('a', {'id': True})['id'] if h.find_next('a', {'id': True}) else None  # Extract id if exists
            
            # Find the first <p> element after the current header
            p_element = h.find_next_sibling('p')
            description = p_element.get_text(strip=True) if p_element else None
            
            # Extract the text contents of each <li> element in the <ul> at depth 1
            li_contents = []
            for li in div.ul.find_all('li'):
                a_element = li.a
                if a_element:
                    onclick_str = a_element.get('onclick', '')
                    href_str = a_element.get('href', '')
                    
                    # Check if onclick attribute contains showCourse or showCatalogData
                    if 'showCourse' in onclick_str:
                        catid, coid = extract_params_from_onclick(onclick_str)
                        if catid and coid:
                            # Send GET request and store the result
                            result = await send_and_store_request(catid, coid)  # Use await here
                            li_contents.append({'name': a_element.text.strip(),'name_short': li.get_text().split(' - ')[0].strip(), 'catid': catid, 'coid': coid, 'details': result})
                            cur_catid = catid
                            cur_coid = coid
                            index+=1
                    elif 'showCatalogData' in onclick_str:
                        match = re.search(r"showCatalogData\('(\d+)',.*?'(\d+)'", onclick_str)
                        if match:
                            catid = match.group(1)
                            coid = match.group(2)
                            # Send GET request and store the result
                            result = await send_and_store_request(catid, coid)  # Use await here
                            li_contents.append({'name': a_element.text.strip(),'name_short': li.get_text().split(' - ')[0].strip(), 'catid': catid, 'coid': coid, 'details': result})
                            cur_catid = catid
                            cur_coid = coid
                            index+=1
                    elif href_str.startswith('#'):
                        catid, coid = href_str.split("'")[1], href_str.split("'")[3]
                        # Send GET request and store the result
                        result = await send_and_store_request(catid, coid)  # Use await here
                        li_contents.append({'name': a_element.text.strip(),'name_short': li.get_text().split(' - ')[0].strip(), 'catid': catid, 'coid': coid, 'details': result})
                        cur_catid = catid
                        cur_coid = coid
                        index+=1
                    print(f"Courses Scraped: {index + 1}  Current Catalog ID: {cur_catid} Current Course ID: {cur_coid}", end="\r",flush=True)
            
            # Store the extracted data in a dictionary
            data = {
                'name': name,
                'id': id_,
                'description': description,
                'courses': li_contents
            }
            
            # Append the dictionary to the list
            contents.append(data)
            
            # Print scraping progress
            print(f"Courses Scraped: {index + 1}  Current Catalog ID: {cur_catid} Current Course ID: {cur_coid}", end="\r",flush=True)


    # Output the extracted content as JSON
    output_data = {'program_name': name_major, 'program_description': program_description, 'groups': contents}

    # Write the JSON data to a file
    with open('major.json', 'w') as f:
        json.dump(output_data, f, indent=4)

    print("\nScraping completed. Results saved to major.json.")

asyncio.run(main())