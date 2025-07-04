'use client'


import { Avatar, Box, Flex, Heading, Link, LinkBox } from "@chakra-ui/react"
import Button from "./buttom"
import { ScreenSize } from "csa/utils/getScreenSize"
import { useEffect, useRef, useState } from "react"
import GetParentSize from "csa/utils/getParentSize"
import Logo from "./logo"


let buttons = []

// area da logo do header
const LogoZone = () => {
    const {width, height} = ScreenSize()
    const mobile = width < height || width < 600
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <LinkBox 
                p={2}  
                bg="ter"  
                maxH={`${height*0.1 -2}dhv`} 
                minW="max-content" w={mobile ? width : width*0.1} 
                alignContent="center" 
                borderRadius="0 0 20px 0"
                transition={"all 0.2s ease"} 
            >
                <Link href="/" >
                        <Logo width="5em" />
                        <Heading fontSize="24pt" minW="50%" color="qui" > causa solidaria </Heading>
                </Link>
            </LinkBox>
            
            {mobile ? 
                <ButtonZone />
                : null
            }

        </div>
    )
}

// area dos botoes do header
const ButtonZone = () => {
    const [isLoged, setIsLoged] = useState<any>(false)
    const scrSize = ScreenSize()
    const mobile = scrSize.width < scrSize.height || scrSize.width < 600

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token", token)
        setIsLoged(!!token);
    }, [])

    buttons = isLoged   ? [
        {xml: <Avatar.Root>
            <Avatar.Fallback />
            <Avatar.Image />
        </Avatar.Root>}
    ] :  [
        {href : `/login`, text: "entrar"},
        {href : `/cadastro`, text: "cadastro"},
        
    ]
    return (
        <Flex 
            direction={"row"} 
            w={`${scrSize.width*0.80}px`} 
            gap={3} p={4} 
            justifyContent={mobile ? "center" : "right"} 
            alignItems={"center"}
        >
                {buttons.map((button, index) => (
                    button?.xml ?
                        button.xml
                    :
                        <Button key={index} asChild>
                            <Link href={button?.href} bg={"ter"} m={2} w="10em">{button?.text}</Link>
                        </Button>
                ))}
        </Flex>
    )   
}

const Header = () => {
    const scrSize = ScreenSize()
    const mobile = scrSize.width < scrSize.height || scrSize.width < 600
    const headerBreakpoint = !mobile ? "6em" : "13em"

    return (
        <Box 
            display="flex" 
            direction="row" 
            bg="sec" 
            w={`${scrSize.width}dhv`} 
            minH="min-content" h={headerBreakpoint} 
            top={0} 
            zIndex={100} 
            transition={"all 0.2s ease"}
        >
                
                <LogoZone />
                {!mobile ? 
                    <ButtonZone />
                    : null
                }
                
        </Box>
    )
}

export default Header