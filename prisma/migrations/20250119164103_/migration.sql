/*
  Warnings:

  - Added the required column `ageRec` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameWeight` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inCirc` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerCtMax` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerCtMin` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeMax` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeMin` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "ageRec" INTEGER NOT NULL,
ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "gameWeight" TEXT NOT NULL,
ADD COLUMN     "inCirc" BOOLEAN NOT NULL,
ADD COLUMN     "playerCtMax" INTEGER NOT NULL,
ADD COLUMN     "playerCtMin" INTEGER NOT NULL,
ADD COLUMN     "timeMax" INTEGER NOT NULL,
ADD COLUMN     "timeMin" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_GameToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GameToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GameToTag_B_index" ON "_GameToTag"("B");

-- AddForeignKey
ALTER TABLE "_GameToTag" ADD CONSTRAINT "_GameToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToTag" ADD CONSTRAINT "_GameToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
