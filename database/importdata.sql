LOAD DATA INFILE '/docker-entrypoint-initdb.d/fixed.csv'
    INTO TABLE Course
    FIELDS TERMINATED BY ',' 
    OPTIONALLY ENCLOSED BY '"' -- fields optionally enclosed by double quotes
    LINES TERMINATED BY '\n' 
    IGNORE 1 ROWS
    (course_id, 
    catalogue_id, 
    course_name, 
    course_name_short, 
    department_name, 
    course_description, 
    units, 
    grading_type, 
    grade_requirement, 
    prerequisites, 
    corequisites, 
    pre_co_requisites, 
    misc_lab, 
    GE_area, 
    course_level, 
    course_notes);
