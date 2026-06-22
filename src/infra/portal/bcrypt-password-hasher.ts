import bcrypt from "bcrypt";
import type { PasswordHasher } from "@/application/portal/passwords";

export const bcryptPasswordHasher: PasswordHasher = {
  compare(password, hash) {
    return bcrypt.compare(password, hash);
  },
  hash(password) {
    return bcrypt.hash(password, 10);
  },
};
