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

const sessionRepository = {
  createHabit,
  createHabitDay,
  findAllUserHabits,
  findUserTodayHabits,
};

export default sessionRepository;
