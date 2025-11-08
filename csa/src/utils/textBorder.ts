import { staticPosition } from "./staticPosition";




export default function TextBorder(size: number | string, maxDisplaySize: number | string = 3197, color?: string ){
    let textShadow: string =  ``
    for (let i = -1; i<=1; i+=1/2){
        for (let j = -1; j<=1; j+=1/2){
            const x = staticPosition(Number(size)*i, maxDisplaySize)
            const y = staticPosition(Number(size)*j, maxDisplaySize)

            textShadow += `${x} ${y} 0 ${color || "#000"},`
        }
    }

    textShadow = textShadow.slice(0, -1); // Remove the last comma and space

    return {textShadow}
}
/*
 <text {...TextBorder(size, maxDisplaySize)}> text </text>
*/ 