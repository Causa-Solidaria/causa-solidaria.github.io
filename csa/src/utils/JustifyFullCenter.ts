



export default function JustifyFull(value?: string | string[], includeSelf: boolean = false){
    const justifyContent = value || "center"
    const justifyItems = value || "center"
    const justifySelf = value || "center"
    const textJustify = value || "center"
    
    return includeSelf ? 
        {justifyContent, justifyItems, textJustify}
        :
        {justifyContent, justifyItems, justifySelf, textJustify}
}

export function AlignFull(value? : string | string[], includeSelf: boolean = false){
    const alignContent = value || "center"
    const alignItems = value || "center"
    const alignSelf = value || "center"
    const textAlign = value || "center"
    
    return includeSelf ? 
        {alignContent, alignItems, textAlign}
        :
        {alignContent, alignItems, alignSelf, textAlign}
}