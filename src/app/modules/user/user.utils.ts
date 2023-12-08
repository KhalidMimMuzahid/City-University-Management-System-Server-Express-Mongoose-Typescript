/* eslint-disable @typescript-eslint/no-explicit-any */
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudent = async () => {
  const lastStudent = await User.findOne(
    { role: 'student' },

    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .limit(1);
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

const generateStudentId = async (payload: TAcademicSemester) => {
  // year= 2023
  // semester code spring="01", summer="02", fall="03",
  //roll = "0001" or "0002"
  //create a user
  //first time 0000
  const currentId = (await findLastStudent()) || (0).toString();

  let inCrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  inCrementId = `${payload.year}${payload.code}${inCrementId}`;

  return inCrementId;
};

export const userUtils = { generateStudentId };
