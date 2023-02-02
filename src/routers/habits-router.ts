import { Router } from "express";
import { validateBody, authenticateToken } from "@/middlewares";
import { checkOrUncheckSchema } from "@/schemas/check-or-uncheck-schema";
import { createHabitSchema } from "@/schemas/create-habit-schema";
import { postHabit, getAllHabits, getTodayHabits, checkHabit, uncheckHabit } from "@/controllers/habits-controller";

const habitsRouter = Router();

habitsRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(createHabitSchema), postHabit)
  .get("/", getAllHabits)
  .get("/today", getTodayHabits)
  .post("/today/check", validateBody(checkOrUncheckSchema), checkHabit)
  .post("/today/uncheck", validateBody(checkOrUncheckSchema), uncheckHabit);

export { habitsRouter };
