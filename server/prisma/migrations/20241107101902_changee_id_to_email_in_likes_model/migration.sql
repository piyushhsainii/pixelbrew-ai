/*
  Warnings:

  - You are about to drop the column `userID` on the `Likes` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Likes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_userID_fkey";

-- AlterTable
ALTER TABLE "Likes" DROP COLUMN "userID",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
