import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import userRouter from './resources/routes/user.router';
import budgetRouter from './resources/routes/budget.router';
import expense_incomeRouter from './resources/routes/expense_income.router';

// controller imports below
validateEnv();

const app = new App(
  [
    {
      path: 'users',
      router: userRouter(),
    },
    {
      path: 'budget',
      router: budgetRouter(),
    },
    {
      path: 'simulate',
      router: expense_incomeRouter(),
    },
  ],
  Number(process.env.PORT),
);

app.listen();
