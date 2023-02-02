import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { FinanceLogSchema } from "@/schemas/create-finance-log-schema";
import financesService from "@/services/finances-service";

export async function postFinanceLog(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { logClass, type, name } = req.body as FinanceLogSchema;
  try {
    const result = await financesService.createFinanceLog({ userId, logClass, type, name });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function editFinanceLog(req: AuthenticatedRequest, res: Response) {
  const { financeId } = req.params;
  const { userId } = req;
  const alterations = req.body;

  try {
    const result = await financesService.editFinanceLog(Number(financeId), alterations, userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "forbiddenError") {
      return res.status(httpStatus.FORBIDDEN).send(error.message);
    }
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}

export async function deleteFinanceLog(req: AuthenticatedRequest, res: Response) {
  const { financeId } = req.params;
  const { userId } = req;

  try {
    const result = await financesService.deleteFinanceLog(Number(financeId), userId);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    if (error.name === "forbiddenError") {
      return res.status(httpStatus.FORBIDDEN).send(error.message);
    }
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
}
