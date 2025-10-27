
import { Heading as He, HeadingProps } from "@chakra-ui/react"
import { staticPosition } from "csa/utils/staticPosition"

export default function Heading(
    {
        children, 
        MaxSizeDisplay = 3197, 
        fontSize = 36, 
        w = "min-content",
        h = "min-content",
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
        minW={staticPosition(w, MaxSizeDisplay)}
        maxW={staticPosition(w, MaxSizeDisplay)}
        minH={staticPosition(h, MaxSizeDisplay)}
        maxH={staticPosition(h, MaxSizeDisplay)}
        lineHeight={1}
        color="qui"
        {...props}
    >
        {children}
    </He>
    )
}