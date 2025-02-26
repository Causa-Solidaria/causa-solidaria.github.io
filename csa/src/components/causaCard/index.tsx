import { Causa } from "csa/entities/Causas";
import { Thumbnail } from "./thumbnail";
import Image from "next/image";


interface CausaCardProps extends Causa {
    onClick: () => void;
}

export const CausaCard = (props: CausaCardProps) => {
    let thumb = props.thumbnail==null ? "" : props.thumbnail;
    return (<>
        <Image src={thumb} width={100} height={100}/>
        <h1>test do card {props.id}</h1>
    </>)
}