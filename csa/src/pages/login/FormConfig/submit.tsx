

export default async function handleLogin (data: any, popupfunction?: any) {
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        const json = await res.json();

        if (!res.ok) throw new Error(json.error || "Erro desconhecido");

        // Salva o token no localStorage
        localStorage.setItem('token', json.token);

        if (popupfunction) popupfunction("Login realizado com sucesso!");
        // Redireciona para a página de campanhas
        window.location.href = '/campanhas';
        

    } catch (error: any) {
        if (popupfunction) popupfunction(`Erro no login: ${error.message}`);
    }
};