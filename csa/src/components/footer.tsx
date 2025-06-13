import { Box, Center, HStack, Link, Text } from "@chakra-ui/react";


export default function Footer() {
    return (
        <>
            <Box as="footer" bg="ter" color="white" position="static" w="full" h="125px" bottom={0} p={4} textAlign="center">
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