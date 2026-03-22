function required(name: string, value?: string){
    if (!value){
        throw new Error(`Variável de ambiente ausente: ${name}`);

    }
    return value;
}

export const ENV = {
    FACEBOOK: required("NEXT_PUBLIC_FACEBOOK", process.env.NEXT_PUBLIC_FACEBOOK),
    INSTAGRAM: required("NEXT_PUBLIC_INSTAGRAM", process.env.NEXT_PUBLIC_INSTAGRAM),
    LINKEDIN: required("NEXT_PUBLIC_LINKEDIN", process.env.NEXT_PUBLIC_LINKEDIN),
    WHATSAPP: required("NEXT_PUBLIC_WHATSAPP", process.env.NEXT_PUBLIC_WHATSAPP),
    EMAIL: required("NEXT_PUBLIC_EMAIL", process.env.NEXT_PUBLIC_EMAIL),
}