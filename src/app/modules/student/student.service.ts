import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // api will be like this
  // /api/v1/students?email=john4.do5e22@example.com&searchTerm=john&sort=-email&limit=5&page=1&fields=email,gender
  // ------------------------XXXXXXXXXXXXXXXX----------------------------

  // // {email: {$regex: query?.searchTerm, $option: "i"}}
  // // {"name.firstName": {$regex: query?.searchTerm, $options: "i"}}

  // const searchTerm = query?.searchTerm || '';
  // const studentSearchableFields = ['email', 'name.firstName'];

  // const searchQuery = Student.find({
  //   $or: studentSearchableFields.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });
  // //Filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

  // const queryObject = { ...query };

  // excludeFields?.forEach((each) => delete queryObject[each]);

  // const filterQuery = searchQuery
  //   .find(queryObject)
  //   .populate('admissionSemester_id')
  //   .populate({
  //     path: 'academicDepartment_id',
  //     populate: {
  //       path: 'academicFaculty_id',
  //     },
  //   });
  // sorting
  // const sort = (query?.sort as string) || '-createdAt';

  // const sortQuery = filterQuery.sort(sort);

  // const limit = Number(query?.limit) || 10;
  // const page = Number(query?.page) || 1;

  // const skip = (page - 1) * limit || 0;
  // const paginateQuery = sortQuery.skip(skip).limit(limit);

  // //field limiting
  // const fields = (query?.fields as string).split(',')?.join(' ') || '-__v';
  // // console.log({ fields });

  // const fieldQuery = await paginateQuery.select(fields);
  // return fieldQuery;

  const StudentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester_id')
      .populate({
        path: 'academicDepartment_id',
        populate: {
          path: 'academicFaculty_id',
        },
      }),
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fieldLimit();




  


  const result = await StudentQuery.modelQuery;

  return result;
};
// await Student.find().skip().sort().limit()
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
