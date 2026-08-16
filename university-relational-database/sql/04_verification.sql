USE university_db;

-- Inspect all tables after setup.
SELECT * FROM students ORDER BY student_id;
SELECT * FROM instructors ORDER BY instructor_id;
SELECT * FROM courses ORDER BY course_id;
SELECT * FROM enrollments ORDER BY student_id, course_id;

-- Useful aggregate: number of enrolled students per course.
SELECT
    c.course_id,
    c.title,
    COUNT(e.student_id) AS enrolled_students
FROM courses AS c
LEFT JOIN enrollments AS e
    ON e.course_id = c.course_id
GROUP BY c.course_id, c.title
ORDER BY c.course_id;
