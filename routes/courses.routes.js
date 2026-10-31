import { Router } from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  changeTeacher,
  addStudent,
  removeStudent,
} from '../controllers/courses.controller.js';

const router = Router();

router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

router.put('/:id/teacher', changeTeacher);
router.post('/:id/students', addStudent);
router.delete('/:id/students/:studentId', removeStudent);

export default router;
