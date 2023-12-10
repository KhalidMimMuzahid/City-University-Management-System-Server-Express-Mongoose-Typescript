import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { userUtils } from './user.utils';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object

  const userData: Partial<TUser> = {};
  // if password is not provided then set the default password
  userData.password = password || (config.defaultPass as string);

  // set student role

  userData.role = 'student';

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester_id,
  );
  // creating the session
  const session = await mongoose.startSession();
  try {
    // starting the transaction
    session.startTransaction();
    //manually generated id
    userData.id = await userUtils.generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    // console.log({ userDataid: userData.id });
    // create a user (transaction-1 )
    const newUser = await User.create([userData], { session }); // when we will do transaction and rollback,,, for writing to database, the data must be placed inside of an array
    // newUser will be an array because of using transaction
    // create a student
    // console.log({ newUser });
    if (!newUser?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user');
    }

    //set id and _id
    payload.id = newUser[0]?.id;
    payload.user_id = newUser[0]?._id; //reference _id
    // create a user (transaction-2 )
    const newStudent = await Student.create([payload], { session });

    // console.log({ newStudent });
    if (!newStudent?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (error) {
    // console.log({ error });

    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const userServices = {
  createStudentIntoDB,
};
