export interface PasswordHasher {
  compare(password: string, hash: string): Promise<boolean>;
  hash(password: string): Promise<string>;
}
