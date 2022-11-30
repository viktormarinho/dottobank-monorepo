/*
  Warnings:

  - Added the required column `valor` to the `Transferencia` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transferencia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "valor" REAL NOT NULL,
    "pagadorId" TEXT NOT NULL,
    "recebedorId" TEXT NOT NULL,
    CONSTRAINT "Transferencia_pagadorId_fkey" FOREIGN KEY ("pagadorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transferencia_recebedorId_fkey" FOREIGN KEY ("recebedorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transferencia" ("id", "pagadorId", "recebedorId") SELECT "id", "pagadorId", "recebedorId" FROM "Transferencia";
DROP TABLE "Transferencia";
ALTER TABLE "new_Transferencia" RENAME TO "Transferencia";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
