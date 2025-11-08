import { Box, BoxProps, Center, Text, useBreakpointValue } from "@chakra-ui/react";
import React, { forwardRef } from "react";
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/utils/staticPosition";
import Flex from "csa/components/ui/Flex";
import JustifyFull, { AlignFull } from "csa/utils/JustifyFullCenter";

function CardCadastroInner({ children, ...props}: BoxProps, ref: React.Ref<HTMLDivElement>) {
  
  
  return (
    <Flex
      {...JustifyFull()}
      
      {...SetStaticPositionW(585, 1735)}

      ref={ref}

      fontSize={staticPosition(24, 1735)}
      justifyContent="center"
      boxShadow={`${staticPosition(24, 1735)} ${staticPosition(24, 1735)} ${staticPosition(0, 1735)} #00000020`}
      borderRadius={staticPosition(5, 1735)}
      bg={"#fff"}
      py={staticPosition([15, 25], 1735)}        
      { ...props}
    >
      {children}
    </Flex>
  );
}

const CardCadastro = forwardRef<HTMLDivElement, BoxProps>(CardCadastroInner);

export default CardCadastro;
