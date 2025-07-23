import { Box, Flex, JsxElement, Link } from "@chakra-ui/react"
import Button, { MapButtons } from "../buttom"
import { useEffect, useState } from "react"
import { ScreenSize } from "csa/utils/getScreenSize"
import { isMobile } from "./headerUtils"
import { Tooltip } from "../ui/tooltip"
import { Avatar } from "@chakra-ui/react"


// tipos que o botão pode ser
type Botao = | { tipo: "custom"; componente: JsxElement } | { tipo: "link"; href: string; text: string }

const botoesUsuarioLogado: Botao[] = [
  {
    tipo: "custom",
    componente: (
      <Tooltip content="Perfil">
        <Avatar.Root>
          <Avatar.Fallback />
          <Avatar.Image />
        </Avatar.Root>
      </Tooltip>
    )
  }
]

function botoesUsuarioNaoLogado(ehMobile: boolean): Botao[] {

    // botões padrão para usuários não logados
    const botoesPadrao: Botao[] = [
        { tipo: "link", href: "/login", text: "entrar" },
        { tipo: "link", href: "/cadastro", text: "cadastro" }
    ]
  
    // caso seja mobile, retorna apenas os botões padrão
    if (ehMobile) return [{ tipo: "custom", componente: <Box gap={4}></Box> }, ...botoesPadrao]


  return [
    {
      tipo: "custom",
      componente: (

        <Box gap={4}>
          <MapButtons
            variant="plain"
            color="qui"
            listButtons={[
              { text: "criar campanha", href: "/criar_campanha" },
              { text: "campanhas", href: "/campanhas" }
            ]}
          />
        </Box>
        
      )
    },
    ...botoesPadrao
  ]
}






const ButtonZone = () => {
  const [usuarioLogado, setUsuarioLogado] = useState(false)
  const { width, height } = ScreenSize()
  const ehMobile = isMobile(width, height, 850)

  useEffect(() => {
    setUsuarioLogado(!!localStorage.getItem("token"))
  }, [])

  const botoes: Botao[] = usuarioLogado ? botoesUsuarioLogado : botoesUsuarioNaoLogado(ehMobile)

  return (
    <Flex
      direction="row"
      w={`${width * 0.80}px`}
      gap={3} p={4}
      justifyContent={ehMobile ? "center" : "right"}
      alignItems="center"
    >
      {botoes.map((botao, idx) =>
        botao.tipo === "custom" ? (
          <Box key={idx} m={2}>{botao.componente}</Box>
        ) : (
          <Button key={idx} asChild>
            <Link href={botao.href} bg="ter" m={2} w="10em">{botao.text}</Link>
          </Button>
        )
      )}
    </Flex>
  )
}

export default ButtonZone
