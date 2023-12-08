import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { userUtils } from './user.utils';

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

  //manually generated id
  userData.id = await userUtils.generateStudentId(
    admissionSemester as TAcademicSemester,
  );

  const newUser = await User.create(userData);

  // create a student
  if (newUser?._id) {
    //set id and _id
    payload.id = newUser.id;
    payload.user_id = newUser._id; //reference _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
