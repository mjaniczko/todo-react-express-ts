import { ITodo } from '../types/todo';
import { model, Schema, Types } from 'mongoose';

const todoSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'Todo must belong to a user.'],
  },
});

export const Todo = model<ITodo>('Todo', todoSchema);
