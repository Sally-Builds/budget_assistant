import { Document, ObjectId } from 'mongoose';
export default interface IExpense_Income extends Document {
  code: string;
  amount: number;
  budget_id: ObjectId;
}
