import pool from '../db.js';

const selectStudents =
  'SELECT s.id, s.name, s.house_id, h.name AS house FROM students s JOIN houses h ON h.id = s.house_id';

export async function getAllStudents() {
  const result = await pool.query(selectStudents + ' ORDER BY s.id');
  return result.rows;
}

export async function getStudentById(id) {
  const result = await pool.query(selectStudents + ' WHERE s.id = $1', [id]);
  return result.rows[0];
}

export async function createStudent(name, houseId) {
  const result = await pool.query(
    'INSERT INTO students (name, house_id) VALUES ($1, $2) RETURNING *',
    [name, houseId]
  );
  return result.rows[0];
}

export async function updateStudent(id, name, houseId) {
  const result = await pool.query(
    'UPDATE students SET name = $1, house_id = $2 WHERE id = $3 RETURNING *',
    [name, houseId, id]
  );
  return result.rows[0];
}

// Returnerer true, hvis en række blev slettet
export async function deleteStudent(id) {
  const result = await pool.query('DELETE FROM students WHERE id = $1', [id]);
  return result.rowCount > 0;
}
