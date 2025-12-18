import {Text as T, TextProps} from "@chakra-ui/react"

interface Tprops extends TextProps {
    level?: (1 | 2 | 3) & number
}

const levels: TextProps[] = []
levels[1] = {color: "#006E1F"}
levels[2] = {color: "#fff"}
levels[3] = {color: "#000"}

export default function Text({children, level, ...props}: Tprops){
    const Tlevel = levels[(level as number) | 1]
    return (<T
        fontFamily={"quicksand"}
        fontWeight={"900"}
        {...Tlevel}
    >
        {children}
    </T>)
}