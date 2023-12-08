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
router.get('/', academicSemesterControllers.getAllAcademicSemesters);
router.get(
  '/:semester_id',
  academicSemesterControllers.getSingleAcademicSemesterBy_id,
);

router.patch(
  '/:semester_id',
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidationSchemaByZod,
  ),
  academicSemesterControllers.updateSingleAcademicSemesterBy_id,
);

export const academicSemesterRoutes = router;
