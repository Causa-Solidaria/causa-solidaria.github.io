import { ScreenSize } from "csa/utils/getScreenSize";
import Footer from "../Footer";
import Header from "../Header";
import Timeline from "../timeline";
import { Box, BoxProps, JsxElement } from "@chakra-ui/react";

// para chamar a página padrão, basta importar o componente DefaultPage e usá-lo como um wrapper
// Exemplo:
// <DefaultPage>
//   <SeuComponente />
// </DefaultPage>

export default function DefaultPage({children, ...props}: {children?: React.ReactNode | JsxElement<any, any>} & BoxProps) {
    const scSize = ScreenSize()
    return (
        <Box w={"100%"} maxW={"100%"} h={scSize.height}>
            <Header />
            
            <Timeline {...props} >
                    {children}
            </Timeline>
            
            <Footer />
        </Box>
    );
}