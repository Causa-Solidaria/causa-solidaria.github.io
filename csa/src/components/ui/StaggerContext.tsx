import { createContext, useContext, useRef, useEffect, useCallback } from "react"

interface StaggerContextType {
    getDelay: () => number
}

const StaggerContext = createContext<StaggerContextType>({ getDelay: () => 0 })

/**
 * Provider que controla o delay escalonado dos Box.
 * Reseta o contador a cada montagem (= cada navegação de página).
 * Cada Box chama getDelay() para receber seu delay incremental.
 */
export function StaggerProvider({ children }: { children: React.ReactNode }) {
    const counter = useRef(0)

    // Reseta o contador toda vez que a página monta
    useEffect(() => {
        counter.current = 0
    }, [])

    const getDelay = useCallback(() => {
        const delay = counter.current * 0.05 // 50ms entre cada Box
        counter.current++
        return Math.min(delay, 1.2) // Teto de 1.2s para não ficar eterno
    }, [])

    return (
        <StaggerContext.Provider value={{ getDelay }}>
            {children}
        </StaggerContext.Provider>
    )
}

export function useStagger() {
    return useContext(StaggerContext)
}
