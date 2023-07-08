"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, 'You must have name'] },
    reg_no: { type: String },
    department: { type: String },
    gender: { type: String },
    password: { type: String, required: [true, 'password is required'] },
    role: {
        type: String,
        enum: ['admin', 'student'],
        default: 'student',
    },
});
exports.default = (0, mongoose_1.model)('User', userSchema);
