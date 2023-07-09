import { Schema, model } from 'mongoose';
import IBudget from '../interfaces/budget.interface';
import SemesterEnum from '../enums/semester';
import TypeEnum from '../enums/type';
import CategoryEnum from '../enums/category';

const budgetSchema = new Schema<IBudget>({
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
});

export default model('Budget', budgetSchema);
