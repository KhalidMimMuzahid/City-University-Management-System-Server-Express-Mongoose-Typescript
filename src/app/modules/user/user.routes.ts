import express, { Router } from 'express';
import { userControllers } from './user.controller';

import { studentValidations } from '../student/student.validation';
import validateRequest from '../../utils/validateRequest';
const router: Router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchemaByZod),
  userControllers.createStudent,
);

export const userRoutes = router;
