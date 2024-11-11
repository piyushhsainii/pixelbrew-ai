/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Payments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Payments_paymentId_key" ON "Payments"("paymentId");
