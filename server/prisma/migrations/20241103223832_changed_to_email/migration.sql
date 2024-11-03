/*
  Warnings:

  - You are about to drop the column `userid` on the `Prompt` table. All the data in the column will be lost.
  - Added the required column `userEmail` to the `Prompt` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_userid_fkey";

-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "userid",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
