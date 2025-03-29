-- CreateTable
CREATE TABLE `Filtro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `submercado` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `periodicidade` VARCHAR(191) NOT NULL,
    `dataInicial` VARCHAR(191) NOT NULL,
    `dataFinal` VARCHAR(191) NULL,
    `contrato` VARCHAR(191) NOT NULL,
    `energia` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
