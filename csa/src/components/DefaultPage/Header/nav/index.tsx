import { Box, BoxProps, Flex, Link} from "@chakra-ui/react";
import { staticPosition } from "csa/utils/staticPosition";
import { motion } from "framer-motion";
import { forwardRef } from "react";

import b from "./buttons.json"
import Heading from "csa/components/ui/heading";




function Nav_static(
    {
        children, 
        ...props
    }:{
        open: boolean
    } & BoxProps, 
    ref : any
) {
    return <Box
            ref={ref}
            maxW={staticPosition(779, 3197)}
            minW={staticPosition(779, 3197)}
            bg = {"qui"}
            pos={"absolute"}
            right={0}
            zIndex={99}
            display={"flex"}
            flexDir={"column"}
            boxShadow={`${staticPosition(-30, 3197)} ${staticPosition(30, 3197)} ${staticPosition(30, 3197)}  rgba(0,0,0,0.15) `}
            
            {...props}
        >
            {[...(b as any[])].map(
                ({title, link}, index)=>(
                    <Link 
                        key={index} 
                        display={"flex"} 
                        flexDir={"column"}
                        alignItems={"baseline"}
                        minH = {staticPosition(125, 3197)}
                        maxH = {staticPosition(125, 3197)}
                    >
                        <Heading  
                            onClick={()=>window.location.href = link}
                            color={"ter"}
                            fontSize={64}
                            h={100}
                            px={staticPosition(40, 3197)}
                            py={0}
                        >
                            {title}
                        </Heading>
                        <Box w={"100%"} height={staticPosition(3, 3197)} bg={"ter"} />
                    </Link>
                )
            )}
        </Box>
}


export default function Nav({open}:{open: boolean}){
    const Nav_motion = motion.create(forwardRef(Nav_static))
    const Yi = !open ? staticPosition(0, 3197) : staticPosition(-(200*b.length),3197)
    const Yf = open ? staticPosition(0, 3197) : staticPosition(-(200*b.length),3197)
    
    return (
        <Nav_motion
            initial={
                {
                    y: Yf
                }
            }
            animate={
                {
                    y:Yi,
                }
            }
            exit={
                {
                    y: Yf
                }
            }
            transition={{
                duration: 0.7,
                type: "tween",
                ease: "easeIn"
            }}
        />
    )
}