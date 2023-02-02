/*
  Warnings:

  - Added the required column `date` to the `HabitLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HabitLog" ADD COLUMN     "date" DATE NOT NULL;
