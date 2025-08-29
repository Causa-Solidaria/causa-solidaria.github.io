import { Box, BoxProps, Center, Text, useBreakpointValue } from "@chakra-ui/react";
import CardDefault from "csa/components/Card";
import Logo from "csa/components/logo";
import { isMobile } from "csa/utils/isMobile";

export default function CardCadastro({ children, ...props}: BoxProps) {
  const ehmobile = isMobile()
  const cardWidth = useBreakpointValue({
    base: "100%", // mobile
    sm: "100%",
    md: "90%",
    lg: "90%", // trava no máximo
  });

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={[2, 3]}
      my={[5, 8]}
      mx="10%"
      { ...props}
    >
      <CardDefault
        w={cardWidth}
        minW={"max-content"}
        maxW="600px"
        fontSize="md"
        justifyContent="center"
        alignContent="center"
        borderRadius="lg"
        boxShadow="12px 12px 0px #00000020"
        
        p={[4, 6]}
        Header={
          <Center mb={4}>
            <Text fontSize={["xl", "2xl"]} fontWeight="bold"  justifyItens="center" textAlign="center">
              {ehmobile && <Center><Logo /></Center>}
              Se junte à Causa Solidária!
            </Text>
          </Center>
        }
      >
        {children}
      </CardDefault>
    </Box>
  );
}
