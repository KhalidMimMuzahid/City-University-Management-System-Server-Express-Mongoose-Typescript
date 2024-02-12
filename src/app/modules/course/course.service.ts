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
  const result = await Course.findById(_id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const updateCourseIntoDB = async (_id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;
  // step 1: update basic course info
  const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
    _id,
    courseRemainingData,
    {
      new: true,
      runValidators: true,
    },
  );
  // step 2: check if is there any preRequisiteCourse to update
  if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
    // filter out the deleted fields
    const deletedPreRequisites = preRequisiteCourses
      ?.filter((element) => element?.course && element?.isDeleted)
      .map((element) => element?.course);

    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(_id, {
      $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } },
    });
    // filter out the new course fields
    const newPreRequisites = preRequisiteCourses.filter(
      (element) => element?.course && !element?.isDeleted,
    );

    const newPreRequisiteCourses = await Course.findByIdAndUpdate(_id, {
      $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
    });
  }

  const result = await Course.findById(_id).populate(
    'preRequisiteCourses.course',
  );
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
  updateCourseIntoDB,
  deleteCourseFromDB,
};
