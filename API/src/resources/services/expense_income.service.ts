import Expense_IncomeRepository from '../db_repository/expense_income.repository';
import IExpense_Income from '../interfaces/expense_income.interface';
import HttpException from '@/utils/exceptions/httpExceptions';
import BudgetRepository from '../db_repository/budget.repository';

export default class Expense_IncomeService {
  public create = async (code: string, amount: number): Promise<IExpense_Income> => {
    try {
      if (!(await BudgetRepository.findOne({ code }))) throw new HttpException('wrong code', 400);

      if (await Expense_IncomeRepository.findOne({ code })) throw new HttpException('already created', 400);
      const data = await Expense_IncomeRepository.create({ code, amount });

      return data;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };
}
