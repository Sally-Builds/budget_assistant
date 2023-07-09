"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const semester_1 = __importDefault(require("../enums/semester"));
const type_1 = __importDefault(require("../enums/type"));
const category_1 = __importDefault(require("../enums/category"));
const budgetSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'please enter budget name'],
        unique: true,
    },
    year: {
        type: Number,
        unique: true,
        required: [true, 'please enter budget year'],
    },
    session: {
        type: String,
        unique: true,
    },
    semester: {
        type: String,
        enum: [semester_1.default.first, semester_1.default.second],
        required: [true, 'please enter budget name'],
    },
    type: {
        type: String,
        enum: [type_1.default.expense, type_1.default.income],
        required: [true, 'please enter budget type'],
    },
    category: {
        type: String,
        enum: [category_1.default.academic, category_1.default.administrative],
        required: [true, 'please enter budget name'],
    },
    code: {
        type: String,
        unique: true,
        required: [true, 'please enter budget name'],
    },
});
exports.default = (0, mongoose_1.model)('Budget', budgetSchema);
