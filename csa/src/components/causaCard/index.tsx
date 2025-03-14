import { Causa } from "csa/entities/Causas";
import Image from "next/image";
import { CardBox, CardInfo } from "./styled";

interface CausaCardProps extends Causa {
    onClick: () => void;
}

const getSizeScreem

var ShortDescription = (description: string) =>{
    let widthscr = window.innerWidth.valueOf()
    let size = 250 - (widthscr / 100) 
    return description.substring(0, size)
}

export const CausaCard = (props?: CausaCardProps) => {
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