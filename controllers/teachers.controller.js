import * as teachersRepository from '../repositories/teachers.repository.js';

export async function getTeachers(req, res) {
  const teachers = await teachersRepository.getAllTeachers();
  res.status(200).json(teachers);
}

export async function getTeacher(req, res) {
  const teacher = await teachersRepository.getTeacherById(req.params.id);
  if (!teacher) return res.status(404).json({ error: 'Teacher findes ikke' });
  res.status(200).json(teacher);
}

export async function createTeacher(req, res) {
  const { name, house_id } = req.body;
  if (!name || !house_id) return res.status(400).json({ error: 'name og house_id skal med' });

  const teacher = await teachersRepository.createTeacher(name, house_id);
  res.status(201).json(teacher);
}

export async function updateTeacher(req, res) {
  const { name, house_id } = req.body;
  if (!name || !house_id) return res.status(400).json({ error: 'name og house_id skal med' });

  const teacher = await teachersRepository.updateTeacher(req.params.id, name, house_id);
  if (!teacher) return res.status(404).json({ error: 'Teacher findes ikke' });
  res.status(200).json(teacher);
}

export async function deleteTeacher(req, res) {
  const deleted = await teachersRepository.deleteTeacher(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Teacher findes ikke' });
  res.status(204).end();
}
