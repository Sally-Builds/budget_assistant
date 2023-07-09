import { Request, Response, NextFunction } from 'express-serve-static-core';
import BudgetService from '../services/budget.service';
import HttpException from '@/utils/exceptions/httpExceptions';

export class BudgetController {
  private _service;

  constructor(service: BudgetService) {
    this._service = service;
  }

  public createBudget = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const { name, amount, year, semester, type, category } = req.body;
      const budget = await this._service.create(name, amount, year, semester, type, category);

      res.status(200).json(budget);
    } catch (error: any) {
      next(new HttpException(error.message, error.statusCode));
    }
  };

  public getBudget = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const budget = await this._service.get(req.params.id);

      res.status(200).json(budget);
    } catch (error: any) {
      next(new HttpException(error.message, error.statusCode));
    }
  };

  public getAllBudget = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    try {
      const budgets = await this._service.getAll(req.query);

      res.status(200).json({ result: budgets.length, budgets });
    } catch (error: any) {
      next(new HttpException(error.message, error.statusCode));
    }
  };
}

export default new BudgetController(new BudgetService());
