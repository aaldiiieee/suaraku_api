import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class User {
  static async getAllUsers() {
    return prisma.mst_users.findMany({
      select: {
        mu_id: true,
        mu_uuid: true,
        mu_nik: true,
        mu_fullname: true,
        mu_phoneNumber: true,
        mu_blood_type: true,
        mu_address: true,
        mu_province: true,
        mu_city: true,
        mu_district: true,
        mu_createdAt: true,
        mu_updatedAt: true,
      }
    });
  }

  static async getUserById(id) {
    return prisma.mst_users.findUnique({
      where: { mu_id: parseInt(id) },
      select: {
        mu_id: true,
        mu_uuid: true,
        mu_nik: true,
        mu_fullname: true,
        mu_phoneNumber: true,
        mu_blood_type: true,
        mu_address: true,
        mu_province: true,
        mu_city: true,
        mu_district: true,
        mu_createdAt: true,
        mu_updatedAt: true,
      }
    });
  }

  static async createUser(data) {
    return prisma.mst_users.create({ data });
  }
}

export default User;
