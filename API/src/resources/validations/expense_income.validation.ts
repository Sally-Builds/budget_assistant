import Joi from 'joi';

const create = Joi.object({
  code: Joi.string().required(),
  amount: Joi.number().required(),
});

export default { create };
