-- CreateTable
CREATE TABLE "conversations" (
    "conversation_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "last_message_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "password" TEXT,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("conversation_id")
);

-- CreateTable
CREATE TABLE "messages" (
    "message_id" TEXT NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "sent_by_id" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("message_id")
);

-- CreateTable
CREATE TABLE "bannedUsers" (
    "ban_id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "conversation_id" TEXT NOT NULL,
    "bannedBy_id" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL DEFAULT 0,
    "bannedUntil" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastBan_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bannedUsers_pkey" PRIMARY KEY ("ban_id")
);

-- CreateTable
CREATE TABLE "_admins" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_members" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_admins_AB_unique" ON "_admins"("A", "B");

-- CreateIndex
CREATE INDEX "_admins_B_index" ON "_admins"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_members_AB_unique" ON "_members"("A", "B");

-- CreateIndex
CREATE INDEX "_members_B_index" ON "_members"("B");

-- AddForeignKey
ALTER TABLE "conversations" ADD CONSTRAINT "conversations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("intra_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_sent_by_id_fkey" FOREIGN KEY ("sent_by_id") REFERENCES "user"("intra_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("conversation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bannedUsers" ADD CONSTRAINT "bannedUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("intra_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bannedUsers" ADD CONSTRAINT "bannedUsers_bannedBy_id_fkey" FOREIGN KEY ("bannedBy_id") REFERENCES "user"("intra_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bannedUsers" ADD CONSTRAINT "bannedUsers_conversation_id_fkey" FOREIGN KEY ("conversation_id") REFERENCES "conversations"("conversation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admins" ADD CONSTRAINT "_admins_A_fkey" FOREIGN KEY ("A") REFERENCES "conversations"("conversation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admins" ADD CONSTRAINT "_admins_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_members" ADD CONSTRAINT "_members_A_fkey" FOREIGN KEY ("A") REFERENCES "conversations"("conversation_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_members" ADD CONSTRAINT "_members_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
