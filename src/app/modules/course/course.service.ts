import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const CourseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fieldLimit();

  const result = await CourseQuery.modelQuery;

  return result;
};
const getSingleCourseFromDB = async (_id: string) => {
  const result = await Course.findById(_id);
  return result;
};

const deleteCourseFromDB = async (_id: string) => {
  const result = await Course.findByIdAndUpdate(
    _id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );
  return result;
};
export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  // updateFacultyIntoDB,
  deleteCourseFromDB,
};
