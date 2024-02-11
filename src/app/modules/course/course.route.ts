import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidation } from './course.validation';
import { courseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidation.createCourseValidationSchemaByZod),
  courseControllers.createCourse,
);
router.get('/', courseControllers.getAllCourses);
router.get('/:_id', courseControllers.getSingleCourseBy_id);
router.delete('/:_id', courseControllers.deleteCourseFromDB);

//   router.patch(
//     '/:_id',
//     validateRequest(
//       academicSemesterValidation.updateAcademicSemesterValidationSchemaByZod,
//     ),
//     academicSemesterControllers.updateSingleAcademicSemesterBy_id,
//   );
export const courseRoutes = router;
