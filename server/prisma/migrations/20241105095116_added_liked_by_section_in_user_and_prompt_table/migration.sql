-- AlterTable
ALTER TABLE "Prompt" ADD COLUMN     "LikedBy" JSONB[] DEFAULT ARRAY[]::JSONB[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "postLiked" JSONB[] DEFAULT ARRAY[]::JSONB[];
