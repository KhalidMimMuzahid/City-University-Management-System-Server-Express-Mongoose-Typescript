import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { Course, CourseFaculty } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

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
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // step 1: update basic course info
    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
      _id,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      },
    );

    if (!updatedBasicCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course');
    }
    // step 2: check if is there any preRequisiteCourse to update
    if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
      // filter out the deleted fields
      const deletedPreRequisites = preRequisiteCourses
        ?.filter((element) => element?.course && element?.isDeleted)
        .map((element) => element?.course);

      const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
        _id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisites } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );
      // filter out the new course fields
      const newPreRequisites = preRequisiteCourses.filter(
        (element) => element?.course && !element?.isDeleted,
      );
      if (!deletedPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course');
      }
      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        _id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course');
      }
    }

    await session.commitTransaction();
    await session.endSession();
    // finally send response after successfully updated course data
    const result = await Course.findById(_id).populate(
      'preRequisiteCourses.course',
    );

    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'failed to update course');
  }
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

const assignFacultiesToCourseInToDB = async (
  course_id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    course_id,
    {
      course: course_id,
      $addToSet: {
        faculties: { $each: payload },
      },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const removeFacultiesFromCourseFromToDB = async (
  course_id: string,
  payload: Partial<TCourseFaculty>,
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    course_id,
    {
      $pull: {
        faculties: { $in: payload },
      },
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
  assignFacultiesToCourseInToDB,
  removeFacultiesFromCourseFromToDB,
};


