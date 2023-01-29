import { ApplicationError } from "@/protocols";
import { Request, Response } from "express";
import httpStatus from "http-status";

export function handleApplicationErrors(err: ApplicationError | Error, _req: Request, res: Response) {
  /* eslint-disable-next-line no-console */
  console.error(err.name);
  if (err.name === "duplicatedEmailError") {
    res.sendStatus(httpStatus.BAD_REQUEST).send(err.message);
  }
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
