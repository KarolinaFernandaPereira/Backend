-- DropForeignKey
ALTER TABLE `principal` DROP FOREIGN KEY `Principal_produtoId_fkey`;

-- DropIndex
DROP INDEX `Principal_produtoId_key` ON `principal`;

-- AddForeignKey
ALTER TABLE `Principal` ADD CONSTRAINT `Principal_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Produto`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
