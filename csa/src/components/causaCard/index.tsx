import { Causa } from "csa/entities/Causas";
import { Thumbnail } from "./thumbnail";


interface CausaCardProps extends Causa {
    onClick: () => void;
}

export const CausaCard = (props: CausaCardProps) => {
    let thumb = props.thumbnail==null ? "" : props.thumbnail;
    return (<>
        <Thumbnail src={thumb}/>
    </>)
}