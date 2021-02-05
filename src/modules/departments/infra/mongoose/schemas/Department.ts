import { ProductModel } from '@modules/products/infra/mongoose/schemas/Product';
import mongoose, { Schema } from 'mongoose';

export type DepartmentModel = mongoose.Document & {
  name: string;
  product: ProductModel['_id'];
  created_at: Date;
  updated_at: Date;
};

const departmentSchema: Schema = new Schema({
  name: {
    type: String,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
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

const Department = mongoose.model<DepartmentModel>(
  'Department',
  departmentSchema,
);

export default Department;
