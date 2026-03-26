"use server";

import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { UserRole, UserStatus } from "@prisma/client";
import { requirePortalRole } from "@/lib/portal-auth";
import { getPrisma } from "@/lib/prisma";

export interface CreatePortalUserFormState {
  error?: string;
  success?: string;
}

export interface UpdatePortalUserFormState {
  error?: string;
  success?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createPortalUserAction(
  _previousState: CreatePortalUserFormState,
  formData: FormData
): Promise<CreatePortalUserFormState> {
  await requirePortalRole(UserRole.ADMIN);

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");
  const roleInput = String(formData.get("role") || "");
  const statusInput = String(formData.get("status") || "");

  if (!name || !email || !password || !roleInput || !statusInput) {
    return { error: "Preencha nome, e-mail, senha, perfil e status." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: "Informe um e-mail valido." };
  }

  if (password.length < 6) {
    return { error: "A senha precisa ter pelo menos 6 caracteres." };
  }

  if (!Object.values(UserRole).includes(roleInput as UserRole)) {
    return { error: "Perfil invalido." };
  }

  if (!Object.values(UserStatus).includes(statusInput as UserStatus)) {
    return { error: "Status invalido." };
  }

  const prisma = getPrisma();
  const existingUser = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (existingUser) {
    return { error: "Ja existe um usuario com este e-mail." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      role: roleInput as UserRole,
      status: statusInput as UserStatus,
    },
  });

  revalidatePath("/admin/usuarios");

  return {
    success: `Usuario ${name} criado com sucesso.`,
  };
}

export async function updatePortalUserAction(
  _previousState: UpdatePortalUserFormState,
  formData: FormData
): Promise<UpdatePortalUserFormState> {
  const currentUser = await requirePortalRole(UserRole.ADMIN);

  const userId = String(formData.get("userId") || "").trim();
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const roleInput = String(formData.get("role") || "");
  const statusInput = String(formData.get("status") || "");

  if (!userId || !name || !email || !roleInput || !statusInput) {
    return { error: "Preencha nome, e-mail, perfil e status." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: "Informe um e-mail valido." };
  }

  if (!Object.values(UserRole).includes(roleInput as UserRole)) {
    return { error: "Perfil invalido." };
  }

  if (!Object.values(UserStatus).includes(statusInput as UserStatus)) {
    return { error: "Status invalido." };
  }

  if (
    currentUser.id === userId &&
    ((roleInput as UserRole) !== UserRole.ADMIN ||
      (statusInput as UserStatus) !== UserStatus.ACTIVE)
  ) {
    return {
      error: "Voce nao pode remover seu proprio acesso de administrador ativo.",
    };
  }

  const prisma = getPrisma();
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true },
  });

  if (!existingUser) {
    return { error: "Usuario nao encontrado." };
  }

  const userWithSameEmail = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (userWithSameEmail && userWithSameEmail.id !== userId) {
    return { error: "Ja existe outro usuario com este e-mail." };
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      email,
      role: roleInput as UserRole,
      status: statusInput as UserStatus,
    },
  });

  revalidatePath("/admin/usuarios");

  return {
    success: `Dados de ${name} atualizados com sucesso.`,
  };
}

export async function resetPortalUserPasswordAction(
  _previousState: UpdatePortalUserFormState,
  formData: FormData
): Promise<UpdatePortalUserFormState> {
  await requirePortalRole(UserRole.ADMIN);

  const userId = String(formData.get("userId") || "").trim();
  const password = String(formData.get("password") || "");

  if (!userId || !password) {
    return { error: "Informe a nova senha." };
  }

  if (password.length < 6) {
    return { error: "A nova senha precisa ter pelo menos 6 caracteres." };
  }

  const prisma = getPrisma();
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true },
  });

  if (!existingUser) {
    return { error: "Usuario nao encontrado." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });

  revalidatePath("/admin/usuarios");

  return {
    success: `Senha de ${existingUser.name} redefinida com sucesso.`,
  };
}
