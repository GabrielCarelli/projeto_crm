/*
  Warnings:

  - You are about to drop the column `nota` on the `Cliente` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "veiculo" TEXT,
    "vendedor" TEXT,
    "etapa" TEXT NOT NULL DEFAULT 'NOVO',
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Cliente" ("criadoEm", "email", "etapa", "id", "nome", "telefone", "veiculo") SELECT "criadoEm", "email", "etapa", "id", "nome", "telefone", "veiculo" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
