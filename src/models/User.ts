import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'student' | 'admin';
  profilePicture?: string;
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  college?: string;
  targetRole?: string;
  startDate: Date;
  enrolledAt: Date;
  currentDay: number;
  xp: number;
  streak: number;
  lastActiveDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    profilePicture: { type: String, default: '' },
    bio: { type: String, default: '', maxlength: 500 },
    githubUrl: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    college: { type: String, default: '' },
    targetRole: { type: String, default: '' },
    startDate: { type: Date, default: () => new Date() },
    enrolledAt: { type: Date, default: () => new Date() },
    currentDay: { type: Number, default: 1, min: 1, max: 60 },
    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
    lastActiveDate: { type: Date },
  },
  { timestamps: true }
);

UserSchema.virtual('progressPercent').get(function (this: IUser) {
  return Math.round(((this.currentDay - 1) / 60) * 100);
});

UserSchema.set('toJSON', { virtuals: true });

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
