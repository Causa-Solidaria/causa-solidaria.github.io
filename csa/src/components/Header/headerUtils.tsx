import { Box,  Link } from "@chakra-ui/react"
import Buttom from "csa/components/Buttom";
import { isMobile } from "csa/utils/isMobile";


// tipos que o botão pode ser
export type Botao = 
    | { tipo: "custom"; componente: React.ReactNode} 
    | { tipo: "link"; href: string; text: string }

// Função utilitária para detectar mobile


export function renderButtons(botoes: Botao[]) {
    const ehMobile = isMobile(700)
    
    return botoes.map(
            (botao, idx) => (
                botao.tipo === "custom" ? (
                    <Box key={idx} m={2}>
                        {botao.componente}
                    </Box>
                ) : (
                    <Buttom key={idx} asChild>
                        <Link href={botao.href} bg="ter" m={2}>
                        {botao.text}
                        </Link>
                    </Buttom>
                )
            )
        )
}