import { Box, BoxProps, Center, Text, useBreakpointValue } from "@chakra-ui/react";
import CardDefault from "csa/components/Card";

export default function CardCadastro({ children, ...props}: BoxProps) {

  const cardWidth = useBreakpointValue({
    base: "100%", // mobile
    sm: "100%",
    md: "90%",
    lg: "600px", // trava no máximo
  });

  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={[2, 3, 5]}
      mt={[5, 8, 11]}
      mx="auto"
      { ...props}
    >
      <CardDefault
        w={cardWidth}
        maxW="600px"
        fontSize="md"
        justifyContent="center"
        alignContent="center"
        borderRadius="lg"
        boxShadow="12px 12px 0px #00000020"
        
        p={[4, 6, 8]}
        Header={
          <Center mb={4}>
            <Text fontSize={["xl", "2xl", "3xl"]} fontWeight="bold" textAlign="center">
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
