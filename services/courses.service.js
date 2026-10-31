import * as coursesRepository from '../repositories/courses.repository.js';

// Et course med sine students: kræver data fra to forespørgsler, så det samles her
export async function getCourseWithStudents(id) {
  const course = await coursesRepository.getCourseById(id);
  if (!course) return null;

  const students = await coursesRepository.getStudentsInCourse(id);
  return { ...course, students };
}
