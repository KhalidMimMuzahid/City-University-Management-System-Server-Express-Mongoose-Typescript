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
  return lastStudent?.id ? lastStudent.id : undefined;
};

const generateStudentId = async (payload: TAcademicSemester) => {
  // year= 2023
  // semester code spring="01", summer="02", fall="03",
  //roll = "0001" or "0002"
  //create a user
  //first time 0000
  let currentId = (0).toString();

  const lastStudentId = await findLastStudent();
  //let lastStudentId = 2030 01 0001
  // console.log({ lastStudentId });
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01
  const lastStudentSemesterYear = lastStudentId?.substring(0, 4); //2030
  const currentStudentSemesterCode = payload?.code;
  const currentStudentSemesterYear = payload?.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentStudentSemesterCode &&
    lastStudentSemesterYear === currentStudentSemesterYear
  ) {
    currentId = lastStudentId?.substring(6);
  }

  let inCrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  inCrementId = `${payload?.year}${payload?.code}${inCrementId}`;

  return inCrementId;
};

export const userUtils = { generateStudentId };
