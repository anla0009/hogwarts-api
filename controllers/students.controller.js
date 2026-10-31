import * as studentsRepository from '../repositories/students.repository.js';

export async function getStudents(req, res) {
  const students = await studentsRepository.getAllStudents();
  res.status(200).json(students);
}

export async function getStudent(req, res) {
  const student = await studentsRepository.getStudentById(req.params.id);
  if (!student) return res.status(404).json({ error: 'Student findes ikke' });
  res.status(200).json(student);
}

export async function createStudent(req, res) {
  const { name, house_id } = req.body;
  if (!name || !house_id) return res.status(400).json({ error: 'name og house_id skal med' });

  const student = await studentsRepository.createStudent(name, house_id);
  res.status(201).json(student);
}

export async function updateStudent(req, res) {
  const { name, house_id } = req.body;
  if (!name || !house_id) return res.status(400).json({ error: 'name og house_id skal med' });

  const student = await studentsRepository.updateStudent(req.params.id, name, house_id);
  if (!student) return res.status(404).json({ error: 'Student findes ikke' });
  res.status(200).json(student);
}

export async function deleteStudent(req, res) {
  const deleted = await studentsRepository.deleteStudent(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Student findes ikke' });
  res.status(204).end();
}
