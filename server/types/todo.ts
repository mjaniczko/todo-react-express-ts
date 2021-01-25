import { Document } from 'mongoose';

export interface Todo extends Document {
  name: string;
  description: string;
  status: boolean;
  user: string;
}
