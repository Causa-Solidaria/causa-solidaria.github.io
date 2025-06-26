import { Box, Center, HStack, Link, Text } from "@chakra-ui/react";
import { ScreenSize } from "csa/utils/getScreenSize";


export default function Footer() {
    const scrSize = ScreenSize() 
    return (
        <>
            <Box 
                as="footer" 
                fontSize={{base: "12px", md: "14px", lg: "16px" }} 
                bg="ter" 
                color="white" 
                w={`${scrSize.width}px`} 
                h={`${scrSize.height/4}px`} 
                bottom={0} 
                textAlign="center"
                display="inline-flex"
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
                <Text color="sec">© {new Date().getFullYear()} Causa Solidária. Todos os direitos reservados.</Text>
                <Text color="sec">Desenvolvido por <Link color="qua" href="https://github.com/Causa-Solidaria">Causa Solidária</Link></Text>
            </Box>
        </>
    )
}