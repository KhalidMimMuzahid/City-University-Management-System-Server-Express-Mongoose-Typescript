import express, { Router } from 'express';
import validateRequest from '../../utils/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentControllers } from './academicDepartment.controller';
const router: Router = express.Router();
router.post(
  '/create-academic-department',
  // validateRequest(
  //   academicDepartmentValidation.createAcademicDepartmentValidationSchemaByZod,
  // ),
  academicDepartmentControllers.createAcademicDepartment,
);
router.get('/', academicDepartmentControllers.getAllAcademicDepartments);
router.get(
  '/:department_id',
  academicDepartmentControllers.getSingleAcademicDepartmentBy_id,
);

router.patch(
  '/:department_id',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchemaByZod,
  ),
  academicDepartmentControllers.updateSingleAcademicDepartmentBy_id,
);

export const academicDepartmentRoutes = router;
