-- This is our main and most complex table, containing a huge amount of information for courses
create table if not exists Course (
    course_id int not null,
    -- The number identification of the course
    catalogue_id int not null,
    -- The number identification of the catalogue a course belongs to
    course_name varchar(1024) not null,
    -- The full name of the course
    course_name_short varchar(128) not null,
    -- The shortened name of a course
    department_name varchar(128) not null,
    -- The department that the course belongs to
    course_description TEXT not null default (""),
    -- A general description of the course
    units varchar(32) not null default "3 units",
    -- The total number of units the course satisfies, can be an int or a range like 1-3
    grading_type varchar(128) not null default "letter graded",
    -- The type of grading (i.e. letter grade)
    grade_requirement varchar(2) not null default 'C-',
    -- The minimum required grade to pass
    prerequisites TEXT not null default (""),
    -- This line, as well as the following 2 lines, are text descriptions
    corequisites TEXT not null default (""),
    pre_co_requisites TEXT not null default (""),
    misc_lab TEXT not null default (""),
    -- Details if a course has lab hours included
    GE_area varchar(256) not null default "",
    -- Note if a course satisfies a certain general education requirement
    course_level varchar(32) not null default "Lower",
    -- Note Lower, Upper, or Graduate division
    course_notes TEXT not null default (""),
    -- Note any additional notes for the course
    primary key (course_id)
);

-- This table acts as a list of prerequisites that a course would require
create table if not exists Prereq (
    course_id int not null,
    prereq_id int not null,
    grade_requirement varchar(2) not null default 'C-',
    foreign key (course_id) references Course(course_id),
    foreign key (prereq_id) references Course(course_id),
    unique (course_id, prereq_id)
);

-- This table acts as a list of corequisites that a course would require
create table if not exists Coreq (
    course_id int not null,
    coreq_id int not null,
    grade_requirement varchar(2) not null default 'C-',
    foreign key (course_id) references Course(course_id),
    foreign key (coreq_id) references Course(course_id),
    unique (course_id, coreq_id)
);

-- This is a special case table that lists if classes list other classes as both pre and coreqs
create table if not exists PreCoreq (
    course_id int not null,
    precoreq_id int not null,
    grade_requirement varchar(2) not null default 'C-',
    foreign key (course_id) references Course(course_id),
    foreign key (precoreq_id) references Course(course_id),
    unique (course_id, precoreq_id)
);

-- This table lists out any cross-listing a course has with a different department
create table if not exists CrossList (
    course_id int not null,
    cross_id int not null,
    -- grade_requirement varchar(2) not null default 'C-',
    foreign key (course_id) references Course(course_id),
    foreign key (cross_id) references Course(course_id),
    unique (course_id, cross_id)
);

-- This table details some important information for university majors, including department and
-- how the major is divided into different sections that each have their own requirements
create table if not exists Program (
    -- department_name varchar(99) not null, -- The name of the department
    -- PROGRAM CAN BELONG TO MULTIPLE COURSES I.E. GENED THAT IS AT THE TOP OF EVERY MAJOR
    program_id INT NOT NULL,
    catalogue_id int not null,
    program_name varchar(128) not null,
    -- The name of the major
    program_description TEXT NOT NULL DEFAULT (""),
    primary key (program_id)
);

-- This table focuses in on each group of a major, detailing the minimum required number of units/classes needed
create table if not exists PGroup (
    group_name varchar(128) not null,
    -- Groups include subsections of a major, such as "Approved Science Electives (8 units)" or "Upper Division (27 units)"
    group_description TEXT not null default (""),
    group_id INT NOT NULL,
    min_units INT not null default 0,
    -- The number representing the minimum units needed to satisfy the group
    min_courses INT not null default 0,
    -- Represents the minimum number of courses needed to satisfy the group
    primary key (group_id)
);

-- This table lists out courses that belongs to a particular major group
create table if not exists GroupCourses (
    group_id INT NOT NULL,
    course_id int not null,
    course_mandate boolean not null default 0,
    -- Note if a course is mandatory or not, based on either GE or major core class specifications
    foreign key (group_id) references PGroup(group_id),
    foreign key (course_id) references Course(course_id)
);

create table if not exists ProgramGroups (
    program_id INT NOT NULL,
    group_id INT NOT NULL,
    foreign key (group_id) references PGroup(group_id),
    foreign key (program_id) references Program(program_id),
    UNIQUE (program_id, group_id)
);

-- The student table will only contain basic info for students, and will mainly focus on the
-- relationship between students and their selected classes
create table if not exists Student (
    student_id int not null,
    student_name varchar(128) not null default "",
    program_id int not null,
    primary key (student_id),
    foreign key (program_id) references Program(program_id)
);

-- This table lists out all the courses a given student has taken. Most likely, an SQL query/command would be used
-- to derive from this list to calculate the remaining classes a student needs
create table if not exists CoursesTaken (
    student_id int not null,
    course_id int not null,
    foreign key (student_id) references Student(student_id),
    foreign key (course_id) references Course(course_id)
);
