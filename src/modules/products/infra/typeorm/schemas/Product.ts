import mongoose, { Schema } from 'mongoose';

export type CompanyModel = mongoose.Document & {
  user: UserModel['_id'];
  name: string;
  cnpj: string;
  created_at: Date;
  updated_at: Date;
};
