import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const departmentSchema = new mongoose.Schema({
  year: {
    type: Schema.Types.Number,
    required: true,
  },
  branches: [
    {
      name: {
        type: Schema.Types.String,
        required: true,
      },
      totalStudentsIntake: {
        type: Schema.Types.Number,
        required: true,
      },
      totalStudents: {
        type: Schema.Types.Number,
      },
    },
  ],
});
