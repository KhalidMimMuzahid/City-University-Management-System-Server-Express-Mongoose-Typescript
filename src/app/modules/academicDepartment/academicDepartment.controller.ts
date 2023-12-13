import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { academicDepartmentServices } from './academicDepartment.service';
import sendResponse from '../../utils/sendResponse';
const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    //   send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is created successfully',
      data: result,
    });
  },
);
const getAllAcademicDepartments: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await academicDepartmentServices.getAllAcademicDepartmentsFromDB();

    //   send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic departments are retrieved successfully',
      data: result,
    });
  },
);
const getSingleAcademicDepartmentBy_id = catchAsync(async (req, res) => {
  const department_id = req?.params?.department_id;
  const result =
    await academicDepartmentServices.getSingleAcademicDepartmentFromDB(
      department_id,
    );

  //   send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic  Department is retrieved successfully',
    data: result,
  });
});

const updateSingleAcademicDepartmentBy_id: RequestHandler = catchAsync(
  async (req, res) => {
    const department_id = req?.params?.department_id;
    const result =
      await academicDepartmentServices.updateAcademicDepartmentIntoDB(
        department_id,
        req.body,
      );

    //   send response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is updated successfully',
      data: result,
    });
  },
);

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartmentBy_id,
  updateSingleAcademicDepartmentBy_id,
};
