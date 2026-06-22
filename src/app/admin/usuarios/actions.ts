"use server";

import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";
import {
  createPortalUser,
  resetPortalUserPassword,
  updatePortalUser,
} from "@/application/portal/users";
import { bcryptPasswordHasher } from "@/infra/portal/bcrypt-password-hasher";
import { createPrismaUsersRepository } from "@/infra/portal/prisma-users-repository";
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

export async function createPortalUserAction(
  _previousState: CreatePortalUserFormState,
  formData: FormData
): Promise<CreatePortalUserFormState> {
  await requirePortalRole(UserRole.ADMIN);

  const prisma = getPrisma();
  const result = await createPortalUser({
    repository: createPrismaUsersRepository(prisma),
    passwordHasher: bcryptPasswordHasher,
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
    role: String(formData.get("role") || ""),
    status: String(formData.get("status") || ""),
  });

  if (result.error) {
    return result;
  }

  revalidatePath("/admin/usuarios");

  return result;
}

export async function updatePortalUserAction(
  _previousState: UpdatePortalUserFormState,
  formData: FormData
): Promise<UpdatePortalUserFormState> {
  const currentUser = await requirePortalRole(UserRole.ADMIN);

  const prisma = getPrisma();
  const result = await updatePortalUser({
    repository: createPrismaUsersRepository(prisma),
    currentUser,
    userId: String(formData.get("userId") || ""),
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    role: String(formData.get("role") || ""),
    status: String(formData.get("status") || ""),
  });

  if (result.error) {
    return result;
  }

  revalidatePath("/admin/usuarios");

  return result;
}

export async function resetPortalUserPasswordAction(
  _previousState: UpdatePortalUserFormState,
  formData: FormData
): Promise<UpdatePortalUserFormState> {
  await requirePortalRole(UserRole.ADMIN);

  const prisma = getPrisma();
  const result = await resetPortalUserPassword({
    repository: createPrismaUsersRepository(prisma),
    passwordHasher: bcryptPasswordHasher,
    userId: String(formData.get("userId") || ""),
    password: String(formData.get("password") || ""),
  });

  if (result.error) {
    return result;
  }

  revalidatePath("/admin/usuarios");

  return result;
}
