

export const handleCadastro = async (data: object, popup: any, reset?: any) => {
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

      if (window.location) window.location.href = '/login';
      
      popup("Cadastro realizado com sucesso!");

      if (reset) reset();

    } catch (error) {
      popup(`Erro no cadastro: ${error.message}`);
    }
  };
