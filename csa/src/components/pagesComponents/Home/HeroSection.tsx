"use client"

import {Heading, Button, Flex} from "csa/components/ui"
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
      backdropFilter={"blur(25px)"}
      p={"5vmax"}
      {...sstW("full")}
      {...JustifyFull(["center", "center", "left"])}
    >
      <Heading
        textAlign={"left"}
        transition={"font-size 0.6s ease-in-out, width 0.6s ease-in-out"}
        color={"#fff"}
        fontSize={"4vmax"}
        mb={"2vmax"}
        {...sstW(866)}
      >
        transforme pequenos gestos em grandes mudanças
      </Heading>
      <Heading
        textAlign={"left"}
        transition={"padding 0.6s ease-in-out, margin 0.6s ease-in-out, font-size 0.6s ease-in-out"}
        color={"#fff"}
        fontSize={"3vmax"}
        mb={"2vmax"}
        {...sstW(856)}
      >
        doe amor e compartilhe esperança
      </Heading>
      <Button
        transition={"all 0.6s ease-in-out"}
        onClick={() => { window.location.href = Rotas.Campanhas.Home }}
        bg={"#097D03"}
        _hover={{
          bg: "#39aD33",
          scale: 1.01,
          boxShadow: `1vmax 1vmax 1vmax rgba(0,0,0,0.2)`
        }}
        m={"2vmax"}
        p="2vmax"
        {...sstW(500)}
      >
        <Heading
          transition={"all 0.6s ease-in-out"}
          color={"#fff"}
          fontSize={"2vmax"}
        >
          Quero Ajudar
        </Heading>
      </Button>
    </Flex>
  )
}
