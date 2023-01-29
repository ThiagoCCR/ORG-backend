import Joi from "joi";
import { User } from "@prisma/client";

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export type SignInParams = Pick<User, "email" | "password">;
