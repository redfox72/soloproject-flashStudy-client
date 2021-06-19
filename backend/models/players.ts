import { Model, Schema, model } from 'mongoose';

export interface PlayerData {
  userId: string;
  completed: boolean[];
}

const playerSchema = new Schema<PlayerData>({
  userId: {
    type: Schema.Types.ObjectId, ref: 'Users',
    required: true,
  },
  completed: [{
    type: Schema.Types.ObjectId, ref: 'Quizzes',
    required: true,
  }],
});

const Players: Model<PlayerData> = model('Players', playerSchema);

export default Players;