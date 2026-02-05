"use client"
import {getToken, isTokenExpired} from "csa/lib/utils";
import { useState, useEffect, useMemo, useRef } from "react";

import { baseButtons, perfilButton } from "./buttons"
import Heading from "csa/components/ui/heading";
import { motion, AnimatePresence } from "framer-motion";
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames";
import navStyles from "./../../Defaultpage.module.css"


// Número fixo de botões para o layout inicial (evita hydration mismatch)
const INITIAL_BUTTON_COUNT = baseButtons.length

export default function Nav(
    {
        open, 
        anim,
        classname,
        onClose
    }:{
        open: boolean, 
        anim: boolean,
        classname: string,
        onClose?: () => void
    })
{
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [mounted, setMounted] = useState(false)
    const containerRef = useRef<HTMLDivElement | null>(null)

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

    // Fechar com Escape quando aberto
    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose?.()
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [open, onClose])

    // Focar primeiro item quando o menu abrir
    useEffect(() => {
        if (!open) return
        const t = setTimeout(() => {
            const first = containerRef.current?.querySelector('a') as HTMLElement | null
            first?.focus()
        }, 220)
        return () => clearTimeout(t)
    }, [open])

    const constianerclassname = MergeClassnames(classname, navStyles.navContainer)

    const variants = {
        hidden: { opacity: 0, y: -10, pointerEvents: 'none' },
        visible: { opacity: 1, y: 0, pointerEvents: 'auto' },
        exit: { opacity: 0, y: -6, pointerEvents: 'none' }
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    id="header-nav"
                    ref={containerRef}
                    className={constianerclassname}
                    role="menu"
                    aria-hidden={!open}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={variants}
                    transition={{ duration: 0.26, ease: "easeInOut" }}
                >
                    {buttons.map(({title, link}, index) => (
                        <motion.a
                            key={index}
                            href={link}
                            role="menuitem"
                            tabIndex={0}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ delay: 0.06 + index * 0.03, duration: 0.22 }}
                            whileHover={{ translateY: '-0.1vmax', translateX: '0.1vmax', scale: 1.005, textDecoration: 'underline' }}
                            onClick={() => onClose?.()}
                            style={{ padding: '1vmax', display: 'block' }}
                        >
                            <h1
                            >
                                {title}
                            </h1>
                        </motion.a>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    )
}