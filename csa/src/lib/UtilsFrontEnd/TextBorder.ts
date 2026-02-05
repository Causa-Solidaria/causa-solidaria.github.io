


export function TextBorder(size: number | string, color?: string) {
    let textShadow: string = ``
    for (let i = -1; i <= 1; i += 1 / 2) {
        for (let j = -1; j <= 1; j += 1 / 2) {
            const x = Number(size) * i
            const y = Number(size) * j
            textShadow += `${x} ${y} 0 ${color || "#000"},`
        }
    }
    textShadow = textShadow.slice(0, -1)
    return  textShadow 
}
