import { Box, ChakraProviderProps } from "@chakra-ui/react";


export default function Timeline({children, ...props}: any & ChakraProviderProps) {

    return (
        <Box 
            minH={"25vmax"}
            p={4}
            overflowX={"hidden"}
            {...props}
        >
            {children}
        </Box>
    );
}