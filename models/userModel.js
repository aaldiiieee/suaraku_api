import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class User {
  static async getAllUsers() {
    return prisma.mst_users.findMany();
  }

  static async getUserById(id) {
    return prisma.mst_users.findUnique({
      where: { id: parseInt(id) },
    });
  }

  static async createUser(data) {
    return prisma.mst_users.create({ data });
  }
}

export default User;
