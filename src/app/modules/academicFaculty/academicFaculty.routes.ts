import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import { academicFacultyControllers } from './academicFaculty.controllers';
const router: Router = express.Router();
router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchemaByZod,
  ),
  academicFacultyControllers.createAcademicFaculty,
);
router.get('/', academicFacultyControllers.getAllAcademicFaculties);
router.get('/:_id', academicFacultyControllers.getSingleAcademicFacultyBy_id);

router.patch(
  '/:_id',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchemaByZod,
  ),
  academicFacultyControllers.updateSingleAcademicFacultyBy_id,
);

export const academicFacultyRoutes = router;
