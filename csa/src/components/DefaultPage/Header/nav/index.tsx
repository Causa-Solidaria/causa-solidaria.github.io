"use client"

import { Box } from "@chakra-ui/react";
import { SetStaticPositionH, SetStaticPositionW, staticPosition, getToken, isTokenExpired } from "csa/lib/utils";
import { useState, useEffect, useMemo } from "react";

import { baseButtons, perfilButton } from "./buttons"
import Heading from "csa/components/ui/heading";

// Número fixo de botões para o layout inicial (evita hydration mismatch)
const INITIAL_BUTTON_COUNT = baseButtons.length

export default function Nav({open, anim}:{open: boolean, anim: boolean}){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const token = getToken()
        setIsLoggedIn(!!token && !isTokenExpired(token))
    }, [])

    // Botões a serem exibidos
    const buttons = useMemo(() => {
        if (!mounted) return baseButtons // SSR: sempre os mesmos botões
        return isLoggedIn ? [perfilButton, ...baseButtons] : baseButtons
    }, [mounted, isLoggedIn])

    // Calcular offset baseado no número de botões
    const buttonCount = mounted ? buttons.length : INITIAL_BUTTON_COUNT
    const closedOffset = -(200 * buttonCount)
    const closedTransform = `translateY(calc(100vmax * ${closedOffset} / 3197))`

    return (
        <Box
            maxW={staticPosition(779, 3197)}
            minW={staticPosition(779, 3197)}
            maxH={staticPosition(125 * buttonCount, 3197)}
            minH={staticPosition(125 * buttonCount, 3197)}
            bg={"qui"}
            pos={"absolute"}
            right={0}
            zIndex={99}
            display={"flex"}
            flexDir={"column"}
            boxShadow={`${staticPosition(-30, 3197)} ${staticPosition(30, 3197)} ${staticPosition(30, 3197)}  rgba(255,255,255,0.15) `}
            style={{
                transform: open ? "translateY(0)" : closedTransform,
                transition: anim ? "transform 0.7s ease-in" : "none"
            }}
        >
            {buttons.map(({title, link}, index) => (
                <a
                    key={title} 
                    href={link}
                >
                    <Heading  
                        color={"ter"}
                        fontSize={64}
                        h={122}
                        px={staticPosition(40, 3197)}
                    >
                        {title}
                    </Heading>
                    <Box  
                        {...SetStaticPositionH(3, 3197)}
                        {...SetStaticPositionW(779, 3197)}
                        bg={"ter"} 
                    />
                </a>
            ))}
        </Box>
    )
}