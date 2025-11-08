"use client";

import React, { forwardRef } from "react";
import { Text, BoxProps, Center } from "@chakra-ui/react";
import Box from "csa/components/ui/Box";
import Flex from "csa/components/ui/Flex";
import Heading from "csa/components/ui/heading";
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPosition";
import Logo from "csa/components/logo";

function InfoCadastroInner(
  { ...props }: BoxProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <Flex
      dir="column"
      bg="#4DCD58"
      boxShadow={`${staticPosition(24, 1735)} ${staticPosition(24, 1735)} ${staticPosition(0, 1735)} #00000020`}
      overflow="hidden"
      {...SetStaticPositionW(660, 1735)}
      alignItems="center"
      flex="0 0 auto"
      ref={ref}
      gapY={staticPosition(20,1735)}
      py={staticPosition(30,1735)}
      {...props}
    >


      <Logo 
        borderRadius={staticPosition(20, 1735)}
      />
      <Center
        bg={"#fff"}
        {...SetStaticPositionW(515, 1735)}
        {...SetStaticPositionH(67, 1735)}
        borderRadius={staticPosition(20, 1735)}
        borderColor={"#006E1F"}
        border={`${staticPosition(2, 1735)} solid`}
        py={staticPosition(24, 1735)}
        mx="auto"
      >
        <Heading
          color={"#006E1F"}
          ml={staticPosition(12, 1735)}
          fontSize={63}
          fontWeight={900}
        >
          CausaSolidaria
        </Heading>
      </Center>

      <Flex 
        dir="column" 
        alignItems="stretch" 
        px={staticPosition(20, 1735)} 
        py={staticPosition(20, 1735)}
        {...SetStaticPositionW(445, 1735)}
        {...SetStaticPositionH(405, 1735)}
        borderRadius={staticPosition(20, 1735)}
        borderColor={"#006E1F"}
        bg={"#fff"}
        color={"#006E1F"}
        border={`${staticPosition(2, 1735)} solid`}
      >
        <Box>
          <Heading
            fontSize={48}
            color={"#006E1F"}
            lineHeight="120%"
            fontWeight={900}
            textAlign="center"
          >
            transforme pequenos gestos em grandes mudanças
          </Heading>

          <Text fontSize={staticPosition(22, 1735)} mt={staticPosition(16, 1735)} textAlign="justify">
            A Causa Solidária é uma plataforma que conecta pessoas dispostas a ajudar causas criadas por outras pessoas.
          </Text>

          <Text fontSize={staticPosition(22, 1735)} mt={staticPosition(16, 1735)} textAlign="justify">
            Aqui você pode criar sua própria causa, divulgar e receber doações de pessoas que se importam com o seu projeto.
          </Text>

          <Text
            fontSize={staticPosition(20, 1735)}
            mt={staticPosition(24, 1735)}
            textAlign="center"
            fontWeight="bold"
          >
            Junte-se a nós e faça a diferença na vida de quem mais precisa!
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

const InfoCadastro = forwardRef<HTMLDivElement, BoxProps>(InfoCadastroInner);
export default InfoCadastro;
