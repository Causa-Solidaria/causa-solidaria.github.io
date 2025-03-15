import { CardSpaceStyled } from "./styled"
import { CausaCard } from "csa/components/causaCard";
import { Causa } from "csa/entities/Causas";

// test exemplo
const MOKED_CAUSAS: Causa[] = [
    {
        id: "1",
        tabela: {
            title: "preciso alimentar meu filho",
            date: "24/02/2025",
            description: "estou desenpregada a 2 meses e tenho um filho para alimentar, tenho lutado muito para alimentar o enzo, da maneira que posso. Mas recentemente acabei com todos os ratos que tinha guardado para comer, e isso ja faz 2 dias... soube desse site por um anuncio que vi no celular, e soube que aqui posso fazer um mini-capanha de ajuda. perço que porfavor me ajudem a alimentar meu filho com pelo meno uma cesta basica.",
            priority: "3",
            thumbnail: "/logo.png",
            postCode: "59060-160"
        }
    },
    {
        id: "2",
        tabela:{
            title: "preciso alimentar meu filho",
            date: "24/02/2025",
            description: "estou desenpregada a 2 meses e tenho um filho para alimentar, tenho lutado muito para alimentar o enzo, da maneira que posso. Mas recentemente acabei com todos os ratos que tinha guardado para comer, e isso ja faz 2 dias... soube desse site por um anuncio que vi no celular, e soube que aqui posso fazer um mini-capanha de ajuda. perço que porfavor me ajudem a alimentar meu filho com pelo meno uma cesta basica.",
            priority: "3",
            thumbnail: "/logo.png",
            postCode: "59060-160"
        }
    }
];

const CardSpace = () => {
    return (<>
        <CardSpaceStyled>
            {MOKED_CAUSAS.map(causa => (
                <CausaCard key={causa.id} tabela={causa.tabela} />
            ))}
        </CardSpaceStyled>
    </>)
}

export default CardSpace