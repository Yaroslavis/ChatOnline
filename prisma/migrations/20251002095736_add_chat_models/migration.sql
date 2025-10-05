/*
  Warnings:

  - You are about to drop the column `isGroup` on the `Chat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,chatId]` on the table `ChatMember` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "isGroup";

-- CreateIndex
CREATE UNIQUE INDEX "ChatMember_userId_chatId_key" ON "ChatMember"("userId", "chatId");
