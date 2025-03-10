import { Causa } from "csa/entities/Causas";
import Image from "next/image";
import { Card } from "./styled";

interface CausaCardProps extends Causa {
    onClick: () => void;
}

export const CausaCard = (props?: CausaCardProps) => {
    return (<>
        <Card>
            <Image src={props?.thumbnail} width={100} height={100}/>
            <h1>test do card {props.id}</h1>
        </Card>
    </>)
}