import { CompanyModel } from '@modules/companies/infra/typeorm/schemas/Company';
import mongoose, { Schema } from 'mongoose';

export type ProductModel = mongoose.Document & {
  company: CompanyModel['_id'];
  name: string;
  created_at: Date;
  updated_at: Date;
};

const productSchema: Schema = new Schema({
  name: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model<ProductModel>('Product', productSchema);

export default Product;
