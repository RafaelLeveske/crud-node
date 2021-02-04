import { ProductModel } from '@modules/products/infra/typeorm/schemas/Product';
import { UserModel } from '@modules/users/infra/typeorm/schemas/User';
import mongoose, { Schema } from 'mongoose';

export type CompanyModel = mongoose.Document & {
  user: UserModel['_id'];
  products: ProductModel['_id'];
  name: string;
  cnpj: string;
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
