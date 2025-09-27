/*
  Warnings:

  - Added the required column `senha` to the `Instituicao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `instituicao` ADD COLUMN `imagem` VARCHAR(191) NULL,
    ADD COLUMN `senha` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `imagem` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `Curso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `tipo` ENUM('GRADUACAO', 'POS', 'TECNICO', 'LIVRE') NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `vagas` INTEGER NOT NULL,
    `modalidade` ENUM('PRESENCIAL', 'EAD', 'HIBRIDO') NOT NULL,
    `horario` VARCHAR(191) NOT NULL,
    `duracao` VARCHAR(191) NOT NULL,
    `custo` DECIMAL(10, 2) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `onde_trabalhar` VARCHAR(191) NOT NULL,
    `imagem` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `instituicaoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PreRequisito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `texto` VARCHAR(191) NOT NULL,
    `cursoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatrizCurricular` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `semestre` VARCHAR(191) NOT NULL,
    `cursoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disciplina` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `matrizId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Link` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `site_oficial` VARCHAR(191) NOT NULL,
    `pagina_curso` VARCHAR(191) NOT NULL,
    `inscricao` VARCHAR(191) NOT NULL,
    `cursoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Link_cursoId_key`(`cursoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Instituicao_email_idx` ON `Instituicao`(`email`);

-- CreateIndex
CREATE INDEX `Instituicao_cnpj_idx` ON `Instituicao`(`cnpj`);

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_instituicaoId_fkey` FOREIGN KEY (`instituicaoId`) REFERENCES `Instituicao`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PreRequisito` ADD CONSTRAINT `PreRequisito_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `Curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatrizCurricular` ADD CONSTRAINT `MatrizCurricular_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `Curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Disciplina` ADD CONSTRAINT `Disciplina_matrizId_fkey` FOREIGN KEY (`matrizId`) REFERENCES `MatrizCurricular`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Link` ADD CONSTRAINT `Link_cursoId_fkey` FOREIGN KEY (`cursoId`) REFERENCES `Curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
