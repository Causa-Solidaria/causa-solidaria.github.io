// Fora do handler (executa uma vez)
const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
const JWT_SECRET = process.env.JWT_SECRET;


if (!JWT_SECRET && !isDev) {
    throw new Error('JWT_SECRET ausente em produção');
}


// Em dev/test aceita vazio e usa fallback só local:
const effectiveSecret = JWT_SECRET || (isDev ? 'secreto-temporario' : '');




export function getJwtSecret() {
    if (isDev && !JWT_SECRET) {
       console.warn('[auth] Usando segredo de desenvolvimento provisório.');
    }
    
    return effectiveSecret;
}