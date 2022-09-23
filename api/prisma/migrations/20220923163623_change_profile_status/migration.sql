/*
  Warnings:

  - The values [OFLINE] on the enum `ProfileStatus` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `status` on the `Match` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('PLAYING', 'ENDED');

-- AlterEnum
BEGIN;
CREATE TYPE "ProfileStatus_new" AS ENUM ('ONLINE', 'INGAME', 'OFFLINE');
ALTER TABLE "profile" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "profile" ALTER COLUMN "status" TYPE "ProfileStatus_new" USING ("status"::text::"ProfileStatus_new");
ALTER TYPE "ProfileStatus" RENAME TO "ProfileStatus_old";
ALTER TYPE "ProfileStatus_new" RENAME TO "ProfileStatus";
DROP TYPE "ProfileStatus_old";
ALTER TABLE "profile" ALTER COLUMN "status" SET DEFAULT 'ONLINE';
COMMIT;

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "status",
ADD COLUMN     "status" "GameStatus" NOT NULL;

-- DropEnum
DROP TYPE "type";
