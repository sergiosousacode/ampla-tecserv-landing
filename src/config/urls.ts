import { ENV } from '@/config/env';

export const URLS = {
    FACEBOOK: ENV.FACEBOOK,
    INSTAGRAM: ENV.INSTAGRAM,
    LINKEDIN: ENV.LINKEDIN,
    WHATSAPP: ENV.WHATSAPP,
    EMAIL: `mailto:${ENV.EMAIL}`,
};