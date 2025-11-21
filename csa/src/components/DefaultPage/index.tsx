import Box from "../ui/Box";
import Footer from "./Footer";
import Header from "./Header";
import Timeline from "./timeline";
import { BoxProps } from "@chakra-ui/react";

// para chamar a página padrão, basta importar o componente DefaultPage e usá-lo como um wrapper
// Exemplo:
// <DefaultPage>
//   <SeuComponente />
// </DefaultPage>

export default function DefaultPage(
    {
        children, 
        bg, 
        hiddenFooter = false,
        hiddenHeader = false,
        ...props
    }: 
    {
        children?: React.ReactNode,
        hiddenFooter?: boolean,
        hiddenHeader?: boolean
    } & BoxProps
) {
    
    return (
        <Box
            overflowX={"hidden"} 
            bg={"#02E351"}
        >
            {(!hiddenHeader) ? <Header /> : null}
            
            <Timeline bg={bg || "rgba(0,0,0,0)"} {...props} >
                    {children}
            </Timeline>
            
            {(!hiddenFooter) ? <Footer /> : null}
        </Box>
    );
}