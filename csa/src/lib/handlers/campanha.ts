import { ensureLogged, getToken, logoutAndRedirect } from "csa/lib/utils";
import { apiUrl } from "csa/lib/apiBase";
import { Apis } from "csa/Rotas.json";
import type { CriarCampanhaData } from "csa/lib/validations";

// ===== INTERFACE PARA SUBMIT (com campo thumbnailString extra) =====

interface CriarCampanhaFormData extends Omit<CriarCampanhaData, 'thumbnail'> {
  thumbnailString?: string;
}

type CriarCampanhaSubmitResult = {
  ok: boolean;
  retryAfterSeconds?: number;
}

// ===== CRIAR CAMPANHA =====

export async function handleCriarCampanha(
  form: CriarCampanhaFormData,
  popup: (message: string) => void
): Promise<CriarCampanhaSubmitResult> {
  try {
    if (!ensureLogged(popup)) {
      return { ok: false };
    }
    const token = getToken();

    const res = await fetch(apiUrl(Apis.campanhas.add), {
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
        metaTipo: form.metaTipo,
        meta: form.meta,
        metaItem: form.metaItem ?? '',
        endDate: form.endDate,
        thumbnail: form.thumbnailString,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({} as any));

      if (res.status === 429) {
        const retryHeader = Number(res.headers.get("Retry-After") ?? "0");
        const retryAfterSeconds = Number.isFinite(retryHeader) && retryHeader > 0 ? retryHeader : 60;
        popup(`Muitas tentativas. Tente novamente em ${retryAfterSeconds}s.`);
        return { ok: false, retryAfterSeconds };
      }

      if (res.status === 401 && typeof errorData?.error === 'string') {
        const msg = errorData.error.toLowerCase();
        if (msg.includes('expirado')) {
          logoutAndRedirect('Sua sessão expirou. Faça login novamente.', popup);
          return { ok: false };
        }
        if (msg.includes('inválido') || msg.includes('nao fornecido') || msg.includes('não fornecido')) {
          logoutAndRedirect('Token inválido. Faça login novamente.', popup);
          return { ok: false };
        }
      }
      console.error(errorData);
      popup('Erro ao criar campanha: ' + (errorData?.error ?? res.statusText));
      return { ok: false };
    }

    const result = await res.json();
    console.log('Campanha criada:', result);
    popup('Campanha criada com sucesso!');
    return { ok: true };
  } catch (err) {
    console.error('Erro geral:', err);
    popup('Erro inesperado ao criar campanha');
    return { ok: false };
  }
}

// ===== DOAR ITEM PARA CAMPANHA =====

interface DoarCampanhaFormData {
  message?: string;
  photoString?: string;
}

export async function handleDoarCampanha(
  form: DoarCampanhaFormData,
  popup: (message: string) => void
) {
  try {
    if (!ensureLogged(popup)) return;
    const token = getToken();

    // NOTE: endpoint ainda não existe no backend, por isso apenas logamos e mostramos popup.
    // Se o backend for implementado, substitua a URL abaixo e a lógica.
    console.log('Simulando doação:', form);
    popup('Doação enviada! Obrigado por contribuir.');
  } catch (err) {
    console.error('Erro geral ao doar:', err);
    popup('Erro inesperado ao enviar doação');
  }
}
