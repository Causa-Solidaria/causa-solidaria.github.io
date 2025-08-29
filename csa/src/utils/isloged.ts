// Utilidades de autenticação simples no cliente

export function getToken(): string | null {
	if (typeof window === 'undefined') return null;
	return localStorage.getItem('token');
}

export function isTokenExpired(token: string): boolean {
	try {
		const payloadPart = token.split('.')[1];
		if (!payloadPart) return true;
		const payload = JSON.parse(atob(payloadPart));
		if (!payload?.exp) return false;
		return payload.exp * 1000 < Date.now();
	} catch {
		return true;
	}
}

export function logoutAndRedirect(message?: string, popup?: (msg: string)=>void) {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('token');
		if (message) {
			if (popup) popup(message);
			else alert(message);
		}
		window.location.href = '/login';
	}
}

export function ensureLogged(popup?: (msg: string)=>void): boolean {
	const token = getToken();
	if (!token) {
		logoutAndRedirect('Você não está logado.', popup);
		return false;
	}
	if (isTokenExpired(token)) {
		logoutAndRedirect('Sua sessão expirou. Faça login novamente.', popup);
		return false;
	}
	return true;
}
