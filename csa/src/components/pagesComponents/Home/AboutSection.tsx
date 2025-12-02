"use client"

import { Image } from "@chakra-ui/react"
import Flex from "csa/components/ui/Flex"
import { SetStaticPositionW, staticPosition } from "csa/lib/utils"
import JustifyFull, { AlignFull } from "csa/lib/utils"
import MissionSection from "./MissionSection"
import SupportSection from "./SupportSection"

const MaxSize = 2200
const st = (s: number | number[]) => (staticPosition as any)(s, MaxSize)
const sstW = (w: number | string | (number | string)[] = MaxSize) => (SetStaticPositionW as any)(w, MaxSize)

export default function AboutSection() {
  return (
    <Flex
      dir={["column", "column", "column", "row"]}
      {...JustifyFull("center")}
      {...AlignFull("center")}
      p={st(100)}
      gap={st(120)}
    >
      <Image
        src="./ChatGPT Image 11 de ago. de 2025, 15_44_28 2.png"
        alt="Banco de Alimentos"
        {...sstW(379)}
        transition={"all 0.6s ease-in-out"}
      />
      <MissionSection />
      <SupportSection />
    </Flex>
  )
}
