import { Schema, model } from 'mongoose';
import IBudget from '../interfaces/budget.interface';
import SemesterEnum from '../enums/semester';
import TypeEnum from '../enums/type';
import CategoryEnum from '../enums/category';

const budgetSchema = new Schema<IBudget>(
  {
    name: {
      type: String,
      required: [true, 'please enter budget name'],
      unique: true,
    },
    amount: {
      type: Number,
      required: [true, 'Please enter the budget amount'],
    },
    year: {
      type: Number,
      required: [true, 'please enter budget year'],
    },
    session: {
      type: String,
    },
    semester: {
      type: String,
      enum: [SemesterEnum.first, SemesterEnum.second],
      required: [true, 'please enter budget name'],
    },
    type: {
      type: String,
      enum: [TypeEnum.expense, TypeEnum.income],
      required: [true, 'please enter budget type'],
    },
    category: {
      type: String,
      enum: [CategoryEnum.academic, CategoryEnum.administrative],
      required: [true, 'please enter budget name'],
    },
    code: {
      type: String,
      unique: true,
      required: [true, 'please enter budget name'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

budgetSchema.virtual('actual', {
  localField: '_id',
  foreignField: 'budget_id',
  ref: 'Expense_Income',
});

export default model('Budget', budgetSchema);
