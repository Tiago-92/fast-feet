-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_deliverer_id_fkey";

-- AlterTable
ALTER TABLE "packages" ALTER COLUMN "deliverer_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_deliverer_id_fkey" FOREIGN KEY ("deliverer_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
