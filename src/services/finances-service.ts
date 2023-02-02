import { badRequestError, forbiddenError } from "@/errors";
import financesRepository from "@/repositories/finances-repository";

async function createFinanceLog({ userId, logClass, type, name }: createFinanceLogParams) {
  const createParams = {
    userId,
    class: logClass,
    type,
    date: new Date(),
    name,
  };

  const newLog = await financesRepository.createFinanceLog(createParams);

  if (!newLog) throw badRequestError();

  return newLog;
}

async function editFinanceLog(financeLogId: number, alterations: editFinanceLogParams, userId: number) {
  const log = await financesRepository.findFinanceLogByUserId(financeLogId);

  if (log.userId !== userId) throw forbiddenError();

  const editedLog = await financesRepository.editFinanceLog(financeLogId, alterations);

  if (!editedLog) throw badRequestError();

  return editedLog;
}

async function deleteFinanceLog(financeLogId: number, userId: number) {
  const log = await financesRepository.findFinanceLogByUserId(financeLogId);

  if (log.userId !== userId) throw forbiddenError();

  const editedLog = await financesRepository.deleteFinanceLog(financeLogId);

  if (!editedLog) throw badRequestError();

  return editedLog;
}

type createFinanceLogParams = {
  userId: number;
  logClass: string;
  type: string;
  name: string;
};

type editFinanceLogParams = {
  userId?: number;
  logClass?: string;
  type?: string;
  name?: string;
};

const financesService = {
  createFinanceLog,
  editFinanceLog,
  deleteFinanceLog,
};

export default financesService;
