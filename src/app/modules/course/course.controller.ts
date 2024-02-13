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
const assignFacultiesToCourse: RequestHandler = catchAsync(async (req, res) => {
  const { course_id } = req.params;

  const { faculties } = req.body;
  const result = await courseServices.assignFacultiesToCourseInToDB(
    course_id,
    faculties,
  );

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties are assigned successfully successfully',
    data: result,
  });
});
const removeFacultiesFromCourse: RequestHandler = catchAsync(
  async (req, res) => {
    const { course_id } = req.params;

    const { faculties } = req.body;
    const result = await courseServices.removeFacultiesFromCourseFromToDB(
      course_id,
      faculties,
    );

    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties are removed successfully successfully',
      data: result,
    });
  },
);
const updateSingleCourseBy_id: RequestHandler = catchAsync(async (req, res) => {
  const _id = req?.params?._id;
  const result = await courseServices.updateCourseIntoDB(_id, req.body);

  //   send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is updated successfully',
    data: result,
  });
});

export const courseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourseBy_id,
  deleteCourseFromDB,
  assignFacultiesToCourse,
  removeFacultiesFromCourse,
  updateSingleCourseBy_id,
};
