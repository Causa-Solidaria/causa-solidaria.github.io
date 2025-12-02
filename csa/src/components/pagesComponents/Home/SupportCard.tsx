"use client"

import { Image } from "@chakra-ui/react"
import Heading from "csa/components/ui/heading"
import Flex from "csa/components/ui/Flex"
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/lib/utils"

const MaxSize = 2200
const st = (s: number | number[]) => (staticPosition as any)(s, MaxSize)
const sstW = (w: number | string | (number | string)[] = MaxSize) => (SetStaticPositionW as any)(w, MaxSize)
const sstH = (h: number | string | (number | string)[] = MaxSize) => (SetStaticPositionH as any)(h, MaxSize)

type SupportCardProps = {
  title: string
  image: string
}

export default function SupportCard({ title, image }: SupportCardProps) {
  return (
    <Flex
      dir="row"
      p={st(30)}
      transition="all 0.6s ease-in-out"
      alignItems="center"
      m={st(30)}
    >
      <Image
        src={image}
        alt={title}
        {...sstW(158)}
        {...sstH(158)}
        objectFit="contain"
        transition="all 0.3s ease"
      />
      <Heading
        fontSize={40}
        MaxSizeDisplay={MaxSize}
        fontWeight="bold"
        color="gray.800"
        lineHeight="shorter"
      >
        {title}
      </Heading>
    </Flex>
  )
}
