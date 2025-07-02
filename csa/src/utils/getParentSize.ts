import { useLayoutEffect, useState } from "react"

export default function GetParentSize(ref) {
    const [altura, setAltura] = useState({width: 0, height: 0})
    useLayoutEffect(() => {
        if (ref.current) {
            const size = ref.current.parentElement?.getBoundingClientRect()
            setAltura(size)
        }
    }, [ref])
    return altura
}