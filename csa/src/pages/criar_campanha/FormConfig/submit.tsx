import { ensureLogged, getToken, logoutAndRedirect } from "csa/utils/isloged";

interface FormData {
    title: string;
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
        // checando se ta logado
    if (!ensureLogged(popup)) return;
    const token = getToken();


        /// enviando para a api para salvar no banco
        const res = await fetch("/api/campanhas/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(
                {
                    titulo: form.title,
                    descricao: form.description ?? "",
                    nivelAjuda: form.nivelAjuda ?? "Outros",
                    cep: form.cep ?? "00000-000",
                    cidade: form.cidade ?? "Cidade",
                    estado: form.estado ?? "Estado Teste",
                    bairro: form.bairro ?? "Bairro Teste",
                    rua: form.rua ?? "Rua Teste",
                    numero: form.numero ?? "123",
                    endDate: form.endDate,
                    thumbnail: form.thumbnailString, 
                }
            ),
        });


        /// checando se a resposta foi bem sucedida
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
        if (res.status === 401 && typeof errorData?.error === 'string') {
                if (errorData.error.toLowerCase().includes('expirado')) {
            logoutAndRedirect('Sua sessão expirou. Faça login novamente.', popup);
                    return;
                }
                if (errorData.error.toLowerCase().includes('inválido') || errorData.error.toLowerCase().includes('nao fornecido') || errorData.error.toLowerCase().includes('não fornecido')) {
            logoutAndRedirect('Token inválido. Faça login novamente.', popup);
                    return;
                }
            }
            console.error(errorData);
            return popup("Erro ao criar campanha: " + (errorData?.error ?? res.statusText));
        }

        /// processando a resposta
        const result = await res.json();
        
        console.log("Campanha criada:", result);
        popup("Campanha criada com sucesso!");

    } catch (err) {
        /// tratando erro geral
        console.error("Erro geral:", err);
        popup("Erro inesperado ao criar campanha");
    }
};
