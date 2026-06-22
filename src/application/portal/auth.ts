import { UserStatus } from "@prisma/client";
import type { PasswordHasher } from "@/application/portal/passwords";
import { normalizeEmail } from "@/application/portal/validation";
import type {
  PortalSessionUser,
  PortalUsersRepository,
} from "@/domain/portal/users";

const DUMMY_PASSWORD_HASH =
  "$2b$10$CwTycUXWue0Thq9StjUM0uJ8UQ4m4v1C7L1NVr7DiIP9N6byN1NsS";

export async function validatePortalCredentials(
  repository: PortalUsersRepository,
  passwordHasher: PasswordHasher,
  email: string,
  password: string
) {
  const user = await repository.findByEmail(normalizeEmail(email));

  if (!user || user.status !== UserStatus.ACTIVE) {
    await passwordHasher.compare(password, DUMMY_PASSWORD_HASH);
    return null;
  }

  const passwordMatches = await passwordHasher.compare(password, user.passwordHash);

  if (!passwordMatches) {
    return null;
  }

  return user;
}

export async function getActivePortalSessionUser(
  repository: PortalUsersRepository,
  userId: string
): Promise<PortalSessionUser | null> {
  const user = await repository.findSessionUserById(userId);

  if (!user || user.status !== UserStatus.ACTIVE) {
    return null;
  }

  return user;
}
