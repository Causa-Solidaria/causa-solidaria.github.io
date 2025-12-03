"use client"

import { RefObject, useLayoutEffect, useState } from "react"

// ============================================
// STATIC POSITIONS - Responsividade baseada em vmax
// ============================================

export function staticPosition(
    size: number | string | (number | string)[],
    maxsize: number | string = 1300
) {
    if (Array.isArray(size)) {
        return (size as (number | string)[]).map(
            value => `calc(100vmax * ${value} / ${maxsize})`
        )
    }
    return `calc(100vmax * ${size} / ${maxsize})`
}

export function SetStaticPositionW(
    size: number | string | "full" | (number | string | "full")[],
    maxsize: number | string = 1300
) {
    const resolvedSize = size === "full" ? maxsize : size
    const value = staticPosition(resolvedSize as any, maxsize)
    return {
        maxW: value,
        minW: value,
        maxWidth: value,
        minWidth: value,
    }
}

export function SetStaticPositionH(
    size: number | string | "full" | (number | string | "full")[],
    maxsize: number | string = 1300
) {
    const resolvedSize = size === "full" ? maxsize : size
    const value = staticPosition(resolvedSize as any, maxsize)
    return {
        maxH: value,
        minH: value,
        maxHeight: value,
        minHeight: value,
    }
}

export function BorderStatic(
    size: number | string,
    type: string = "solid",
    color: string = "#000",
    maxDisplaySize: number = 1920
) {
    return {
        border: `${staticPosition(size, maxDisplaySize) as string} ${type} ${color}`
    }
}

export function BorderRadiusStatic(
    size: number | string = 0,
    maxDisplaySize: number = 1920
) {
    return {
        borderRadius: staticPosition(size, maxDisplaySize)
    }
}

export function shadowStatic(
    x: number = 0,
    y: number = 0,
    blur: number = 0,
    color: string = "#000",
    maxDisplaySize: number = 1920
) {
    return {
        boxShadow: `${staticPosition(x, maxDisplaySize) as string} ${staticPosition(y, maxDisplaySize) as string} ${staticPosition(blur, maxDisplaySize) as string} ${color}`
    }
}

// ============================================
// JUSTIFY & ALIGN - Helpers de layout
// ============================================

export default function JustifyFull(value?: string | string[], includeSelf: boolean = false) {
    const justifyContent = value || "center"
    const justifyItems = value || "center"
    const justifySelf = value || "center"
    const textJustify = value || "center"

    return includeSelf
        ? { justifyContent, justifyItems, textJustify }
        : { justifyContent, justifyItems, justifySelf, textJustify }
}

export function AlignFull(value?: string | string[], includeSelf: boolean = false) {
    const alignContent = value || "center"
    const alignItems = value || "center"
    const alignSelf = value || "center"
    const textAlign = value || "center"

    return includeSelf
        ? { alignContent, alignItems, textAlign }
        : { alignContent, alignItems, alignSelf, textAlign }
}

// ============================================
// AUTENTICAÇÃO - Token e sessão
// ============================================

export function getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('token')
}

export function isTokenExpired(token: string): boolean {
    try {
        const payloadPart = token.split('.')[1]
        if (!payloadPart) return true
        const payload = JSON.parse(atob(payloadPart))
        if (!payload?.exp) return false
        return payload.exp * 1000 < Date.now()
    } catch {
        return true
    }
}

export function logoutAndRedirect(message?: string, popup?: (msg: string) => void) {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        if (message) {
            if (popup) popup(message)
            else alert(message)
        }
        window.location.href = '/login'
    }
}

export function ensureLogged(popup?: (msg: string) => void): boolean {
    const token = getToken()
    if (!token) {
        logoutAndRedirect('Você não está logado.', popup)
        return false
    }
    if (isTokenExpired(token)) {
        logoutAndRedirect('Sua sessão expirou. Faça login novamente.', popup)
        return false
    }
    return true
}

// ============================================
// TEXT BORDER - Efeito de contorno em texto
// ============================================

export function TextBorder(size: number | string, maxDisplaySize: number | string = 3197, color?: string) {
    let textShadow: string = ``
    for (let i = -1; i <= 1; i += 1 / 2) {
        for (let j = -1; j <= 1; j += 1 / 2) {
            const x = staticPosition(Number(size) * i, maxDisplaySize)
            const y = staticPosition(Number(size) * j, maxDisplaySize)
            textShadow += `${x} ${y} 0 ${color || "#000"},`
        }
    }
    textShadow = textShadow.slice(0, -1)
    return { textShadow }
}

// ============================================
// STRINGS - Manipulação de texto
// ============================================

export function capitalizarPrimeiraLetra(str: string) {
    if (typeof str !== 'string' || str.length === 0) {
        return ''
    }
    return (str.charAt(0).toUpperCase() + str.slice(1)) as string
}

// ============================================
// HOOKS - React hooks utilitários
// ============================================

type Size = { width: number; height: number }

export function useParentSize(ref: RefObject<HTMLElement | null>) {
    const [size, setSize] = useState<Size>({ width: 0, height: 0 })
    
    useLayoutEffect(() => {
        const parent = ref.current?.parentElement
        if (parent) {
            const rect = parent.getBoundingClientRect()
            setSize({ width: rect.width, height: rect.height })
        }
    }, [ref])
    
    return size
}

// Alias para manter compatibilidade
export const GetParentSize = useParentSize
