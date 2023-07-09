"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const type_1 = __importDefault(require("../enums/type"));
const category_1 = __importDefault(require("../enums/category"));
const create = joi_1.default.object({
    name: joi_1.default.string().required(),
    amount: joi_1.default.number().required(),
    year: joi_1.default.number().required(),
    semester: joi_1.default.string().required(),
    type: joi_1.default.string().required().valid(type_1.default.expense, type_1.default.income),
    category: joi_1.default.string().required().valid(category_1.default.academic, category_1.default.administrative),
});
exports.default = { create };
