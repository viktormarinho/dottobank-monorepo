/*
  Warnings:

  - A unique constraint covering the columns `[dotto_id]` on the table `Conta` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Conta_dotto_id_key" ON "Conta"("dotto_id");
