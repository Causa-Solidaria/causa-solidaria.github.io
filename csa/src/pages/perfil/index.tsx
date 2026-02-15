"use client"

import { useEffect, useState } from "react"
import { Image } from "@chakra-ui/react"
import DefaultPage from "csa/components/DefaultPage/index"
import { Heading, Loading, Alert, EmptyState, Card, Box, Flex, Avatar, Badge, Button } from "csa/components/ui"
import { getToken, isTokenExpired, logoutAndRedirect } from "csa/lib/utils"
import { Login, Redefinir, Apis } from "csa/Rotas.json"
import { LuUser, LuContact, LuMegaphone, LuPencil, LuKeyRound } from "react-icons/lu"
import styles from "./perfil.module.css"
import useNavigate from "csa/hooks/useNavigate"

/* ==================== Types ==================== */
type Ong = {
  foto?: string
  title: string
}

type Campanha = {
  id: string
  titulo: string
  foto?: string
  cidade?: string
  estado?: string
  endDate: string
}

type PerfilData = {
  name?: string
  bio?: string
  foto?: string
  numero?: string
  email?: string
  localizacao?: string
  areasDeInteresse?: string[]
  genero?: string
  ong?: Ong[]
  campanhas?: Campanha[]
}

/* ==================== Hook ==================== */
function usePerfilData() {
  const token = getToken()
  const [data, setData] = useState<PerfilData | null>(null)
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

/* ==================== Main Component ==================== */
export default function Perfil() {
  const { navigate } = useNavigate();
  const { data, loading } = usePerfilData()

  if (loading) {
    return (
      <DefaultPage className={styles.pageCenter}>
        <Loading size="xl" text="Carregando perfil..." />
      </DefaultPage>
    )
  }

  if (!data) {
    return (
      <DefaultPage className={styles.pageCenter}>
        <Alert variant="error" title="Erro">
          Não foi possível carregar os dados do perfil.
        </Alert>
      </DefaultPage>
    )
  }

  if (isTokenExpired(getToken() as string)) {
    return (
      <DefaultPage className={styles.pageCenter}>
        <EmptyState
          icon={<LuUser size={64} />}
          title="Sessão expirada"
          description="Por favor, faça login para acessar seu perfil."
          action={{
            label: "Fazer Login",
            onClick: () => navigate(Login)
          }}
        />
      </DefaultPage>
    )
  }

  const {
    name,
    bio,
    foto,
    numero,
    email,
    localizacao,
    areasDeInteresse: rawInteresses,
    genero,
    ong: rawOng,
    campanhas: rawCampanhas
  } = data

  const areasDeInteresse = rawInteresses ?? []
  const ong = rawOng ?? []
  const campanhas = rawCampanhas ?? []

  const handleLogout = () => {
    logoutAndRedirect()
  }

  return (
    <DefaultPage>
      <Box className={styles.container}>
        <Heading className={styles.pageTitle}> 
          Perfil 
        </Heading>
        
        <Card className={styles.card}>
          {/* ==================== Header ==================== */}
          <Flex className={styles.header}>
            <Flex className={styles.headerLeft}>
              <Avatar src={foto} name={name} size="2xl" />
              <Flex className={styles.headerName}>
                <Heading className={styles.userName}>
                  {name || 'Nome não informado'}
                </Heading>
                <Heading className={styles.userRole}>
                  {genero ? `voluntári${genero === "masculino" ? "o" : "a"}` : 'voluntário(a)'}
                </Heading>
              </Flex>
            </Flex>

            <Flex className={styles.headerRight}>
              <Heading className={styles.userDetail}>
                {email || 'Email não informado'}
              </Heading>
              <Heading className={styles.userDetail}>
                {numero || 'Telefone não informado'}
              </Heading>
              <Heading className={styles.userDetail}>
                {localizacao || 'Localização não informada'}
              </Heading>
            </Flex>
          </Flex>

          {/* ==================== Actions ==================== */}
          <Flex className={styles.actionsContainer}>
            <Button className={styles.actionButton} onClick={() => navigate('/perfil/editar')}>
              <LuPencil />
              Editar Perfil
            </Button>
            <Button className={styles.actionButton} onClick={() => navigate(Redefinir)}>
              <LuKeyRound />
              Redefinir Senha
            </Button>
          </Flex>

          {/* ==================== Bio ==================== */}
          <Flex className={styles.section}>
            <Heading className={styles.sectionTitle}>
              Biografia
            </Heading>
            <Heading className={styles.bioText}>
              {bio || 'Biografia não informada'}
            </Heading>
          </Flex>

          {/* ==================== Interesses ==================== */}
          {areasDeInteresse.length > 0 && (
            <Flex className={styles.section}>
              <Heading className={styles.sectionTitle}>
                Área{areasDeInteresse.length > 1 ? "s" : ""} de Interesse
              </Heading>
              <Flex className={styles.badgesContainer}>
                {areasDeInteresse.map((interesse: string) => (
                  <Badge key={interesse} variant="default" size="lg">
                    {interesse}
                  </Badge>
                ))}
              </Flex>
            </Flex>
          )}

          {/* ==================== ONGs ==================== */}
          {ong.length > 0 && (
            <Flex className={styles.section}>
              <Heading className={styles.sectionTitle}>
                ONG{ong.length > 1 ? "s" : ""} que Apoio
              </Heading>
              <Flex className={styles.cardsContainer}>
                {ong.map((o, id) => (
                  <Flex key={id} className={styles.ongCard}>
                    {o.foto ? (
                      <Image className={styles.ongImage} src={o.foto} alt={o.title} />
                    ) : (
                      <LuContact className={styles.ongIcon} />
                    )}
                    <Heading className={styles.ongTitle}>
                      {o.title}
                    </Heading>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          )}

          {/* ==================== Campanhas ==================== */}
          {campanhas.length > 0 && (
            <Flex className={styles.section}>
              <Heading className={styles.sectionTitle}>
                Campanha{campanhas.length > 1 ? "s" : ""} que Fiz
              </Heading>
              <Flex className={styles.cardsContainer}>
                {campanhas.map((campanha) => (
                  <Flex key={campanha.id} className={styles.campanhaCard}>
                    {campanha.foto ? (
                      <Image className={styles.campanhaImage} src={campanha.foto} alt={campanha.titulo} />
                    ) : (
                      <LuContact className={styles.campanhaIcon} />
                    )}
                    <Flex className={styles.campanhaInfo}>
                      <Heading className={styles.campanhaTitle}>
                        {campanha.titulo}
                      </Heading>
                      {campanha.cidade && campanha.estado && (
                        <Heading className={styles.campanhaLocation}>
                          {campanha.cidade}, {campanha.estado}
                        </Heading>
                      )}
                      <Heading className={styles.campanhaDate}>
                        {new Date(campanha.endDate).toLocaleDateString('pt-BR')}
                      </Heading>
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          )}

          {/* ==================== Logout ==================== */}
          <Flex className={styles.logoutContainer}>
            <Button className={styles.logoutButton} onClick={handleLogout}>
              Sair da Conta
            </Button>
          </Flex>
        </Card>
      </Box>
    </DefaultPage>
  )
}