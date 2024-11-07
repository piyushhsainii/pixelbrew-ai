-- AlterTable
ALTER TABLE "User" ADD COLUMN     "trainingImages" TEXT[] DEFAULT ARRAY[]::TEXT[];
