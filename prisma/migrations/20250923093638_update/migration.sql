-- AlterTable
ALTER TABLE "public"."Job" ALTER COLUMN "image" DROP DEFAULT,
ALTER COLUMN "companyName" DROP NOT NULL;
