import { Box as B, BoxProps } from "@chakra-ui/react";
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames";

interface Bprops extends BoxProps {
    ref?: React.Ref<HTMLDivElement>
}

export default function Box({
    children,
    ref,
    className,
    style,
    ...props
}: Bprops) {
    const mergedClassName = MergeClassnames(
        styles.box,
        className
    )

    return (
        <B
            className={mergedClassName}
            {...props}
            ref={ref}
        >
            {children}
        </B>
    )
}