-- CreateTable
CREATE TABLE "Reviews" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "Improvement" TEXT NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
