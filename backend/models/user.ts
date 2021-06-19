import { Model, Schema, model } from 'mongoose';

export interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const userSchema = new Schema<UserData>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Users: Model<UserData> = model('Users', userSchema);

export default Users;