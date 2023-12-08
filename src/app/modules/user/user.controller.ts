import { RequestHandler } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
// import userValidationSchemaByZod from './user.validation';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // -----------------------xxxxxxxxxxxxxxxxx-----------------------

  // // creating a schema validation using Zod

  // const parseData = userValidationSchemaByZod(userData);

  const result = await userServices.createStudentIntoDB(password, studentData);
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

export const userControllers = {
  createStudent,
};
