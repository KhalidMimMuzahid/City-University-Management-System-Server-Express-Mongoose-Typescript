import { RequestHandler } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
// import userValidationSchemaByZod from './user.validation';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await userServices.createStudentIntoDB(password, studentData);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

export const userControllers = {
  createStudent,
  createFaculty,
  createAdmin,
};
