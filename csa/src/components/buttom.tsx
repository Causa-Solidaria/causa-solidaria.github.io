import styled from "styled-components";
import { Button as But, ButtonProps, ChakraProviderProps} from "@chakra-ui/react";
import { forwardRef } from "react";

interface PropsButtom extends ButtonProps{
    children?: React.ReactNode;
    props?: ChakraProviderProps;
    primary?: boolean;
}

const Button  = forwardRef<HTMLButtonElement, PropsButtom>(
    ({children, primary, ...props}: PropsButtom, ref) =>{
        
        const color = primary ? "colors.brand.verde_claro" : "colors.brand.verde_escuro";

        const hover = {
            scale: 1.025
        }
        
        return (
            <>
                <But ref={ref} {...props} _hover={hover} transition={"0.6s ease"} colorPalette={""}>
                    {children}
                </But>
            </>
        )
    }

)

export default Button;