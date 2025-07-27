import { Box, Center, Text } from "@chakra-ui/react";
import CardDefault from "csa/components/Card";
import { ScreenSize } from "csa/utils/getScreenSize";
import { isMobile } from "csa/utils/isMobile";



export default function CardLogin({children}: {children: React.ReactNode}) {
    
    const scrSize = ScreenSize();
    const ehMobile = isMobile(scrSize.width, scrSize.height);

    return (
        <CardDefault
            width={"400px"} justifySelf={"center"} alignContent={"center"} m={4}
        > 
            {children}
        </CardDefault>    
    )
}
