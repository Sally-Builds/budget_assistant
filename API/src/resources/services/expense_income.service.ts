import Expense_IncomeRepository from '../db_repository/expense_income.repository';
import IExpense_Income from '../interfaces/expense_income.interface';
import HttpException from '@/utils/exceptions/httpExceptions';
import BudgetRepository from '../db_repository/budget.repository';

export default class Expense_IncomeService {
  public create = async (code: string, amount: number): Promise<IExpense_Income> => {
    try {
      const budget: any = await BudgetRepository.findOne({ code });
      if (!budget) throw new HttpException('wrong code', 400);

      const data = await Expense_IncomeRepository.create({ code, amount, budget_id: budget.id });

      return data;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };

  public getAll = async (): Promise<IExpense_Income[]> => {
    try {
      const data = await Expense_IncomeRepository.findAll({});
      return data;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };
}
