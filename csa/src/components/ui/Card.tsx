


import React from 'react'
import Box from './Box'
import { BoxProps } from '@chakra-ui/react'
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames";

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
        temSombra = true,
        temBorda = false,
        ...props
    }: CardProps 
) {
    const mergedClassName = MergeClassnames(
        styles.card,
        temBorda ? styles.cardWithBorder : undefined,
        temSombra ? styles.cardWithShadow : undefined,
        props.className
    )

    return (
            <Box 
                className={mergedClassName}
                {...props}
            >
                {children}
            </Box>
    )
}


export default Card