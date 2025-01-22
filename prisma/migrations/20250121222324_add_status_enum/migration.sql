/*
  Warnings:

  - Changed the type of `status` on the `packages` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PackageStatus" AS ENUM ('PICKUP', 'AWAITING_PICKUP', 'DELIVERED', 'RETURNED');

-- AlterTable
ALTER TABLE "packages" DROP COLUMN "status",
ADD COLUMN     "status" "PackageStatus" NOT NULL;
