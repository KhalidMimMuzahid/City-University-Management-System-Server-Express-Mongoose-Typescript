import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};
  // if password is not provided then set the default password
  userData.password = password || (config.defaultPass as string);

  // set student role

  userData.role = 'student';

  //manually generated id
  userData.id = '2030100001';
  //create a user
  const newUser = await User.create(userData);

  // create a student
  if (newUser?._id) {
    //set id and _id
    studentData.id = newUser.id;
    studentData.user_id = newUser._id; //reference _id

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userServices = {
  createStudentIntoDB,
};
