import { Box, Button,  JsxElement,  Link } from "@chakra-ui/react"
import { JSX } from "react";


// tipos que o botão pode ser
export type Botao = 
    | { tipo: "custom"; componente: JSX.Element | JsxElement } 
    | { tipo: "link"; href: string; text: string }

// Função utilitária para detectar mobile
export function isMobile(width: number, height: number, breakpoint = 700) {
  return (width*2 <= height || width < breakpoint) && (height < 1000 || width < 1000)
}

export function renderButtons(botoes: Botao[]) {
  return botoes.map(
        (botao, idx) => (
            botao.tipo === "custom" ? (
                <Box key={idx} m={2}>
                    {botao.componente}
                </Box>
            ) : (
                <Button key={idx} asChild>
                    <Link href={botao.href} bg="ter" m={2} w="10em">
                    {botao.text}
                    </Link>
                </Button>
            )
        )
    )
}