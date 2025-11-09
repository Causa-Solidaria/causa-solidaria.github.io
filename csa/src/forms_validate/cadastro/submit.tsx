import { apiUrl } from "csa/lib/apiBase";
import {Apis} from "csa/Rotas.json"

export default async function handleCadastro(
  data: object,
  popup: any,
) {
  try {
    const res = await fetch(apiUrl(Apis.Cadastro), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json();


    if (!res.ok) {
      throw new Error(json.error || 'Erro desconhecido');
    }

    popup('Cadastro realizado com sucesso!');
  } catch (error: any) {
    popup(`Erro no cadastro: ${error.message}`);
  }
}
