import { Box, Center, HStack, Link, Text } from "@chakra-ui/react";


export default function Footer() {
    return (
        <>
            <Box 
                as="footer" 
                fontSize={{base: "12px", md: "14px", lg: "16px" }} 
                bg="ter" 
                color="white" 
                w="100%"
                maxW={"100vmax"}
                h={`25vmax`} 
                bottom={0} 
                textAlign="center"
                display="inline-flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Center mb={4}>
                    <HStack gapX={4}> 
                        <Link color="pri" href="#">Sobre</Link>
                        <Link color="pri" href="#">Contato</Link>
                        <Link color="pri" href="#">Política de Privacidade</Link>
                        <Link color="pri" href="#">Termos de Uso</Link>
                    </HStack>
                </Center>
                
                <Text color="sec">© {new Date().getFullYear()} Causa Solidária. Todos os direitos reservados.</Text>
                <Text color="sec">Desenvolvido por <Link color="qua" href="https://github.com/Causa-Solidaria">Causa Solidária</Link></Text>
            </Box>
        </>
    )
}