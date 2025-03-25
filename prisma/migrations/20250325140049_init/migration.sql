-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "veiculo" TEXT,
    "nota" TEXT,
    "etapa" TEXT NOT NULL DEFAULT 'NOVO',
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
