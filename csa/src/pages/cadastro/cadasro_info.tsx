import { Box, Flex, Heading, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import Logo from "csa/components/logo";
import { isMobile } from "csa/utils/isMobile";

export default function InfoCadastro() {
  const ehMobile = isMobile();

  const headingSize = useBreakpointValue({
    base: "2xl",
    sm: "3xl",
    md: "4xl",
    lg: "5xl",
  });

  const subTextSize = useBreakpointValue({
    base: "md",
    sm: "lg",
    md: "xl",
    lg: "2xl",
  });

  return (
    <Box
      minW={["300px", "300px", "300px", "500px", "600px"]}
      maxW={["100%", "100%", "100%", "100%", "700px"]}
      bg="sec"
      borderRadius="lg"
      boxShadow="lg"
    >
        {!ehMobile && (
            <Flex
                w="full"
                bg="ter"
                justifyContent="center"
                alignItems="center"
                py={6}
                borderRadius="md"
            >
                <Logo />
                <Heading
                ml={4}
                fontSize={["xl", "2xl", "3xl"]}
                fontFamily="quicksand"
                fontWeight={900}
                color="qui"
                >
                CausaSolidaria
                </Heading>
            </Flex>
        )}
        <VStack spacing={6} align="stretch" px={10} py={15}>
            

        <Box>
          <Heading
            fontSize={headingSize}
            color="qui"
            lineHeight="120%"
            fontWeight={900}
            textAlign="center"
          >
            transforme pequenos gestos em grandes mudanças
          </Heading>

          <Text fontSize={subTextSize} color="qui" mt={4} textAlign="justify">
            A Causa Solidária é uma plataforma que conecta pessoas dispostas a ajudar causas criadas por outras pessoas.
          </Text>

          <Text fontSize={subTextSize} color="qui" mt={4} textAlign="justify">
            Aqui você pode criar sua própria causa, divulgar e receber doações de pessoas que se importam com o seu projeto.
          </Text>

          <Text fontSize={["md", "lg", "xl"]} color="qui" mt={6} textAlign="center" fontWeight="bold">
            Junte-se a nós e faça a diferença na vida de quem mais precisa!
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
