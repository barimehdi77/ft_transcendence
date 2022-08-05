/*
  Warnings:

  - You are about to drop the column `UserPoints` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "UserPoints",
ADD COLUMN     "user_points" INTEGER NOT NULL DEFAULT 0;
