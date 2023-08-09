import Joi from 'joi';
import TypeEnum from '../enums/type';
import SemesterEnum from '../enums/semester';
import CategoryEnum from '../enums/category';

const create = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  year: Joi.number().required(),
  semester: Joi.string().required().valid(SemesterEnum.first, SemesterEnum.second),
  type: Joi.string().required().valid(TypeEnum.expense, TypeEnum.income),
  category: Joi.string().required().valid(CategoryEnum.academic, CategoryEnum.administrative),
});

export default { create };
