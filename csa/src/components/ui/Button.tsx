import { Button as B, ButtonProps } from "@chakra-ui/react"
import { staticPosition } from "csa/lib/utils"
import React from 'react'

interface Bprops extends ButtonProps {
    level?: (1 | 2 | 3 | 4) & number 
}


const levels: ButtonProps[] = []
levels[1] = {bg: "#097D03", color: "#fff"}
levels[2] = {bg: "#D9D9D9", color: "#000", border: "0.1vmax solid #000"}
levels[3] = {bg: "#C2FFBF", color: "#097D03",  border: "0.1vmax solid #097d03"}
levels[4] = {bg: "#000", color: "#fff"}

export default function Button({level, ...props}: Bprops){
    const Blevel  = levels[(level as number) || 1]

    return (
    <B
        m={"1vmax"}
        p={"1vmax"}
        borderRadius={staticPosition(10, 1280)}
        justifyContent={"center"}
        {...(Blevel || {})}
        {...props}
    >{props.children}</B>)
}
