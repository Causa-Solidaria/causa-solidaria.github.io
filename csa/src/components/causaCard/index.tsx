import { Causa } from "csa/entities/Causas";
import Image from "next/image";
import { CausaCardBox, CausaCardInfo } from "./styled";
import { useEffect, useState } from "react";

interface CausaCardProps extends Causa {
    onClick: () => void;
}



    /////                                            -=-= requisitando o banco de dados usuario =-=-
    // const [users, setUsers] = useState([]);
    // useEffect(() => {
    //    fetch("/api/users")
    //        .then((res) => res.json())
    //        .then(setUsers)
    //        .catch((err) => console.error(err));
    //}, [])


export const CausaCard = (props?: CausaCardProps) => {
   
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
                <CausaCardBox >
                    <Image 
                        src={props?.tabela.thumbnail ?? ''} 
                        alt={props?.tabela.title ?? ''} 
                        width={100} 
                        height={100}
                    />
                    <CausaCardInfo>
                    
                        <h1>{props?.tabela.title}</h1>
                        <p>{shortDescription(props?.tabela.description ?? '')}...</p>
                    </CausaCardInfo>
                </CausaCardBox>
        </>
    );
}