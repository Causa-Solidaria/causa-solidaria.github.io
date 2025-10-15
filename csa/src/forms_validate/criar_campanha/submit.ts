import { ensureLogged, getToken, logoutAndRedirect } from "csa/utils/isloged";
import { apiUrl } from "csa/lib/apiBase";

interface FormData {
  title?: string;
  description?: string;
  nivelAjuda?: string;
  cep?: string;
  cidade?: string;
  estado?: string;
  bairro?: string;
  rua?: string;
  numero?: string;
  endDate?: string;
  thumbnailString?: string;
}

export default async function handleCriarCampanha(
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
      body: JSON.stringify({
        titulo: form.title,
        descricao: form.description ?? '',
        nivelAjuda: form.nivelAjuda ?? 'Outros',
        cep: form.cep ?? '00000-000',
        cidade: form.cidade ?? 'Cidade',
        estado: form.estado ?? '',
        bairro: form.bairro ?? '',
        rua: form.rua ?? '',
        numero: form.numero ?? '',
        endDate: form.endDate,
        thumbnail: form.thumbnailString,
      }),
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
