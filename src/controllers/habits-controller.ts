import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { HabitParams } from "@/schemas/create-habit-schema";
import habitsService from "@/services/habits-service";

export async function postHabit(req: AuthenticatedRequest, res: Response) {
  const { name, days } = req.body as HabitParams;
  const { userId } = req;
  try {
    const result = await habitsService.createHabit({ name, days }, userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function getAllHabits(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const result = await habitsService.findUserHabits(userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function getTodayHabits(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const result = await habitsService.findUserTodayHabits(userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

