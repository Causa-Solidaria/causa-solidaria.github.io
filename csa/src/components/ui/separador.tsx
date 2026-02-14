import { Box, BoxProps } from "@chakra-ui/react";
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"

interface SeparadorProps extends Omit<BoxProps, 'dir'> {
    dir?: "row" | "column"
}

export default function Separador({
    dir = "row",
    className,
    ...props
}: SeparadorProps) {
    const dirClass = dir === "column" ? styles.separadorVertical : styles.separadorHorizontal
    
    return (
        <Box
            className={MergeClassnames(styles.separador, dirClass, className)}
            {...props}
        />
    )
}