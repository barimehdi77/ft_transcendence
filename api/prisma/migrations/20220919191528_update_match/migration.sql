/*
  Warnings:

  - Added the required column `status` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "type" AS ENUM ('playing', 'end');

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "status" "type" NOT NULL;
