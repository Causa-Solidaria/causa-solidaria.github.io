import { Image, ImageProps } from "@chakra-ui/react";
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPositions";



export default function Logo({border, ...props}: any & ImageProps) {
    return (
        <Image 
            src={`/logo.png`} 
            alt="logo"
            {...props}
            border={` ${border || staticPosition(4, 3197)} solid rgba(0,0,0,0.3)`}  
        />
    )
}