import { PrismaClient } from "@prisma/client";

// Tipos globais para TypeScript
declare global {
    var prisma: PrismaClient | undefined;
}

// Constantes de ambiente
const NODE_ENV = process.env.NODE_ENV;
const IS_PRODUCTION = NODE_ENV === "production";
const IS_DEVELOPMENT = NODE_ENV === "development";

/**
 * Configuração do Prisma Client
 * - Em produção: usa POSTGRES_DATABASE_URL e desabilita logs
 * - Em desenvolvimento: usa DATABASE_URL e habilita query logs
 * - Previne múltiplas instâncias no hot reload do Next.js
 */

// Função para obter a URL do banco de dados baseada no ambiente
function getDatabaseUrl(): string | undefined {
    const { DATABASE_URL, POSTGRES_DATABASE_URL } = process.env;
    
    if (!DATABASE_URL && !POSTGRES_DATABASE_URL) {
        console.warn("⚠️  Nenhuma DATABASE_URL configurada nas variáveis de ambiente");
        return undefined;
    }
    
    return IS_PRODUCTION ? POSTGRES_DATABASE_URL : DATABASE_URL;
}

// Configuração do cliente
function createPrismaClient(): PrismaClient {
    const databaseUrl = getDatabaseUrl();
    
    return new PrismaClient({
        // Logs apenas em desenvolvimento
        log: IS_DEVELOPMENT ? ["query", "error", "warn"] : ["error"],
        
        // Configuração do datasource
        ...(databaseUrl && {
            datasources: {
                db: { url: databaseUrl }
            }
        })
    });
}

// Singleton pattern para evitar múltiplas instâncias
export const prisma = global.prisma ?? createPrismaClient();

// Em desenvolvimento, salva a instância globalmente para sobreviver ao hot reload
if (IS_DEVELOPMENT) {
    global.prisma = prisma;
}

// Graceful shutdown - fecha conexões ao encerrar o processo
if (IS_PRODUCTION) {
    process.on("beforeExit", async () => {
        await prisma.$disconnect();
    });
}