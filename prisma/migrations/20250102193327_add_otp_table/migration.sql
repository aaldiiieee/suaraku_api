-- CreateTable
CREATE TABLE `mst_otp_user` (
    `mo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `mo_nik_user` VARCHAR(191) NOT NULL,
    `mo_otp_number` INTEGER NOT NULL,
    `mo_expires_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`mo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
