"use client"

import { Center, Icon, Image } from "@chakra-ui/react"
import Heading from "csa/components/ui/heading"
import Button from "csa/components/ui/Button"
import Flex from "csa/components/ui/Flex"
import { SetStaticPositionW, staticPosition } from "csa/lib/utils"
import JustifyFull, { AlignFull } from "csa/lib/utils"
import { LuArrowRight } from "react-icons/lu"
import Rotas from "csa/Rotas.json"

const MaxSize = 2200
const st = (s: number | number[]) => (staticPosition as any)(s, MaxSize)
const sstW = (w: number | string | (number | string)[] = MaxSize) => (SetStaticPositionW as any)(w, MaxSize)

export default function MissionSection() {
  return (
    <Flex
      dir="column"
      {...JustifyFull(["center", "center", "center", "left"])}
      {...AlignFull(["center", "center", "center", "left"])}
      transition={"all 0.6s ease-in-out"}
    >
      <Heading
        {...sstW(1030)}
        fontSize={64}
        mb={st(60)}
        MaxSizeDisplay={MaxSize}
        transition={"all 0.6s ease-in-out"}
      >
        Nossa missão é espalhar cuidado, dignidade e esperança
      </Heading>
      <Heading
        fontSize={40}
        {...sstW(1030)}
        MaxSizeDisplay={MaxSize}
        transition={"all 0.6s ease-in-out"}
        color="#444"
      >
        somos uma organização que acredita no poder da empatia, atuamos com campanhas de arrecadação de alimentos, brinquedos, agasalhos e apoio a comunidades vulneráveis em todo o brasil
      </Heading>
      <Center>
        <Button
          bg={"#097D03"}
          _hover={{
            bg: "#39aD33",
            scale: 1.01,
            boxShadow: `${st(20)} ${st(20)} ${st(20)} rgba(0,0,0,0.2)`
          }}
          transition={"all 0.6s ease-in-out"}
          mt={st(60)}
          p={st(40)}
          as="button"
          aria-label="Conheça Nossas Ações"
          minW={st(620)}
          onClick={() => { window.location.href = Rotas.Campanhas.Home }}
        >
          <Heading
            color={"#fff"}
            transition="all 0.6s ease-in-out"
            fontSize={40}
            MaxSizeDisplay={MaxSize}
          >
            Conheça Nossas Campanhas
          </Heading>
          <Icon
            as={LuArrowRight}
            transition="all 0.6s ease-in-out"
          />
        </Button>
      </Center>
    </Flex>
  )
}
