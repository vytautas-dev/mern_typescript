import { Document } from 'mongoose';

export default interface IGoal extends Document {
  user: string;
  text: string;
}
