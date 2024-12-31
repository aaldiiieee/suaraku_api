-- CreateTable
CREATE TABLE `mst_users` (
    `mu_id` INTEGER NOT NULL AUTO_INCREMENT,
    `mu_nik` VARCHAR(191) NOT NULL,
    `mu_phoneNumber` VARCHAR(191) NOT NULL,
    `mu_password` VARCHAR(191) NOT NULL,
    `mu_address` VARCHAR(191) NOT NULL,
    `mu_province` VARCHAR(191) NOT NULL,
    `mu_city` VARCHAR(191) NOT NULL,
    `mu_district` VARCHAR(191) NOT NULL,
    `mu_createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `mu_updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `mst_users_mu_nik_key`(`mu_nik`),
    PRIMARY KEY (`mu_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
