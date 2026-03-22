function getEnv(value: string | undefined, fallback: string) {
  return value && value.trim() !== "" ? value : fallback;
}

export const ENV = {
  FACEBOOK: getEnv(
    process.env.NEXT_PUBLIC_FACEBOOK,
    "https://www.facebook.com/profile.php?id=61586066113887"
  ),
  INSTAGRAM: getEnv(
    process.env.NEXT_PUBLIC_INSTAGRAM,
    "https://www.instagram.com/ampla_tecserv"
  ),
  LINKEDIN: getEnv(
    process.env.NEXT_PUBLIC_LINKEDIN,
    "https://www.linkedin.com/company/ampla-tecserv"
  ),
  WHATSAPP: getEnv(
    process.env.NEXT_PUBLIC_WHATSAPP,
    "https://wa.me/5583993711271"
  ),
  EMAIL: getEnv(
    process.env.NEXT_PUBLIC_EMAIL,
    "amplatecserv@gmail.com"
  ),
};