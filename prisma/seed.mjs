import bcrypt from "bcrypt";
import { PrismaClient, UserRole, UserStatus } from "@prisma/client";

const prisma = new PrismaClient();

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
