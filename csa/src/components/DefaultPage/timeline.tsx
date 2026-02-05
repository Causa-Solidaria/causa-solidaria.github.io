import { Box, ChakraProviderProps } from "@chakra-ui/react";
import dpStyles from "./Defaultpage.module.css";

export default function Timeline({children, ...props}: any & ChakraProviderProps) {

    return (
        <Box 
            className={dpStyles.timeline}
            {...props}
        >
            {children}
        </Box>
    );
}