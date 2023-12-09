import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  //semester name --> semester code

  const result = await AcademicFaculty.create(payload);
  return result;
};
const getAllAcademicFacultiesFromDB = async () => {
  const result = await AcademicFaculty.find({});
  return result;
};
const getSingleAcademicFacultyFromDB = async (semester_id: string) => {
  const result = await AcademicFaculty.findOne({ _id: semester_id });
  return result;
};

const updateAcademicFacultyIntoDB = async (
  faculty_id: string,
  payload: TAcademicFaculty,
) => {
  //semester name --> semester code

  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: faculty_id },
    payload,
    {
      new: true,
    },
  );

  return result;
};
export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
};
