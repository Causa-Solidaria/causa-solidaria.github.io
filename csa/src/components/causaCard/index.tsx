import { Causa } from "csa/entities/Causas";
import Image from "next/image";
import { CardBox, CardInfo } from "./styled";
import { useEffect, useState, useRef, useLayoutEffect } from "react";

interface CausaCardProps extends Causa {
    onClick: () => void;
}

//const getSizeScreem

var ShortDescription = (description: string, cardsize = 250) =>{
    return description.substring(0, cardsize)
}

export const CausaCard = (props?: CausaCardProps) => {
    const [screenwidth, setscreenwidth] = useState<number>()

    const resize = () => {
        setscreenwidth(window.innerWidth)
    }

    return (<>
        <CardBox>
            <Image src={props?.tabela.thumbnail} width={100} height={100}/>
            <CardInfo>
                <h1>{props?.tabela.title}</h1>
                <p>{ShortDescription(props?.tabela.description)}...</p>
            </CardInfo>
        </CardBox>
    </>)
}