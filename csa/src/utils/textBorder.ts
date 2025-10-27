import { staticPosition } from "./staticPosition";




export default function TextBorder(size: number | string, maxDisplaySize: number = 1300){
    const textShadow =  `
        ${staticPosition(-size, maxDisplaySize)} ${staticPosition(-size, maxDisplaySize)} 0 #000,
        ${staticPosition(size, maxDisplaySize)} ${staticPosition(-size, maxDisplaySize)} 0 #000,
        ${staticPosition(-size, maxDisplaySize)} ${staticPosition(size, maxDisplaySize)} 0 #000,
        ${staticPosition(size, maxDisplaySize)} ${staticPosition(size, maxDisplaySize)} 0 #000,
        0 ${staticPosition(-size, maxDisplaySize)} 0 #000,
        0 ${staticPosition(size, maxDisplaySize)} 0 #000,
        ${staticPosition(-size, maxDisplaySize)} 0 0 #000,
        ${staticPosition(size, maxDisplaySize)} 0 0 #000
    `

    return {textShadow}
}
/*
 <text {...TextBorder(size, maxDisplaySize)}> text </text>
*/ 