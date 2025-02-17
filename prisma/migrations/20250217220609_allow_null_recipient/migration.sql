-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_recipient_id_fkey";

-- AlterTable
ALTER TABLE "packages" ALTER COLUMN "recipient_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "packages" ADD CONSTRAINT "packages_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
