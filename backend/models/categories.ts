import { Model, Schema, model } from 'mongoose';

export interface CategoryData {
  title: string;
}

const categorySchema = new Schema<CategoryData>({
  title: {
    type: String,
    required: true,
  },
});

const Categories: Model<CategoryData> = model('Categories', categorySchema); 

export default Categories;