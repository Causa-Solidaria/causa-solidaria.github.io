import { Box } from "@chakra-ui/react";
import React, { forwardRef, ForwardedRef } from "react";
import Card, { PropsCard } from "./utils";

interface CardDefaultProps extends PropsCard {
    Header?: React.ReactNode;
    Footer?: React.ReactNode;
    Root?: React.ReactNode;
    children?: React.ReactNode;
}

const CardDefault = (
    { Header, Footer, children, Root, ...props }: CardDefaultProps,
    ref?: ForwardedRef<HTMLDivElement>
) => {
    return (
        <Box ref={ref}>
            <Card.Root {...props}>
                {Root}
                <Card.Header>{Header}</Card.Header>
                <Card.Body>{children}</Card.Body>
                <Card.Footer>{Footer}</Card.Footer>
            </Card.Root>
        </Box>
    );
};

const ForwardedCardDefault = forwardRef<HTMLDivElement, CardDefaultProps>(CardDefault);
ForwardedCardDefault.displayName = "CardDefault";

export default ForwardedCardDefault;