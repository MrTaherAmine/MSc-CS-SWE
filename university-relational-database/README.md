# University Relational Database — Design & Query

Submission for:

**Computer Systems and Their Fundamentals : Database Management systems**

## What this project contains

This checkpoint implements a normalized university information database with:

- Students
- Instructors
- Courses
- Enrollments
- primary keys
- foreign keys
- `NOT NULL`
- `UNIQUE`
- `CHECK`
- sample data
- SQL CRUD/query exercises
- normalization analysis up to 3NF
- ER diagram

## Project structure

```text
university-relational-database/
├── docs/
│   ├── NORMALIZATION.md
│   └── SCHEMA_DIAGRAM.md
├── sql/
│   ├── 01_schema.sql
│   ├── 02_sample_data.sql
│   ├── 03_queries.sql
│   └── 04_verification.sql
└── README.md
```

## Database design

### Students

```text
student_id
name
email
age
```

Rules:

- auto-generated primary key
- email is unique
- age must be greater than 17

### Instructors

```text
instructor_id
name
department
```

### Courses

```text
course_id
title
credits
instructor_id
```

Each course references one instructor.

### Enrollments

```text
student_id
course_id
grade
```

The table resolves the many-to-many relationship between students and courses.

Its primary key is:

```text
(student_id, course_id)
```

This prevents the same student from being enrolled twice in the same course.

## Normalization

The schema is normalized through 3NF.

See:

```text
docs/NORMALIZATION.md
```

for the explanation.

## ER diagram

See:

```text
docs/SCHEMA_DIAGRAM.md
```

The Mermaid diagram renders directly on GitHub.

## Sample data

The submission includes:

- 4 students
- 3 instructors
- 3 courses
- 4 enrollments

Four students are included instead of only three so the required query
"students not enrolled in any course" returns a meaningful result.

## Run with MySQL 8+

### 1. Create schema

```bash
mysql -u root -p < sql/01_schema.sql
```

### 2. Load sample data

```bash
mysql -u root -p < sql/02_sample_data.sql
```

### 3. Execute required queries

```bash
mysql -u root -p < sql/03_queries.sql
```

## Required queries implemented

### Students enrolled in “Database Systems”

Uses joins across:

```text
students
enrollments
courses
```

### Courses and instructor names

Uses:

```text
courses INNER JOIN instructors
```

### Students not enrolled in any course

Uses a `LEFT JOIN` and checks for missing enrollment records.

### Update a student's email

Uses:

```sql
UPDATE students
SET email = ...
WHERE student_id = ...;
```

### Delete a course by ID

Uses:

```sql
DELETE FROM courses
WHERE course_id = ...;
```

Related enrollment records are removed automatically because the enrollment
foreign key uses:

```text
ON DELETE CASCADE
```

## Author

Taher Amine ELHOUARI
