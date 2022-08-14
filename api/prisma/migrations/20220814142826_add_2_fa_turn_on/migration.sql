/*
  Warnings:

  - A unique constraint covering the columns `[twoFactorAuthenticationSecret]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "isTwoFactorAuthenticationEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twoFactorAuthenticationSecret" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_twoFactorAuthenticationSecret_key" ON "user"("twoFactorAuthenticationSecret");
