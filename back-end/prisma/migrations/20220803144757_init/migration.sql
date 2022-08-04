-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "intra_id" INTEGER NOT NULL DEFAULT 0,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "user_name" TEXT,
    "email" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "profile_done" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "UserPoints" INTEGER NOT NULL DEFAULT 0,
    "played_games" INTEGER NOT NULL DEFAULT 0,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchMaking" (
    "id" SERIAL NOT NULL,
    "home_player_id" INTEGER NOT NULL,
    "away_player_id" INTEGER NOT NULL,

    CONSTRAINT "MatchMaking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MatchMakingToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_intra_id_key" ON "user"("intra_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_login_key" ON "user"("login");

-- CreateIndex
CREATE UNIQUE INDEX "user_user_name_key" ON "user"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "MatchMaking_home_player_id_key" ON "MatchMaking"("home_player_id");

-- CreateIndex
CREATE UNIQUE INDEX "MatchMaking_away_player_id_key" ON "MatchMaking"("away_player_id");

-- CreateIndex
CREATE UNIQUE INDEX "_MatchMakingToUser_AB_unique" ON "_MatchMakingToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_MatchMakingToUser_B_index" ON "_MatchMakingToUser"("B");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchMakingToUser" ADD CONSTRAINT "_MatchMakingToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "MatchMaking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MatchMakingToUser" ADD CONSTRAINT "_MatchMakingToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
