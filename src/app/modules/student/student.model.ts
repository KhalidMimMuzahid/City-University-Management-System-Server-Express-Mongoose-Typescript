import { Schema, model } from 'mongoose';

import {
  TEmergencyContact,
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  TUserName,
  StudentModel,
} from './student.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

// creating a schema

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
    maxLength: [20, 'first name can not be more than 20 characters'],
    trim: true,
    // we are using Joi/Zod; that's why we no need custoom validation here
    // validate: {
    //   validator: function (value: string) {
    //     const isFirstNameStrCapitalized =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    //     return value === isFirstNameStrCapitalized;
    //   },
    //   message: '{VALUE} must be capitalized',
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} must be alpha character',
    // },
  },
});
const guardianSchema = new Schema<TGuardian>({
  father: {
    type: {
      fatherName: { type: String, required: true, trim: true },
      fatherOccupation: { type: String, required: true, trim: true },
      fatherContactName: { type: String, required: true, trim: true },
    },
  },
  mother: {
    type: {
      motherName: { type: String, required: true, trim: true },
      motherOccupation: { type: String, required: true, trim: true },
      motherContactName: { type: String, required: true, trim: true },
    },
  },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const emergencyContactSchema = new Schema<TEmergencyContact>({
  relation: {
    type: String,
    enum: ['Father', 'Mother', 'Brother'],
    required: [true, 'relation is required'],
  },
  contactNo: { type: String, required: [true, 'contactNo is required'] },
});

// -----------------------xxxxxxxxxxxxxxxxx-----------------------
// for creating instance method, schema will take 3 parameters like this,
//  const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>

// -----------------------xxxxxxxxxxxxxxxxx-----------------------

// for creating static method, schema will take 2 parameters like this,
//  const studentSchema = new Schema<TStudent, StudentModel>

// -----------------------xxxxxxxxxxxxxxxxx-----------------------
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    user_id: {
      type: Schema.Types.ObjectId,
      required: [true, 'user_id is required'],
      unique: true,

      // here this field is referred to the User model
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: "gender field can only be 'Male', 'Female' or 'Other'",
      },
      required: [true, 'gender is required'],
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      // validate: {
      //   validator: (value: string) => validator.isEmail(value),
      //   message: '{VALUE} must be a valid email address',
      // },
    },
    contactNo: {
      type: String,
      required: [true, 'contact no is required'],
      unique: true,
    },
    emergencyContact: {
      type: emergencyContactSchema,
      required: [true, 'emergency contact is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        message: '{VALUE} is not a valid blood group}',
      },
      required: [true, 'blood group is required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'present Address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'permanent Address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'guardian is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'local guardian is required'],
    },
    profileImage: {
      type: String,
    },
    admissionSemester_id: {
      type: Schema.ObjectId,
      required: true,
      ref: 'AcademicSemester',
    },
    academicDepartment_id: {
      type: Schema.ObjectId,
      required: true,
      ref: 'AcademicDepartment',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  //options
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// -----------------------xxxxxxxxxxxxxxxxx-----------------------
// // creating a custom instance method
// studentSchema.methods.isUserExists = async(id:string)=>{
//   const existingUser= Student.findOne({ id})
//   return existingUser
// }
// -----------------------xxxxxxxxxxxxxxxxx-----------------------
// creating a custom static method
// studentSchema.static('isUserExists', async function isUserExists (id:string) {
//   const existingUser= Student.findOne({ id})
//   return existingUser
// });
// // Or,
studentSchema.statics.isUserExists = async (id: string) => {
  const existingUser = Student.findOne({ id });
  return existingUser;
};

// -------------######################################-------------// virtual  --> virtually add new field
studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// -------------######################################-------------// middlewares

// -------------**************************************------------- // Document middlewares
// pre save middleware/hook : will work on create() or save() before saving

// -------------**************************************------------- // Query middlewares
studentSchema.pre('find', function (next) {
  // console.log("This is this: ",this)
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  // console.log(this.pipeline())
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

studentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isStudentExists = await Student.isUserExists(query?.id);
  if (!isStudentExists) {
    throw new AppError(httpStatus.BAD_REQUEST, 'student not found');
  }

  next();
});




// -------------######################################-------------// creating a model
// creating a model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
