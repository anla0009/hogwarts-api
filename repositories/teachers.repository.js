import pool from '../db.js';

const selectTeachers =
  'SELECT t.id, t.name, t.house_id, h.name AS house FROM teachers t JOIN houses h ON h.id = t.house_id';

export async function getAllTeachers() {
  const result = await pool.query(selectTeachers + ' ORDER BY t.id');
  return result.rows;
}

export async function getTeacherById(id) {
  const result = await pool.query(selectTeachers + ' WHERE t.id = $1', [id]);
  return result.rows[0];
}

export async function createTeacher(name, houseId) {
  const result = await pool.query(
    'INSERT INTO teachers (name, house_id) VALUES ($1, $2) RETURNING *',
    [name, houseId]
  );
  return result.rows[0];
}

export async function updateTeacher(id, name, houseId) {
  const result = await pool.query(
    'UPDATE teachers SET name = $1, house_id = $2 WHERE id = $3 RETURNING *',
    [name, houseId, id]
  );
  return result.rows[0];
}

// Returnerer true, hvis en række blev slettet
export async function deleteTeacher(id) {
  const result = await pool.query('DELETE FROM teachers WHERE id = $1', [id]);
  return result.rowCount > 0;
}
