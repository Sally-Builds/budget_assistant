import { Router } from 'express';
import budgetController, { BudgetController } from '../controllers/budget.controller';
import validation from '@/middleware/validation.middleware';
import budgetValidation from '../validations/budget.validation';

class BudgetRouter {
  private _router = Router();
  private _controller;

  constructor(controller: BudgetController) {
    this._controller = controller;
    this._router
      .route('/')
      .post(validation(budgetValidation.create), this._controller.createBudget)
      .get(this._controller.getAllBudget);

    this._router.route('/:id').get(this._controller.getBudget);
  }

  public getRouter = () => {
    return this._router;
  };
}

export default new BudgetRouter(budgetController).getRouter;
