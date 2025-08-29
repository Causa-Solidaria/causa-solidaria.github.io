import { Box, ChakraProviderProps, Flex } from "@chakra-ui/react"
import { MapButtons } from "csa/components/Buttom"
import { useEffect, useState } from "react"
import { Botao, renderButtons } from "./headerUtils"
import { isMobile } from "csa/utils/isMobile"
import Foto_perfil from "../foto_de_perfil"





// Botões do usuário logado
function botoesUsuarioLogado(): Botao[] {
    
    const botoesUsuarioLogado: Botao[] = [
        {
            tipo: "custom",
            componente: (
                <Box gap={4}>
                <MapButtons
                    variant="plain"
                    color="qui"
                    listButtons={[
                        { text: "campanhas", href: "/campanhas" },
                        { text: "criar campanhas", href: "/criar_campanha" }
                    ]}
                />
                </Box>
            )
        },
        {
            tipo: "custom",
            componente: (
                 <Foto_perfil />
            )
        },
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
    if (ehMobile) return [ ...botoesPadrao]


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
    const ehMobile = isMobile(700) // verifica se é mobile


    // define os botões a serem exibidos com base no estado de login do usuário
    useEffect(() => {
        setUsuarioLogado(!!localStorage.getItem("token"))
    }, [])


    // define os botões a serem exibidos com base no estado de login do usuário
    const botoes: Botao[] = usuarioLogado ? botoesUsuarioLogado() : botoesUsuarioNaoLogado(ehMobile)

    
    
    return (
        <Flex
            direction="row"
            w={ehMobile ? "full" : "80%"}
            gap={3} py={4}
            justifyContent={ehMobile ? "center" : "right"}
            alignContent={ehMobile ? "center" : "flex-end"}
            {...props}
        >
            {renderButtons(botoes)}
        </Flex>
    )
}

export default ButtonZone
