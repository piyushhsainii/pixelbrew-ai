/*
  Warnings:

  - You are about to drop the column `userID` on the `Reviews` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Reviews" DROP CONSTRAINT "Reviews_userID_fkey";

-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "userID",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
