import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};
const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find({});
  return result;
};
const getSingleAcademicDepartmentFromDB = async (department_id: string) => {
  const result = await AcademicDepartment.findOne({ _id: department_id });
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  department_id: string,
  payload: TAcademicDepartment,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: department_id },
    payload,
    {
      new: true,
    },
  );

  return result;
};
export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};
