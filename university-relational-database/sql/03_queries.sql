USE university_db;

-- ============================================================
-- 1. Retrieve all students enrolled in "Database Systems"
-- ============================================================
SELECT
    s.student_id,
    s.name,
    s.email,
    s.age,
    e.grade
FROM students AS s
INNER JOIN enrollments AS e
    ON e.student_id = s.student_id
INNER JOIN courses AS c
    ON c.course_id = e.course_id
WHERE c.title = 'Database Systems'
ORDER BY s.name;


-- ============================================================
-- 2. List all courses with their instructors
-- ============================================================
SELECT
    c.course_id,
    c.title,
    c.credits,
    i.name AS instructor_name,
    i.department
FROM courses AS c
INNER JOIN instructors AS i
    ON i.instructor_id = c.instructor_id
ORDER BY c.title;


-- ============================================================
-- 3. Find students not enrolled in any course
-- ============================================================
SELECT
    s.student_id,
    s.name,
    s.email
FROM students AS s
LEFT JOIN enrollments AS e
    ON e.student_id = s.student_id
WHERE e.student_id IS NULL
ORDER BY s.name;


-- ============================================================
-- 4. Update a student's email address
-- Example: update student_id = 1
-- ============================================================
UPDATE students
SET email = 'amine.rahmani.updated@example.edu'
WHERE student_id = 1;

-- Verify update
SELECT student_id, name, email
FROM students
WHERE student_id = 1;


-- ============================================================
-- 5. Delete a course by its ID
-- Example: delete course_id = 3
--
-- enrollments.course_id uses ON DELETE CASCADE, so related
-- enrollment rows for the deleted course are removed automatically.
-- ============================================================
DELETE FROM courses
WHERE course_id = 3;

-- Verify deletion
SELECT *
FROM courses
ORDER BY course_id;
