import { ensureLogged, getToken, logoutAndRedirect } from "csa/lib/utils";
import { apiUrl } from "csa/lib/apiBase";
import { Apis } from "csa/Rotas.json";
import type { CriarForumData } from "csa/lib/validations";

// ===== Helper para tratar erros 401 =====

function handle401(errorData: any, popup: (msg: string) => void): boolean {
  if (typeof errorData?.error === "string") {
    const msg = errorData.error.toLowerCase();
    if (msg.includes("expirado")) {
      logoutAndRedirect("Sua sessão expirou. Faça login novamente.", popup);
      return true;
    }
    if (msg.includes("inválido") || msg.includes("nao fornecido") || msg.includes("não fornecido")) {
      logoutAndRedirect("Token inválido. Faça login novamente.", popup);
      return true;
    }
  }
  return false;
}

// ===== CRIAR TÓPICO =====

export async function handleCriarForum(
  form: CriarForumData,
  popup: (message: string) => void
): Promise<boolean> {
  try {
    if (!ensureLogged(popup)) return false;
    const token = getToken();

    const res = await fetch(apiUrl(Apis.foruns.add), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        titulo: form.titulo,
        descricao: form.descricao,
        tags: form.tags,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({} as any));
      if (res.status === 401 && handle401(errorData, popup)) return false;
      console.error(errorData);
      popup("Erro ao criar tópico: " + (errorData?.error ?? res.statusText));
      return false;
    }

    const result = await res.json();
    console.log("Tópico criado:", result);
    popup("Tópico criado com sucesso!");
    return true;
  } catch (err) {
    console.error("Erro geral:", err);
    popup("Erro inesperado ao criar tópico");
    return false;
  }
}

// ===== COMENTAR =====

export async function handleComentar(
  topicoId: number,
  conteudo: string,
  popup: (message: string) => void
): Promise<{ id: number; autor: { nome: string; foto?: string }; texto: string; data: string; karma: number } | null> {
  try {
    if (!ensureLogged(popup)) return null;
    const token = getToken();

    const res = await fetch(apiUrl(Apis.foruns.comentar), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ topicoId, conteudo }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({} as any));
      if (res.status === 401 && handle401(errorData, popup)) return null;
      popup("Erro ao comentar: " + (errorData?.error ?? res.statusText));
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Erro ao comentar:", err);
    popup("Erro inesperado ao enviar comentário");
    return null;
  }
}

// ===== VOTAR TÓPICO =====

export async function handleVotarTopico(
  topicoId: number,
  tipo: "UP" | "DOWN",
  popup: (message: string) => void
): Promise<{ karma: number; vote: "up" | "down" | null } | null> {
  try {
    if (!ensureLogged(popup)) return null;
    const token = getToken();

    const res = await fetch(apiUrl(Apis.foruns.votar), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ topicoId, tipo }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({} as any));
      if (res.status === 401 && handle401(errorData, popup)) return null;
      popup("Erro ao votar: " + (errorData?.error ?? res.statusText));
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Erro ao votar no tópico:", err);
    popup("Erro inesperado ao votar");
    return null;
  }
}

// ===== VOTAR COMENTÁRIO =====

export async function handleVotarComentario(
  comentarioId: number,
  tipo: "UP" | "DOWN",
  popup: (message: string) => void
): Promise<{ karma: number; vote: "up" | "down" | null } | null> {
  try {
    if (!ensureLogged(popup)) return null;
    const token = getToken();

    const res = await fetch(apiUrl(Apis.foruns.votar_comentario), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comentarioId, tipo }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({} as any));
      if (res.status === 401 && handle401(errorData, popup)) return null;
      popup("Erro ao votar: " + (errorData?.error ?? res.statusText));
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Erro ao votar no comentário:", err);
    popup("Erro inesperado ao votar");
    return null;
  }
}
