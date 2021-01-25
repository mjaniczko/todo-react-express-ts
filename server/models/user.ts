import bcrypt from 'bcrypt';
import validator from 'validator';
import { model, Schema, Document } from 'mongoose';
import { User as UserType } from '../types/user';

const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 2,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (this: UserType & Document, el: any): boolean {
        return el === this.password;
      },
      message: 'Passwords are not the same.',
    },
  },
});

userSchema.pre<UserType & Document>('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

export const User = model<UserType & Document>('User', userSchema);
