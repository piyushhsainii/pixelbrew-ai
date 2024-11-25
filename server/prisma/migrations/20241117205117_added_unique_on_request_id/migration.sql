/*
  Warnings:

  - A unique constraint covering the columns `[requestID]` on the table `FalAIModel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FalAIModel_requestID_key" ON "FalAIModel"("requestID");
