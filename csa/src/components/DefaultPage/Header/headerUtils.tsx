import { Box,  Link } from "@chakra-ui/react"
import Buttom from "csa/components/Buttom";
import { staticPosition } from "csa/utils/staticPosition";


// tipos que o botão pode ser
export type Botao = 
    | { tipo: "custom"; componente: React.ReactNode} 
    | { tipo: "link"; href: string; text: string }

// Função utilitária para detectar mobile


export function renderButtons(botoes: Botao[]) {
    
    return botoes.map(
            (botao, idx) => (
                botao.tipo === "custom" ? (
                    <Box key={idx} m={staticPosition(2)}>
                        {botao.componente}
                    </Box>
                ) : (
                    <Buttom key={idx} asChild>
                        <Link href={botao.href} bg="ter" m={staticPosition(4)}>
                        {botao.text}
                        </Link>
                    </Buttom>
                )
            )
        )
}