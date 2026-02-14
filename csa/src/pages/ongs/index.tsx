"use client"

import { useState, useEffect, useMemo } from "react"
import { Avatar, Badge, EmptyState, Breadcrumb, Loading } from "csa/components/ui"
import Heading from "csa/components/ui/heading"
import { LuBuilding, LuLeaf } from "react-icons/lu"
import { MdLocationOn, MdEmail } from "react-icons/md"
import { ONGs, Campanhas, Apis } from "csa/Rotas.json"
import { apiUrl } from "csa/lib/apiBase"
import DefaultPage from "csa/components/DefaultPage/index"
import useNavigate from "csa/hooks/useNavigate"
import { useForm } from "react-hook-form"
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

/* ==================== Mock Data (test) ==================== */
const MOCK_ONGS: Ong[] = [
  {
    id: "1",
    nome: "Instituto Verde Vida",
    area: "Meio Ambiente",
    descricao: "ONG dedicada à preservação ambiental e reflorestamento urbano em comunidades carentes.",
    cidade: "São Paulo",
    uf: "SP",
    email: "contato@verdevida.org",
    icon: null,
    color: "green.400",
  },
  {
    id: "2",
    nome: "Educação Para Todos",
    area: "Educação",
    descricao: "Promovemos acesso à educação de qualidade para crianças e jovens em situação de vulnerabilidade social.",
    cidade: "Rio de Janeiro",
    uf: "RJ",
    email: "contato@educacaoparatodos.org",
    icon: null,
    color: "green.400",
  },
  {
    id: "3",
    nome: "Patas Amigas",
    area: "Animais",
    descricao: "Resgate, reabilitação e adoção responsável de animais abandonados.",
    cidade: "Belo Horizonte",
    uf: "MG",
    email: "adote@patasamigas.org",
    icon: null,
    color: "green.400",
  },
]

/* ==================== Hooks ==================== */
const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true"

function useOngsData() {
  const [ongs, setOngs] = useState<Ong[]>(useMock ? MOCK_ONGS : [])
  const [loading, setLoading] = useState(!useMock)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (useMock) return

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
  const { navigate } = useNavigate()
  const { register } = useForm()
  const [searchQuery, setSearchQuery] = useState("")
  const { ongs, loading } = useOngsData()
  const filteredOngs = useOngsFilter(ongs, searchQuery)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <DefaultPage>
      <div className={styles.page}>
        <Breadcrumb items={[{ label: "ongs" }]} />
        <div className={styles.container}>
          <div className={styles.header}>
            <Heading className={styles.pageTitle}>ONGs</Heading>
            <div className={styles.searchRow}>
              <input
                {...register("Search")}
                className={styles.searchInput}
                placeholder="Pesquisar ONG por nome ou área"
                onChange={handleSearch}
              />
              <button
                className={styles.createButton}
                onClick={() => navigate(ONGs.Criar)}
              >
                Cadastrar ONG
              </button>
            </div>
          </div>

          {loading ? (
            <div className={styles.centerBox}>
              <Loading size="lg" text="Carregando ONGs..." />
            </div>
          ) : filteredOngs.length === 0 ? (
            <div className={styles.centerBox}>
              <EmptyState
                icon={<LuBuilding size={64} />}
                title={searchQuery ? "Nenhuma ONG encontrada" : "Nenhuma ONG cadastrada"}
                description={searchQuery ? "Tente buscar com outros termos" : "Seja o primeiro a cadastrar uma ONG!"}
                action={!searchQuery ? {
                  label: "Cadastrar ONG",
                  onClick: () => navigate(ONGs.Criar),
                } : undefined}
              />
            </div>
          ) : (
            <div className={styles.list}>
              {filteredOngs.map((ong) => (
                <div
                  key={ong.id}
                  className={styles.card}
                  onClick={() => navigate(`${ONGs.Home}/${ong.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") navigate(`${ONGs.Home}/${ong.id}`)
                  }}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.cardBody}>
                      <div className={styles.cardTitleRow}>
                        <h3 className={styles.cardTitle}>{ong.nome}</h3>
                      </div>
                      <div className={styles.cardTags}>
                        <Badge variant="default" size="sm">
                          {ong.area}
                        </Badge>
                      </div>
                      <p className={styles.cardDescription}>{ong.descricao}</p>
                    </div>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.footerItem}>
                      <Avatar name={ong.nome} size="xs" />
                      {ong.nome}
                    </span>
                    <span className={styles.footerItem}>
                      <MdLocationOn className={styles.footerIcon} />
                      {ong.cidade}, {ong.uf}
                    </span>
                    <span className={styles.footerItem}>
                      <MdEmail className={styles.footerIcon} />
                      {ong.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DefaultPage>
  )
}