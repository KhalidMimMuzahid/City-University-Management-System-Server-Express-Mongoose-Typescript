import express, { Router } from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from './student.validation';

const router: Router = express.Router();

// will call controller function

// router.post('/create-student', studentControllers.createStudent);
router.get('/', studentControllers.getAllStudents);
router.get('/:_id', studentControllers.getSingleSTudent);
router.delete('/:_id', studentControllers.deleteSingleSTudent);
router.patch(
  '/:_id',
  validateRequest(studentValidations.updateStudentValidationSchemaByZod),

  studentControllers.updateSingleSTudent,
);

export const studentRoutes = router;
