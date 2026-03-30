import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export function getPrisma() {
  const databaseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.DATABASE_URL || process.env.DATABASE_URL_LOCAL
      : process.env.DATABASE_URL_LOCAL || process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "Prisma requires DATABASE_URL or DATABASE_URL_LOCAL to be configured."
    );
  }

  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = databaseUrl;
  }

  if (!globalForPrisma.prisma) {
    try {
      const adapter = new PrismaPg({ connectionString: databaseUrl });

      globalForPrisma.prisma = new PrismaClient({
        adapter,
        log:
          process.env.NODE_ENV === "development"
            ? ["warn", "error"]
            : ["error"],
      });
    } catch (error) {
      throw new Error(
        `Failed to initialize Prisma Client. Check your database environment variables. ${error instanceof Error ? error.message : ""}`.trim()
      );
    }
  }

  return globalForPrisma.prisma;
}
