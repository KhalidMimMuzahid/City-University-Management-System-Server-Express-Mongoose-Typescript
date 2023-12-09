import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

export const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty_id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },

  // this option is for tracking the createdAt and updatedAt fields
  {
    timestamps: true,
  },
);

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
