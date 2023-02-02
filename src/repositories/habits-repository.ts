import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

type CreateParams = {
  name: string;
  userId: number;
};

async function createHabit({ name, userId }: CreateParams) {
  return prisma.habit.create({
    data: {
      name,
      userId,
    },
  });
}

async function createHabitDay(habitId: number, day: number) {
  return prisma.habitDay.create({
    data: {
      habitId,
      day,
    },
  });
}

async function findAllUserHabits(userId: number) {
  return prisma.habit.findMany({
    where: {
      userId,
    },
  });
}

async function findUserTodayHabits(userId: number, today: number) {
  return prisma.habit.findMany({
    where: {
      userId,
    },
    include: {
      HabitDay: {
        where: {
          day: today,
        },
      },
    },
  });
}

async function createHabitLog(habitId: number, dayId: number, date: string, done: boolean) {
  return prisma.habitLog.create({
    data: {
      habitId,
      dayId,
      done,
      date,
    },
  });
}

async function findHabitLog(habitId: number, today: string) {
  return prisma.habitLog.findFirst({
    where: {
      habitId,
      date: today,
    },
  });
}

async function checkOrUncheckUserHabit(id: number, done: boolean) {
  return prisma.habitLog.update({
    where: {
      id,
    },
    data: {
      done,
    },
  });
}

const sessionRepository = {
  createHabit,
  createHabitDay,
  findAllUserHabits,
  findUserTodayHabits,
  findHabitLog,
  checkOrUncheckUserHabit,
  createHabitLog,
};

export default sessionRepository;
