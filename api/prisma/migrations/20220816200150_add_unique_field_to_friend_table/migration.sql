/*
  Warnings:

  - A unique constraint covering the columns `[from,to]` on the table `friendsList` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "friendsList_from_to_key" ON "friendsList"("from", "to");
