-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "nascimento" DATETIME NOT NULL,
    "telefone" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Conta" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "dotto_id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "saldo" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "picture" TEXT NOT NULL,
    "firstTime" BOOLEAN NOT NULL,
    "clienteId" TEXT NOT NULL,
    "contaId" TEXT NOT NULL,
    CONSTRAINT "User_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_contaId_fkey" FOREIGN KEY ("contaId") REFERENCES "Conta" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cartao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" TEXT NOT NULL,
    "validade" TEXT NOT NULL,
    "codigoSeguranca" TEXT NOT NULL,
    "limite" REAL NOT NULL,
    "fatura" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Cartao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Transferencia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pagadorId" TEXT NOT NULL,
    "recebedorId" TEXT NOT NULL,
    CONSTRAINT "Transferencia_pagadorId_fkey" FOREIGN KEY ("pagadorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Transferencia_recebedorId_fkey" FOREIGN KEY ("recebedorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Emprestimo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "valor" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Emprestimo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_username_key" ON "Cliente"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_clienteId_key" ON "User"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "User_contaId_key" ON "User"("contaId");
