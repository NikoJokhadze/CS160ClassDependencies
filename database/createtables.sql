-- This is our main and most complex table, containing a huge amount of information for courses
create table Course (
    course_id varchar(99) not null, -- The letter/number identification of the course
    course_name varchar(999) not null, -- The full name of the course
    department varchar(99) not null, -- The department that the course belongs to
    course_description TEXT not null, -- A general description of the course
    units int not null, -- The total number of units the course satisfies
    grading_type varchar(99) not null, -- The type of grading (i.e. letter grade)
    grade_requirement varchar(2) not null, -- The minimum required grade to pass
    GE_area varchar(999) not null default "", -- Note if a course satisfies a certain general education requirement
    course_level varchar(99) not null, -- Note if a course is an undergrad, grad, or post-grad course
    course_mandate boolean not null, -- Note if a course is mandatory or not, based on either GE or major core class specifications
    course_notes TEXT not null default "", -- Note any additional notes for the course
    primary key (course_id)
);

-- This table acts as a list of prerequisites that a course would require
create table Prereq (
    course_id varchar(99) not null,
    prereq_id varchar(99) not null,
    grade_requirement varchar(2) not null,
    foreign key course_id references Course(course_id)
);

-- This table acts as a list of corequisites that a course would require
create table Coreq (
    course_id varchar(99) not null,
    coreq_id varchar(99) not null,
    grade_requirement varchar(2) not null,
    foreign key course_id references Course(course_id)
);

-- This is a special case table that lists if classes list other classes as both pre and coreqs
create table PreCoreq (
    course_id varchar(99) not null,
    precoreq_id varchar(99) not null,
    grade_requirement varchar(2) not null,
    foreign key course_id references Course(course_id)
);

-- This table lists out any cross-listing a course has with a different department
create table CrossListing (
    course_id varchar(99) not null,
    cross_listing varchar(99) not null,
    foreign key (course_id) references Course(course_id)
);

-- This table details some important information for university majors, including department and
-- how the major is divided into different sections that each have their own requirements
create table Major (
    department_name varchar(99) not null, -- The name of the department
    major_name varchar(99) not null, -- The name of the major
    group_name varchar(99),
    primary key (major_name),
    foreign key department_name references Course(department)
);

-- This table focuses in on each group of a major, detailing the minimum required number of units/classes needed
create table MajorGroup (
    group_name varchar (99) not null, -- Groups include subsections of a major, such as "Approved Science Electives (8 units)" or "Upper Division (27 units)"
    major_name varchar (99) not null,
    min_units int not null default 0, -- The number representing the minimum units needed to satisfy the group
    min_courses int  not null default 0, -- Represents the minimum number of courses needed to satisfy the group
    primary key (group_name),
    foreign key major_name references Major(major_name)
);

-- This table lists out courses that belongs to a particular major group
create table MajorGroupCourse (
    group_name varchar(99) not null,
    course_id varchar(99) not null,
    foreign key group_name references Major(group_name),
    foreign key course_id references Course(course_id)
);

-- The student table will only contain basic info for students, and will mainly focus on the
-- relationship between students and their selected classes
create table Student (
    student_id int not null,
    student_name varchar(99) not null default "",
    major_name varchar(99) not null,
    primary key (student_id),
    foreign key major_name references Major(major_name)
);

-- This table lists out all the courses a given student has taken. Most likely, an SQL query/command would be used
-- to derive from this list to calculate the remaining classes a student needs
create table CoursesTaken (
    student_id int not null,
    course_id int not null,
    foreign key student_id references Student(student_id),
    foreign key course_id references Course(course_id)
);