import * as coursesRepository from '../repositories/courses.repository.js';
import * as coursesService from '../services/courses.service.js';

export async function getCourses(req, res) {
  const courses = await coursesRepository.getAllCourses();
  res.status(200).json(courses);
}

export async function getCourse(req, res) {
  const course = await coursesService.getCourseWithStudents(req.params.id);
  if (!course) return res.status(404).json({ error: 'Course findes ikke' });
  res.status(200).json(course);
}

export async function createCourse(req, res) {
  const { name, teacher_id } = req.body;
  if (!name || !teacher_id) return res.status(400).json({ error: 'name og teacher_id skal med' });

  const course = await coursesRepository.createCourse(name, teacher_id);
  res.status(201).json(course);
}

// Kan kun ændre navnet
export async function updateCourse(req, res) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name skal med' });

  const course = await coursesRepository.updateCourseName(req.params.id, name);
  if (!course) return res.status(404).json({ error: 'Course findes ikke' });
  res.status(200).json(course);
}

export async function deleteCourse(req, res) {
  const deleted = await coursesRepository.deleteCourse(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Course findes ikke' });
  res.status(204).end();
}

export async function changeTeacher(req, res) {
  const { teacher_id } = req.body;
  if (!teacher_id) return res.status(400).json({ error: 'teacher_id skal med' });

  const updated = await coursesRepository.updateCourseTeacher(req.params.id, teacher_id);
  if (!updated) return res.status(404).json({ error: 'Course findes ikke' });

  const course = await coursesService.getCourseWithStudents(req.params.id);
  res.status(200).json(course);
}

export async function addStudent(req, res) {
  const { student_id } = req.body;
  if (!student_id) return res.status(400).json({ error: 'student_id skal med' });

  const existing = await coursesService.getCourseWithStudents(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Course findes ikke' });

  await coursesRepository.addStudentToCourse(req.params.id, student_id);

  const course = await coursesService.getCourseWithStudents(req.params.id);
  res.status(201).json(course);
}

export async function removeStudent(req, res) {
  const removed = await coursesRepository.removeStudentFromCourse(req.params.id, req.params.studentId);
  if (!removed) return res.status(404).json({ error: 'Student er ikke på dette course' });
  res.status(204).end();
}
