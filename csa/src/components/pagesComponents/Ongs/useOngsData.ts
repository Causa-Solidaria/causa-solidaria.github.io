import { useEffect, useState, useMemo } from "react"
import { LuLeaf } from "react-icons/lu"
import { Apis } from "csa/Rotas.json"
import type { Ong } from "./types"

export function useOngsData() {
  const [ongs, setOngs] = useState<Ong[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOngs() {
      try {
        const res = await fetch(Apis.ongs_get)
        if (!res.ok) throw new Error("Erro ao buscar ONGs")
        
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

export function useOngsFilter(ongs: Ong[], searchQuery: string) {
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
