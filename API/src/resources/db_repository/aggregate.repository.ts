import expense_incomeModel from '../models/expense_income.model';
import HttpException from '@/utils/exceptions/httpExceptions';
import userModel from '../models/user.model';
import budgetModel from '../models/budget.model';

export default class AggregationRepository {
  static async get(): Promise<any> {
    try {
      // const data = expense_incomeModel.find({}).populate({ path: 'budget_id', model: 'Budget' });
      const agg = await budgetModel.aggregate([
        {
          $match: {
            year: 2021,
          },
        },
        {
          $lookup: {
            from: 'expense_incomes',
            localField: '_id',
            foreignField: 'budget_id',
            as: 'actual',
          },
        },
      ]);
      // console.log(agg);
      return agg;
    } catch (error: any) {
      console.log(error);
      throw new HttpException(error, 500);
    }
  }
}
