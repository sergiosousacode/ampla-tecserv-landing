import { UserRole, UserStatus } from "@prisma/client";
import type { PasswordHasher } from "@/application/portal/passwords";
import {
  EMAIL_REGEX,
  isEnumValue,
  normalizeEmail,
} from "@/application/portal/validation";
import type { PortalSessionUser, PortalUsersRepository } from "@/domain/portal/users";

export interface UseCaseResult {
  error?: string;
  success?: string;
}

export async function createPortalUser(input: {
  repository: PortalUsersRepository;
  passwordHasher: PasswordHasher;
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
}): Promise<UseCaseResult> {
  const name = input.name.trim();
  const email = normalizeEmail(input.email);

  if (!name || !email || !input.password || !input.role || !input.status) {
    return { error: "Preencha nome, e-mail, senha, perfil e status." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: "Informe um e-mail valido." };
  }

  if (input.password.length < 6) {
    return { error: "A senha precisa ter pelo menos 6 caracteres." };
  }

  if (!isEnumValue(UserRole, input.role)) {
    return { error: "Perfil invalido." };
  }

  if (!isEnumValue(UserStatus, input.status)) {
    return { error: "Status invalido." };
  }

  const existingUser = await input.repository.findUserIdByEmail(email);

  if (existingUser) {
    return { error: "Ja existe um usuario com este e-mail." };
  }

  const passwordHash = await input.passwordHasher.hash(input.password);

  await input.repository.create({
    name,
    email,
    passwordHash,
    role: input.role,
    status: input.status,
  });

  return {
    success: `Usuario ${name} criado com sucesso.`,
  };
}

export async function updatePortalUser(input: {
  repository: PortalUsersRepository;
  currentUser: PortalSessionUser;
  userId: string;
  name: string;
  email: string;
  role: string;
  status: string;
}): Promise<UseCaseResult> {
  const userId = input.userId.trim();
  const name = input.name.trim();
  const email = normalizeEmail(input.email);

  if (!userId || !name || !email || !input.role || !input.status) {
    return { error: "Preencha nome, e-mail, perfil e status." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: "Informe um e-mail valido." };
  }

  if (!isEnumValue(UserRole, input.role)) {
    return { error: "Perfil invalido." };
  }

  if (!isEnumValue(UserStatus, input.status)) {
    return { error: "Status invalido." };
  }

  if (
    input.currentUser.id === userId &&
    (input.role !== UserRole.ADMIN || input.status !== UserStatus.ACTIVE)
  ) {
    return {
      error: "Voce nao pode remover seu proprio acesso de administrador ativo.",
    };
  }

  const existingUser = await input.repository.findUserSummaryById(userId);

  if (!existingUser) {
    return { error: "Usuario nao encontrado." };
  }

  const userWithSameEmail = await input.repository.findUserIdByEmail(email);

  if (userWithSameEmail && userWithSameEmail.id !== userId) {
    return { error: "Ja existe outro usuario com este e-mail." };
  }

  await input.repository.updateProfile({
    id: userId,
    name,
    email,
    role: input.role,
    status: input.status,
  });

  return {
    success: `Dados de ${name} atualizados com sucesso.`,
  };
}

export async function resetPortalUserPassword(input: {
  repository: PortalUsersRepository;
  passwordHasher: PasswordHasher;
  userId: string;
  password: string;
}): Promise<UseCaseResult> {
  const userId = input.userId.trim();

  if (!userId || !input.password) {
    return { error: "Informe a nova senha." };
  }

  if (input.password.length < 6) {
    return { error: "A nova senha precisa ter pelo menos 6 caracteres." };
  }

  const existingUser = await input.repository.findUserSummaryById(userId);

  if (!existingUser) {
    return { error: "Usuario nao encontrado." };
  }

  const passwordHash = await input.passwordHasher.hash(input.password);

  await input.repository.updatePassword({ id: userId, passwordHash });

  return {
    success: `Senha de ${existingUser.name} redefinida com sucesso.`,
  };
}
