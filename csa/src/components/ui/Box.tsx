import { Box as B, BoxProps } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames";
import { useStagger } from "./StaggerContext";

interface Bprops extends BoxProps {
    ref?: React.Ref<HTMLDivElement>
}

export default function Box({
    children,
    overflow,
    ref,
    className,
    style,
    ...props
}: Bprops) {
    const { getDelay } = useStagger()
    const [visible, setVisible] = useState(false)
    const [delay] = useState(() => getDelay())

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), delay * 2500)
        return () => clearTimeout(timer)
    }, [delay])

    const mergedClassName = MergeClassnames(
        styles.box,
        visible ? styles.boxVisible : styles.boxHidden,
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