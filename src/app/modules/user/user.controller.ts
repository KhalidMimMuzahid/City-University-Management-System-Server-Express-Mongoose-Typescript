import { NextFunction, Request, Response } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../utuls/sendResponse';
import httpStatus from 'http-status';
// import userValidationSchemaByZod from './user.validation';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    // -----------------------xxxxxxxxxxxxxxxxx-----------------------

    // // creating a schema validation using Zod

    // const parseData = userValidationSchemaByZod(userData);

    const result = await userServices.createStudentIntoDB(
      password,
      studentData,
    );

    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const userControllers = {
  createStudent,
};
