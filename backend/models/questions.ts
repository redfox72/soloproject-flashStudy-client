import { Schema, Model, model } from 'mongoose';

export interface QuestionData {
    categoryId: string;
    question: string;
    position: number;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
}

const questionScema = new Schema<QuestionData>({
  categoryId: {
    type: Schema.Types.ObjectId, ref: 'Categories',
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  position: {
    type: Number,
    required: true,
  },
  option1: {
    type: String,
    required: true,
  },
  option2: {
    type: String,
    required: true,
  },
  option3: {
    type: String,
    required: true,
  },
  option4: {
    type: String,
    required: true,
  },
});

const Questions: Model<QuestionData> = model('Questions',questionScema);

export default Questions;