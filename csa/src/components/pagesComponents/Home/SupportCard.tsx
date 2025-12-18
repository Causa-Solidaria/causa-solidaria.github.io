"use client"

import { Image } from "@chakra-ui/react"
import Heading from "csa/components/ui/heading"
import Flex from "csa/components/ui/Flex"
import { SetStaticPositionH, SetStaticPositionW, staticPosition } from "csa/lib/utils"

const MaxSize = 2200
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
      p={"1vmax"}
      transition="all 0.6s ease-in-out"
      alignItems="center"
      m={"1vmax"}
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
        fontSize={"1.5vmax"}
        fontWeight="bold"
        color="gray.800"
        lineHeight="shorter"
      >
        {title}
      </Heading>
    </Flex>
  )
}
