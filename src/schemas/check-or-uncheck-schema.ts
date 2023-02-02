import Joi from "joi";

export const checkOrUncheckSchema = Joi.object<HabitParams>({
  habitId: Joi.number().required(),
  dayId: Joi.number().required()
});

export type HabitParams = {
  habitId: number,
  dayId: number
};
