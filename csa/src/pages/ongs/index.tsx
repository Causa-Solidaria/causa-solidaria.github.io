"use client"

import { useState, useEffect, useMemo } from "react"
import { Avatar, Badge, EmptyState, Breadcrumb, Loading, Modal, Button, Flex } from "csa/components/ui"
import Heading from "csa/components/ui/heading"
import { LuBuilding } from "react-icons/lu"
import { FiMapPin, FiMail } from "react-icons/fi"
import { ONGs, Apis } from "csa/Rotas.json"
import { apiUrl } from "csa/lib/apiBase"
import DefaultPage from "csa/components/DefaultPage/index"
import useNavigate from "csa/hooks/useNavigate"
import styles from "./ong.module.css"
import { mockOngs } from "csa/mocks/ongs"

/* ==================== Types ==================== */
type Ong = {
  id: string
  nome: string
  area: string
  descricao: string
  cidade: string
  uf: string
  rua?: string
  numero?: string
  bairro?: string
  email: string
  site?: string
  logoUrl?: string
  criador?: {
    nome: string
    foto: string | null
  }
  criadoEm?: string
}

/* ==================== Hooks ==================== */

function useOngsData() {
  const isMock = process.env.NEXT_PUBLIC_USE_MOCK === "true"
  const [ongs, setOngs] = useState<Ong[]>(isMock ? mockOngs : [])
  const [loading, setLoading] = useState(!isMock)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isMock) return

    async function fetchOngs() {
      try {
        const res = await fetch(apiUrl(Apis.ongs_get))
        if (!res.ok) {
          const errorText = await res.text()
          throw new Error(`Erro ao buscar ONGs: ${res.status} - ${errorText || res.statusText}`)
        }
        const data: Ong[] = await res.json()
        setOngs(data)
      } catch (err) {
        console.error("Erro ao carregar ONGs:", err)
        setError("Erro ao carregar ONGs")
        setOngs([])
      } finally {
        setLoading(false)
      }
    }
    fetchOngs()
  }, [isMock])

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

/* ==================== Helpers ==================== */
function buildLocation(ong: Ong): string {
  const parts: string[] = []
  if (ong.cidade) parts.push(ong.cidade)
  if (ong.uf) parts.push(ong.uf)
  return parts.join(" - ")
}

/* ==================== Main Component ==================== */
export default function ONGsPage() {
  const { navigate } = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const { ongs, loading } = useOngsData()
  const filteredOngs = useOngsFilter(ongs, searchQuery)

  // modal for support choices
  const [isModalOpen, setModalOpen] = useState(false)
  const [choice, setChoice] = useState<'ir' | 'doar' | ''>('')
  const [selectedId, setSelectedId] = useState('')

  const openSupportModal = (id: string) => {
    setSelectedId(id)
    setChoice('')
    setModalOpen(true)
  }

  const handleAdvance = () => {
    setModalOpen(false)
    if (choice === 'ir') {
      navigate(ONGs.voluntariar + selectedId)
    } else if (choice === 'doar') {
      navigate(ONGs.doar + selectedId)
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <DefaultPage>
      <div className={styles.container}>
        <Breadcrumb items={[{ label: "ongs" }]} />

        <Heading className={styles.pageTitle}>ongs</Heading>

        <div className={styles.card}>
          {/* ==================== Search ==================== */}
          <div className={styles.searchRow}>
            <input
              className={styles.searchInput}
              placeholder="Pesquisar ONG por nome ou área"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button
              className={styles.createButton}
              onClick={() => navigate(ONGs.Criar)}
            >
              Cadastrar ONG
            </button>
          </div>

          {/* ==================== Content ==================== */}
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
                  className={styles.ongCard}
                  onClick={() => navigate(`${ONGs.Home}/${ong.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") navigate(`${ONGs.Home}/${ong.id}`)
                  }}
                >
                  <div className={styles.ongCardTop}>
                    <Avatar
                      name={ong.nome}
                      src={ong.logoUrl ? (ong.logoUrl.startsWith("data:") ? ong.logoUrl : `data:image/png;base64,${ong.logoUrl}`) : undefined}
                      size="sm"
                    />
                    <div className={styles.ongCardInfo}>
                      <h3 className={styles.ongCardName}>{ong.nome}</h3>
                      <div className={styles.ongCardTags}>
                        <Badge variant="default" size="sm">{ong.area}</Badge>
                      </div>
                    </div>
                  </div>

                  <p className={styles.ongCardDescription}>{ong.descricao}</p>

                  <div className={styles.ongCardMeta}>
                    {buildLocation(ong) && (
                      <span className={styles.ongCardMetaItem}>
                        <FiMapPin className={styles.ongCardMetaIcon} />
                        {buildLocation(ong)}
                      </span>
                    )}
                    <span className={styles.ongCardMetaItem}>
                      <FiMail className={styles.ongCardMetaIcon} />
                      {ong.email}
                    </span>
                  </div>

                  <div className={styles.ongCardButtons}>
                    <button
                      className={styles.detailsButton}
                      onClick={(e) => { e.stopPropagation(); navigate(`${ONGs.Home}/${ong.id}`) }}
                    >
                      Ver Detalhes
                    </button>
                    <button
                      className={styles.supportButton}
                      onClick={(e) => { e.stopPropagation(); openSupportModal(ong.id) }}
                    >
                      Apoiar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ==================== Modal ==================== */}
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Como deseja ajudar?">
          <fieldset className={styles.modalFieldset}>
            <label className={`${styles.modalOption} ${choice === 'ir' ? styles.modalOptionSelected : ''}`}>
              <input
                type="radio"
                name="helpChoice"
                value="ir"
                checked={choice === 'ir'}
                onChange={() => setChoice('ir')}
              />
              Posso ir até a ONG
            </label>
            <label className={`${styles.modalOption} ${choice === 'doar' ? styles.modalOptionSelected : ''}`}>
              <input
                type="radio"
                name="helpChoice"
                value="doar"
                checked={choice === 'doar'}
                onChange={() => setChoice('doar')}
              />
              Quero ajudar com doação de itens
            </label>
          </fieldset>
          <Flex style={{ justifyContent: 'flex-end', marginTop: '1rem' }}>
            <Button onClick={handleAdvance} disabled={!choice}>Avançar</Button>
          </Flex>
        </Modal>
      </div>
    </DefaultPage>
  )
}