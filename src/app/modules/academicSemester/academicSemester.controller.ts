import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { academicSemesterServices } from './academicSemester.service';
// import userValidationSchemaByZod from './user.validation';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );

  //   send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is created successfully',
    data: result,
  });
});
const getAllAcademicSemesters: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getAllAcademicSemesterFromDB();

  //   send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semesters is retrieve successfully',
    data: result,
  });
});
const getSingleAcademicSemesterBy_id = catchAsync(async (req, res) => {
  const semester_id = req?.params?.semester_id;
  const result =
    await academicSemesterServices.getSingleAcademicSemesterFromDB(semester_id);

  //   send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester is retrieve successfully',
    data: result,
  });
});



const updateSingleAcademicSemesterBy_id: RequestHandler = catchAsync(
  async (req, res) => {
    const semester_id = req?.params?.semester_id;
    const result = await academicSemesterServices.updateAcademicSemesterIntoDB(
      semester_id,
      req.body,
    );

    //   send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester is updated successfully',
      data: result,
    });
  },
);

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemesters,
  getSingleAcademicSemesterBy_id,
  updateSingleAcademicSemesterBy_id,
};
