import express, { Router } from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../utils/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';

const router: Router = express.Router();
router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchemaByZod,
  ),
  academicSemesterControllers.createAcademicSemester,
);

export const academicSemesterRoutes = router;
