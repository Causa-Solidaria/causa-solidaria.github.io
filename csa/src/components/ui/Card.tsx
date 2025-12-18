


import React from 'react'
import Box from './Box'
import {  shadowStatic, staticPosition } from 'csa/lib/utils'
import { BoxProps } from '@chakra-ui/react'

interface CardProps extends BoxProps{
    onClick?: React.MouseEventHandler
    borderRadius?: number | string
    elevation?: number
    children?: React.ReactNode
    temSombra?: boolean 
    temBorda?: boolean
}

function Card(
    { 
        children, 
        bg, 
        temSombra = true,
        temBorda = false,
        ...props
    }: CardProps 
) {
    const st = (s:number)=>staticPosition(s, 1871)

    return (
            <Box 
                p={"1vmax"} 
                m={"1vmax"}
                justifyContent={"center"}
                bg={bg || "#fff"} 
                borderRadius={st(10)}
                border={temBorda? "0.1vmax solid": "none"}
                transition={"all 0.6s ease-in-out"}
                {...(temSombra ? shadowStatic(10, 15, 30, "rgba(0,0,0,0.2)", 1890) : {})}
                {...props}
            >
                {children}
            </Box>
    )
}


export default Card