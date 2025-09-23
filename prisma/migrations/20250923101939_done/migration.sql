-- DropForeignKey
ALTER TABLE "public"."Company" DROP CONSTRAINT "Company_recruiterId_fkey";

-- AlterTable
ALTER TABLE "public"."Company" ALTER COLUMN "recruiterId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Company" ADD CONSTRAINT "Company_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
