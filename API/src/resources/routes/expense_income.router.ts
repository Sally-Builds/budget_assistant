import { Router } from 'express';
import expense_incomeController, { Expense_IncomeController } from '../controllers/expense_income.controller';
import validation from '@/middleware/validation.middleware';
import expense_incomeValidation from '../validations/expense_income.validation';

class Expense_IncomeRouter {
  private _router = Router();
  private _controller;

  constructor(controller: Expense_IncomeController) {
    this._controller = controller;
    this._router
      .route('/')
      .post(validation(expense_incomeValidation.create), this._controller.create)
      .get(this._controller.getAll);
  }

  public getRouter = () => {
    return this._router;
  };
}

export default new Expense_IncomeRouter(expense_incomeController).getRouter;
