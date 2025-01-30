-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "isAdmin" SET DEFAULT false,
ALTER COLUMN "isDemo" SET DEFAULT false;
