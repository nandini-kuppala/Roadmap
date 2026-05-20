import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IResource extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  url: string;
  type: 'video' | 'article' | 'tool' | 'file';
  category: string;
  description?: string;
  addedBy: mongoose.Types.ObjectId;
  thumbnail?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ResourceSchema = new Schema<IResource>(
  {
    title: { type: String, required: true, trim: true },
    url: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['video', 'article', 'tool', 'file'],
      required: true,
    },
    category: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    thumbnail: { type: String, default: '' },
  },
  { timestamps: true }
);

ResourceSchema.index({ category: 1 });
ResourceSchema.index({ type: 1 });

const Resource: Model<IResource> =
  mongoose.models.Resource || mongoose.model<IResource>('Resource', ResourceSchema);

export default Resource;
