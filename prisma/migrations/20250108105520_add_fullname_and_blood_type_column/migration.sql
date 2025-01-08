/*
  Warnings:

  - Added the required column `mu_blood_type` to the `mst_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mu_fullname` to the `mst_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `mst_users` ADD COLUMN `mu_blood_type` VARCHAR(191) NOT NULL,
    ADD COLUMN `mu_fullname` VARCHAR(191) NOT NULL;
