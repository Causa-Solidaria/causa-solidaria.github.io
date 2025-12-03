import { Image, ImageProps } from "@chakra-ui/react";
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/lib/utils";



export default function Logo({border,  ...props}: any & ImageProps) {
    const st =(s: number)=>staticPosition(s, 1890)
    return (
        <Image 
            src={`/logo.png`} 
            alt="logo"
            borderRadius={st(20)}
            {...props}

            border={` ${border || staticPosition(4, 3197)} solid rgba(0,0,0,0.3)`}  
        />
    )
}