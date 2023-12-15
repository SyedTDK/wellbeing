/*
  Warnings:

  - You are about to drop the `DailyPrompt` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `prompt` to the `Reflection` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "DailyPrompt";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Reflection" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "promptId" INTEGER NOT NULL,
    "responseText" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    CONSTRAINT "Reflection_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reflection" ("authorId", "createdAt", "id", "promptId", "responseText") SELECT "authorId", "createdAt", "id", "promptId", "responseText" FROM "Reflection";
DROP TABLE "Reflection";
ALTER TABLE "new_Reflection" RENAME TO "Reflection";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
