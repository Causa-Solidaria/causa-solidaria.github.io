import { RefObject, useLayoutEffect, useState } from "react"

type Size = { width: number; height: number };

export default function GetParentSize(ref: RefObject<HTMLElement>) {
    const [altura, setAltura] = useState<Size>({ width: 0, height: 0 });
    useLayoutEffect(() => {
        const parent = ref.current?.parentElement;
        if (parent) {
            const rect = parent.getBoundingClientRect();
            setAltura({ width: rect.width, height: rect.height });
        }
    }, [ref]);
    return altura;
}