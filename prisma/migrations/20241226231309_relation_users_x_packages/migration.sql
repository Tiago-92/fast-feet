/*
  Warnings:

  - You are about to drop the `Recipient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `deliverer_id` to the `packages` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('DELIVERED_DRIVER', 'RECIPIENT');

-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_recipient_id_fkey";

-- AlterTable
ALTER TABLE "packages" ADD COLUMN     "deliverer_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "Recipient";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'RECIPIENT',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_deliverer_id_fkey" FOREIGN KEY ("deliverer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
