/*
  Warnings:

  - You are about to drop the column `dob` on the `UserInfo` table. All the data in the column will be lost.
  - You are about to drop the column `resumeLink` on the `UserInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserInfo" DROP COLUMN "dob",
DROP COLUMN "resumeLink";
