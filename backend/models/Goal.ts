import mongoose, { Schema } from 'mongoose';
import IGoal from '../interfaces/Goal';

const GoalSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    text: { type: String, required: [true, 'Please add a text'] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IGoal>('Goal', GoalSchema);
