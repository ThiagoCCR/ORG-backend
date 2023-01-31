import { Router } from "express";
import { validateBody, authenticateToken } from "@/middlewares";
import { createHabitSchema } from "@/schemas/create-habit-schema";
import { postHabit, getAllHabits, getTodayHabits } from "@/controllers/habits-controller";

const habitsRouter = Router();

habitsRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(createHabitSchema), postHabit)
  .get("/", getAllHabits)
  .get("/today", getTodayHabits);

export { habitsRouter };
