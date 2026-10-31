import pool from '../db.js';

const selectCourses =
  'SELECT c.id, c.name, c.teacher_id, t.name AS teacher FROM courses c JOIN teachers t ON t.id = c.teacher_id';

export async function getAllCourses() {
  const result = await pool.query(selectCourses + ' ORDER BY c.id');
  return result.rows;
}

export async function getCourseById(id) {
  const result = await pool.query(selectCourses + ' WHERE c.id = $1', [id]);
  return result.rows[0];
}

export async function getStudentsInCourse(courseId) {
  const result = await pool.query(
    `SELECT s.id, s.name
     FROM course_students cs
     JOIN students s ON s.id = cs.student_id
     WHERE cs.course_id = $1
     ORDER BY s.id`,
    [courseId]
  );
  return result.rows;
}

export async function createCourse(name, teacherId) {
  const result = await pool.query(
    'INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *',
    [name, teacherId]
  );
  return result.rows[0];
}

export async function updateCourseName(id, name) {
  const result = await pool.query(
    'UPDATE courses SET name = $1 WHERE id = $2 RETURNING *',
    [name, id]
  );
  return result.rows[0];
}

// Returnerer true, hvis kurset fandtes
export async function updateCourseTeacher(id, teacherId) {
  const result = await pool.query(
    'UPDATE courses SET teacher_id = $1 WHERE id = $2',
    [teacherId, id]
  );
  return result.rowCount > 0;
}

export async function deleteCourse(id) {
  const result = await pool.query('DELETE FROM courses WHERE id = $1', [id]);
  return result.rowCount > 0;
}

export async function addStudentToCourse(courseId, studentId) {
  await pool.query(
    'INSERT INTO course_students (course_id, student_id) VALUES ($1, $2)',
    [courseId, studentId]
  );
}

// Returnerer true, hvis studenten var på kurset
export async function removeStudentFromCourse(courseId, studentId) {
  const result = await pool.query(
    'DELETE FROM course_students WHERE course_id = $1 AND student_id = $2',
    [courseId, studentId]
  );
  return result.rowCount > 0;
}
