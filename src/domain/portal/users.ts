import { UserRole, UserStatus } from "@prisma/client";

export interface PortalUserAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  status: UserStatus;
}

export interface PortalSessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export interface PortalUsersRepository {
  findByEmail(email: string): Promise<PortalUserAccount | null>;
  findSessionUserById(id: string): Promise<PortalSessionUser | null>;
  findUserSummaryById(id: string): Promise<{ id: string; name: string } | null>;
  findUserIdByEmail(email: string): Promise<{ id: string } | null>;
  create(input: {
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
    status: UserStatus;
  }): Promise<void>;
  updateProfile(input: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
  }): Promise<void>;
  updatePassword(input: { id: string; passwordHash: string }): Promise<void>;
}
