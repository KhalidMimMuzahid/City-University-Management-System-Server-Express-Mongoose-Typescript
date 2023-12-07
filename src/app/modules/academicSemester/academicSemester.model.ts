import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCodes,
  AcademicSemesterMonths,
  AcademicSemesterNames,
} from './academicSemester.constant';

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

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
