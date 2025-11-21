"use client"

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
    size: number|string,
    type: string = "solid", 
    color: string = "#000",
    maxDisplaySize: number = 1920
){
    return {
        border:`${staticPosition(size, maxDisplaySize) as string} ${type} ${color}`
    }
}
export function BorderRadiusStatic(
    size: number|string = 0,
    maxDisplaySize: number = 1920
){
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
){
    return {
        boxShadow:`${staticPosition(x, maxDisplaySize) as string} ${staticPosition(y, maxDisplaySize) as string} ${staticPosition(blur, maxDisplaySize) as string} ${color}`
    }
}

/*
 <Component 
    {...SetStaticPositionW(sizeW, maxDisplaySize)}
    {...SetStaticPositionH(sizeH, maxDisplaySize)}
> 
    childeren 
</Component>
*/