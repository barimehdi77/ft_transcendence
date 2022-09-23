/*
  Warnings:

  - The values [REJECTED,REMOVED,BANNED] on the enum `FriendStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FriendStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'BLOCKED');
ALTER TABLE "friendsList" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "friendsList" ALTER COLUMN "status" TYPE "FriendStatus_new" USING ("status"::text::"FriendStatus_new");
ALTER TYPE "FriendStatus" RENAME TO "FriendStatus_old";
ALTER TYPE "FriendStatus_new" RENAME TO "FriendStatus";
DROP TYPE "FriendStatus_old";
ALTER TABLE "friendsList" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
