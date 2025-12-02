import DefaultPage from "csa/components/DefaultPage"
import { Heading, Loading, Alert, EmptyState } from "csa/components/ui"
import { PerfilContent, usePerfilData, st } from "csa/components/pagesComponents/Perfil"
import JustifyFull, { getToken, isTokenExpired, SetStaticPositionW, AlignFull } from "csa/lib/utils"
import { Login } from "csa/Rotas.json"
import { LuUser } from "react-icons/lu"

export default function Perfil() {
  const { data, loading } = usePerfilData()

  if (loading) {
    return (
      <DefaultPage {...JustifyFull()} {...AlignFull()}>
        <Loading size="xl" text="Carregando perfil..." />
      </DefaultPage>
    )
  }

  if (!data) {
    return (
      <DefaultPage {...JustifyFull()} {...AlignFull()}>
        <Alert variant="error" title="Erro">
          Não foi possível carregar os dados do perfil.
        </Alert>
      </DefaultPage>
    )
  }

  if (isTokenExpired(getToken() as string)) {
    return (
      <DefaultPage {...JustifyFull()} {...AlignFull()}>
        <EmptyState
          icon={<LuUser size={64} />}
          title="Sessão expirada"
          description="Por favor, faça login para acessar seu perfil."
          action={{
            label: "Fazer Login",
            onClick: () => window.location.href = Login
          }}
        />
      </DefaultPage>
    )
  }

  return (
    <DefaultPage 
      p={st(50)} 
      {...SetStaticPositionW(1, 1)} 
      {...AlignFull()} 
      {...JustifyFull()}
    >
      <Heading 
        color="#000"
        margin={st(25)}
        fontSize={63}
        fontWeight={900}
        MaxSizeDisplay={1871}
      > 
        Perfil 
      </Heading>
      
      <PerfilContent data={data} />
    </DefaultPage>
  )
}