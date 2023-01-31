import Joi from "joi";

export const createHabitSchema = Joi.object<HabitParams>({
  name: Joi.string().required(),
  days: Joi.array().required(),
});

export type HabitParams = {
    name: string,
    days: Array<number>
};
