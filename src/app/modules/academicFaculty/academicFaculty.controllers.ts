import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { academicFacultyServices } from './academicFaculty.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );
  //   send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty is created successfully',
    data: result,
  });
});
const getAllAcademicFaculties: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultiesFromDB();

  //   send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculties are retrieved successfully',
    data: result,
  });
});
const getSingleAcademicFacultyBy_id = catchAsync(async (req, res) => {
  const faculty_id = req?.params?.faculty_id;
  const result =
    await academicFacultyServices.getSingleAcademicFacultyFromDB(faculty_id);

  //   send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic  faculty is retrieved successfully',
    data: result,
  });
});

const updateSingleAcademicFacultyBy_id: RequestHandler = catchAsync(
  async (req, res) => {
    const faculty_id = req?.params?.faculty_id;
    const result = await academicFacultyServices.updateAcademicFacultyIntoDB(
      faculty_id,
      req.body,
    );

    //   send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic faculty is updated successfully',
      data: result,
    });
  },
);

export const academicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFacultyBy_id,
  updateSingleAcademicFacultyBy_id,
};
