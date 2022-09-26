import mongoose, { Document, Schema } from 'mongoose';

export interface IGoal {
  name: string;
}

export interface IGoalModel extends IGoal, Document {}

const GoalSchema: Schema = new Schema(
  {
    text: { type: String, required: [true, 'Please add a text'] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IGoalModel>('Goal', GoalSchema);
