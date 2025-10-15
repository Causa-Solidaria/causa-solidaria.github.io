import { apiUrl } from "csa/lib/apiBase";

export default async function handleCadastro(data: object, popup: any, reset: any) {
  try {
    const res = await fetch(apiUrl('/api/cadastro'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.error || 'Erro desconhecido');
    }

    if (popup) popup('Cadastro realizado com sucesso!');
    if (reset) reset();
  } catch (error: any) {
    if (popup) popup(`Erro no cadastro: ${error.message}`);
  }
}
