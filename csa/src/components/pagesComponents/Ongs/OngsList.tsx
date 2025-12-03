"use client"

import { useRouter } from "next/router"
import { LuBuilding } from "react-icons/lu"
import { Flex, Loading, EmptyState } from "csa/components/ui"
import { ONGs } from "csa/Rotas.json"
import JustifyFull, { AlignFull } from "csa/lib/utils"
import { st } from "./utils"
import OngCard from "./OngCard"
import type { Ong } from "./types"

type OngsListProps = {
  ongs: Ong[]
  loading: boolean
  searchQuery: string
}

export default function OngsList({ ongs, loading, searchQuery }: OngsListProps) {
  const router = useRouter()

  if (loading) {
    return (
      <Flex
        {...JustifyFull()}
        {...AlignFull()}
        minH={st(300)}
      >
        <Loading size="lg" text="Carregando ONGs..." />
      </Flex>
    )
  }

  if (ongs.length === 0) {
    return (
      <EmptyState
        icon={<LuBuilding size={64} />}
        title={searchQuery ? "Nenhuma ONG encontrada" : "Nenhuma ONG cadastrada"}
        description={searchQuery ? "Tente buscar com outros termos" : "Seja o primeiro a cadastrar uma ONG!"}
        action={!searchQuery ? {
          label: "Cadastrar ONG",
          onClick: () => router.push(ONGs.Criar)
        } : undefined}
      />
    )
  }

  return (
    <Flex
      dir="row"
      flexWrap="wrap"
      gap={st(40)}
      justifyContent="center"
    >
      {ongs.map((ong) => (
        <OngCard key={ong.id} ong={ong} />
      ))}
    </Flex>
  )
}
