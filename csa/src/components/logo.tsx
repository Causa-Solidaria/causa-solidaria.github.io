import { Image, ImageProps } from "@chakra-ui/react";
import { staticPosition } from "csa/utils/staticPosition";
import { stat } from "node:fs";



export default function Logo(props: any & ImageProps) {
    return (
        <Image 
            src={`/logo.png`} 
            alt="logo"
            {...props}
            border={` ${staticPosition(4, 3197)} solid #000`}  
        />
    )
}