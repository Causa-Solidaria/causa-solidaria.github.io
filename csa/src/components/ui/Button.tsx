import { Button as B, ButtonProps } from "@chakra-ui/react"
import { staticPosition } from "csa/lib/utils"
import React from 'react'

interface Bprops extends ButtonProps {
    level?: (1 | 2 | 3) & number 
}


const levels: ButtonProps[] = []
levels[1] = {bg: "#097D03", color: "#fff"}
levels[2] = {}
levels[3] = {}


export default function Button(props: Bprops){
    const Blevel  = levels[props.level as number || 1]

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
