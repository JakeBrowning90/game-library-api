/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Game` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "desc" DROP NOT NULL,
ALTER COLUMN "timeMax" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Game_title_key" ON "Game"("title");
