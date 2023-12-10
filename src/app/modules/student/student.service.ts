import { Student } from './student.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester_id')
    .populate({
      path: 'academicDepartment_id',
      populate: {
        path: 'academicFaculty_id',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester_id')
    .populate({
      path: 'academicDepartment_id',
      populate: {
        path: 'academicFaculty_id',
      },
    });
  return result;
};
const deleteSingleStudentFromDB = async (id: string) => {
  const result = await Student.updateOne(
    { id },
    {
      isDeleted: true,
    },
  );
  return result;
};

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
};
