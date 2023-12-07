/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { StudentService } from './student.service';
import sendResponse from '../../utuls/sendResponse';
import httpStatus from 'http-status';

const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};

const getSingleSTudent = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const result = await StudentService.getSingleStudentFromDB(studentId);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student was retrieved successfully',
    data: result,
  });
});

const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await StudentService.getAllStudentsFromDB();

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'students were retrieved successfully',
    data: result,
  });
});

const deleteSingleSTudent: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { studentId } = req.params;
    const result = await StudentService.deleteSingleStudentFromDB(studentId);

    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student has deleted successfully',
      data: result,
    });
  },
);  
export const studentControllers = {
  getAllStudents,
  getSingleSTudent,
  deleteSingleSTudent,
};
