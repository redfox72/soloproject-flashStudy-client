import { Schema, Model, model } from 'mongoose';

export interface QuizData {
  categoryId: string;
  name: string;
  points: number;
  completed: boolean;
}

const quizSchema = new Schema<QuizData>({
  categoryId: {
    type: Schema.Types.ObjectId, ref: 'Categories',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  questions: [{
    type: Schema.Types.ObjectId, ref: 'Questions',
    required: true,
  }],
});

const Quizzes: Model<QuizData> = model('Quizzes',quizSchema); 

export default Quizzes;