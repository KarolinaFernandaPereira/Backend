-- CreateTable
CREATE TABLE `Principal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataHora` VARCHAR(191) NOT NULL,
    `quantidadeHora` VARCHAR(191) NOT NULL,
    `unidadeHora` VARCHAR(191) NOT NULL,
    `quantidadeMes` VARCHAR(191) NOT NULL,
    `unidadeMes` VARCHAR(191) NOT NULL,
    `preco` VARCHAR(191) NOT NULL,
    `tipoContrato` VARCHAR(191) NOT NULL,
    `tendencia` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `submercado` VARCHAR(191) NOT NULL,
    `energia` VARCHAR(191) NOT NULL,
    `periodicidade` VARCHAR(191) NOT NULL,
    `dataInicial` VARCHAR(191) NOT NULL,
    `dataFinal` VARCHAR(191) NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `principalId` INTEGER NULL,

    UNIQUE INDEX `Produto_principalId_key`(`principalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Produto` ADD CONSTRAINT `Produto_principalId_fkey` FOREIGN KEY (`principalId`) REFERENCES `Principal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
