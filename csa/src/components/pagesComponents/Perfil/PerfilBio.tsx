import { Flex, Heading } from "csa/components/ui"
import { AlignFull } from "csa/lib/utils"
import { st, MAX_SIZE } from "./utils"

type PerfilBioProps = {
  bio?: string
}

export default function PerfilBio({ bio }: PerfilBioProps) {
  return (
    <Flex dir="column" {...AlignFull("left")} mb={st(80)}>
      <Heading
        color="#000" 
        fontSize={40} 
        MaxSizeDisplay={MAX_SIZE}
        mb={st(30)}
      >
        Biografia
      </Heading>
      <Heading
        color="#000" 
        fontSize={40} 
        fontStyle="italic" 
        MaxSizeDisplay={MAX_SIZE}
      >
        {bio || 'Biografia não informada'}
      </Heading>
    </Flex>
  )
}
