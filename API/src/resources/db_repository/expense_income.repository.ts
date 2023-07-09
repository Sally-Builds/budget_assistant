import expense_incomeModel from '../models/expense_income.model';
import IExpense_Income from '../interfaces/expense_income.interface';
import HttpException from '@/utils/exceptions/httpExceptions';

export default class Expense_IncomeRepository {
  /**
   *
   * @param data expense_income payload
   * @returns newly created expense_income
   */
  static async create(data: Partial<IExpense_Income>): Promise<IExpense_Income> {
    try {
      const expense_income = await expense_incomeModel.create(data);

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
      const expense_income = await expense_incomeModel.find(query);

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
      const expense_income = await expense_incomeModel.findById(id);

      return expense_income;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  static async findOne(query: any): Promise<IExpense_Income | null> {
    try {
      const expense_income = await expense_incomeModel.findOne(query);

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
      const expense_income = await expense_incomeModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });

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
      await expense_incomeModel.findByIdAndDelete(id);
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }
}
