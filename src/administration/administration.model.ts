import * as mongoose from "mongoose";
import {Schema} from "mongoose";

export const administrationSchema = new mongoose.Schema({
    // Administrator's name, required field
    administratorName: {
        type: Schema.Types.String,
        required: true,
    },
    // Profile of the administrator (e.g., 'admin', 'staff'), required field
    profile: {
        type: Schema.Types.String,
        required: true,
    },
    // Unique identifier for the administrator, required and must be unique
    administratorId: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    // Password for the administrator, required field
    password: {
        type: Schema.Types.String,
        required: true,
    },
    // Array of tokens associated with the administrator for authentication
    tokens: [
        {
            token: {
                type: String,
            },
        },
    ],
});