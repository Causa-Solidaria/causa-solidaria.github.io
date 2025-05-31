import { Box, BoxProps, ChakraProviderProps, Card as Ca } from "@chakra-ui/react";
import { forwardRef } from "react";

// aqui eu o tipo de propriedades/argumentos o Card vai aceitar
interface PropsCard extends BoxProps {
    children?: React.ReactNode;
    props?: ChakraProviderProps
}

const Root = forwardRef<HTMLDivElement, PropsCard>(
    ({children, ...props}: PropsCard, ref ) => {
        return (
            <>
                <Ca.Root
                    ref={ref} 
                    p={4} 
                    width={"max-content"} 
                    bg={"qui"} 
                    margin={"10% 0 "} 
                    borderRadius={"15px"} 
                    {...props /* aceita qualquer propriedade desde que siga o padrao da interface*/} 
                >
                    {children /* aqui é onde é carregado os components filhos*/ } 
                </Ca.Root>
            </>
        ) 
    }
)

const Footer = forwardRef<HTMLDivElement, PropsCard>(
    ({children, ...props}: PropsCard, ref ) => {
        return (
            <>
                <Ca.Footer
                    ref={ref} 
                    {...props /* aceita qualquer propriedade desde que siga o padrao da interface*/} 
                >
                    {children /* aqui é onde é carregado os components filhos*/ } 
                </Ca.Footer>
            </>
        ) 
    }
)

const Body = forwardRef<HTMLDivElement, PropsCard>(
    ({children, ...props}: PropsCard, ref ) => {
        return (
            <>
                <Ca.Body
                    ref={ref} 
                    {...props /* aceita qualquer propriedade desde que siga o padrao da interface*/} 
                >
                    {children /* aqui é onde é carregado os components filhos*/ } 
                </Ca.Body>
            </>
        ) 
    }
)




const Card = { Root, Footer, Body }

export default Card ;