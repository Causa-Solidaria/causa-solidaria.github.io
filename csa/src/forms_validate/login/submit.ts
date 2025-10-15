import { apiUrl } from "csa/lib/apiBase";
import type { SchemaType } from "./schema";

export default async function handleLogin(
  data: SchemaType,
  popupfunction?: (message: string) => void
) {
  try {
    const res = await fetch(apiUrl('/api/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    let raw = '';
    let payload: any = null;
    try {
      raw = await res.text();
      payload = raw ? JSON.parse(raw) : null;
    } catch (_) {
      // corpo não-JSON ou vazio: manter payload como null
    }

    if (!res.ok) {
      const errMsg = payload?.error || raw || res.statusText || 'Erro desconhecido';
      throw new Error(errMsg);
    }

    const token = payload?.token;
    if (!token) {
      throw new Error('Resposta inválida do servidor (token ausente).');
    }

    localStorage.setItem('token', token);

    if (popupfunction) popupfunction('Login realizado com sucesso!');
    window.location.href = '/campanhas';
  } catch (error: any) {
    if (popupfunction) popupfunction(`Erro no login: ${error.message}`);
  }
}
