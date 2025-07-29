import { Box, ChakraProviderProps, Flex, JsxElement, Link } from "@chakra-ui/react"
import Button, { MapButtons } from "../buttom"
import { useEffect, useState } from "react"
import { ScreenSize } from "csa/utils/getScreenSize"
import { Botao, isMobile, renderButtons } from "./headerUtils"
import { Tooltip } from "../ui/tooltip"
import { Avatar } from "@chakra-ui/react"






// Botões do usuário logado
function botoesUsuarioLogado(): Botao[] {
    
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
        },
        { tipo: "link", text: "criar campanha", href: "/criar_campanha" },
        { tipo: "link", text: "campanhas", href: "/campanhas" }
    ]

    return botoesUsuarioLogado
}



function botoesUsuarioNaoLogado(ehMobile: boolean): Botao[] {

    // botões padrão para usuários não logados
    const botoesPadrao: Botao[] = [
        { tipo: "link", href: "/login", text: "entrar" },
        { tipo: "link", href: "/cadastro", text: "cadastro" }
    ]
  

    // caso seja mobile, retorna apenas os botões padrão
    if (ehMobile) return [{ tipo: "custom", componente: <Box gap={4}></Box> }, ...botoesPadrao]


    // retorna os botões padrão e os botões adicionais para desktop
    return [
        {
        tipo: "custom",
        componente: (

            <Box gap={4}>
            <MapButtons
                variant="plain"
                color="qui"
                listButtons={[
                    { text: "campanhas", href: "/campanhas" }
                ]}
            />
            </Box>

        )
        },
        ...botoesPadrao
    ]
}




const ButtonZone = ({children, ...props}: {children?: React.ReactNode, props?: ChakraProviderProps}) => {
    const [usuarioLogado, setUsuarioLogado] = useState(false) // verifica se o usuário está logado
    const { width, height } = ScreenSize() // obtém as dimensões da tela
    const ehMobile = isMobile(width, height, 850) // verifica se é mobile


    // define os botões a serem exibidos com base no estado de login do usuário
    useEffect(() => {
        setUsuarioLogado(!!localStorage.getItem("token"))
    }, [])


    // define os botões a serem exibidos com base no estado de login do usuário
    const botoes: Botao[] = usuarioLogado ? botoesUsuarioLogado() : botoesUsuarioNaoLogado(ehMobile)

    
    
    return (
        <Flex
            direction="row"
            w={`${width * 0.80}px`}
            gap={3} p={4}
            justifyContent={ehMobile ? "center" : "right"}
            alignItems="center"
            {...props}
        >
            {renderButtons(botoes)}
        </Flex>
    )
}

export default ButtonZone
