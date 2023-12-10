/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCodes,
  AcademicSemesterMonths,
  AcademicSemesterNames,
} from './academicSemester.constant';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

export const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterNames,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCodes,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: AcademicSemesterMonths,
      required: true,
    },
    endMonth: {
      type: String,
      enum: AcademicSemesterMonths,
      required: true,
    },
  },

  // this option is for tracking the createdAt and updatedAt fields
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this?.year,
    name: this?.name,
  });

  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester is already exists');
  }
  next();
});

academicSemesterSchema.pre('findOneAndUpdate', async function (next) {
  const update: any = { ...this.getUpdate() };

  // console.log({ update });
  const semester = await AcademicSemester.findOne({ _id: update?._id });
  let isSemesterExists;
  if (update?.year && update?.name) {
    isSemesterExists = await AcademicSemester.findOne({
      year: update?.year,
      name: update?.name,
    });
  } else if (update?.year && !update?.name) {
    isSemesterExists = await AcademicSemester.findOne({
      year: update?.year,
      name: semester?.name,
    });
  } else if (!update?.year && update?.name) {
    isSemesterExists = await AcademicSemester.findOne({
      year: semester?.year,
      name: update?.name,
    });
  }
  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Semester is already exists');
  }
  update._id = undefined;

  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
