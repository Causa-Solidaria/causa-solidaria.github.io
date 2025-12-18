
import { Heading as He, HeadingProps } from "@chakra-ui/react"
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/lib/utils"
import { motion } from "framer-motion"

interface HeProps extends HeadingProps {
    level?: (1 | 2 | 3) & number
}

const levels: HeadingProps[] = []
levels[1] = {color: "#000", fontSize: "1vmax"}
levels[2] = {color: "#fff"}
levels[3] = {color: "#006e1f"}

let delay_obj = 0

export default function Heading(
    {
        children, 
        level = 1,
        ...props
    }: HeProps
){
    const Hlevel = levels[level as number] || {}
    delay_obj++
    return (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{
            delay: delay_obj/20,
            ease: "easeInOut",
            duration: 0.6
        }}
    ><He
        fontWeight={900}
        {...(props.fontSize && {lineHeight: props.fontSize})}
        fontFamily={"quicksand"}
        {...Hlevel}
        {...props}
        /// mesmo carregando o padrão do level, pode ser modificado
    >
        {children}
    </He></motion.div>
    )
}