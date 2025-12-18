"use client";

import React, { forwardRef } from "react";
import { Text, BoxProps, Center } from "@chakra-ui/react";
import Box from "csa/components/ui/Box";
import Flex from "csa/components/ui/Flex";
import Heading from "csa/components/ui/heading";
import { SetStaticPositionH, SetStaticPositionW } from "csa/lib/utils";
import Logo from "csa/components/logo";

function InfoCadastroInner(
  { ...props }: BoxProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <Flex
      dir="column"
      minH={"75vmax"}
      right={0}
      bg="#4DCD58"
      overflow="hidden"
      {...SetStaticPositionW(660, 1735)}
      alignItems="center"
      flex="0 0 auto"
      ref={ref}
      gap={"1vmax"}
      p={"1vmax"}
      {...props}
    >


      <Logo 
        borderRadius={"1vmax"}
        m={"1vmax"}
        {...SetStaticPositionW(150, 1735)}
      />
      <Center
        bg={"#fff"}
        m={"1vmax"}
        p={"1vmax"}
        borderRadius={"1vmax"}
        borderColor={"#006E1F"}
        border={`0.1vmax solid`}
      >
        <Heading
          color={"#006E1F"}
          m={"1vmax"}
          fontSize={"2vmax"}
        >
          CausaSolidaria
        </Heading>
      </Center>

      <Flex 
        dir="column" 
        alignItems="stretch" 
        p={"1vmax"}
        m={"1vmax"}
        borderRadius={"1vmax"}
        borderColor={"#006E1F"}
        bg={"#fff"}
        color={"#006E1F"}
        border={`0.1vmax solid`}
      >
          <Heading
            fontSize={"2vmax"}
            color={"#006E1F"}
            lineHeight="120%"
            fontWeight={900}
            textAlign="center"
          >
            transforme pequenos gestos em grandes mudanças
          </Heading>

          <Text fontSize={"1.5vmax"} m={"1vmax"} textAlign="justify">
            A Causa Solidária é uma plataforma que conecta pessoas dispostas a ajudar causas criadas por outras pessoas.
          </Text>

          <Text fontSize={"1.5vmax"} m={"1vmax"} textAlign="justify">
            Aqui você pode criar sua própria causa, divulgar e receber doações de pessoas que se importam com o seu projeto.
          </Text>

          
      </Flex>
      <Box
          dir="column" 
          alignItems="stretch" 
          p={"1vmax"}
          m={"1vmax"}
          borderRadius={"1vmax"}
          borderColor={"#006E1F"}
          bg={"#fff"}
          color={"#006E1F"}
          border={`0.1vmax solid`}
        >
          <Text
            fontSize={"1.5vmax"}
            m={"1vmax"}
            textAlign="center"
            fontWeight="bold"
          >
            Junte-se a nós e faça a diferença na vida de quem mais precisa!
          </Text>
        </Box>
    </Flex>
  );
}

const InfoCadastro = forwardRef<HTMLDivElement, BoxProps>(InfoCadastroInner);
export default InfoCadastro;
