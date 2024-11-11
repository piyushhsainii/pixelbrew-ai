/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Tokens` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payments" ADD COLUMN     "Tokens" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payments_paymentId_key" ON "Payments"("paymentId");
