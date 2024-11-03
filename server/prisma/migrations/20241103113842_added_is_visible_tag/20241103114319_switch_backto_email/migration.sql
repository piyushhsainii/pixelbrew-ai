-- DropForeignKey
ALTER TABLE "Prompt" DROP CONSTRAINT "Prompt_userid_fkey";

-- AddForeignKey
ALTER TABLE "Prompt" ADD CONSTRAINT "Prompt_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
