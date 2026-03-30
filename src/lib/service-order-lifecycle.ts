import { ContractStatus, PrismaClient } from "@prisma/client";

const AUTO_FINALIZE_AFTER_HOURS = 24;

export async function autoFinalizePendingClientFeedback(
  prisma: PrismaClient,
  clientId?: string
) {
  const cutoff = new Date(
    Date.now() - AUTO_FINALIZE_AFTER_HOURS * 60 * 60 * 1000
  );

  await prisma.contract.updateMany({
    where: {
      status: ContractStatus.PENDING_SIGNATURE,
      completedAt: null,
      clientFeedback: null,
      clientSatisfaction: null,
      updatedAt: {
        lte: cutoff,
      },
      ...(clientId ? { clientId } : {}),
    },
    data: {
      status: ContractStatus.ARCHIVED,
      completedAt: new Date(),
    },
  });
}
