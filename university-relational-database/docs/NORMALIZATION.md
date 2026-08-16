# Normalization Analysis (up to 3NF)

## 1NF — First Normal Form

Each table contains atomic values:

- one student name per `students` row;
- one email value per student;
- one course title per course;
- one instructor per instructor record;
- one grade value per student/course enrollment.

There are no repeating groups or arrays stored inside a single column.

## 2NF — Second Normal Form

All non-key attributes depend on the whole primary key.

Examples:

- In `students`, `name`, `email`, and `age` depend on `student_id`.
- In `courses`, `title`, `credits`, and `instructor_id` depend on `course_id`.
- In `instructors`, `name` and `department` depend on `instructor_id`.
- `enrollments` uses the composite key `(student_id, course_id)`. The `grade`
  belongs to that exact student-course relationship, so it depends on the
  complete composite key.

There are no partial dependencies.

## 3NF — Third Normal Form

There are no unnecessary transitive dependencies.

For example, instructor information is not duplicated inside `courses`.
`courses` stores only `instructor_id`, while the instructor's `name` and
`department` remain in `instructors`.

Likewise, student and course descriptive information is not copied into
`enrollments`; the enrollment table stores only the foreign keys and the
relationship-specific attribute `grade`.

This reduces duplication and update anomalies.

## Relationship Summary

- One Instructor can teach many Courses.
- One Student can enroll in many Courses.
- One Course can contain many Students.
- The many-to-many Student/Course relationship is resolved through
  `enrollments`.

## Key Constraints

### Students

- `student_id`: primary key
- `email`: unique
- `name`: NOT NULL
- `age`: NOT NULL and must be greater than 17

### Instructors

- `instructor_id`: primary key
- `name`: NOT NULL
- `department`: NOT NULL

### Courses

- `course_id`: primary key
- `title`: unique and NOT NULL
- `credits`: constrained between 1 and 10
- `instructor_id`: foreign key

### Enrollments

- composite primary key: `(student_id, course_id)`
- both columns are also foreign keys
- `grade`: optional, but if supplied must be between 0 and 100

## Deletion Behavior

`enrollments` uses `ON DELETE CASCADE` for students and courses.

That means deleting a student or course automatically removes only the
relationship rows that reference it, preventing orphan enrollment records.

`courses.instructor_id` uses `ON DELETE RESTRICT`, preventing an instructor
from being deleted while courses still reference that instructor.
