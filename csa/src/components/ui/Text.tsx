import {Text as T, TextProps} from "@chakra-ui/react"
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"

interface Tprops extends TextProps {
    level?: (1 | 2 | 3) & number
}

export default function Text({children, level, className, ...props}: Tprops){
        const levelClass = level === 2 ? styles.textLevel2 : level === 3 ? styles.textLevel3 : styles.textLevel1
        const mergedClassName = MergeClassnames(styles.text, levelClass, className)
        return (
            <T
                className={mergedClassName}
                {...props}
            >
                {children}
            </T>
        )
}