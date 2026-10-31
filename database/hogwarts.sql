-- Hogwarts Course Management System
-- Kør denne fil i et Query Tool (pgAdmin eller DataGrip) på en database, der hedder "hogwarts".
-- Den sletter tabellerne, hvis de findes, og opretter dem igen med eksempeldata.

DROP TABLE IF EXISTS course_students CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS students CASCADE;
DROP TABLE IF EXISTS teachers CASCADE;
DROP TABLE IF EXISTS houses CASCADE;

CREATE TABLE houses (
    id   integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name character varying(100) NOT NULL
);

CREATE TABLE teachers (
    id       integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name     character varying(100) NOT NULL,
    house_id integer NOT NULL REFERENCES houses(id)
);

CREATE TABLE students (
    id       integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name     character varying(100) NOT NULL,
    house_id integer NOT NULL REFERENCES houses(id)
);

CREATE TABLE courses (
    id         integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name       character varying(100) NOT NULL,
    teacher_id integer NOT NULL REFERENCES teachers(id)
);

-- Mange-til-mange: en student kan gå på flere courses, og et course har flere students
CREATE TABLE course_students (
    course_id  integer NOT NULL REFERENCES courses(id)  ON DELETE CASCADE,
    student_id integer NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    PRIMARY KEY (course_id, student_id)
);

-- Houses (id 1-4)
INSERT INTO houses (name) VALUES
    ('Gryffindor'),
    ('Slytherin'),
    ('Ravenclaw'),
    ('Hufflepuff');

-- Teachers (id 1-4)
INSERT INTO teachers (name, house_id) VALUES
    ('Minerva McGonagall', 1),
    ('Severus Snape', 2),
    ('Filius Flitwick', 3),
    ('Pomona Sprout', 4);

-- Students (id 1-6)
INSERT INTO students (name, house_id) VALUES
    ('Harry Potter', 1),
    ('Hermione Granger', 1),
    ('Ron Weasley', 1),
    ('Draco Malfoy', 2),
    ('Luna Lovegood', 3),
    ('Cedric Diggory', 4);

-- Courses (id 1-4)
INSERT INTO courses (name, teacher_id) VALUES
    ('Transfiguration', 1),
    ('Potions', 2),
    ('Charms', 3),
    ('Herbology', 4);

-- Hvem går på hvilke courses
INSERT INTO course_students (course_id, student_id) VALUES
    (1, 1), (1, 2), (1, 3),
    (2, 1), (2, 4),
    (3, 5),
    (4, 6);
