import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { courseServices } from './course.service';
// import userValidationSchemaByZod from './user.validation';

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body);

  //   send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});
const getAllCourses: RequestHandler = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCourseFromDB(req?.query);

  //   send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieve successfully',
    data: result,
  });
});
const getSingleCourseBy_id: RequestHandler = catchAsync(async (req, res) => {
  const _id = req?.params?._id;
  const result = await courseServices.getSingleCourseFromDB(_id);

  //   send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieve successfully',
    data: result,
  });
});
const deleteCourseFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await courseServices.deleteCourseFromDB(_id);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course has deleted successfully',
    data: result,
  });
});

// const updateSingleAcademicSemesterBy_id: RequestHandler = catchAsync(
//   async (req, res) => {
//     const _id = req?.params?._id;
//     const result = await academicSemesterServices.updateAcademicSemesterIntoDB(
//       _id,
//       req.body,
//     );

//     //   send response
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Academic Semester is updated successfully',
//       data: result,
//     });
//   },
// );

export const courseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourseBy_id,
  deleteCourseFromDB,
  //   updateSingleAcademicSemesterBy_id,
};
