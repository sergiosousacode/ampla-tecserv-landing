import type { PrismaClient } from "@prisma/client";
import type { PasswordResetTokensRepository } from "@/application/portal/password-reset";

export function createPrismaPasswordResetTokensRepository(
  prisma: PrismaClient
): PasswordResetTokensRepository {
  return {
    async create(input) {
      await prisma.passwordResetToken.create({
        data: input,
      });
    },
    findValidByTokenHash(tokenHash, now) {
      return prisma.passwordResetToken.findFirst({
        where: {
          tokenHash,
          usedAt: null,
          expiresAt: { gt: now },
        },
        select: {
          id: true,
          userId: true,
          user: {
            select: {
              name: true,
              status: true,
            },
          },
        },
      });
    },
    async invalidateActiveTokensForUser(userId, usedAt) {
      await prisma.passwordResetToken.updateMany({
        where: {
          userId,
          usedAt: null,
          expiresAt: { gt: usedAt },
        },
        data: { usedAt },
      });
    },
    async resetPasswordAndUseToken(input) {
      await prisma.$transaction([
        prisma.user.update({
          where: { id: input.userId },
          data: { passwordHash: input.passwordHash },
        }),
        prisma.passwordResetToken.update({
          where: { id: input.tokenId },
          data: { usedAt: input.usedAt },
        }),
      ]);
    },
  };
}
