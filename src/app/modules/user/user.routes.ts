import express, { Router } from 'express';
import { userControllers } from './user.controller';

import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from '../Faculty/faculty.validation';
import { adminValidations } from '../Admin/admin.validation';
const router: Router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchemaByZod),
  userControllers.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(facultyValidations.createFacultyValidationSchema),
  userControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(adminValidations.createAdminValidationSchema),
  userControllers.createAdmin,
);
export const userRoutes = router;
