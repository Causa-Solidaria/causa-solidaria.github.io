
import { Heading as He, HeadingProps } from "@chakra-ui/react"
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPositions"

export default function Heading(
    {
        children, 
        MaxSizeDisplay = 3197, 
        fontSize = 36, 
        w = "min-content",
        h = "min-content",
        color = "#000",
        ...props
    }: 
    HeadingProps & {
        MaxSizeDisplay?: number | string,
        fontSize?: number | string | (number | string)[],
        w?: number | string | (number | string)[],
        h?: number | string | (number | string)[],
    }
){
    return (
    <He
        alignContent={"center"}
        fontSize={staticPosition(fontSize, MaxSizeDisplay)}
        lineHeight={1}
        color={color || "qui"}

        {...SetStaticPositionW(w, MaxSizeDisplay)}
        {...SetStaticPositionH(h, MaxSizeDisplay)}
        {...props}
    >
        {children}
    </He>
    )
}