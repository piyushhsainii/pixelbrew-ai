/*
  Warnings:

  - Added the required column `Tokens` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "Tokens" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
