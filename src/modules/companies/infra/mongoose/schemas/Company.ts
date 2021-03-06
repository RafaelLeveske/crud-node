import { ProductModel } from '@modules/products/infra/mongoose/schemas/Product';
import { UserModel } from '@modules/users/infra/mongoose/schemas/User';
import mongoose, { Schema } from 'mongoose';

export type CompanyModel = mongoose.Document & {
  name: string;
  cnpj: string;
  user: UserModel['_id'];
  products: ProductModel['_id'];
  created_at: Date;
  updated_at: Date;
};

const companySchema: Schema = new Schema({
  name: {
    type: String,
  },
  cnpj: {
    type: String,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
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

const Company = mongoose.model<CompanyModel>('Company', companySchema);

export default Company;
