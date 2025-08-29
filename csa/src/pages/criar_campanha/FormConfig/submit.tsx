
export const handleCriarCampanha = async (form: any, popup: any) => {
    try {
        // checando se ta logado
        const token = localStorage.getItem("token");
        if (!token) return popup("Você não está logado!");


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
            const errorData = await res.json();
            console.error(errorData);
            return popup("Erro ao criar campanha: " + errorData.error);
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
