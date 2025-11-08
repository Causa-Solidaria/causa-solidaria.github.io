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

export default function DefaultPage({children,bg, ...props}: {children?: React.ReactNode} & BoxProps) {
    
    return (
        <Box
            overflowX={"hidden"} 
            bg={"rgba(0,0,0,0)"}
        >
            <Header />
            
            <Timeline bg={bg || "#fff"} {...props} >
                    {children}
            </Timeline>
            
            <Footer />
        </Box>
    );
}