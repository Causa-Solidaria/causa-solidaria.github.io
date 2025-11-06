import { Image, ImageProps } from "@chakra-ui/react";
import { staticPosition } from "csa/utils/staticPosition";



export default function Logo(props: any & ImageProps) {
    return (
        <Image 
            src={`/logo.png`} 
            alt="logo"
            {...props}
            width={props.width || `${staticPosition(100)}`}
            border={` ${staticPosition(4, 3197)} solid rgba(0,0,0,0.3)`}  
        />
    )
}