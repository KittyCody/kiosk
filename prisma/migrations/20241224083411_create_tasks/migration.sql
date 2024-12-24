/*
  Warnings:

  - You are about to alter the column `first_name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `last_name` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "last_name" SET DATA TYPE VARCHAR(30);

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "state" VARCHAR(8) NOT NULL,
    "description" VARCHAR(300),
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "task" ADD CONSTRAINT "task_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
