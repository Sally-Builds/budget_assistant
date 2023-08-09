import budgetModel from '../models/budget.model';
import IBudget from '../interfaces/budget.interface';
import HttpException from '@/utils/exceptions/httpExceptions';

export default class BudgetRepository {
  /**
   *
   * @param data budget payload
   * @returns newly created budget
   */
  static async create(data: Partial<IBudget>): Promise<IBudget> {
    try {
      const budget = await budgetModel.create(data);

      return budget;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  /**
   *
   * @param query query / filter for budget
   * @returns queried/filtered budget[]
   */
  static async findAll(query: any): Promise<IBudget[]> {
    try {
      const budget = await budgetModel.find(query).populate('actual');

      return budget;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  /**
   *
   * @param id id of budget to get
   * @returns requested budget
   */
  static async find(id: string): Promise<IBudget | null> {
    try {
      const budget = await budgetModel.findById(id).populate('actual');

      return budget;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  static async findOne(query: any): Promise<IBudget | null> {
    try {
      const budget = await budgetModel.findOne(query);

      return budget;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  /**
   *
   * @param id  id of budget to update
   * @param data update to commit to db
   * @returns newly updated budget data
   */
  static async update(id: string, data: IBudget): Promise<IBudget | null> {
    try {
      const budget = await budgetModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });

      return budget;
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }

  /**
   *
   * @param id id of budget to delete
   */
  static async delete(id: string): Promise<void> {
    try {
      await budgetModel.findByIdAndDelete(id);
    } catch (error: any) {
      throw new HttpException(error, 500);
    }
  }
}
