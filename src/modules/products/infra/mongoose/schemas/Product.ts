import { CompanyModel } from '@modules/companies/infra/mongoose/schemas/Company';
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
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
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

const Product = mongoose.model<ProductModel>('Product', productSchema);

export default Product;
