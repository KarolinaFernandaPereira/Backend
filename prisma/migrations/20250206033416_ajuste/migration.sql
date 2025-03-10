/*
  Warnings:

  - You are about to drop the column `principalId` on the `produto` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[produtoId]` on the table `Principal` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `produto` DROP FOREIGN KEY `Produto_principalId_fkey`;

-- DropIndex
DROP INDEX `Produto_principalId_key` ON `produto`;

-- AlterTable
ALTER TABLE `principal` ADD COLUMN `produtoId` INTEGER NULL;

-- AlterTable
ALTER TABLE `produto` DROP COLUMN `principalId`;

-- CreateIndex
CREATE UNIQUE INDEX `Principal_produtoId_key` ON `Principal`(`produtoId`);

-- AddForeignKey
ALTER TABLE `Principal` ADD CONSTRAINT `Principal_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Produto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
