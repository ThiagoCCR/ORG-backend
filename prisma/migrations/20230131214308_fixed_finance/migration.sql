/*
  Warnings:

  - Added the required column `name` to the `Finance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Finance" ADD COLUMN     "name" TEXT NOT NULL;
