import { CardSpaceStyled } from "./styled"
import { CausaCard } from "csa/components/causaCard";
import { Causa } from "csa/entities/Causas";
import { useState, useEffect } from "react";

const CardSpace = () => {
    const [causas, setCausas] = useState<Causa[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCausas = async () => {
            try {
                const response = await fetch('/api/causas');
                
                if (!response.ok) {
                    throw new Error('Falha ao buscar causas');
                }
                
                const data = await response.json();
                setCausas(data);
            } catch (error) {
                console.error('Erro ao buscar causas:', error);
                setError('Não foi possível carregar as causas. Tente novamente mais tarde.');
            } finally {
                setLoading(false);
            }
        };

        fetchCausas();
    }, []);

    const handleCausaClick = (causaId: string) => {
        console.log(`Causa clicada: ${causaId}`);
        // Aqui você pode implementar a navegação para a página de detalhes da causa
        // Por exemplo: router.push(`/causas/${causaId}`);
    };

    if (loading) {
        return <CardSpaceStyled><p>Carregando causas...</p></CardSpaceStyled>;
    }

    if (error) {
        return <CardSpaceStyled><p>{error}</p></CardSpaceStyled>;
    }

    if (causas.length === 0) {
        return <CardSpaceStyled><p>Nenhuma causa encontrada.</p></CardSpaceStyled>;
    }

    return (
        <CardSpaceStyled>
            {causas.map(causa => (
                <CausaCard 
                    key={causa.id} 
                    {...causa} 
                    onClick={() => handleCausaClick(causa.id)} 
                />
            ))}
        </CardSpaceStyled>
    );
}

export default CardSpace