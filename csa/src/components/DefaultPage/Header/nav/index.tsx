"use client"

import { Box, BoxProps} from "@chakra-ui/react";
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPosition";
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
            maxH={staticPosition(125*b.length,3197)}
            minH={staticPosition(125*b.length,3197)}
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
                    <a
                        key={index} 
                        href={link}
                    >
                        <Heading  
                            color={"ter"}
                            fontSize={64}
                            h={122}
                            px={staticPosition(40, 3197)}
                        >
                            {title}
                        </Heading>
                        <Box  
                            {...SetStaticPositionH(3, 3197)}
                            {...SetStaticPositionW(779, 3197)}
                            bg={"ter"} 
                        />
                    </a>
                )
            )}
        </Box>
}


export default function Nav({open, anim}:{open: boolean, anim: boolean}){
    const Nav_motion = motion.create(forwardRef(Nav_static))
    const size = staticPosition(-(200 * b.length), 3197)
    
    const variants = {
        open: { y: 0 },
        closed: { y: size }
    }
    
    return (
        <Nav_motion
            variants={variants}
            initial={open ? "closed" : "open"}
            animate={open ? "open" : "closed"}
            transition={anim ? {
                duration: 0.7,
                type: "tween",
                ease: "easeIn"
            } : {
                duration: 0
            }}
        />
    )
}