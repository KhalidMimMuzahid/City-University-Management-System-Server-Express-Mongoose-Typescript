import express from 'express';
import { facultyControllers } from './faculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidations } from './faculty.validation';

const router = express.Router();

router.get('/:_id', facultyControllers.getSingleFaculty);

router.patch(
  '/:_id',
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  facultyControllers.updateFaculty,
);

router.delete('/:_id', facultyControllers.deleteFaculty);

router.get('/', facultyControllers.getAllFaculties);

export const facultyRoutes = router;
