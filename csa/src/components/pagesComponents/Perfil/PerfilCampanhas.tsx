import { Center, Image } from "@chakra-ui/react"
import { Flex, Heading, EmptyState } from "csa/components/ui"
import { AlignFull, SetStaticPositionW, SetStaticPositionH } from "csa/lib/utils"
import { LuContact, LuMegaphone } from "react-icons/lu"
import { st, MAX_SIZE } from "./utils"

type Campanha = {
  id: string
  titulo: string
  foto?: string
  cidade?: string
  estado?: string
  endDate: string
}

type PerfilCampanhasProps = {
  campanhas?: Campanha[]
}

export default function PerfilCampanhas({ campanhas = [] }: PerfilCampanhasProps) {
  return (
    <Flex dir="column" {...AlignFull("left")} mb={st(80)}>
      <Heading
        color="#000" 
        fontSize={40} 
        MaxSizeDisplay={MAX_SIZE}
        mb={st(30)}
      >
        Campanha{campanhas.length > 1 ? "s" : ""} que Fiz
      </Heading>
      <Flex gap={st(30)} flexWrap="wrap">
        {campanhas.length === 0 ? (
          <EmptyState
            icon={<LuMegaphone size={48} />}
            title="Nenhuma campanha"
            description="Você ainda não criou nenhuma campanha"
          />
        ) : (
          campanhas.map((campanha) => (
            <Flex
              key={campanha.id}
              dir="column"
              borderRadius={st(12)}
              p={st(20)}
              border={`${st(1)} solid #000`}
              fontSize={st(40)}
              {...SetStaticPositionW(1300 / 2, MAX_SIZE)}
              {...SetStaticPositionH(400, MAX_SIZE)}
            >
              <Center>
                {campanha.foto ? (
                  <Image {...SetStaticPositionW(200, MAX_SIZE)} src={campanha.foto} alt={campanha.titulo} />
                ) : (
                  <LuContact size={st(200) as string} />
                )}
              </Center>
              <Flex dir="column" gap={st(10)} px={st(10)} {...AlignFull("Justify")}>
                <Heading
                  color="#000" 
                  fontSize={40} 
                  MaxSizeDisplay={MAX_SIZE}
                >
                  {campanha.titulo}
                </Heading>
                {campanha.cidade && campanha.estado && (
                  <Heading
                    color="#666" 
                    fontSize={30} 
                    MaxSizeDisplay={MAX_SIZE}
                  >
                    {campanha.cidade}, {campanha.estado}
                  </Heading>
                )}
                <Heading
                  color="#666" 
                  fontSize={25} 
                  MaxSizeDisplay={MAX_SIZE}
                >
                  {new Date(campanha.endDate).toLocaleDateString('pt-BR')}
                </Heading>
              </Flex>
            </Flex>
          ))
        )}
      </Flex>
    </Flex>
  )
}
