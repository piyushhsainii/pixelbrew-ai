-- CreateTable
CREATE TABLE "FalAIModel" (
    "id" TEXT NOT NULL,
    "requestID" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FalAIModel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FalAIModel" ADD CONSTRAINT "FalAIModel_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
