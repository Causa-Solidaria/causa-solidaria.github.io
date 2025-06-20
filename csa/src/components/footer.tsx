import { Box, Center, HStack, Link, Text, useBreakpoint, useBreakpointValue } from "@chakra-ui/react";
import { ScreenSize } from "csa/utils/getScreenSize";


export default function Footer() {
    const scrSize = ScreenSize() 
    const fontsizeBreakpoint = useBreakpointValue({
        base: "14px",
        md: "18px",
        lg: "24px",
    })
    return (
        <>
            <Box 
                as="footer" 
                fontSize={fontsizeBreakpoint} 
                bg="ter" 
                color="white" 
                position="static" 
                w={scrSize.width} 
                h={scrSize.height/4} 
                bottom={0} p={4} 
                textAlign="center"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Center mb={4}>
                    <HStack gapX={4}> 
                        <Link color="pri" href="sobre">Sobre</Link>
                        <Link color="pri" href="contato">Contato</Link>
                        <Link color="pri" href="privacidade">Política de Privacidade</Link>
                        <Link color="pri" href="termos">Termos de Uso</Link>
                        
                    </HStack>
                </Center>
                <Text color="sec">© 2023 Causa Solidária. Todos os direitos reservados.</Text>
                <Text color="sec">Desenvolvido por <Link color="qua" href="https://github.com/Causa-Solidaria">Causa Solidária</Link></Text>
            </Box>
        </>
    )
}