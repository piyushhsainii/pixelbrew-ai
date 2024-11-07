/*
  Warnings:

  - You are about to drop the column `likes` on the `Likes` table. All the data in the column will be lost.
  - Added the required column `isLiked` to the `Likes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Likes" DROP COLUMN "likes",
ADD COLUMN     "isLiked" BOOLEAN NOT NULL;
