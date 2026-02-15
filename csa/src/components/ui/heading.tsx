
import { Heading as He, HeadingProps } from "@chakra-ui/react"
import { motion } from "framer-motion"
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
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{
            ease: "easeInOut",
            duration: 0.6
        }}
    ><He
        className = {mergedClassName}
        {...props}
    >
        {children}
    </He></motion.div>
    )
}