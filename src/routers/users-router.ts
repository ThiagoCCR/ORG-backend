import { Router } from "express";
import { validateBody } from "@/middlewares";
import { createUserSchema } from "@/schemas/create-user-schema";
import PostUser from "@/controllers/users-controller";

const usersRouter = Router();

usersRouter.post("/", validateBody(createUserSchema), PostUser);

export { usersRouter };
