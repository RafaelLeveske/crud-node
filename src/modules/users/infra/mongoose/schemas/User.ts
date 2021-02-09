import { CompanyModel } from '@modules/companies/infra/mongoose/schemas/Company';
import mongoose, { Schema } from 'mongoose';

export type UserModel = mongoose.Document & {
  name: string;
  email: string;
  password: string;
  company: CompanyModel['_id'];
  created_at: Date;
  updated_at: Date;
};

const userSchema: Schema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: 'basic',
    enum: ['basic', 'admin'],
  },
  companies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Company',
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<UserModel>('User', userSchema);

export default User;
