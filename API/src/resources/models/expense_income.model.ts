import { Schema, model } from 'mongoose';
import IExpense_Income from '../interfaces/expense_income.interface';

const expense_incomeSchema = new Schema<IExpense_Income>({
  code: {
    type: String,
    required: [true, 'Please enter the code for this expense or income simulation'],
  },
  amount: {
    type: Number,
    required: [true, 'Please enter the amount of income or expense'],
  },
});

export default model('Expense_Income', expense_incomeSchema);