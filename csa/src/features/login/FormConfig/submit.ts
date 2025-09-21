import { apiUrl } from "csa/lib/apiBase";

interface LoginData {
  email: string;
  password: string;
}

export default async function handleLogin(
  data: LoginData,
  popupfunction?: (message: string) => void
) {
  try {
    const res = await fetch(apiUrl('/api/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) throw new Error(json.error || 'Erro desconhecido');

    localStorage.setItem('token', json.token);

    if (popupfunction) popupfunction('Login realizado com sucesso!');
    window.location.href = '/campanhas';
  } catch (error: any) {
    if (popupfunction) popupfunction(`Erro no login: ${error.message}`);
  }
}
