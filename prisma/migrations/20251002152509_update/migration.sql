/*
  Warnings:

  - You are about to drop the column `saved` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "saved";

-- CreateTable
CREATE TABLE "public"."SavedJob" (
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "savedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedJob_pkey" PRIMARY KEY ("userId","jobId")
);

-- AddForeignKey
ALTER TABLE "public"."SavedJob" ADD CONSTRAINT "SavedJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SavedJob" ADD CONSTRAINT "SavedJob_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
