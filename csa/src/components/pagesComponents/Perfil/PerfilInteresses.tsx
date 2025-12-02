import { Flex, Heading, Badge } from "csa/components/ui"
import { AlignFull } from "csa/lib/utils"
import { st, MAX_SIZE } from "./utils"

type PerfilInteressesProps = {
  areasDeInteresse?: string[]
}

export default function PerfilInteresses({ areasDeInteresse = [] }: PerfilInteressesProps) {
  return (
    <Flex dir="column" {...AlignFull("left")} mb={st(80)}>
      <Heading
        color="#000" 
        fontSize={40} 
        MaxSizeDisplay={MAX_SIZE}
        mb={st(30)}
      >
        Área{areasDeInteresse.length > 1 ? "s" : ""} de Interesse
      </Heading>
      <Flex gap={st(30)}>
        {areasDeInteresse.map((interesse: string) => (
          <Badge 
            key={interesse}
            variant="info" 
            size="lg"
          >
            {interesse}
          </Badge>
        ))}
      </Flex>
    </Flex>
  )
}
