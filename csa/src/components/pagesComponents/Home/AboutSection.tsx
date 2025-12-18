"use client"

import { Image } from "@chakra-ui/react"
import Flex from "csa/components/ui/Flex"
import { SetStaticPositionW} from "csa/lib/utils"
import JustifyFull, { AlignFull } from "csa/lib/utils"
import MissionSection from "./MissionSection"
import SupportSection from "./SupportSection"

const MaxSize = 2200
const sstW = (w: number | string | (number | string)[] = MaxSize) => (SetStaticPositionW as any)(w, MaxSize)

export default function AboutSection() {
  return (
    <Flex
      dir={["column", "column", "column", "row"]}
      {...JustifyFull("center")}
      {...AlignFull("center")}
      p={"1vmax"}
      gap={"1vmax"}
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
