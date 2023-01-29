import { Router } from "express";
import { validateBody } from "@/middlewares";
import { signInSchema } from "@/schemas/sign-in-schema";
import { singInPost } from "@/controllers/authorization-controller"; 

const authenticationRouter = Router();

authenticationRouter.post("/sign-in", validateBody(signInSchema), singInPost);

export { authenticationRouter };
