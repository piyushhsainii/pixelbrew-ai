-- AlterTable
ALTER TABLE "FalAIModel" ADD COLUMN     "isDataSet" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lora" TEXT;
