import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.model<ITask>('Task', taskSchema);
