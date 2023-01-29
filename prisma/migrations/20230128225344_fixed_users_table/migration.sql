/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Finance" DROP CONSTRAINT "public.Finance_fk0";

-- DropForeignKey
ALTER TABLE "Habits" DROP CONSTRAINT "Habits_fk0";

-- DropForeignKey
ALTER TABLE "Humor" DROP CONSTRAINT "Humor_fk0";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_fk0";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT '2023-01-28'::date,
    "updatedAt" DATE,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_fk0" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Habits" ADD CONSTRAINT "Habits_fk0" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Humor" ADD CONSTRAINT "Humor_fk0" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_fk0" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
