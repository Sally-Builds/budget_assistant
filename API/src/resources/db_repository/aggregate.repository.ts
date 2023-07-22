// import budgetModel from '../models/budget.model';
import expense_incomeModel from '../models/expense_income.model';
import HttpException from '@/utils/exceptions/httpExceptions';

export default class AggregationRepository {
  static async get(): Promise<any> {
    try {
      const data = expense_incomeModel.find({}).populate({ path: 'budget_id', model: 'Budget' });
      console.log(data);
      return data;
    } catch (error: any) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }
}
