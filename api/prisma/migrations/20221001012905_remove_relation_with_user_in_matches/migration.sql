/*
  Warnings:

  - You are about to drop the column `userId` on the `Match` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_userId_fkey";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "userId";
