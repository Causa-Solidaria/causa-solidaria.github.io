import { Box, Center, Text } from "@chakra-ui/react";
import CardDefault from "csa/components/Card";
import { ScreenSize } from "csa/utils/getScreenSize";
import { isMobile } from "csa/utils/isMobile";



export default function CardCadastro({children}: {children: React.ReactNode}) {
    
    const scrSize = ScreenSize();
    const ehMobile = isMobile(scrSize.width, scrSize.height);

    return (
        <Box
            h={`${scrSize.height}px`}
            w="100%"
            display="flex"
            justifyContent={ehMobile ? "center" : "flex-end"}
            alignItems="center"
            mx = {ehMobile ? "0" : "10%"}
            mt={`50px`} 
        >
            <CardDefault

                maxW={"600px"} w={`${scrSize.width*0.70}px`}
                fontSize={`12pt`}  
                justifySelf={ehMobile ? "center" : undefined} 
                alignItems={ehMobile ? "center" : undefined}
                justifyContent="center" alignContent="center" 
                
                Header={<Center><Text fontSize="2xl">Se junte à Causa Solidária!</Text></Center>}
                
            > 
                {children}
            </CardDefault>    
        </Box>
    )
}