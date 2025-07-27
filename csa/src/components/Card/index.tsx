import Card, { PropsCard } from "./utils";

interface CardDefaultProps extends PropsCard {
    Header?: React.ReactNode;
    Footer?: React.ReactNode;
    Root?: React.ReactNode;
    children?: React.ReactNode;
}

const CardDefault = (
        {Header, Footer, children, Root, ...props}: CardDefaultProps
    ) => {
    return (
        <Card.Root {...props}>
            {Root}
            <Card.Header>
                {Header}
            </Card.Header>
            <Card.Body>
                {children}
            </Card.Body>
            <Card.Footer>
                {Footer}
            </Card.Footer>
        </Card.Root>
    );
};

export default CardDefault;