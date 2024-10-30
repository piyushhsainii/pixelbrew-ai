/*
  Warnings:

  - You are about to drop the column `userid` on the `Payments` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_userid_fkey";

-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "userid",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
