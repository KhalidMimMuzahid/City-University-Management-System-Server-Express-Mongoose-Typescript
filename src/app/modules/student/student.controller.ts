/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { StudentService } from './student.service';

const getSingleSTudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentService.getSingleStudentFromDB(studentId);

    res.status(200).json({
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
    const results = await StudentService.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'students were retrieved successfully',
      data: results,
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

    res.status(200).json({
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
