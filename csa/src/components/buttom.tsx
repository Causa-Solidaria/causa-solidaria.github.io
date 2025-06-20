import { Button as But, ButtonProps, ChakraProviderProps } from "@chakra-ui/react";
import { forwardRef } from "react";

interface PropsButtom extends ButtonProps {
    children?: React.ReactNode;
    props?: ChakraProviderProps;
    primary?: boolean;
}

const Button = forwardRef<HTMLButtonElement, PropsButtom>(
    ({ children, ...props }: PropsButtom, ref) => {
        // Remova a linha abaixo se não for usar a cor
        // const color = primary ? "colors.brand.verde_claro" : "colors.brand.verde_escuro";

        const hover = {
            scale: 1.025
        };

        return (
            <But
                ref={ref}
                {...props}
                _hover={hover}
                borderRadius={"2md"}
                transition={"0.6s ease"}
            >
                {children}
            </But>
        );
    }
);

// Adicione o displayName
Button.displayName = "Button";

export default Button;