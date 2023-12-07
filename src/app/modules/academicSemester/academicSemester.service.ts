import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //semester name --> semester code

  if (academicSemesterNameCodeMapper[payload?.name] !== payload?.code) {
    throw new Error('invalid semester Code');
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
export const academicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
};
