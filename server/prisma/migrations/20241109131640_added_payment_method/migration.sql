-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "method" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "tokensRecharged" BOOLEAN NOT NULL DEFAULT false;
