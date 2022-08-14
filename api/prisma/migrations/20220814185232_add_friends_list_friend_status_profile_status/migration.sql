/*
  Warnings:

  - The `status` column on the `profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "FriendStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'REMOVED', 'BANNED');

-- CreateEnum
CREATE TYPE "ProfileStatus" AS ENUM ('ONLINE', 'INGAME', 'OFLINE');

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "status",
ADD COLUMN     "status" "ProfileStatus" NOT NULL DEFAULT E'ONLINE';

-- CreateTable
CREATE TABLE "FriendsList" (
    "id" SERIAL NOT NULL,
    "from" INTEGER NOT NULL,
    "to" INTEGER NOT NULL,
    "status" "FriendStatus" NOT NULL DEFAULT E'PENDING',

    CONSTRAINT "FriendsList_pkey" PRIMARY KEY ("id")
);
