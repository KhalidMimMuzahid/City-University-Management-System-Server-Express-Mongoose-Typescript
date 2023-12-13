import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';

export const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'faculty', 'student'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  // this option is for tracking the createdAt and updatedAt fields
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save the data');

  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // Here this keyword is referring the document
  //hashing password and save into DB
  user.password = await bcrypt.hash(user.password, Number(config.saltRound));
  next();
});

// post save middleware / hook : will work on create() or save() after saving
userSchema.post('save', function (doc, next) {
  // console.log('post hook: we have saved the data');

  //remove password field after saving user for sending response to the user
  doc.password = undefined;
  next();
});

export const User = model<TUser>('User', userSchema);
