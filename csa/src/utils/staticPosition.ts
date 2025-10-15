


export function staticPosition(size:number | string, maxsize:number | string = 1300) {
    return `calc(100vmax * ${size} / ${maxsize})`
}