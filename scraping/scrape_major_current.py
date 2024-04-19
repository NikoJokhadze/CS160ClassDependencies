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


async def main():
    print("Starting Scraping")
    #sys.stdout.flush()

    # URL of the webpage to scrape
    catid_major = 13
    poid =  7663
    url = "https://catalog.sjsu.edu/preview_program.php?catoid=" + str(catid_major) + "&poid=" + str(poid)

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
                            li_contents.append({'name': a_element.text.strip(),'name_short': li.get_text().split(' - ')[0].strip(), 'catid': catid, 'coid': coid})
                            cur_catid = catid
                            cur_coid = coid
                            index+=1
                    elif 'showCatalogData' in onclick_str:
                        match = re.search(r"showCatalogData\('(\d+)',.*?'(\d+)',.*?'(\d+)", onclick_str)
                        if match:
                            catid = match.group(1)
                            coid = match.group(3)

                            li_contents.append({'name': a_element.text.strip(),'name_short': li.get_text().split(' - ')[0].strip(), 'catid': catid, 'coid': coid,})
                            
                            cur_catid = catid
                            cur_coid = coid
                            index+=1
                            
                    elif href_str.startswith('#'):
                        catid, coid = href_str.split("'")[1], href_str.split("'")[3]
                        li_contents.append({'name': a_element.text.strip(),'name_short': li.get_text().split(' - ')[0].strip(), 'catid': catid, 'coid': coid})
                        cur_catid = catid
                        cur_coid = coid
                        index+=1
                    print(f"Courses Scraped: {index + 1}  Current Catalog ID: {cur_catid} Current Course ID: {cur_coid}", end="\r",flush=True)

            # stuff like gen eds which are not major specific nor are they properly scraped
            ignored_groups = {114538,114539,117320,117321,117322,117324,117323,122067,122068,117321,117322,117324,122067,122068}
            
            pattern = r'\d+'
            numbers = re.findall(pattern, id_)
            id_number = int(numbers[0])
            
            if id_number in ignored_groups:
                print("poid:",poid,"contains ignored group:",id_number," ","\n\tIt has been skipped" )
            elif len(li_contents) == 0: 
                print("poid:",poid,"contains empty group:",id_number,"\n\tIt has been skipped" )
            else:   
                data = {
                    'name': name,
                    'group_id': id_number,
                    'description': description,
                    'courses': li_contents
                }
                # Append the dictionary to the list
                contents.append(data)
            
            # Print scraping progress
            #print(f"Current poid: {poid} Courses Scraped: {index + 1}  Current Catalog ID: {cur_catid} Current Course ID: {cur_coid}", end="\r",flush=True)
            print(f"Cur poid: {poid} Courses Scraped: {index + 1}  Current Catalog ID: {cur_catid} Current Course ID: {cur_coid}")

    output_list = []

    # Output the extracted content as JSON
    output_data = {'catid_major': catid_major ,'poid': poid, 'program_name': name_major, 'program_description': program_description, 'groups': contents}

    output_list.append(output_data)

    # Write the JSON data to a file
    with open('major.json', 'w') as f:
        json.dump(output_list, f, indent=4)

    print("\nScraping completed. Results saved to major.json.")

asyncio.run(main())