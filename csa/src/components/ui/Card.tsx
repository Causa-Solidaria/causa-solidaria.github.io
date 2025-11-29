


import React from 'react'
import Box from './Box'
import { shadowStatic, staticPosition } from 'csa/utils/staticPositions'
import { BoxProps } from '@chakra-ui/react'

interface CardProps extends BoxProps{
    onClick?: React.MouseEventHandler
    borderRadius?: number | string
    elevation?: number
    children?: React.ReactNode
}

export function Card({ children, bg,...props }: CardProps) {
    const st = (s:number)=>staticPosition(s, 1871)

    return (
        <Box 
            p={st(62)} 
            bg={bg || "#fff"} 
            borderRadius={st(20)}
            {...shadowStatic(10, 15, 30, "rgba(0,0,0,0.2)", 1890)}
            {...props}
        >
            {children}
        </Box>
    )
}