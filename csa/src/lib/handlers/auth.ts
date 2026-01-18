import { apiUrl } from "csa/lib/apiBase";
import { Apis, Home} from "csa/Rotas.json";
import type { LoginData, CadastroData } from "csa/lib/validations";

// ===== LOGIN =====

export async function handleLogin(
  data: LoginData,
  popup?: (message: string) => void
) {
  try {
    const res = await fetch(apiUrl(Apis.login), {
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

    if (popup) popup('Login realizado com sucesso!');
    window.location.href = Home;
  } catch (error: any) {
    if (popup) popup(`Erro no login: ${error.message}`);
  }
}

// ===== CADASTRO =====

export async function handleCadastro(
  data: CadastroData,
  popup?: (message: string) => void
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

    if (popup) popup('Cadastro realizado com sucesso!');
    window.location.href = Home
  } catch (error: any) {
    if (popup) popup(`Erro no cadastro: ${error.message}`);
  }
  
}
