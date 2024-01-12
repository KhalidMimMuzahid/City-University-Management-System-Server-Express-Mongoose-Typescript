import express, { Router } from 'express';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
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
router.get('/:_id', academicSemesterControllers.getSingleAcademicSemesterBy_id);

router.patch(
  '/:_id',
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidationSchemaByZod,
  ),
  academicSemesterControllers.updateSingleAcademicSemesterBy_id,
);

export const academicSemesterRoutes = router;
