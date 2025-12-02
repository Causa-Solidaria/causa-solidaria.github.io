import { useEffect, useState } from "react"
import { getToken } from "csa/lib/utils"
import { Apis } from "csa/Rotas.json"

export function usePerfilData() {
  const token = getToken()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPerfilData = async () => {
      try {
        const response = await fetch(Apis.perfil, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const result = await response.json()
        setData(result)
      } catch (err) {
        console.error('Erro ao buscar dados do perfil:', err)
        setError('Erro ao carregar perfil')
      } finally {
        setLoading(false)
      }
    }

    fetchPerfilData()
  }, [token])

  return { data, loading, error }
}
