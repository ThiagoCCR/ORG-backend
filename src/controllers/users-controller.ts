import httpStatus from "http-status";
import { Request, Response } from "express";
import usersService from "@/services/users-service";

async function PostUser(req: Request, res: Response) {
  const userCredentials = req.body;
  try {
    const user = await usersService.createUser(userCredentials);
    res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.name === "duplicatedEmailError") {
      res.sendStatus(httpStatus.BAD_REQUEST).send(error.message);
    }
    res.sendStatus(httpStatus.CONFLICT).send(error.message);
  }
}

export default PostUser;
