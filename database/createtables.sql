create database if not exists ClassDependenciesDatabase;
use ClassDependenciesDatabase;

-- This is our main and most complex table, containing a huge amount of information for courses
create table if not exists Course (
    course_id int not null, -- The number identification of the course
    catalogue_id int not null, -- The number identification of the catalogue a course belongs to
    course_name varchar(999) not null, -- The full name of the course
    course_name_short varchar(99) not null, -- The shortened name of a course
    department_name varchar(99) not null, -- The department that the course belongs to
    course_description TEXT not null, -- A general description of the course
    units int not null, -- The total number of units the course satisfies
    grading_type varchar(99) not null, -- The type of grading (i.e. letter grade)
    grade_requirement varchar(2) not null, -- The minimum required grade to pass
    prerequisites TEXT not null, -- This line, as well as the following 2 lines, are text descriptions
    corequisites TEXT not null,
    pre_co_requisites TEXT not null,
    misc_lab varchar(999) not null, -- Details if a course has lab hours included
    GE_area varchar(999) not null default "", -- Note if a course satisfies a certain general education requirement
    course_level varchar(99) not null, -- Note if a course is an undergrad, grad, or post-grad course
    course_notes TEXT, -- Note any additional notes for the course
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
create table if not exists CrossListing (
    course_id int not null,
    cross_listing varchar(99) not null,
    foreign key (course_id) references Course(course_id)
);

-- This table details some important information for university majors, including department and
-- how the major is divided into different sections that each have their own requirements
create table if not exists Major (
    department_name varchar(99) not null, -- The name of the department
    major_name varchar(99) not null, -- The name of the major
    primary key (major_name)
);

-- This table focuses in on each group of a major, detailing the minimum required number of units/classes needed
create table if not exists MajorGroup (
    group_name varchar (99) not null, -- Groups include subsections of a major, such as "Approved Science Electives (8 units)" or "Upper Division (27 units)"
    major_name varchar (99) not null,
    min_units int not null default 0, -- The number representing the minimum units needed to satisfy the group
    min_courses int  not null default 0, -- Represents the minimum number of courses needed to satisfy the group
    primary key (group_name),
    foreign key (major_name) references Major(major_name)
);

-- This table lists out courses that belongs to a particular major group
create table if not exists MajorGroupCourse (
    group_name varchar(99) not null,
    course_id int not null,
    course_mandate boolean not null, -- Note if a course is mandatory or not, based on either GE or major core class specifications
    foreign key (group_name) references MajorGroup(group_name),
    foreign key (course_id) references Course(course_id)
);

-- The student table will only contain basic info for students, and will mainly focus on the
-- relationship between students and their selected classes
create table if not exists Student (
    student_id int not null,
    student_name varchar(99) not null default "",
    major_name varchar(99) not null,
    primary key (student_id),
    foreign key (major_name) references Major(major_name)
);

-- This table lists out all the courses a given student has taken. Most likely, an SQL query/command would be used
-- to derive from this list to calculate the remaining classes a student needs
create table if not exists CoursesTaken (
    student_id int not null,
    course_id int not null,
    foreign key (student_id) references Student(student_id),
    foreign key (course_id) references Course(course_id)
);