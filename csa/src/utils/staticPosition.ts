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

export function SetStaticPositionW(size:number | string | (number|string)[], maxsize?: number | string){
    const maxW = staticPosition(size, maxsize)
    const minW = staticPosition(size, maxsize)
    const maxWidth = staticPosition(size, maxsize)
    const minWidth = staticPosition(size, maxsize)
    return {maxW, minW, maxWidth, minWidth}
}
export function SetStaticPositionH(size:number | string | (number|string)[], maxsize?: number | string){
    const maxH = staticPosition(size, maxsize)
    const minH = staticPosition(size, maxsize)
    const maxHeight = staticPosition(size, maxsize)
    const minHeight = staticPosition(size, maxsize)
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