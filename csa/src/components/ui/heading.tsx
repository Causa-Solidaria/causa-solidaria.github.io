
import { Heading as He, HeadingProps } from "@chakra-ui/react"
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/lib/utils"

type ResponsiveSize = number | string | (number | string)[] | Record<string, number | string>;

function isResponsiveObject(size: ResponsiveSize): size is Record<string, number | string> {
    return typeof size === 'object' && !Array.isArray(size);
}

function processSize(size: ResponsiveSize, maxSize: number | string): any {
    if (isResponsiveObject(size)) {
        return size;
    }
    return staticPosition(size as number | string | (number | string)[], maxSize);
}

function processStaticW(size: ResponsiveSize, maxSize: number | string): any {
    if (isResponsiveObject(size)) {
        return { maxW: size, minW: size, maxWidth: size, minWidth: size };
    }
    return SetStaticPositionW(size as any, maxSize);
}

function processStaticH(size: ResponsiveSize, maxSize: number | string): any {
    if (isResponsiveObject(size)) {
        return { maxH: size, minH: size, maxHeight: size, minHeight: size };
    }
    return SetStaticPositionH(size as any, maxSize);
}

export default function Heading(
    {
        children, 
        MaxSizeDisplay = 3197, 
        fontSize = 36, 
        w = "min-content",
        h = "min-content",
        color = "#000",
        ...props
    }: 
    Omit<HeadingProps, 'fontSize' | 'w' | 'h'> & {
        MaxSizeDisplay?: number | string,
        fontSize?: ResponsiveSize,
        w?: ResponsiveSize,
        h?: ResponsiveSize,
    }
){
    return (
    <He
        alignContent={"center"}
        fontSize={processSize(fontSize, MaxSizeDisplay)}
        lineHeight={1}
        color={color || "qui"}

        {...processStaticW(w, MaxSizeDisplay)}
        {...processStaticH(h, MaxSizeDisplay)}
        {...props}
    >
        {children}
    </He>
    )
}