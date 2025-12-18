"use client"
import { staticPosition, getToken, isTokenExpired, SetStaticPositionW } from "csa/lib/utils";
import { useState, useEffect, useMemo } from "react";

import { baseButtons, perfilButton } from "./buttons"
import Heading from "csa/components/ui/heading";
import { motion } from "framer-motion";


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
        <motion.div
            layout
            style={{
                maxWidth: "20vw",
                minWidth: "20vw",
                background: "#fff",
                position: "absolute",
                zIndex: 99,
                display: "flex",
                right: 0,
                flexDirection: "column",
                boxShadow: `1vmax 1vmax 1vmax  rgba(255,255,255,0.15) `,
                borderRadius: "1vmax",
                y: open? 0 : 200*buttons.length,
                opacity: open? 1: 0
            }}
            
            transition={{
                ease: "easeInOut",
                duration: 0.6,
                type: "spring",
                bounce: 0.2,
            }}
        >
                {buttons.map(({title, link}, index) => (
                    <motion.a
                        initial={{
                            opacity: 0,
                            y: -200*(index + 1)
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 1,
                            y: -200*(index + 1),
                        }}
                        transition={{
                            delay: 0.1+index/25,
                            ease: "easeInOut",
                            duration: 0.6
                        }}
                        whileHover={{
                            translateY: "-0.1vmax",
                            translateX: "0.1vmax",
                            scale: 1.005,
                            textDecoration: "underline"
                        }}
                        key={index} 
                        href={link}
                        style={{padding: "1vmax"}}
                    >
                        <Heading  
                            color={"ter"}
                            fontSize={"2vmax"}
                            h={"3vmax"}
                        >
                            {title}
                        </Heading>
                    </motion.a>
                ))}
        </motion.div>
    )
}