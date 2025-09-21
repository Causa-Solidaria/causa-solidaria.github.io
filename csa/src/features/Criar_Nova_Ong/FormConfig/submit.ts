import { ensureLogged, getToken, logoutAndRedirect } from "csa/utils/isloged";
import { apiUrl } from "csa/lib/apiBase";

interface FormData {
}

export default async function handleCriarONG(
  form: FormData,
  popup: (message: string) => void
) {
  try {
    if (!ensureLogged(popup)) return;
    const token = getToken();

    const res = await fetch(apiUrl('/api/campanhas/add'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({} as any));
      if (res.status === 401 && typeof (errorData as any)?.error === 'string') {
        const msg = (errorData as any).error.toLowerCase();
        if (msg.includes('expirado')) {
          logoutAndRedirect('Sua sessão expirou. Faça login novamente.', popup);
          return;
        }
        if (msg.includes('inválido') || msg.includes('nao fornecido') || msg.includes('não fornecido')) {
          logoutAndRedirect('Token inválido. Faça login novamente.', popup);
          return;
        }
      }
      console.error(errorData);
      return popup('Erro ao criar campanha: ' + ((errorData as any)?.error ?? res.statusText));
    }

    const result = await res.json();
    console.log('Campanha criada:', result);
    popup('Campanha criada com sucesso!');
  } catch (err) {
    console.error('Erro geral:', err);
    popup('Erro inesperado ao criar campanha');
  }
}
