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
                    ref={props?.ref || ref } 
                    p={props?.p || 4} 
                    width={props?.width ||"max-content"} 
                    bg={props?.bg || "qui"} 
                    borderRadius={props?.borderRadius || "15px"} 
                    transition={"all 0.6s ease"}
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
                    transition={"all 0.6s ease"}
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
                    transition={"all 0.6s ease"}
                    {...props /* aceita qualquer propriedade desde que siga o padrao da interface*/} 
                >
                    {children /* aqui é onde é carregado os components filhos*/ } 
                </Ca.Body>
            </>
        ) 
    }
)

const Header = forwardRef<HTMLDivElement, PropsCard>(
    ({children, ...props}: PropsCard, ref ) => {
        return (
            <>
                <Ca.Header
                    ref={ref} 
                    transition={"all 0.6s ease"}
                    {...props /* aceita qualquer propriedade desde que siga o padrao da interface*/} 
                >
                    {children /* aqui é onde é carregado os components filhos*/ } 
                </Ca.Header>
            </>
        ) 
    }
)

const Title = forwardRef<HTMLDivElement, PropsCard>(
    ({children, ...props}: PropsCard, ref ) => {
        return (
            <>
                <Ca.Title
                    transition={"all 0.6s ease"}
                    {...props /* aceita qualquer propriedade desde que siga o padrao da interface*/} 
                >
                    {children /* aqui é onde é carregado os components filhos*/ } 
                </Ca.Title>
            </>
        ) 
    }
)

const Description = forwardRef<HTMLDivElement, PropsCard>(
    ({children, ...props}: PropsCard, ref ) => {
        return (
            <>
                <Ca.Description
                    transition={"all 0.6s ease"}
                    {...props /* aceita qualquer propriedade desde que siga o padrao da interface*/} 
                >
                    {children /* aqui é onde é carregado os components filhos*/ } 
                </Ca.Description>
            </>
        ) 
    }
)




const Card = { Root, Footer, Body, Header, Title, Description};

export default Card ;