'use client'

import { useEffect, useState, useMemo } from "react"
import Image from "next/image"
import DefaultPage from "csa/components/DefaultPage"
import { LuMegaphone } from "react-icons/lu"
import { MdLocationOn, MdCalendarToday } from "react-icons/md"
import { Loading, EmptyState, Badge, Breadcrumb } from "csa/components/ui"
import { Campanhas as Ca, Apis } from "csa/Rotas.json"
import Heading from "csa/components/ui/heading"
import useNavigate from "csa/hooks/useNavigate"
import { useForm } from "react-hook-form"
import styles from "./campanhas.module.css"
import usePopup from "csa/hooks/usePopup"
import { Campanha, mockCampanhas } from "csa/mocks/campanhas"

const USE_TEST_DATA = true

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

function getNivelLabel(nivel: string | number): string {
  const n = Number(nivel)
  if (n <= 1) return "Baixo"
  if (n <= 2) return "Moderado"
  if (n <= 3) return "Médio"
  if (n <= 4) return "Alto"
  return "Urgente"
}

function getNivelBadgeVariant(nivel: string | number): "success" | "warning" | "error" | "info" | "default" {
  const n = Number(nivel)
  if (n <= 2) return "success"
  if (n <= 3) return "warning"
  return "error"
}

export default function Campanhas() {
  const { navigate } = useNavigate()
  const { register } = useForm()
  const popup = usePopup()
  const [searchQuery, setSearchQuery] = useState("")

  const [campanhas, setCampanhas] = useState<Campanha[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (USE_TEST_DATA) {
      setCampanhas(mockCampanhas)
      setLoading(false)
      return
    }

    const carregarCampanhas = async () => {
      try {
        const res = await fetch(Apis.campanhas.get)
        if (!res.ok) {
          setCampanhas([])
          return
        }
        const data = await res.json()
        setCampanhas(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error("Falha ao carregar campanhas:", e)
        popup("Falha ao carregar campanhas: " + e)
        setCampanhas([])
      } finally {
        setLoading(false)
      }
    }
    carregarCampanhas()
  }, [])

  const filteredCampanhas = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return campanhas
    return campanhas.filter(c =>
      c.titulo?.toLowerCase().includes(query) ||
      c.descricao?.toLowerCase().includes(query) ||
      c.cidade?.toLowerCase().includes(query)
    )
  }, [searchQuery, campanhas])

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <DefaultPage>
      <div className={styles.page}>
        <Breadcrumb items={[{ label: "campanhas" }]} />
        <div className={styles.container}>
          <div className={styles.header}>
            <Heading className={styles.pageTitle}>Campanhas</Heading>
            <div className={styles.searchRow}>
              <input
                {...register("Search")}
                className={styles.searchInput}
                placeholder="Pesquisar campanha por nome ou cidade"
                onChange={handleSearch}
              />
              <button
                className={styles.createButton}
                onClick={() => navigate(Ca.Criar)}
              >
                Criar Campanha
              </button>
            </div>
          </div>

          {loading ? (
            <div className={styles.centerBox}>
              <Loading size="lg" text="Carregando campanhas..." />
            </div>
          ) : filteredCampanhas.length === 0 ? (
            <div className={styles.centerBox}>
              <EmptyState
                icon={<LuMegaphone size={64} />}
                title={searchQuery ? "Nenhuma campanha encontrada" : "Nenhuma campanha cadastrada"}
                description={searchQuery ? "Tente buscar com outros termos" : "Seja o primeiro a criar uma campanha e fazer a diferença!"}
                action={!searchQuery ? {
                  label: "Criar Campanha",
                  onClick: () => navigate(Ca.Criar),
                } : undefined}
              />
            </div>
          ) : (
            <div className={styles.list}>
              {filteredCampanhas.map((campanha) => (
                <div
                  key={campanha.id}
                  className={styles.card}
                  onClick={() => navigate(Ca.slug + campanha.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") navigate(Ca.slug + campanha.id)
                  }}
                >
                  <Image
                    className={styles.cardImage}
                    src={campanha.foto ? `data:image/png;base64,${campanha.foto}` : "/logo.png"}
                    alt={campanha.titulo}
                    width={300}
                    height={180}
                    unoptimized
                  />
                  <div className={styles.cardContent}>
                    <div className={styles.cardBody}>
                      <div className={styles.cardTitleRow}>
                        <h3 className={styles.cardTitle}>{campanha.titulo}</h3>
                      </div>
                      {campanha.nivelAjuda && (
                        <div className={styles.cardTags}>
                          <Badge variant={getNivelBadgeVariant(campanha.nivelAjuda)} size="sm">
                            Nível: {getNivelLabel(campanha.nivelAjuda)}
                          </Badge>
                        </div>
                      )}
                      {campanha.descricao && (
                        <p className={styles.cardDescription}>{campanha.descricao}</p>
                      )}
                    </div>
                  </div>
                  <div className={styles.cardFooter}>
                    {campanha.cidade && campanha.estado && (
                      <span className={styles.footerItem}>
                        <MdLocationOn className={styles.footerIcon} />
                        {campanha.cidade}, {campanha.estado}
                      </span>
                    )}
                    {campanha.endDate && (
                      <span className={styles.footerItem}>
                        <MdCalendarToday className={styles.footerIcon} />
                        Encerra em: {formatDate(campanha.endDate)}
                      </span>
                    )}
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
