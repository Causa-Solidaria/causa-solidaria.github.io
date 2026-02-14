import { apiUrl } from "csa/lib/apiBase";
import { Apis, Home } from "csa/Rotas.json";
import type { LoginData, CadastroData } from "csa/lib/validations";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { NextRouter } from "next/router";

type RouterType = NextRouter | AppRouterInstance;

// ===== LOGIN =====

export async function handleLogin(
  data: LoginData,
  popup?: (message: string) => void,
  router?: RouterType
) {
  try {
    const res = await fetch(apiUrl(Apis.login), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    let raw = '';
    let payload: Record<string, unknown> | null = null;
    try {
      raw = await res.text();
      payload = raw ? JSON.parse(raw) : null;
    } catch {
      // corpo não-JSON ou vazio: manter payload como null
    }

    if (!res.ok) {
      const errMsg = (payload?.error as string) || raw || res.statusText || 'Erro desconhecido';
      throw new Error(errMsg);
    }

    const token = payload?.token as string | undefined;
    if (!token) {
      throw new Error('Resposta inválida do servidor (token ausente).');
    }

    localStorage.setItem('token', token);

    if (popup) popup('Login realizado com sucesso!');
    
    if (router) {
      router.push(Home);
    } else {
      window.location.href = Home;
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    if (popup) popup(`Erro no login: ${errorMessage}`);
  }
}

// ===== CADASTRO =====

export async function handleCadastro(
  data: CadastroData,
  popup?: (message: string) => void,
  router?: RouterType
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
    
    if (router) {
      router.push(Home);
    } else {
      window.location.href = Home;
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    if (popup) popup(`Erro no cadastro: ${errorMessage}`);
  }
}
