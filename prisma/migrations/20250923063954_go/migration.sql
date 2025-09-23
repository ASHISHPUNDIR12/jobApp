/*
  Warnings:

  - You are about to drop the column `company` on the `Job` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Education" AS ENUM ('INTERMEDIATE', 'GRADUATE', 'POSTGRADUATE');

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "company",
ADD COLUMN     "companyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Application" (
    "id" TEXT NOT NULL,
    "yoe" INTEGER NOT NULL,
    "skills" TEXT[],
    "education" "public"."Education" NOT NULL DEFAULT 'INTERMEDIATE',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resumeUrl" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageLocalUrl" TEXT NOT NULL,
    "recruiterId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_userId_jobId_key" ON "public"."Application"("userId", "jobId");

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Application" ADD CONSTRAINT "Application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Company" ADD CONSTRAINT "Company_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
