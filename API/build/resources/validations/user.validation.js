"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const create = joi_1.default.object({
    name: joi_1.default.string().required(),
    reg_no: joi_1.default.string().required(),
    department: joi_1.default.string().required(),
    gender: joi_1.default.string().required(),
    password: joi_1.default.string().required().min(8),
});
const login = joi_1.default.object({
    reg_no: joi_1.default.string().required(),
    password: joi_1.default.string().required().min(8),
});
exports.default = { create, login };
