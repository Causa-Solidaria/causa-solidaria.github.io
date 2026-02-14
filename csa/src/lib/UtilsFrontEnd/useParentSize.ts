import { RefObject, useLayoutEffect, useState } from "react";

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