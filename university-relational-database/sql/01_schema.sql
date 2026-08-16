-- University Relational Database
-- Target DBMS: MySQL 8+

CREATE DATABASE IF NOT EXISTS university_db;
USE university_db;

-- Drop child tables first so this script can be rerun safely.
DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS instructors;

CREATE TABLE students (
    student_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(190) NOT NULL,
    age TINYINT UNSIGNED NOT NULL,

    CONSTRAINT pk_students PRIMARY KEY (student_id),
    CONSTRAINT uq_students_email UNIQUE (email),
    CONSTRAINT chk_students_age CHECK (age > 17)
);

CREATE TABLE instructors (
    instructor_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    department VARCHAR(120) NOT NULL,

    CONSTRAINT pk_instructors PRIMARY KEY (instructor_id)
);

CREATE TABLE courses (
    course_id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(160) NOT NULL,
    credits TINYINT UNSIGNED NOT NULL,
    instructor_id INT UNSIGNED NOT NULL,

    CONSTRAINT pk_courses PRIMARY KEY (course_id),
    CONSTRAINT uq_courses_title UNIQUE (title),
    CONSTRAINT chk_courses_credits CHECK (credits BETWEEN 1 AND 10),

    CONSTRAINT fk_courses_instructor
        FOREIGN KEY (instructor_id)
        REFERENCES instructors(instructor_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TABLE enrollments (
    student_id INT UNSIGNED NOT NULL,
    course_id INT UNSIGNED NOT NULL,
    grade DECIMAL(5,2) NULL,

    CONSTRAINT pk_enrollments
        PRIMARY KEY (student_id, course_id),

    CONSTRAINT chk_enrollments_grade
        CHECK (grade IS NULL OR (grade >= 0 AND grade <= 100)),

    CONSTRAINT fk_enrollments_student
        FOREIGN KEY (student_id)
        REFERENCES students(student_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,

    CONSTRAINT fk_enrollments_course
        FOREIGN KEY (course_id)
        REFERENCES courses(course_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
