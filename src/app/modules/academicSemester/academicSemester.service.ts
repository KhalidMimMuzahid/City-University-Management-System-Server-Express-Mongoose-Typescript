import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //semester name --> semester code

  if (academicSemesterNameCodeMapper[payload?.name] !== payload?.code) {
    throw new AppError(httpStatus.NOT_FOUND, 'invalid semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find({});
  return result;
};
const getSingleAcademicSemesterFromDB = async (semester_id: string) => {
  const result = await AcademicSemester.findOne({ _id: semester_id });
  return result;
};

const updateAcademicSemesterIntoDB = async (
  semester_id: string,
  payload: TAcademicSemester,
) => {
  //semester name --> semester code
  const semester = await AcademicSemester.findOne({ _id: semester_id });
  if (!semester) {
    throw new AppError(httpStatus.NOT_FOUND, 'semester is not found');
  } else if (
    payload?.code &&
    payload?.name &&
    academicSemesterNameCodeMapper[payload?.name] !== payload?.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND, 'invalid semester Code');
  } else if (
    payload?.code &&
    !payload?.name &&
    academicSemesterNameCodeMapper[semester?.name] !== payload?.code
  ) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'semester Code is not match with the semester name',
    );
  } else if (
    payload?.name &&
    !payload?.code &&
    academicSemesterNameCodeMapper[payload?.name] !== semester?.code
  ) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'semester name is not match with the semester code',
    );
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: semester_id },
    { ...payload, _id: semester_id },
    {
      new: true,
    },
  );

  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB,
};
