LOAD DATA INFILE '/docker-entrypoint-initdb.d/fixed_courses.csv'
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

LOAD DATA INFILE '/docker-entrypoint-initdb.d/fixed_prereq.csv' IGNORE -- ignore duplicate keys
    INTO TABLE Prereq
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS
    (course_id, prereq_id);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/fixed_coreq.csv' IGNORE -- ignore duplicate keys
    INTO TABLE Coreq
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS
    (course_id, coreq_id);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/fixed_precoreq.csv' IGNORE -- ignore duplicate keys
    INTO TABLE PreCoreq
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS
    (course_id, precoreq_id);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/fixed_cross.csv' IGNORE -- ignore duplicate keys
    INTO TABLE CrossList
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS
    (course_id, cross_id);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/fixed_majors.csv' IGNORE -- ignore duplicate keys
    INTO TABLE Program
    FIELDS TERMINATED BY ','
    OPTIONALLY ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS
    (program_id, catalogue_id, program_name, program_description);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/fixed_groups.csv' IGNORE -- ignore duplicate keys
    INTO TABLE PGroup
    FIELDS TERMINATED BY ','
    OPTIONALLY ENCLOSED BY '"'
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS
    (group_name, group_description, group_id, min_units, min_courses);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/fixed_group_courses.csv' IGNORE -- ignore duplicate keys
    INTO TABLE GroupCourses
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS
    (group_id,course_id,course_mandate);

LOAD DATA INFILE '/docker-entrypoint-initdb.d/fixed_program_groups.csv' IGNORE -- ignore duplicate keys
    INTO TABLE ProgramGroups
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 ROWS
    (program_id,group_id);
