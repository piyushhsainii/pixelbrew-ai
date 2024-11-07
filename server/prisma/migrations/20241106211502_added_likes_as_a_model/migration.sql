/*
  Warnings:

  - You are about to drop the column `LikedBy` on the `Prompt` table. All the data in the column will be lost.
  - You are about to drop the column `postLiked` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Prompt" DROP COLUMN "LikedBy";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "postLiked";

-- CreateTable
CREATE TABLE "Likes" (
    "id" TEXT NOT NULL,
    "postID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_postID_fkey" FOREIGN KEY ("postID") REFERENCES "Prompt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
