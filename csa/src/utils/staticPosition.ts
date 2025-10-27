


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