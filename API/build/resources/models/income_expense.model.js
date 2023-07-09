"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const expense_incomeSchema = new mongoose_1.Schema({
    code: {
        type: String,
        required: [true, 'Please enter the code for this expense or income simulation'],
    },
    amount: {
        type: String,
        required: [true, 'Please enter the'],
    },
});
exports.default = (0, mongoose_1.model)('Expense_Income', expense_incomeSchema);
