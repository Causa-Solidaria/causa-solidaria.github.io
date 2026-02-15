
import { Heading as He, HeadingProps } from "@chakra-ui/react"
import styles from "./ui.module.css"
import MergeClassnames from "csa/lib/UtilsFrontEnd/MergeClassnames"

interface HeProps extends HeadingProps {}

export default function Heading(
  {
    children,
    className,
    ...props
  }: HeProps
) {
    const mergedClassName = MergeClassnames(styles.heading, className)

    return (
    <He
        className={mergedClassName}
        {...props}
    >
        {children}
    </He>
    )
}