import authorizationService from "@/services/authorization-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { SignInParams } from "@/schemas/sign-in-schema";

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authorizationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    console.log(error);
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

