import { Box, BoxProps } from "@chakra-ui/react";
import { SetStaticPositionH, SetStaticPositionW } from "csa/lib/utils";


export default function Separador(
    {
        dir="row", 
        size,
        maxsize,
        length = 1,
        color,
        ...props
    }: 
    {
        dir?: "row" | "column", 
        size?: number,
        maxsize?: number 
        length?: number, 
        color?: string
    } & BoxProps
){
    
    const w = dir==="row" ? size : length
    const h = dir==="column" ? size : length
    
    return(
        <Box
            bg={color}
            {...SetStaticPositionH(h as number, maxsize)}
            {...SetStaticPositionW(w as number, maxsize)}
            {...props}
        />
    )
}