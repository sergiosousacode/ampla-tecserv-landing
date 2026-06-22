import type { PrismaClient, UserRole, UserStatus } from "@prisma/client";
import type { PortalUsersRepository } from "@/domain/portal/users";

export function createPrismaUsersRepository(
  prisma: PrismaClient
): PortalUsersRepository {
  return {
    findByEmail(email) {
      return prisma.user.findUnique({
        where: { email },
      });
    },
    findSessionUserById(id) {
      return prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      });
    },
    findUserSummaryById(id) {
      return prisma.user.findUnique({
        where: { id },
        select: { id: true, name: true },
      });
    },
    findUserIdByEmail(email) {
      return prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });
    },
    async create(input) {
      await prisma.user.create({
        data: input,
      });
    },
    async updateProfile(input) {
      await prisma.user.update({
        where: { id: input.id },
        data: {
          name: input.name,
          email: input.email,
          role: input.role as UserRole,
          status: input.status as UserStatus,
        },
      });
    },
    async updatePassword(input) {
      await prisma.user.update({
        where: { id: input.id },
        data: { passwordHash: input.passwordHash },
      });
    },
  };
}
