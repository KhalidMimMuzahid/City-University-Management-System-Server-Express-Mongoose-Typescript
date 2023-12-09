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


academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExists = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExists) {
    throw new Error('Department is already exists');
  }

  next();
});


export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
