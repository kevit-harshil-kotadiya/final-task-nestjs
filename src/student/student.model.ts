import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const studentSchema = new mongoose.Schema({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  studentId: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  currentSem: {
    type: Schema.Types.Number,
    required: true,
  },
  phoneNumber: {
    type: Schema.Types.Number,
    required: true,
  },
  department: {
    type: Schema.Types.String,
    required: true,
  },
  batch: {
    type: Schema.Types.Number,
    required: true,
  },
  authToken: {
    type: Schema.Types.String,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
  attendance: [Schema.Types.String],
  semAttendance: [
    {
      sem: {
        type: Schema.Types.Number,
      },
      attendance: {
        type: Schema.Types.String,
      },
    },
  ],
});
