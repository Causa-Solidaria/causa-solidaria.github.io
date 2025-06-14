import { BoxProps, ChakraProviderProps, Card as Ca } from "@chakra-ui/react";
import React from "react";

// aqui eu o tipo de propriedades/argumentos o Card vai aceitar
interface PropsCard extends BoxProps {
    children?: React.ReactNode;
    props?: ChakraProviderProps
}

const Root = ({ children, ...props }: PropsCard) => {
    return (
        <Ca.Root
            p={props?.p || 4}
            width={props?.width || "max-content"}
            bg={props?.bg || "qui"}
            borderRadius={props?.borderRadius || "15px"}
            transition={"all 0.6s ease"}
            {...props}
        >
            {children}
        </Ca.Root>
    );
};

const Footer = ({ children, ...props }: PropsCard) => {
    return (
        <Ca.Footer
            transition={"all 0.6s ease"}
            {...props}
        >
            {children}
        </Ca.Footer>
    );
};

const Body = ({ children, ...props }: PropsCard) => {
    return (
        <Ca.Body
            transition={"all 0.6s ease"}
            {...props}
        >
            {children}
        </Ca.Body>
    );
};

const Header = ({ children, ...props }: PropsCard) => {
    return (
        <Ca.Header
            transition={"all 0.6s ease"}
            {...props}
        >
            {children}
        </Ca.Header>
    );
};

const Title = ({ children, ...props }: PropsCard) => {
    return (
        <Ca.Title
            transition={"all 0.6s ease"}
            {...props}
        >
            {children}
        </Ca.Title>
    );
};

const Description = ({ children, ...props }: PropsCard) => {
    return (
        <Ca.Description
            transition={"all 0.6s ease"}
            {...props}
        >
            {children}
        </Ca.Description>
    );
};

const Card = { Root, Footer, Body, Header, Title, Description };

export default Card;