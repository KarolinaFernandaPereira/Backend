/*
  Warnings:

  - Added the required column `ativo` to the `Filtro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Filtro` table without a default value. This is not possible if the table is not empty.
  - Added the required column `padrao` to the `Filtro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `filtro` ADD COLUMN `ativo` INTEGER NOT NULL,
    ADD COLUMN `nome` VARCHAR(191) NOT NULL,
    ADD COLUMN `padrao` INTEGER NOT NULL;
