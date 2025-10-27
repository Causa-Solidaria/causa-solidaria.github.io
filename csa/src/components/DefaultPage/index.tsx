import Footer from "./Footer";
import Header from "./Header";
import Timeline from "./timeline";
import { Box, BoxProps } from "@chakra-ui/react";

// para chamar a página padrão, basta importar o componente DefaultPage e usá-lo como um wrapper
// Exemplo:
// <DefaultPage>
//   <SeuComponente />
// </DefaultPage>

export default function DefaultPage({children, ...props}: {children?: React.ReactNode} & BoxProps) {
    
    return (
        <Box 
            minW={"100vmax"} 
            maxW={"100vmax"} 
            minH={"100vmax"}
            overflowX={"hidden"} 
        >
            <Header />
            
            <Timeline {...props} >
                    {children}
            </Timeline>
            
            <Footer />
        </Box>
    );
}