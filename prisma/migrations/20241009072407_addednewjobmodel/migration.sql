/*
  Warnings:

  - Added the required column `jd` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "Tags" TEXT[],
ADD COLUMN     "branchesAllowed" TEXT[],
ADD COLUMN     "jd" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
