import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import Logo from "csa/components/logo";
import { ScreenSize } from "csa/utils/getScreenSize";
import { isMobile } from "csa/utils/isMobile";


export default function InfoCadastro() {
    const scrSize = ScreenSize();
    const ehMobile = isMobile(scrSize.width, scrSize.height);
    const cadsSpace = ehMobile ? 0.0 : 0.65; // Espaço para o card de cadastro
    return (
        <Box 
                h={`${scrSize.height}px`} 
                mt={ehMobile ? `${Math.trunc(scrSize.height * (1-cadsSpace))}px` : 0}
                w={ehMobile ?  `100vw` : `${Math.trunc(scrSize.width * (1-cadsSpace))}px` } 
                bg="sec" 
                position={ehMobile ? "static" : "fixed" } 
                bottom={ehMobile ? 0 : undefined}
                left={ehMobile ? undefined : 0}
                top={ehMobile ? undefined : 0}

            >
                <VStack>
                   {ehMobile ? undefined : (<Logo/>)}

                    <Box mx="7.5%" mt="5%">
                        <Heading fontSize={`${scrSize.height*0.075}px`} color="qui" lineHeight="110%" fontWeight={900}>
                            transforme pequenos gestos em grandes mudanças
                        </Heading>
                        <Text fontSize={`${scrSize.height*0.025}px`} color="qui" mt={`${scrSize.height*0.005}px`}>
                            A Causa Solidária é uma plataforma que conecta pessoas dispostas a ajudar causas criadas por outras pessoas.
                        </Text>
                        <Text fontSize={`${scrSize.height*0.025}px`} color="qui" mt={`${scrSize.height*0.005}px`}>
                            Aqui você pode criar sua própria causa, divulgar e receber doações de pessoas que se importam com o seu projeto.
                        </Text>
                        <Text fontSize={`${scrSize.height*0.015}px`} color="qui" mt={`${scrSize.height*0.005}px`} textAlign="center">
                            Junte-se a nós e faça a diferença na vida de quem mais precisa!
                        </Text>
                    </Box>
                </VStack>
            </Box> 
    );
}