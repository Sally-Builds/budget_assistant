import { Request, Response, NextFunction } from 'express';
import Expense_IncomeService from '../services/expense_income.service';
import HttpException from '@/utils/exceptions/httpExceptions';

export class Expense_IncomeController {
  private _service;

  constructor(service: Expense_IncomeService) {
    this._service = service;
  }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { code, amount } = req.body;
      const data = await this._service.create(code, amount);

      res.status(200).json(data);
    } catch (error: any) {
      next(new HttpException(error.message, error.statusCode));
    }
  };
}

export default new Expense_IncomeController(new Expense_IncomeService());
