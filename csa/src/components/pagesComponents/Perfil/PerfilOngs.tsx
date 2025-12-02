import { Image } from "@chakra-ui/react"
import { Flex, Heading } from "csa/components/ui"
import { AlignFull, SetStaticPositionW, SetStaticPositionH } from "csa/lib/utils"
import { LuContact } from "react-icons/lu"
import { st, stW, stH, MAX_SIZE } from "./utils"

type Ong = {
  foto?: string
  title: string
}

type PerfilOngsProps = {
  ongs?: Ong[]
}

export default function PerfilOngs({ ongs = [] }: PerfilOngsProps) {
  return (
    <Flex dir="column" {...AlignFull("left")} mb={st(80)}>
      <Heading
        color="#000" 
        fontSize={40} 
        MaxSizeDisplay={MAX_SIZE}
        mb={st(30)}
      >
        ONG{ongs.length > 1 ? "s" : ""} que apoio
      </Heading>
      <Flex gap={st(30)}>
        {ongs.map((ong, id) => (
          <Flex
            key={id}
            borderRadius={st(12)}
            p={st(20)}
            border={`${st(1)} solid #000`}
            fontSize={st(40)}
            {...SetStaticPositionW(400, MAX_SIZE)}
            {...SetStaticPositionH(164, MAX_SIZE)}
          >
            {ong.foto ? (
              <Image {...SetStaticPositionW(100, MAX_SIZE)} src={ong.foto} alt={ong.title} />
            ) : (
              <LuContact size={st(100) as string} />
            )}
            <Flex px={st(10)} {...AlignFull("Justify")}>
              <Heading
                color="#000" 
                fontSize={40} 
                MaxSizeDisplay={MAX_SIZE}
              >
                {ong.title}
              </Heading>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
