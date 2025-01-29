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
        mu_avatar_url: true,
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
        mu_avatar_url: true,
        mu_phoneNumber: true,
        mu_blood_type: true,
        mu_address: true,
        mu_province: true,
        mu_city: true,
        mu_district: true,
        mu_avatar_public_id: true,
        mu_createdAt: true,
        mu_updatedAt: true,
      }
    });
  }

  static async createUser(data) {
    return prisma.mst_users.create({ data });
  }

  static async updatePhoneNumber(uuid, phoneNumber) {
    return prisma.mst_users.update({
      where: { mu_uuid: uuid },
      data: { mu_phoneNumber: phoneNumber },
    });
  }

  // static async updateUserAvatar(uuid, avatarUrl, avatarPublicId) {
  //   try {
  //     const updatedUser = await prisma.mst_users.update({
  //       where: { mu_uuid: uuid },
  //       data: { mu_avatar_url: avatarUrl, mu_avatar_public_id: avatarPublicId },
  //     });

  //     return updatedUser;
  //   } catch (error) {
  //     console.error("Failed to update user avatar:", error);
  //     throw new Error("Failed to update user avatar");
  //   }
  // }

  static async updateUserAvatar(uuid, avatarUrl, avatarPublicId) {
    try {
      const existingUser = await prisma.mst_users.findUnique({
        where: { mu_uuid: uuid },
        select: {
          mu_avatar_public_id: true
        }
      });
  
      const updatedUser = await prisma.mst_users.update({
        where: { mu_uuid: uuid },
        data: { 
          mu_avatar_url: avatarUrl, 
          mu_avatar_public_id: avatarPublicId 
        },
      });
  
      return {
        oldPublicId: existingUser?.mu_avatar_public_id,
        updatedUser
      };
    } catch (error) {
      console.error("Failed to update user avatar:", error);
      throw new Error("Failed to update user avatar");
    }
  }
}

export default User;
