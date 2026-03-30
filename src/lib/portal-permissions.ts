import { UserRole } from "@prisma/client";

export const INTERNAL_PORTAL_ROLES: UserRole[] = [
  UserRole.ADMIN,
  UserRole.OPERATIONAL,
];

export function getPortalHomeByRole(role: UserRole) {
  switch (role) {
    case UserRole.CLIENT:
      return "/cliente";
    case UserRole.ADMIN:
    case UserRole.OPERATIONAL:
    default:
      return "/admin";
  }
}

export function canAccessAdmin(role: UserRole) {
  return INTERNAL_PORTAL_ROLES.includes(role);
}

export function canManageUsers(role: UserRole) {
  return role === UserRole.ADMIN;
}

export function canManageServices(role: UserRole) {
  return role === UserRole.ADMIN;
}
