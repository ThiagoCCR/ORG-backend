import Joi from "joi";

export const createFinanceLogSchema = Joi.object<FinanceLogSchema>({
  type: Joi.string().required(),
  logClass: Joi.string().required(),
  name: Joi.string().required()
});

export type FinanceLogSchema = {
  type: string,
  logClass: string,
  name: string
};

