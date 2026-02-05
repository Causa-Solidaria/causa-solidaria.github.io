import { Box, ChakraProviderProps } from "@chakra-ui/react";
import dpStyles from "./Defaultpage.module.css";

export default function Timeline({children, ...props}: any & ChakraProviderProps) {

    return (
        <Box 
            minH={"25vmax"}
            p={4}
            overflowX={"hidden"}
            className={dpStyles.timeline}
            {...props}
        >
            {children}
        </Box>
    );
}