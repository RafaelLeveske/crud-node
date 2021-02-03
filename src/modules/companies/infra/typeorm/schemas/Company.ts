import { UserModel } from '@modules/users/infra/typeorm/schemas/User';
import mongoose, { Schema } from 'mongoose';

export type CompanyModel = mongoose.Document & {
  user: UserModel['_id'];
  name: string;
  cnpj: string;
  created_at: Date;
  updated_at: Date;
};

const companySchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
  },
  cnpj: {
    type: String,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.model<CompanyModel>('Company', companySchema);

export default Company;
