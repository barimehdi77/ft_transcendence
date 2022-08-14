/*
  Warnings:

  - You are about to drop the `FriendsList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "FriendsList";

-- CreateTable
CREATE TABLE "friendsList" (
    "id" SERIAL NOT NULL,
    "from" INTEGER NOT NULL,
    "to" INTEGER NOT NULL,
    "status" "FriendStatus" NOT NULL DEFAULT E'PENDING',

    CONSTRAINT "friendsList_pkey" PRIMARY KEY ("id")
);
