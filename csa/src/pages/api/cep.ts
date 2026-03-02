import type { NextApiRequest, NextApiResponse } from "next";

interface CepData {
  cep: string;
  bairro: string;
  cidade: string;
  uf: string;
  rua: string;
}

type ResponseData = CepData | { error: string };

/**
 * Tenta buscar dados do CEP nas APIs disponíveis
 */
async function buscarDoViaCEP(cepLimpo: string): Promise<CepData | null> {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`, {
      signal: AbortSignal.timeout(5000), // timeout de 5 segundos
    });

    if (!response.ok) {
      console.warn(`[ViaCEP] Status ${response.status} para CEP ${cepLimpo}`);
      return null;
    }

    const data = await response.json();

    if (data.erro) {
      console.info(`[ViaCEP] CEP não encontrado: ${cepLimpo}`);
      return null;
    }

    return {
      cep: data.cep || cepLimpo,
      bairro: data.bairro || "",
      cidade: data.localidade || "",
      uf: data.uf || "",
      rua: data.logradouro || "",
    };
  } catch (error) {
    console.warn(`[ViaCEP] Erro ao buscar: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

/**
 * Fallback: BrasilAPI - API confiável brazodeira
 */
async function buscarDaBrasilAPI(cepLimpo: string): Promise<CepData | null> {
  try {
    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${cepLimpo}`, {
      signal: AbortSignal.timeout(5000), // timeout de 5 segundos
    });

    if (!response.ok) {
      console.warn(`[BrasilAPI] Status ${response.status} para CEP ${cepLimpo}`);
      return null;
    }

    const data = await response.json();

    return {
      cep: data.cep || cepLimpo,
      bairro: data.bairro || "",
      cidade: data.city || "",
      uf: data.state || "",
      rua: data.street || "",
    };
  } catch (error) {
    console.warn(`[BrasilAPI] Erro ao buscar: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

/**
 * Endpoint de API para buscar dados de endereço pelo CEP
 * Tenta múltiplas fontes em fallback
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { cep } = req.query;

  if (!cep || typeof cep !== "string") {
    return res.status(400).json({ error: "CEP não fornecido" });
  }

  try {
    // Remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      return res.status(400).json({ error: "CEP inválido - deve ter 8 dígitos" });
    }

    console.log(`[CEP API] Buscando CEP: ${cepLimpo}`);

    // Tenta ViaCEP primeiro
    let resultado = await buscarDoViaCEP(cepLimpo);

    // Se ViaCEP falhar, tenta BrasilAPI
    if (!resultado) {
      console.info(`[CEP API] ViaCEP falhou. Tentando BrasilAPI...`);
      resultado = await buscarDaBrasilAPI(cepLimpo);
    }

    if (!resultado) {
      console.warn(`[CEP API] CEP não encontrado em nenhuma fonte: ${cepLimpo}`);
      return res.status(404).json({ error: "CEP não encontrado" });
    }

    console.log(`[CEP API] CEP encontrado: ${cepLimpo}`, resultado);
    return res.status(200).json(resultado);
  } catch (error) {
    console.error(`[CEP API] Erro inesperado:`, error);
    return res.status(500).json({ error: "Erro ao buscar CEP" });
  }
}
