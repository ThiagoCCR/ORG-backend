import { Router } from "express";
import { validateBody, authenticateToken } from "@/middlewares";
import { createFinanceLogSchema } from "@/schemas/create-finance-log-schema";
import { postFinanceLog, editFinanceLog, deleteFinanceLog } from "@/controllers";

const financesRouter = Router();

financesRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(createFinanceLogSchema), postFinanceLog)
  .put("/:financeId", editFinanceLog)
  .delete("/:financeId", deleteFinanceLog);

export { financesRouter };
