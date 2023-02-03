import { notFoundError, badRequestError } from "@/errors";
import { HabitParams } from "@/schemas/create-habit-schema";
import HabitsRepository from "@/repositories/habits-repository";
import dayjs from "dayjs";

async function createHabit({ name, days }: HabitParams, userId: number) {
  const newHabit = await HabitsRepository.createHabit({ name, userId });
  if (!newHabit) throw badRequestError();
  days.forEach(async (day) => {
    await HabitsRepository.createHabitDay(newHabit.id, day);
  });
  return newHabit;
}

async function findUserHabits(userId: number) {
  const Habits = await HabitsRepository.findAllUserHabits(userId);
  if (!Habits) throw notFoundError();
  return Habits;
}

async function findUserTodayHabits(userId: number) {
  const now = dayjs().locale("pt-br");
  const today: string = FormatDate(now);
  const todayNumber = filterTodayNumber(today);
  const Habits = await HabitsRepository.findUserTodayHabits(userId, todayNumber);
  if (!Habits) throw notFoundError();
  Habits.filter((habit) => {
    if (habit.HabitDay.length > 0) return habit;
  });
  return Habits;
}

function FormatDate(string: any) {
  string = string.format("dddd");
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function filterTodayNumber(today: string) {
  if (today === "Monday") return 1;

  if (today === "Tuesday") return 2;

  if (today === "Wednesday") return 3;

  if (today === "Thursday") return 4;

  if (today === "Friday") return 5;

  if (today === "Satuday") return 6;

  if (today === "Sunday") return 7;
}

async function checkHabit(habitId: number, dayId: number) {
  const now = dayjs().format("DD-MM-YY");
  const habitLogExists = await HabitsRepository.findHabitLog(habitId, now);

  if (habitLogExists && habitLogExists.done === false) {
    const checkedHabit = await HabitsRepository.checkOrUncheckUserHabit(habitLogExists.id, true);
    if (!checkedHabit) throw badRequestError();
    return checkedHabit;
  }

  const newHabitLog = await HabitsRepository.createHabitLog(habitId, dayId, now, true);
  if (!newHabitLog) throw badRequestError();
  return newHabitLog;
}

async function uncheckHabit(habitId: number, dayId: number) {
  const now = dayjs().format("DD-MM-YY");
  const habitLogExists = await HabitsRepository.findHabitLog(habitId, now);

  if (habitLogExists && habitLogExists.done === true) {
    const checkedHabit = await HabitsRepository.checkOrUncheckUserHabit(habitLogExists.id, true);
    if (!checkedHabit) throw badRequestError();
    return checkedHabit;
  }

  const newHabitLog = await HabitsRepository.createHabitLog(habitId, dayId, now, false);
  if (!newHabitLog) throw badRequestError();
  return newHabitLog;
}

const habitsService = {
  createHabit,
  findUserHabits,
  findUserTodayHabits,
  checkHabit,
  uncheckHabit,
};

export default habitsService;
