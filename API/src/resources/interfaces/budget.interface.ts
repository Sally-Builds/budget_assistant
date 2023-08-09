import { Document } from 'mongoose';
export default interface IBudget extends Document {
  name: string;
  amount: number;
  year: number;
  session: string;
  semester: string;
  code: string;
  type: string;
  category: string;
}
