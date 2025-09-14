/*
  Warnings:

  - A unique constraint covering the columns `[token_verificacao]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Usuario_token_verificacao_key` ON `Usuario`(`token_verificacao`);
