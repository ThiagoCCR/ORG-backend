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

    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function getAllHabits(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const result = await habitsService.findUserHabits(userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function getTodayHabits(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const result = await habitsService.findUserTodayHabits(userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function checkHabit(req: AuthenticatedRequest, res: Response) {
  const { habitId, dayId } = req.body;
  try {
    const result = await habitsService.checkHabit(habitId, dayId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.FORBIDDEN).send(error.message);
  }
}

export async function uncheckHabit(req: AuthenticatedRequest, res: Response) {
  const { habitId, dayId } = req.body;
  try {
    const result = await habitsService.uncheckHabit(habitId, dayId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.FORBIDDEN).send(error.message);
  }
}
