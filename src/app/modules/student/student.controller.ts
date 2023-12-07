/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { StudentService } from './student.service';
import sendResponse from '../../utuls/sendResponse';
import httpStatus from 'http-status';

const getSingleSTudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentFromDB(studentId);

    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student was retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentService.getAllStudentsFromDB();

    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'students were retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleSTudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.deleteSingleStudentFromDB(studentId);

    // send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student has deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const studentControllers = {
  getAllStudents,
  getSingleSTudent,
  deleteSingleSTudent,
};
