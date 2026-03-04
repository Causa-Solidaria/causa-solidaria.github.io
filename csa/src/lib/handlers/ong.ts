import { ensureLogged, getToken, logoutAndRedirect } from "csa/lib/utils";
import { apiUrl } from "csa/lib/apiBase";
import { Apis } from "csa/Rotas.json";
import type { CriarOngData } from "csa/lib/validations";

// ===== CRIAR ONG =====

export async function handleCriarOng(
  form: CriarOngData,
  popup: (message: string) => void
): Promise<boolean> {
  try {
    if (!ensureLogged(popup)) return false;
    const token = getToken();

    const res = await fetch(apiUrl(Apis.ongs), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({} as any));

      if (res.status === 401) {
        const msg = (typeof errorData?.error === 'string' ? errorData.error : '').toLowerCase();
        if (msg.includes('expirado')) {
          logoutAndRedirect('Sua sessão expirou. Faça login novamente.', popup);
          return false;
        }
        if (msg.includes('inválido') || msg.includes('nao fornecido') || msg.includes('não fornecido')) {
          logoutAndRedirect('Token inválido. Faça login novamente.', popup);
          return false;
        }
      }

      // Erros de validação (ZodError: array de issues)
      if (res.status === 400 && Array.isArray(errorData?.error)) {
        const msgs = errorData.error.map((e: any) => e.message).join('; ');
        popup('Erro de validação: ' + msgs);
        return false;
      }

      console.error(errorData);
      popup('Erro ao criar ONG: ' + (errorData?.error ?? res.statusText));
      return false;
    }

    popup('ONG criada com sucesso!');
    return true;
  } catch (err) {
    console.error('Erro geral:', err);
    popup('Erro inesperado ao criar ONG');
    return false;
  }
}

// ===== DOAR PARA ONG =====
export interface DoarOngForm {
  category: string;
  message?: string;
  photoString?: string;
}

export async function handleDoarOng(
  slug: string,
  form: DoarOngForm,
  popup: (message: string) => void
): Promise<boolean> {
  // this is a stub implementation; in a real application you would hit an API endpoint
  try {
    console.log(`Doação para ONG ${slug}:`, form);
    popup('Doação enviada! Obrigado pela sua colaboração.');
    return true;
  } catch (err) {
    console.error('Erro ao enviar doação:', err);
    popup('Erro ao processar doação.');
    return false;
  }
}
