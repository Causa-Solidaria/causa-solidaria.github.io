import { Box as B, BoxProps} from "@chakra-ui/react";
import { motion } from "framer-motion";
interface Bprops extends BoxProps {
    ref?: React.Ref<HTMLDivElement>
}

let delay_obj: number=0

export default function Box(
    {
        children, 
        overflow, 
        ref, 
        ...props
    }: Bprops) /// os argumentos 

{ /// corpo do componente
    
    delay_obj++

    return <motion.div
        initial={{
            opacity: 0,
            y: "-1vmax"
        }}
        animate={{
            opacity: 1,
            y: 0
        }}
        exit={{
            opacity: 0,
            y: "-1vmax"
        }}
        transition={{
            delay: delay_obj/20,
            duration: 0.3,
            ease: "easeInOut"
        }}
    ><B  
        {...props}

        ref={ref}
    >
        {children}
    </B></motion.div>
}