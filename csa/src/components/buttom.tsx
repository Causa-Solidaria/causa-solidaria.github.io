import { Button as But, ButtonProps, ChakraProviderProps, Link } from "@chakra-ui/react";
import { forwardRef } from "react";

interface PropsButtom extends ButtonProps {
    children?: React.ReactNode;
    props?: ChakraProviderProps;
    text?: string;
    href?: string;
    primary?: boolean;
}

const Button = forwardRef<HTMLButtonElement, PropsButtom>(
    ({ children, ...props }: PropsButtom, ref) => {
        
        const hover = {
            scale: 1.025
        };

        return (
            <But
                ref={ref}
                {...props}
                _hover={hover}
                fontWeight={"bold"}
                borderRadius={"2md"}
                transition={"0.2s ease"}
            >
                {children}
            </But>
        );
    }
);

export const MapButtons = (
    { listButtons, ...props }: { listButtons: PropsButtom[] } & ButtonProps
) => {
    return listButtons.map((item, index) => (
        item.href ?
            <Button key={index} {...item} {...props} asChild>
                <Link href={item.href} style={{ textDecoration: 'none' }}>
                    {item?.children || item?.text}
                </Link>
            </Button>
        :
            <Button key={index} {...item} {...props}>
                {item?.children || item?.text}
            </Button>
    ));
};

// Adicione o displayName
Button.displayName = "Button";

export default Button;