import { Box, ChakraProviderProps } from "@chakra-ui/react";
import { ScreenSize } from "csa/utils/getScreenSize";


export default function Timeline({children, ...props}: any & ChakraProviderProps) {
    const getScreenSize = ScreenSize();

    return (
        <Box 
            minW={ props.minW ? props?.minW : getScreenSize.width }
            minH={ props.minH ? props?.minH : getScreenSize.height*0.75 }
            p={4}
            bg={props?.bg ? props?.bg : "pri"}
            {...props}
        >
            {children}
        </Box>
    );
}