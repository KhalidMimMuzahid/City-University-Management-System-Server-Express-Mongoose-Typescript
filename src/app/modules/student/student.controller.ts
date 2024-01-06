/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import { StudentService } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getSingleSTudent = catchAsync(async (req, res) => {
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

const updateSingleSTudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const { student } = req.body;

  const result = await StudentService.updateSingleStudentInToDB(
    studentId,
    student,
  );

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student was updated successfully',
    data: result,
  });
});

const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
  const query: any = req?.query;
  const result = await StudentService.getAllStudentsFromDB(query);
  // console.log({ result });
  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'students were retrieved successfully',
    data: result,
  });
});

const deleteSingleSTudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.deleteSingleStudentFromDB(studentId);

  // send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student has deleted successfully',
    data: result,
  });
});
export const studentControllers = {
  getAllStudents,
  getSingleSTudent,
  deleteSingleSTudent,
  updateSingleSTudent,
};
