import income_expenseModel from '../models/income_expense.model';
import IExpense_Income from '../interfaces/expense_income.interface';
import HttpException from '@/utils/exceptions/httpExceptions';

export default class expense_incomeRepository {
  /**
   *
   * @param data expense_income payload
   * @returns newly created expense_income
   */
  static async create(data: IExpense_Income): Promise<IExpense_Income> {
    try {
      const expense_income = await income_expenseModel.create(data);

      return expense_income;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  /**
   *
   * @param query query / filter for expense_income
   * @returns queried/filtered expense_income[]
   */
  static async findAll(query: any): Promise<IExpense_Income[]> {
    try {
      const expense_income = await income_expenseModel.find(query);

      return expense_income;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  /**
   *
   * @param id id of expense_income to get
   * @returns requested expense_income
   */
  static async find(id: string): Promise<IExpense_Income | null> {
    try {
      const expense_income = await income_expenseModel.findById(id);

      return expense_income;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  /**
   *
   * @param id  id of expense_income to update
   * @param data update to commit to db
   * @returns newly updated expense_income data
   */
  static async update(id: string, data: IExpense_Income): Promise<IExpense_Income | null> {
    try {
      const expense_income = await income_expenseModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });

      return expense_income;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  /**
   *
   * @param id id of expense_income to delete
   */
  static async delete(id: string): Promise<void> {
    try {
      await income_expenseModel.findByIdAndDelete(id);
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }
}
