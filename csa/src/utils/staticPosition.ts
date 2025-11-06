"use cleint"


export function staticPosition(size:number | string | (number | string)[], maxsize:number | string = 1300) {
    let result: string | string[]
    if (Array.isArray(size)){
        const arr = (size as (number | string)[]).map(
            value => `calc(100vmax * ${value} / ${maxsize})`
        )
        result = arr
    }else{
        result = `calc(100vmax * ${size} / ${maxsize})`
    }

    return result
}

export function SetStaticPositionW(
    size: number | string | "full" | (number|string | "full")[], 
    maxsize?: number | string
){
    const Size = (size === "full" ? maxsize : size) as number

    const maxW = staticPosition(Size, maxsize)
    const minW = staticPosition(Size, maxsize)
    const maxWidth = staticPosition(Size, maxsize)
    const minWidth = staticPosition(Size, maxsize)
    return {maxW, minW, maxWidth, minWidth}
}
export function SetStaticPositionH(
    size: number | string | "full" | (number|string | "full")[], 
    maxsize?: number | string
){
    const Size = (size === "full" ? maxsize : size) as number

    const maxH = staticPosition(Size, maxsize)
    const minH = staticPosition(Size, maxsize)
    const maxHeight = staticPosition(Size, maxsize)
    const minHeight = staticPosition(Size, maxsize)
    return {maxH, minH, maxHeight, minHeight}
}

/*
 <Component 
    {...SetStaticPositionW(sizeW, maxDisplaySize)}
    {...SetStaticPositionH(sizeH, maxDisplaySize)}
> 
    childeren 
</Component>
*/ 