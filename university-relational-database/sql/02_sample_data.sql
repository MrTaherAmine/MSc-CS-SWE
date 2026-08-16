USE university_db;

-- 3 instructors
INSERT INTO instructors (name, department) VALUES
('Dr. Nadia Benali', 'Computer Science'),
('Dr. Karim Mansouri', 'Information Systems'),
('Dr. Sarah Haddad', 'Mathematics');

-- 4 students so one student can demonstrate the "not enrolled" query
INSERT INTO students (name, email, age) VALUES
('Amine Rahmani', 'amine.rahmani@example.edu', 20),
('Lina Bensaid', 'lina.bensaid@example.edu', 22),
('Yacine Khelifi', 'yacine.khelifi@example.edu', 19),
('Sara Meziane', 'sara.meziane@example.edu', 21);

-- 3 courses
INSERT INTO courses (title, credits, instructor_id) VALUES
('Database Systems', 4, 1),
('Software Engineering', 5, 2),
('Discrete Mathematics', 3, 3);

-- At least 4 enrollment records across different students/courses
INSERT INTO enrollments (student_id, course_id, grade) VALUES
(1, 1, 86.50),
(2, 1, 91.00),
(2, 2, 88.00),
(3, 3, 79.50);
