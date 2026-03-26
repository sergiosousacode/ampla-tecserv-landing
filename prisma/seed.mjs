import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole, UserStatus } from "@prisma/client";

dotenv.config({ path: ".env.local" });
dotenv.config();

const databaseUrl = process.env.DATABASE_URL || process.env.DATABASE_URL_LOCAL;

if (!databaseUrl) {
  throw new Error("Configure DATABASE_URL ou DATABASE_URL_LOCAL antes do seed.");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = (
    process.env.PORTAL_ADMIN_EMAIL ||
    process.env.NEXT_PUBLIC_EMAIL ||
    "amplatecserv@gmail.com"
  ).trim().toLowerCase();

  const password = process.env.PORTAL_ADMIN_PASSWORD || "troque-esta-senha";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {
      name: "Administrador Ampla TecServ",
      passwordHash,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    },
    create: {
      name: "Administrador Ampla TecServ",
      email,
      passwordHash,
      role: UserRole.ADMIN,
      status: UserStatus.ACTIVE,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
