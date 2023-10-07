-- CreateEnum
CREATE TYPE "Avatar" AS ENUM ('AVATAR_1', 'AVATAR_2', 'AVATAR_3', 'AVATAR_4', 'AVATAR_5', 'AVATAR_6');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" "Avatar" NOT NULL DEFAULT 'AVATAR_1';
