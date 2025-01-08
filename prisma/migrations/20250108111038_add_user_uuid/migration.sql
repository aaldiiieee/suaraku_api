/*
  Warnings:

  - A unique constraint covering the columns `[mu_uuid]` on the table `mst_users` will be added. If there are existing duplicate values, this will fail.
  - The required column `mu_uuid` was added to the `mst_users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `mst_users` ADD COLUMN `mu_uuid` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `mst_users_mu_uuid_key` ON `mst_users`(`mu_uuid`);
