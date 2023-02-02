import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function createFinanceLog(params: Prisma.FinanceUncheckedCreateInput) {
  return prisma.finance.create({
    data: {
      userId: params.userId,
      class: params.class,
      type: params.type,
      date: params.date,
      name: params.name,
    },
  });
}

async function findFinanceLogByUserId(financeLogId: number) {
  return prisma.finance.findFirst({
    where: {
      id: financeLogId,
    }
  });
}

async function editFinanceLog(financeLogId: number, alterations: editFinanceLogParams) {
  return prisma.finance.update({
    where: {
      id: financeLogId,
    },
    data: alterations,
  });
}

async function deleteFinanceLog(financeLogId: number) {
  return prisma.finance.delete({
    where: {
      id: financeLogId,
    }
  });
}

type editFinanceLogParams = {
  userId?: number;
  logClass?: string;
  type?: string;
  name?: string;
};

const financesRepository = {
  createFinanceLog,
  editFinanceLog,
  findFinanceLogByUserId,
  deleteFinanceLog
};

export default financesRepository;
