'use client'

import { useEffect, useState } from "react"
import CampanhasCard from "./camapanhasCard"
import DefaultPage from "csa/components/DefaultPage"
import { LuPlus, LuMegaphone } from "react-icons/lu"
import { Loading, EmptyState } from "csa/components/ui"
import { Campanhas as Ca, Apis } from "csa/Rotas.json"
import Heading from "csa/components/ui/heading"
import useNavigate from "csa/hooks/useNavigate"
import styles from "./campanhas.module.css"
import usePopup from "csa/hooks/usePopup"

export default function Campanhas() {
  const { navigate } = useNavigate()
  const popup = usePopup()

  type Campanha = {
    id: string | number
    titulo: string
    descricao?: string | null
    foto?: string | null
  }

  const [campanhas, setCampanhas] = useState<Campanha[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
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
  })

  return (
    <DefaultPage>
      <div className={styles.page}>
        <button
          className={styles.createButton}
          onClick={() => navigate(Ca.Criar)}
          aria-label="Criar campanha"
        >
          <span className={styles.createButtonLabel}>Criar</span>
          <LuPlus className={styles.createButtonIcon} />
        </button>

        <Heading className={styles.pageTitle}>Campanhas</Heading>

        <div className={styles.contentWrapper}>
          {loading ? (
            <div className={styles.centerBox}>
              <Loading size="lg" text="Carregando campanhas..." />
            </div>
          ) : campanhas.length === 0 ? (
            <div className={styles.centerBox}>
              <EmptyState
                icon={<LuMegaphone size={64} />}
                title="Nenhuma campanha encontrada"
                description="Seja o primeiro a criar uma campanha e fazer a diferença!"
                action={{
                  label: "Criar Campanha",
                  onClick: () => navigate(Ca.Criar),
                }}
              />
            </div>
          ) : (
            <div className={styles.grid}>
              {campanhas.map((campanha, idx) => (
                <CampanhasCard key={campanha.id} idx={idx} campanha={campanha} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DefaultPage>
  )
}
