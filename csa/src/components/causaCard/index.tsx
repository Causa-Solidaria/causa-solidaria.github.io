import { Causa } from "csa/entities/Causas";
import Image from "next/image";
import { CardBox, CardInfo } from "./styled";
import { useEffect, useState } from "react";

interface CausaCardProps extends Causa {
    onClick: () => void;
}

//const getSizeScreem

export const CausaCard = (props?: CausaCardProps) => {
    const [descriptionSize, setDescriptionSize] = useState<number>(250);

    const shortDescription = (description: string) => {
        return description.substring(0, descriptionSize);
    };

    const handleResize = () => {
        const aspect = window.innerWidth / Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
        const sizeWindows = window.innerWidth * 0.2 * aspect;
        const maxSize = 150;
        const minSize = 85;
        const sizeLimited = Math.min(Math.max(sizeWindows, minSize), maxSize);
        setDescriptionSize(sizeLimited);
    };

    /////                                            -=-= requisitando o banco de dados usuario =-=-
    // const [users, setUsers] = useState([]);
    // useEffect(() => {
    //    fetch("/api/users")
    //        .then((res) => res.json())
    //        .then(setUsers)
    //        .catch((err) => console.error(err));
    //}, [])

    useEffect(() => {
        handleResize(); // Executa uma vez ao montar o componente
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return ( 
        <>
                <CardBox >
                    <Image 
                        src={props?.tabela.thumbnail ?? ''} 
                        alt={props?.tabela.title ?? ''} 
                        width={100} 
                        height={100}
                    />
                    <CardInfo>
                    
                        <h1>{props?.tabela.title}</h1>
                        <p>{shortDescription(props?.tabela.description ?? '')}...</p>
                    </CardInfo>
                </CardBox>
        </>
    );
}