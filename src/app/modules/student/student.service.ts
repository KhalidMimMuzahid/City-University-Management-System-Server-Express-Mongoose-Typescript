import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';

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
  const result = await Student.findOne({ id })
    .populate('admissionSemester_id')
    .populate({
      path: 'academicDepartment_id',
      populate: {
        path: 'academicFaculty_id',
      },
    });
  return result;
};


const updateSingleStudentInToDB = async (
  id: string,
  payload: Partial<TStudent>,
) => {
  const {
    name,
    guardian,
    localGuardian,
    emergencyContact,
    ...remainingStudentData
  } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (emergencyContact && Object.keys(emergencyContact).length) {
    for (const [key, value] of Object.entries(emergencyContact)) {
      modifiedUpdatedData[`emergencyContact.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  // console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteSingleStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      //so that, it returns a latest data
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      {
        isDeleted: true,
      },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const StudentService = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteSingleStudentFromDB,
  updateSingleStudentInToDB,
};
