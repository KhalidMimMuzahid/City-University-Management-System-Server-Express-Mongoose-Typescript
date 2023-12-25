import express, { Router } from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../utils/validateRequest';
import { studentValidations } from './student.validation';

const router: Router = express.Router();

// will call controller function

// router.post('/create-student', studentControllers.createStudent);
router.get('/', studentControllers.getAllStudents);
router.get('/:studentId', studentControllers.getSingleSTudent);
router.delete('/:studentId', studentControllers.deleteSingleSTudent);
router.patch(
  '/:studentId',
  validateRequest(studentValidations.updateStudentValidationSchemaByZod),

  studentControllers.updateSingleSTudent,
);

export const studentRoutes = router;
