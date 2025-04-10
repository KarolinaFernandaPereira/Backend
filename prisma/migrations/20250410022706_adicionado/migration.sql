-- AlterTable
ALTER TABLE `filtro` ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Filtro` ADD CONSTRAINT `Filtro_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
