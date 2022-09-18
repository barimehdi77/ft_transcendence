/*
  Warnings:

  - You are about to drop the `MatchMaking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MatchMakingToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MatchMakingToUser" DROP CONSTRAINT "_MatchMakingToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MatchMakingToUser" DROP CONSTRAINT "_MatchMakingToUser_B_fkey";

-- DropTable
DROP TABLE "MatchMaking";

-- DropTable
DROP TABLE "_MatchMakingToUser";

-- CreateTable
CREATE TABLE "Match" (
    "id" SERIAL NOT NULL,
    "player_one" TEXT NOT NULL,
    "player_two" TEXT NOT NULL,
    "player_one_score" INTEGER NOT NULL,
    "player_two_score" INTEGER NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
