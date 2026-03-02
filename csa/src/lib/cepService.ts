/**
 * Serviço para buscar dados de endereço através do CEP
 * Usa um endpoint de API no Next.js para evitar problemas de CORS
 */

export interface CepData {
  cep: string;
  bairro: string;
  cidade: string;
  uf: string;
  rua: string;
}

/**
 * Busca dados de endereço através do CEP
 * @param cep - CEP sem máscara (apenas números)
 * @returns Dados do endereço ou null em caso de erro
 */
export async function buscarDadosPorCep(cep: string): Promise<CepData | null> {
  try {
    // Remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      return null;
    }

    const response = await fetch(`/api/cep?cep=${cepLimpo}`);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    // Verifica se há campo de erro na resposta
    if (data.error) {
      return null;
    }

    return {
      cep: data.cep || cepLimpo,
      bairro: data.bairro || '',
      cidade: data.cidade || '',
      uf: data.uf || '',
      rua: data.rua || '',
    };
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);
    return null;
  }
}
