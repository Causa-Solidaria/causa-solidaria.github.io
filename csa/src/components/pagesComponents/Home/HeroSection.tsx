"use client"

import { Image } from "@chakra-ui/react"
import Heading from "csa/components/ui/heading"
import Button from "csa/components/ui/Button"
import Flex from "csa/components/ui/Flex"
import { BorderRadiusStatic, SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/lib/utils"
import JustifyFull from "csa/lib/utils"
import Rotas from "csa/Rotas.json"

const MaxSize = 2200
const st = (s: number | number[]) => (staticPosition as any)(s, MaxSize)
const sstW = (w: number | string | (number | string)[] = MaxSize) => (SetStaticPositionW as any)(w, MaxSize)
const sstH = (h: number | string | (number | string)[] = MaxSize) => (SetStaticPositionH as any)(h, MaxSize)
const bordR = (s: number | string) => BorderRadiusStatic(s, MaxSize)

export default function HeroSection() {
  return (
    <Flex
      dir="column"
      bgImg={"url('./solidariedade-694x459 1.png')"}
      bgSize={"cover"}
      bgPos={"center"}
      backdropBlur={`${st(500)}`}
      p={st(100)}
      {...sstW("full")}
      {...JustifyFull(["center", "center", "left"])}
    >
      <Heading
        textAlign={"left"}
        transition={"font-size 0.6s ease-in-out, width 0.6s ease-in-out"}
        color={"#fff"}
        fontSize={[80]}
        mb={st(30)}
        {...sstW(866)}
        MaxSizeDisplay={MaxSize}
      >
        transforme pequenos gestos em grandes mudanças
      </Heading>
      <Heading
        textAlign={"left"}
        transition={"padding 0.6s ease-in-out, margin 0.6s ease-in-out, font-size 0.6s ease-in-out"}
        color={"#fff"}
        fontSize={40}
        mb={st(30)}
        {...sstW(856)}
        MaxSizeDisplay={MaxSize}
      >
        doe amor e compartilhe esperança
      </Heading>
      <Button
        {...bordR(25)}
        transition={"all 0.6s ease-in-out"}
        onClick={() => { window.location.href = Rotas.Campanhas.Home }}
        bg={"#097D03"}
        _hover={{
          bg: "#39aD33",
          scale: 1.01,
          boxShadow: `${st(20)} ${st(20)} ${st(20)} rgba(0,0,0,0.2)`
        }}
        {...sstW(500)}
        {...sstH(125)}
      >
        <Heading
          transition={"all 0.6s ease-in-out"}
          color={"#fff"}
          fontSize={48}
          MaxSizeDisplay={MaxSize}
        >
          Quero Ajudar
        </Heading>
      </Button>
    </Flex>
  )
}
