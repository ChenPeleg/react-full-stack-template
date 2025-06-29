-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FolderPath" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_FolderPath" ("createdAt", "description", "id", "name", "path", "type") SELECT "createdAt", "description", "id", "name", "path", "type" FROM "FolderPath";
DROP TABLE "FolderPath";
ALTER TABLE "new_FolderPath" RENAME TO "FolderPath";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
