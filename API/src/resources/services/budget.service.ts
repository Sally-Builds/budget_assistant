import rand from 'randomstring';
import IBudget from '../interfaces/budget.interface';
import BudgetRepository from '../db_repository/budget.repository';
import HttpException from '@/utils/exceptions/httpExceptions';
import SemesterEnum from '../enums/semester';

export default class BudgetService {
  public create = async (
    name: string,
    amount: number,
    year: number,
    semester: string,
    type: string,
    category: string,
  ): Promise<IBudget> => {
    try {
      //check if name already exist in db
      if (await BudgetRepository.findOne({ name, year }))
        throw new HttpException('Budget already exist for this year', 400);
      const data: Partial<IBudget> = {
        name,
        amount,
        year,
        session: `${year}/${year + 1}`,
        semester,
        type,
        category,
        code: this.generateCode(year, semester),
      };
      const budget = await BudgetRepository.create(data);

      return budget;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };

  public getAll = async (query: any): Promise<IBudget[]> => {
    try {
      const budgets = await BudgetRepository.findAll(query);

      return budgets;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };

  public getAllNames = async (query: any): Promise<string[]> => {
    try {
      const budgets = (await BudgetRepository.findAll(query)).map((el: IBudget) => el.name);

      return budgets;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };

  public get = async (id: string): Promise<IBudget> => {
    try {
      const budget = await BudgetRepository.find(id);

      if (!budget) throw new HttpException('not found', 404);

      return budget;
    } catch (error: any) {
      throw new HttpException(error.message, error.statusCode);
    }
  };

  private generateCode = (year: number, semester: string): string => {
    const sem = semester == SemesterEnum.first ? '01' : '02';
    const code = rand.generate(6);
    return `${year}-${sem}-${code}`;
  };
}
