-- CreateTable
CREATE TABLE "Finance" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "class" TEXT,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE,

    CONSTRAINT "Finance_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habits" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,
    "day" VARCHAR(255) NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE,

    CONSTRAINT "Habits_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Humor" (
    "id" SERIAL NOT NULL,
    "userId" SERIAL NOT NULL,
    "day" DATE NOT NULL,
    "humor" TEXT NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE,

    CONSTRAINT "Humor_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "userId" SERIAL NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "createdAt" DATE NOT NULL,
    "updatedAt" DATE,

    CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(20) NOT NULL,
    "createdAt" DATE NOT NULL DEFAULT '2023-01-27'::date,
    "updatedAt" DATE,

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "public.Finance_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Habits" ADD CONSTRAINT "Habits_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Humor" ADD CONSTRAINT "Humor_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

