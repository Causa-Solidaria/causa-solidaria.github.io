import { Box, BoxProps, Center, Text, useBreakpointValue } from "@chakra-ui/react";
import React, { forwardRef } from "react";
import CardDefault from "csa/components/Card";
import Logo from "csa/components/logo";
import { SetStaticPositionW } from "csa/utils/staticPosition";

function CardCadastroInner({ children, ...props}: BoxProps, ref: React.Ref<HTMLDivElement>) {
  
  
  return (
    <Box
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={[2, 3]}
      my={[5, 8]}
      mx="10%"
      ref={ref}
      { ...props}
    >
      <CardDefault
        {...SetStaticPositionW(650, 1980)}
        fontSize="md"
        justifyContent="center"
        alignContent="center"
        borderRadius="lg"
        boxShadow="12px 12px 0px #00000020"
        
        p={[4, 6]}
        Header={
          <Center mb={4}>
            <Text fontSize={["xl", "2xl"]} fontWeight="bold" textAlign="center">
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

const CardCadastro = forwardRef<HTMLDivElement, BoxProps>(CardCadastroInner);

export default CardCadastro;
