/*
  Warnings:

  - The primary key for the `Reflection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `complete` on the `Reflection` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Reflection` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Reflection` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Reflection` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `promptId` to the `Reflection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responseText` to the `Reflection` table without a default value. This is not possible if the table is not empty.
  - Made the column `authorId` on table `Reflection` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "DailyPrompt" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "promptText" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reflection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "promptId" INTEGER NOT NULL,
    "responseText" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Reflection_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reflection_promptId_fkey" FOREIGN KEY ("promptId") REFERENCES "DailyPrompt" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reflection" ("authorId", "createdAt", "id") SELECT "authorId", "createdAt", "id" FROM "Reflection";
DROP TABLE "Reflection";
ALTER TABLE "new_Reflection" RENAME TO "Reflection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
