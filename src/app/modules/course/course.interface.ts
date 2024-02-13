import { ObjectId } from 'mongoose';
export type TPreRequisiteCourse = {
  course: ObjectId;
  isDeleted: boolean;
};
export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credit: number;
  preRequisiteCourses: TPreRequisiteCourse[];
  isDeleted?: boolean;
};

export type TCourseFaculty = {
  course: ObjectId;
  faculties: [ObjectId];
};
