import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IDSAProblemProgress {
  problemId: string;
  solved: boolean;
  solvedAt?: Date;
}

export interface IDayProgress extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  dayNumber: number;
  theoryCompleted: boolean;
  dsaProblems: IDSAProblemProgress[];
  interviewQuestionsReviewed: boolean;
  completedAt?: Date;
  xpEarned: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DSAProblemProgressSchema = new Schema<IDSAProblemProgress>(
  {
    problemId: { type: String, required: true },
    solved: { type: Boolean, default: false },
    solvedAt: { type: Date },
  },
  { _id: false }
);

const DayProgressSchema = new Schema<IDayProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dayNumber: { type: Number, required: true, min: 1, max: 60 },
    theoryCompleted: { type: Boolean, default: false },
    dsaProblems: { type: [DSAProblemProgressSchema], default: [] },
    interviewQuestionsReviewed: { type: Boolean, default: false },
    completedAt: { type: Date },
    xpEarned: { type: Number, default: 0 },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

DayProgressSchema.index({ userId: 1, dayNumber: 1 }, { unique: true });

const DayProgress: Model<IDayProgress> =
  mongoose.models.DayProgress ||
  mongoose.model<IDayProgress>('DayProgress', DayProgressSchema);

export default DayProgress;
