

export const handleCadastro = async (data: object, popup: any) => {
    try {
      const res = await fetch('/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Erro desconhecido");
      }

      popup("Cadastro realizado com sucesso!");
    } catch (error) {
      popup(`Erro no cadastro: ${error.message}`);
    }
  };
