"use client";

import React, { forwardRef } from "react";
import { Text, BoxProps } from "@chakra-ui/react";
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
    <Box
      bg="sec"
      borderRadius={staticPosition(15, 1735)}
      boxShadow={`${staticPosition(24, 1735)} ${staticPosition(24, 1735)} ${staticPosition(0, 1735)} #00000020`}
      overflow="hidden"
      {...SetStaticPositionW(600, 1735)}
      flex="0 0 auto"
      ref={ref}
      {...props}
    >
      <Flex
        w="full"
        bg="ter"
        justifyContent="center"
        alignItems="center"
        py={staticPosition(24, 1735)}
        borderRadius={staticPosition(10, 1735)}
        display={["none", "none", "flex"]}
      >
        <Logo />
        <Heading
          ml={staticPosition(12, 1735)}
          fontSize={36}
          fontFamily="quicksand"
          fontWeight={900}
          w="auto"
          h="auto"
        >
          CausaSolidaria
        </Heading>
      </Flex>

      <Flex dir="column" alignItems="stretch" px={staticPosition(40, 1735)} py={staticPosition(60, 1735)}>
        <Box>
          <Heading
            fontSize={48}
            lineHeight="120%"
            fontWeight={900}
            textAlign="center"
            w="full"
          >
            transforme pequenos gestos em grandes mudanças
          </Heading>

          <Text fontSize={staticPosition(22, 1735)} color="qui" mt={staticPosition(16, 1735)} textAlign="justify">
            A Causa Solidária é uma plataforma que conecta pessoas dispostas a ajudar causas criadas por outras pessoas.
          </Text>

          <Text fontSize={staticPosition(22, 1735)} color="qui" mt={staticPosition(16, 1735)} textAlign="justify">
            Aqui você pode criar sua própria causa, divulgar e receber doações de pessoas que se importam com o seu projeto.
          </Text>

          <Text
            fontSize={staticPosition(20, 1735)}
            color="qui"
            mt={staticPosition(24, 1735)}
            textAlign="center"
            fontWeight="bold"
          >
            Junte-se a nós e faça a diferença na vida de quem mais precisa!
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

const InfoCadastro = forwardRef<HTMLDivElement, BoxProps>(InfoCadastroInner);
export default InfoCadastro;
