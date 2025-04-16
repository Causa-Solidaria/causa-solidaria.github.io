'use client'

import { CardBox, CardSpaceContainer, CausaCardDescription, CausaCardImg, CausaCardInfo, CausaCardTitle } from "./styled"
import { Causa } from "csa/entities/Causas";
import { useEffect, useState } from "react";

interface CausaCardProps extends Causa {
    onClick: () => void;
}

const CausaCard = (props?: CausaCardProps) => {
   
    // estado que regula o estado da descrição
    const [descriptionSize, setDescriptionSize] = useState<number>(250);

    const shortDescription = (description: string) => {
        return description.substring(0, descriptionSize);
    };


    const handleResize = () => {
        const aspect = window.innerWidth / Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
        const sizeWindows = window.innerWidth * 0.1 * aspect;
        const maxSize = 90;
        const minSize = 50;
        const sizeLimited = Math.min(Math.max(sizeWindows, minSize), maxSize);
        setDescriptionSize(sizeLimited);
    };

    //efeito que regula o tamanho da descricrição
    useEffect(() => {
        handleResize(); 
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return ( 
        <>
                <CardBox>
                    <CausaCardImg
                        src={props?.tabela.thumbnail ?? ''} 
                        alt={props?.tabela.title ?? ''} 
                        width={100} 
                        height={100}
                    />
                    <CausaCardInfo>
                        <CausaCardTitle>{props?.tabela.title}</CausaCardTitle>
                        <CausaCardDescription>{shortDescription(props?.tabela.description ?? '')}...</CausaCardDescription>
                    </CausaCardInfo>
                </CardBox>
        </>
    );
}

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
            postCode: ""
        }
    },
    {
        id: "2",
        tabela: {
            title: "preciso de um lugar para morar",
            date: "24/02/2025",
            description: "test 2",
            priority: "3",
            thumbnail: "/logo.png",
            postCode: ""
        }
    }
]

const CardSpace = () => {
    return (<>
        <CardSpaceContainer>
            {MOKED_CAUSAS.map(causa =>
            (
                <CausaCard key={causa.id} tabela={causa.tabela} />
            )
        )}
        </CardSpaceContainer>
    </>)
}

export default CardSpace



    /////                                            -=-= requisitando o banco de dados usuario =-=-
    // const [users, setUsers] = useState([]);
    // useEffect(() => {
    //    fetch("/api/users")
    //        .then((res) => res.json())
    //        .then(setUsers)
    //        .catch((err) => console.error(err));
    //}, [])


