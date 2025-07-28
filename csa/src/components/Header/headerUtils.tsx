import { Box, Button,  JsxElement,  Link } from "@chakra-ui/react"
import { ScreenSize } from "csa/utils/getScreenSize";
import { JSX } from "react";
import Buttom from "csa/components/Buttom";
import { isMobile } from "csa/utils/isMobile";


// tipos que o botão pode ser
export type Botao = 
    | { tipo: "custom"; componente: JSX.Element | JsxElement<any, any> } 
    | { tipo: "link"; href: string; text: string }

// Função utilitária para detectar mobile


export function renderButtons(botoes: Botao[]) {
    const {width, height} = ScreenSize()
    const ehMobile = isMobile(width, height, 750)
    
    return botoes.map(
            (botao, idx) => (
                botao.tipo === "custom" ? (
                    <Box key={idx} m={2}>
                        {botao.componente}
                    </Box>
                ) : (
                    <Buttom key={idx} w={ehMobile ? (width / (botoes.length+1)) : "10em"} asChild>
                        <Link href={botao.href} bg="ter" m={2}>
                        {botao.text}
                        </Link>
                    </Buttom>
                )
            )
        )
}