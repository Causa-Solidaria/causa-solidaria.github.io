"use client"

import { useState, useEffect, useMemo } from "react"
import { Button, Icon, Text } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { LuArrowLeft, LuSearch, LuBuilding, LuLeaf } from "react-icons/lu"
import { Box, Flex, Heading, Input, Avatar, Badge, Loading, EmptyState } from "csa/components/ui"
import { ONGs, Campanhas, Apis } from "csa/Rotas.json"
import { apiUrl } from "csa/lib/apiBase"
import DefaultPage from "csa/components/DefaultPage/index"
import styles from "./ong.module.css"

/* ==================== Types ==================== */
type Ong = {
  id: string
  nome: string
  area: string
  descricao: string
  cidade: string
  uf: string
  email: string
  icon: any
  color: string
}

/* ==================== Hooks ==================== */
function useOngsData() {
  const [ongs, setOngs] = useState<Ong[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOngs() {
      try {
        const res = await fetch(apiUrl(Apis.ongs_get))
        if (!res.ok) {
          const errorText = await res.text()
          throw new Error(`Erro ao buscar ONGs: ${res.status} - ${errorText || res.statusText}`)
        }
        
        const data: Ong[] = await res.json()
        const mappedOngs = data.map(ong => ({
          ...ong,
          icon: LuLeaf,
          color: "green.400"
        }))
        setOngs(mappedOngs)
      } catch (err) {
        console.error("Erro ao carregar ONGs:", err)
        setError("Erro ao carregar ONGs")
        setOngs([])
      } finally {
        setLoading(false)
      }
    }
    fetchOngs()
  }, [])

  return { ongs, loading, error }
}

function useOngsFilter(ongs: Ong[], searchQuery: string) {
  return useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return ongs
    
    return ongs.filter(ong =>
      ong.nome?.toLowerCase().includes(query) || 
      ong.area?.toLowerCase().includes(query) ||
      ong.cidade?.toLowerCase().includes(query)
    )
  }, [searchQuery, ongs])
}

/* ==================== Main Component ==================== */
export default function ONGsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const { ongs, loading } = useOngsData()
  const filteredOngs = useOngsFilter(ongs, searchQuery)

  return (
    <DefaultPage className={styles.page}>
      <Box className={styles.container}>
        {/* ==================== Header ==================== */}
        <Flex className={styles.header}>
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className={styles.backButton}
          >
            <Icon as={LuArrowLeft} className={styles.backButtonIcon} />
          </Button>

          <Heading className={styles.title}>
            ONGs
          </Heading>

          <Link href={ONGs.Criar}>
            <Button className={styles.createButton}>
              Cadastrar ONG
            </Button>
          </Link>
        </Flex>

        {/* ==================== Search ==================== */}
        <Box className={styles.searchContainer}>
          <Icon as={LuSearch} className={styles.searchIcon} />
          <Input
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar ONG por nome ou área"
          />
        </Box>

        {/* ==================== Content ==================== */}
        <Flex className={styles.content}>
          {loading ? (
            <Flex className={styles.loadingContainer}>
              <Loading size="lg" text="Carregando ONGs..." />
            </Flex>
          ) : filteredOngs.length === 0 ? (
            <EmptyState
              icon={<LuBuilding size={64} />}
              title={searchQuery ? "Nenhuma ONG encontrada" : "Nenhuma ONG cadastrada"}
              description={searchQuery ? "Tente buscar com outros termos" : "Seja o primeiro a cadastrar uma ONG!"}
              action={!searchQuery ? {
                label: "Cadastrar ONG",
                onClick: () => router.push(ONGs.Criar)
              } : undefined}
            />
          ) : (
            <Flex className={styles.ongsList}>
              {filteredOngs.map((ong) => (
                /* ==================== ONG Card ==================== */
                <Box key={ong.id} className={styles.ongCard}>
                  {/* Card Header */}
                  <Flex className={styles.ongCardHeader}>
                    <Avatar name={ong.nome} size="xl" />
                    <Flex className={styles.ongCardInfo}>
                      <Text className={styles.ongName}>
                        {ong.nome}
                      </Text>
                      <Badge variant="primary" size="md">
                        {ong.area}
                      </Badge>
                    </Flex>
                  </Flex>

                  {/* Description */}
                  <Text className={styles.ongDescription}>
                    {ong.descricao}
                  </Text>

                  {/* Location */}
                  <Text className={styles.ongLocation}>
                    {ong.cidade}, {ong.uf}
                  </Text>

                  {/* Email */}
                  <Text className={styles.ongEmail}>
                    {ong.email}
                  </Text>

                  {/* Action Buttons */}
                  <Flex className={styles.ongActions}>
                    <Link href={`${ONGs.Home}/${ong.id}`}>
                      <Button className={styles.detailsButton}>
                        Ver Detalhes
                      </Button>
                    </Link>
                    <Link href={Campanhas.Home}>
                      <Button className={styles.supportButton}>
                        Apoiar
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              ))}
            </Flex>
          )}
        </Flex>
      </Box>
    </DefaultPage>
  )
}