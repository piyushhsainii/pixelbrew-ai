-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_userEmail_fkey";

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
