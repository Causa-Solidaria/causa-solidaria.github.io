import { Box, BoxProps, ChakraProviderProps } from "@chakra-ui/react";
import { forwardRef } from "react";

// aqui eu o tipo de propriedades/argumentos o Card vai aceitar
interface PropsCard extends BoxProps {
    children: React.ReactNode;
    props?: ChakraProviderProps
}

const Card = forwardRef<HTMLDivElement, PropsCard>(
    ({children, ...props}: PropsCard, ref ) => {
        return (
            <>
                <Box 
                    ref={ref} 
                    p={4} 
                    width={"max-content"} 
                    bg={"qui"} 
                    margin={"10% 0 "} 
                    borderRadius={"15px"} 
                    {...props /* aceita qualquer propriedade desde que siga o padrao da interface*/} 
                >
                    {children /* aqui é onde é carregado os components filhos*/ } 
                </Box>
            </>
        ) 
    }
)

export default Card;